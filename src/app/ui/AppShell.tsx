"use client";

import { ReactNode } from "react";
import type { Tenant } from "../demo/types";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type Route =
  | { name: "dashboard" }
  | { name: "inbox" }
  | { name: "radar" }
  | { name: "signal"; id: string }
  | { name: "settings" };

export function AppShell({
  children,
  route,
  onNavigate,
  tenant,
  onTenantChange,
}: {
  children: ReactNode;
  route: Route;
  onNavigate: (r: Route) => void;
  tenant: Tenant;
  onTenantChange: (t: Tenant) => void;
}) {
  return (
    <div className="min-h-screen">
      <Topbar tenant={tenant} onTenantChange={onTenantChange} />
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <Sidebar route={route} onNavigate={onNavigate} />
          </div>
          <main className="col-span-12 md:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
