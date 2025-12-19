"use client";

import type { DemoState } from "../demo/state";
import type { Signal } from "../demo/types";
import { SeverityBadge } from "../ui/Badge";

export function DashboardView({
  state,
  setState,
  onOpenSignal,
}: {
  state: DemoState;
  setState: (fn: (s: DemoState) => DemoState) => void;
  onOpenSignal: (id: string) => void;
}) {
  const tenantId = state.tenant.id;

  const openSignals = state.signals
    .filter((s) => s.tenantId === tenantId && s.status === "open")
    .slice()
    .sort((a, b) => (a.severity === b.severity ? 0 : a.severity < b.severity ? 1 : -1));

  const openCases = state.cases.filter((c) => c.tenantId === tenantId && c.status !== "resolved");

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <div className="text-xl font-semibold">Overview</div>
        <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
          This is a frontend-only simulation of an Afori-style “proactive signals” system. Evidence-first. Deterministic.
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Open signals" value={openSignals.length} />
          <Stat label="Active cases" value={openCases.length} />
          <Stat label="Inbox items" value={state.emails.filter((e) => e.tenantId === tenantId).length} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Top signals</div>
            <button className="btn btn-ghost" onClick={() => {}}>
              Refresh
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {openSignals.slice(0, 6).map((s) => (
              <SignalRow key={s.id} s={s} onClick={() => onOpenSignal(s.id)} />
            ))}
            {openSignals.length === 0 ? (
              <div className="text-sm text-[rgb(var(--subtext))]">No open signals for this tenant.</div>
            ) : null}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-semibold">Case health</div>
          <div className="mt-3 space-y-3">
            {openCases.slice(0, 6).map((c) => (
              <div key={c.id} className="rounded-2xl border p-4" style={{ borderColor: "rgb(var(--border))" }}>
                <div className="font-semibold">{c.name}</div>
                <div className="mt-1 text-xs text-[rgb(var(--subtext))]">
                  Client: {c.client} • Policy: {c.policyNumber ?? "—"} • Status: {c.status}
                </div>
              </div>
            ))}
            {openCases.length === 0 ? (
              <div className="text-sm text-[rgb(var(--subtext))]">No active cases.</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="text-xs text-[rgb(var(--subtext))]">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function SignalRow({ s, onClick }: { s: Signal; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border bg-white p-4 text-left hover:bg-[rgb(var(--muted))] transition"
      style={{ borderColor: "rgb(var(--border))" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold">{s.title}</div>
        <SeverityBadge severity={s.severity} />
      </div>
      <div className="mt-1 text-xs text-[rgb(var(--subtext))] line-clamp-2">{s.why[0]}</div>
    </button>
  );
}
