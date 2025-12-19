"use client";

import { useMemo, useState } from "react";
import type { DemoState } from "../demo/state";
import type { Signal } from "../demo/types";
import { SeverityBadge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";

export function RadarView({
  state,
  setState,
  onOpenSignal,
}: {
  state: DemoState;
  setState: (fn: (s: DemoState) => DemoState) => void;
  onOpenSignal: (id: string) => void;
}) {
  const tenantId = state.tenant.id;
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"open" | "snoozed" | "dismissed" | "resolved" | "all">("open");

  const signals = useMemo(() => {
    const base = state.signals.filter((s) => s.tenantId === tenantId);
    const filtered = status === "all" ? base : base.filter((s) => s.status === status);
    const searched = q.trim()
      ? filtered.filter((s) => (s.title + " " + s.why.join(" ")).toLowerCase().includes(q.toLowerCase()))
      : filtered;
    return searched;
  }, [state.signals, tenantId, q, status]);

  if (signals.length === 0) {
    return (
      <EmptyState
        title="No signals"
        body="Process emails in Inbox to generate signals (demo rules)."
        action={<a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()}>Go to Inbox</a>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <div className="text-xl font-semibold">Risk Radar</div>
        <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
          Evidence-first signals. Click any item to see why it triggered and take action.
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input className="input" placeholder="Search signals…" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input sm:w-[220px]" value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="open">Open</option>
            <option value="snoozed">Snoozed</option>
            <option value="dismissed">Dismissed</option>
            <option value="resolved">Resolved</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {signals.map((s) => (
          <SignalCard
            key={s.id}
            s={s}
            onOpen={() => onOpenSignal(s.id)}
            onUpdateStatus={(next) =>
              setState((st) => ({
                ...st,
                signals: st.signals.map((x) => (x.id === s.id ? { ...x, status: next } : x)),
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}

function SignalCard({
  s,
  onOpen,
  onUpdateStatus,
}: {
  s: Signal;
  onOpen: () => void;
  onUpdateStatus: (next: Signal["status"]) => void;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">{s.title}</div>
            <SeverityBadge severity={s.severity} />
            <span className="chip text-[rgb(var(--subtext))]">{s.kind}</span>
          </div>
          <div className="mt-2 text-sm text-[rgb(var(--subtext))]">{s.why[0]}</div>
          <div className="mt-2 text-xs text-[rgb(var(--subtext))]">
            Confidence: {Math.round(s.confidence * 100)}% • {new Date(s.createdAtISO).toLocaleString()}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={onOpen}>Open</button>
          <button className="btn btn-ghost" onClick={() => onUpdateStatus("snoozed")}>Snooze</button>
          <button className="btn btn-ghost" onClick={() => onUpdateStatus("dismissed")}>Dismiss</button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {s.recommendedActions.map((a) => (
          <span key={a.id} className="chip">
            ✅ {a.label}
          </span>
        ))}
      </div>
    </div>
  );
}
