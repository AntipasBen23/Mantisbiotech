"use client";

import type { DemoState } from "../demo/state";
import type { Signal } from "../demo/types";
import { SeverityBadge } from "../ui/Badge";

export function SignalDetailView({
  state,
  setState,
  signal,
  onBack,
}: {
  state: DemoState;
  setState: (fn: (s: DemoState) => DemoState) => void;
  signal: Signal;
  onBack: () => void;
}) {
  const tenantId = state.tenant.id;

  const caseFile = state.cases.find((c) => c.id === signal.caseId && c.tenantId === tenantId) ?? null;
  const events = state.events
    .filter((e) => e.caseId === signal.caseId && e.tenantId === tenantId)
    .slice()
    .sort((a, b) => (a.atISO < b.atISO ? 1 : -1));

  const email = signal.evidence.emailId
    ? state.emails.find((e) => e.id === signal.evidence.emailId && e.tenantId === tenantId) ?? null
    : null;

  function markResolved() {
    setState((s) => ({
      ...s,
      signals: s.signals.map((x) => (x.id === signal.id ? { ...x, status: "resolved" } : x)),
    }));
  }

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back to Radar
        </button>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-semibold">{signal.title}</div>
              <SeverityBadge severity={signal.severity} />
              <span className="chip text-[rgb(var(--subtext))]">{signal.kind}</span>
            </div>

            <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
              Confidence: {Math.round(signal.confidence * 100)}% • Status:{" "}
              <b className="text-[rgb(var(--text))]">{signal.status}</b>
            </div>

            {caseFile ? (
              <div className="mt-3 text-sm">
                <span className="chip">Case: {caseFile.name}</span>
                <span className="chip ml-2">Client: {caseFile.client}</span>
                <span className="chip ml-2">Policy: {caseFile.policyNumber ?? "—"}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={markResolved}>
              Mark resolved
            </button>
            <button
              className="btn btn-ghost"
              onClick={() =>
                setState((s) => ({
                  ...s,
                  signals: s.signals.map((x) => (x.id === signal.id ? { ...x, status: "snoozed" } : x)),
                }))
              }
            >
              Snooze
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: "rgb(var(--border))" }}>
          <div className="text-sm font-semibold">Why this triggered</div>
          <ul className="mt-2 text-sm text-[rgb(var(--subtext))] list-disc pl-5 space-y-1">
            {signal.why.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgb(var(--border))" }}>
            <div className="text-sm font-semibold">Evidence</div>
            <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
              {signal.evidence.quote ? (
                <blockquote className="rounded-2xl border p-4 soft" style={{ borderColor: "rgb(var(--border))" }}>
                  {signal.evidence.quote}
                </blockquote>
              ) : (
                "No quote available."
              )}
            </div>

            {email ? (
              <div className="mt-4">
                <div className="text-xs text-[rgb(var(--subtext))]">From: {email.from}</div>
                <div className="font-semibold mt-1">{email.subject}</div>
                <pre
                  className="mt-2 rounded-2xl border bg-white p-4 text-xs overflow-auto"
                  style={{ borderColor: "rgb(var(--border))" }}
                >
{email.body}
                </pre>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgb(var(--border))" }}>
            <div className="text-sm font-semibold">Recommended actions</div>
            <div className="mt-3 space-y-2">
              {signal.recommendedActions.map((a) => (
                <button
                  key={a.id}
                  className="w-full btn btn-ghost justify-between"
                  onClick={() => alert(`Demo action: ${a.label}\n\nIn production: create task + draft email + audit log.`)}
                >
                  <span>{a.label}</span>
                  <span className="text-xs text-[rgb(var(--subtext))]">Run</span>
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm font-semibold">Case timeline</div>
            <div className="mt-2 space-y-2">
              {events.length === 0 ? (
                <div className="text-sm text-[rgb(var(--subtext))]">No events recorded.</div>
              ) : (
                events.map((ev) => (
                  <div key={ev.id} className="rounded-2xl border p-3" style={{ borderColor: "rgb(var(--border))" }}>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">{ev.title}</div>
                      <div className="text-xs text-[rgb(var(--subtext))]">{new Date(ev.atISO).toLocaleString()}</div>
                    </div>
                    {ev.evidence.quote ? (
                      <div className="mt-1 text-xs text-[rgb(var(--subtext))] line-clamp-2">{ev.evidence.quote}</div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
