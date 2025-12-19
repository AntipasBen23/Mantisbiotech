"use client";

import type { DemoState } from "../demo/state";

export function SettingsView({
  state,
  setState,
}: {
  state: DemoState;
  setState: (fn: (s: DemoState) => DemoState) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="card p-6">
        <div className="text-xl font-semibold">Settings (Demo)</div>
        <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
          This page exists to show how the product expands: rules, roles, audit trails. Backend comes later.
        </div>
      </div>

      <div className="card p-6">
        <div className="text-sm font-semibold">Signal controls</div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Control title="Tenant isolation" body="Simulated by tenant dropdown (top right)." />
          <Control title="Audit logs" body="Stubbed (would be a Postgres table + immutable events)." />
          <Control title="Rule editor" body="Next step: UI to enable/disable rules + thresholds." />
          <Control title="Notifications" body="Next step: daily digest + Outlook nudges." />
        </div>
      </div>

      <div className="card p-6">
        <div className="text-sm font-semibold">Reset demo data</div>
        <div className="mt-2 text-sm text-[rgb(var(--subtext))]">
          Clears signals/jobs to a clean state for showing the product again.
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() =>
            setState((s) => ({
              ...s,
              signals: s.signals.filter((x) => x.tenantId !== s.tenant.id),
              jobs: [],
              ui: { ...s.ui, toast: { id: "reset", title: "Reset", message: "Cleared signals for this tenant." } },
            }))
          }
        >
          Reset tenant signals
        </button>
      </div>
    </div>
  );
}

function Control({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-[rgb(var(--subtext))]">{body}</div>
    </div>
  );
}
