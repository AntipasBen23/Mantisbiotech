"use client";

import { useMemo, useState } from "react";
import { AppShell } from "./ui/AppShell";
import { InboxView } from "./views/InboxView";
import { RadarView } from "./views/RadarView";
import { DashboardView } from "./views/DashboardView";
import { SettingsView } from "./views/SettingsView";
import { SignalDetailView } from "./views/SignalDetailView";
import { seedDemoState, type DemoState } from "./demo/state";

type Route =
  | { name: "dashboard" }
  | { name: "inbox" }
  | { name: "radar" }
  | { name: "signal"; id: string }
  | { name: "settings" };

export default function Home() {
  const [route, setRoute] = useState<Route>({ name: "dashboard" });

  const [state, setState] = useState<DemoState>(() => seedDemoState());

  const selectedSignal = useMemo(() => {
    if (route.name !== "signal") return null;
    return state.signals.find((s) => s.id === route.id) ?? null;
  }, [route, state.signals]);

  return (
    <AppShell
      route={route}
      onNavigate={setRoute}
      tenant={state.tenant}
      onTenantChange={(tenant) => setState((s) => ({ ...s, tenant }))}
    >
      {route.name === "dashboard" && (
        <DashboardView state={state} setState={setState} onOpenSignal={(id) => setRoute({ name: "signal", id })} />
      )}

      {route.name === "inbox" && (
        <InboxView state={state} setState={setState} onOpenSignal={(id) => setRoute({ name: "signal", id })} />
      )}

      {route.name === "radar" && (
        <RadarView state={state} setState={setState} onOpenSignal={(id) => setRoute({ name: "signal", id })} />
      )}

      {route.name === "signal" && selectedSignal && (
        <SignalDetailView
          state={state}
          setState={setState}
          signal={selectedSignal}
          onBack={() => setRoute({ name: "radar" })}
        />
      )}

      {route.name === "settings" && <SettingsView state={state} setState={setState} />}
    </AppShell>
  );
}
