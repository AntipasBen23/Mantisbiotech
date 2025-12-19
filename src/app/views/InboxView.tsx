"use client";

import { useMemo, useState } from "react";
import type { DemoState } from "../demo/state";
import { extractEntities, generateSignalsFromEmail, startJob } from "../demo/engine";
import type { ExtractedEntity, InboxEmail } from "../demo/types";
import { EmptyState } from "../ui/EmptyState";

export function InboxView({
  state,
  setState,
  onOpenSignal,
}: {
  state: DemoState;
  setState: (fn: (s: DemoState) => DemoState) => void;
  onOpenSignal: (id: string) => void;
}) {
  const tenantId = state.tenant.id;
  const emails = useMemo(() => state.emails.filter((e) => e.tenantId === tenantId), [state.emails, tenantId]);

  const [extracted, setExtracted] = useState<ExtractedEntity[] | null>(null);
  const [busy, setBusy] = useState(false);

  const selectedEmail = emails.find((e) => e.id === state.ui.selectedEmailId) ?? emails[0] ?? null;

  function selectEmail(id: string) {
    setExtracted(null);
    setState((s) => ({ ...s, ui: { ...s.ui, selectedEmailId: id } }));
  }

  async function processEmail(email: InboxEmail) {
    setBusy(true);

    const job = startJob(state, "Process email");
    setState((s) => ({ ...s, jobs: [job, ...s.jobs] }));

    // fake queue progression
    const step = async (ms: number) => new Promise((r) => setTimeout(r, ms));

    try {
      await step(700);
      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, step: "extracting" } : j)),
      }));

      await step(900);
      const entities = extractEntities(email.body);
      setExtracted(entities);

      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, step: "classifying" } : j)),
      }));

      await step(900);
      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, step: "signals" } : j)),
      }));

      await step(900);

      // naive mapping: choose a case by tenant + keyword
      const caseId =
        email.subject.toLowerCase().includes("müller") ? "cs_001" : email.subject.toLowerCase().includes("lange") ? "cs_002" : "cs_003";

      const newSignals = generateSignalsFromEmail({
        tenantId,
        caseId,
        emailId: email.id,
        subject: email.subject,
        body: email.body,
      });

      setState((s) => ({
        ...s,
        signals: [...newSignals, ...s.signals],
        jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, step: "done" } : j)),
        ui: { ...s.ui, toast: { id: "t1", title: "Processed", message: `${newSignals.length} signal(s) generated` } },
      }));

      if (newSignals[0]) onOpenSignal(newSignals[0].id);
    } finally {
      setBusy(false);
    }
  }

  if (!selectedEmail) {
    return <EmptyState title="No emails" body="Add stub emails in demo/stubData.ts." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5 card p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Inbox</div>
          <span className="chip text-[rgb(var(--subtext))]">{emails.length} items</span>
        </div>

        <div className="mt-3 space-y-2">
          {emails.map((e) => (
            <button
              key={e.id}
              onClick={() => selectEmail(e.id)}
              className={[
                "w-full rounded-2xl border p-4 text-left transition",
                e.id === selectedEmail.id ? "bg-white" : "bg-white/70 hover:bg-white",
              ].join(" ")}
              style={{ borderColor: "rgb(var(--border))" }}
            >
              <div className="text-xs text-[rgb(var(--subtext))]">{e.from}</div>
              <div className="mt-1 font-semibold">{e.subject}</div>
              <div className="mt-1 text-xs text-[rgb(var(--subtext))] line-clamp-2">{e.body}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <div className="card p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Selected email</div>
              <div className="mt-1 text-xl font-semibold">{selectedEmail.subject}</div>
              <div className="mt-1 text-xs text-[rgb(var(--subtext))]">
                From {selectedEmail.from} • {new Date(selectedEmail.receivedAtISO).toLocaleString()}
              </div>
            </div>

            <button className="btn btn-primary" disabled={busy} onClick={() => processEmail(selectedEmail)}>
              {busy ? "Processing…" : "Process"}
            </button>
          </div>

          <pre className="mt-4 rounded-2xl border bg-white p-4 text-xs overflow-auto"
            style={{ borderColor: "rgb(var(--border))" }}
          >
{selectedEmail.body}
          </pre>

          {selectedEmail.attachments?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedEmail.attachments.map((a) => (
                <span key={a.id} className="chip">
                  📎 {a.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="card p-6">
          <div className="text-sm font-semibold">Structured extraction</div>
          <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
            Demo extraction is deterministic (regex + stub rules). In production this is LLM + schema validation.
          </div>

          {!extracted ? (
            <div className="mt-4 rounded-2xl border p-4 text-sm text-[rgb(var(--subtext))]"
              style={{ borderColor: "rgb(var(--border))" }}
            >
              Click <b>Process</b> to generate structured entities.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extracted.map((x, idx) => (
                <div key={idx} className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgb(var(--border))" }}>
                  <div className="text-xs text-[rgb(var(--subtext))]">{x.key}</div>
                  <div className="mt-1 font-semibold">{x.value}</div>
                  <div className="mt-2 text-xs text-[rgb(var(--subtext))]">
                    Confidence: {Math.round(x.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
