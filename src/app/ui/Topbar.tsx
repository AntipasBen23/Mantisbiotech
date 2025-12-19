"use client";

import { TENANTS } from "../demo/stubData";
import type { Tenant } from "../demo/types";

export function Topbar({
  tenant,
  onTenantChange,
}: {
  tenant: Tenant;
  onTenantChange: (t: Tenant) => void;
}) {
  return (
    <div className="sticky top-0 z-20 border-b bg-[rgb(var(--bg))]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-2xl"
            style={{ background: "rgb(var(--primary))" }}
            aria-hidden
          />
          <div>
            <div className="text-sm font-semibold leading-4">Risk Radar</div>
            <div className="text-xs text-[rgb(var(--subtext))] leading-4">
              Afori-style demo (frontend-only)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="chip text-[rgb(var(--subtext))]">Demo Mode</span>

          <select
            className="input w-[240px]"
            value={tenant.id}
            onChange={(e) => {
              const t = TENANTS.find((x) => x.id === e.target.value);
              if (t) onTenantChange(t);
            }}
          >
            {TENANTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
