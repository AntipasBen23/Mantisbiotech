import type { CaseEvent, CaseFile, InboxEmail, Signal, Tenant } from "./types";

export const TENANTS: Tenant[] = [
  { id: "broker_a", name: "PolicyDirect (Demo)" },
  { id: "broker_b", name: "Vermas Insurance (Demo)" },
];

export const DEMO_EMAILS: InboxEmail[] = [
  {
    id: "em_001",
    tenantId: "broker_a",
    from: "claims@insurer.com",
    subject: "Water damage claim — Mr. Miller — Missing documents",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    body:
      "Hello,\n\nwe are still missing the painter’s cost estimate as well as photos of the damage location. Without these documents, we cannot continue processing the claim.\n\nPlease submit them by 18/08/2025.\n\nBest regards,\nClaims Team",
    attachments: [{ id: "att_001", name: "ClaimReport.pdf", type: "pdf" }],
  },
  {
    id: "em_002",
    tenantId: "broker_a",
    from: "client.miller@email.com",
    subject: "Re: Water damage claim — Photos & invoice",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    body:
      "Hi,\n\nattached are the photos and the invoice for the drying work. I will only receive the painter’s estimate sometime next week.\n\nThanks!",
    attachments: [{ id: "att_002", name: "Photos.zip", type: "img" }],
  },
  {
    id: "em_003",
    tenantId: "broker_b",
    from: "underwriting@insurer.com",
    subject: "Auto policy — Ms. Lange — Cancellation period / switch",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    body:
      "Please note: the cancellation period is one month before the end of the insurance term. To proceed with a switch, we still require the current no-claims bonus (NCB) confirmation.",
  },
  {
    id: "em_004",
    tenantId: "broker_b",
    from: "client.schmidt@email.com",
    subject: "Policy renewal — Please confirm today",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    body:
      "Hello,\n\nthe home contents policy renewal (No. HR-49201) expires today. Could you please confirm that everything will be renewed?\n\nKind regards",
  },
];

export const DEMO_CASES: CaseFile[] = [
  {
    id: "cs_001",
    tenantId: "broker_a",
    name: "Water damage claim — Mr. Miller",
    client: "Mr. Miller",
    policyNumber: "HR-118822",
    status: "waiting",
    lastUpdatedISO: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "cs_002",
    tenantId: "broker_b",
    name: "Auto policy switch — Ms. Lange",
    client: "Ms. Lange",
    policyNumber: "AUTO-77101",
    status: "open",
    lastUpdatedISO: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
  },
  {
    id: "cs_003",
    tenantId: "broker_b",
    name: "Policy renewal — Ms. Schmidt",
    client: "Ms. Schmidt",
    policyNumber: "HR-49201",
    status: "open",
    lastUpdatedISO: new Date(Date.now() - 1000 * 60 * 175).toISOString(),
  },
];

export const DEMO_EVENTS: CaseEvent[] = [
  {
    id: "ev_001",
    tenantId: "broker_a",
    caseId: "cs_001",
    atISO: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    title: "Insurer requested missing documents",
    kind: "email",
    evidence: {
      emailId: "em_001",
      quote: "…we are still missing the painter’s cost estimate as well as photos of the damage location…",
    },
  },
  {
    id: "ev_002",
    tenantId: "broker_a",
    caseId: "cs_001",
    atISO: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    title: "Client provided partial documents",
    kind: "email",
    evidence: {
      emailId: "em_002",
      quote: "…attached are the photos and the invoice… painter’s estimate… next week…",
    },
  },
];

export const DEMO_SIGNALS: Signal[] = [
  {
    id: "sg_001",
    tenantId: "broker_a",
    caseId: "cs_001",
    kind: "missing_doc",
    severity: "high",
    title: "Missing document: Painter estimate required",
    why: [
      "The insurer explicitly requested a painter’s cost estimate.",
      "The client indicated it will only arrive next week, creating a delay risk.",
    ],
    recommendedActions: [
      { id: "act_req_doc", label: "Request painter estimate from client" },
      { id: "act_set_rem", label: "Set reminder for 3 days" },
    ],
    evidence: {
      emailId: "em_001",
      quote: "…missing the painter’s cost estimate…",
    },
    confidence: 0.86,
    createdAtISO: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    status: "open",
  },
  {
    id: "sg_002",
    tenantId: "broker_b",
    caseId: "cs_003",
    kind: "deadline",
    severity: "critical",
    title: "Renewal deadline: action required today",
    why: [
      "The client states the policy renewal expires today.",
      "No confirmation or renewal event is recorded yet.",
    ],
    recommendedActions: [
      { id: "act_draft_confirm", label: "Draft confirmation email" },
      { id: "act_create_task", label: "Create urgent task" },
    ],
    evidence: {
      emailId: "em_004",
      quote: "…the policy renewal expires today…",
    },
    confidence: 0.91,
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "open",
  },
  {
    id: "sg_003",
    tenantId: "broker_b",
    caseId: "cs_002",
    kind: "compliance",
    severity: "medium",
    title: "Potential compliance gap: NCB confirmation missing",
    why: [
      "The underwriter requested a no-claims bonus (NCB) confirmation.",
      "No attachment or follow-up task is present in the case timeline.",
    ],
    recommendedActions: [
      { id: "act_req_sf", label: "Request NCB confirmation" },
      { id: "act_assign", label: "Assign to colleague" },
    ],
    evidence: {
      emailId: "em_003",
      quote: "…we still require the current no-claims bonus (NCB) confirmation…",
    },
    confidence: 0.78,
    createdAtISO: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: "open",
  },
];
