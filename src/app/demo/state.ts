import type { CaseEvent, CaseFile, InboxEmail, Job, Signal, Tenant } from "./types";
import { DEMO_EMAILS, DEMO_CASES, DEMO_EVENTS, DEMO_SIGNALS, TENANTS } from "./stubData";

export type DemoState = {
  tenant: Tenant;
  emails: InboxEmail[];
  cases: CaseFile[];
  events: CaseEvent[];
  signals: Signal[];
  jobs: Job[];
  ui: {
    selectedEmailId: string | null;
    toast: { id: string; title: string; message?: string } | null;
  };
};

export function seedDemoState(): DemoState {
  return {
    tenant: TENANTS[0],
    emails: DEMO_EMAILS,
    cases: DEMO_CASES,
    events: DEMO_EVENTS,
    signals: DEMO_SIGNALS,
    jobs: [],
    ui: { selectedEmailId: DEMO_EMAILS[0]?.id ?? null, toast: null },
  };
}
