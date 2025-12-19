import type { CaseEvent, CaseFile, InboxEmail, Signal, Tenant } from "./types";

export const TENANTS: Tenant[] = [
  { id: "broker_a", name: "Policendirekt (Demo)" },
  { id: "broker_b", name: "Vermas (Demo)" },
];

export const DEMO_EMAILS: InboxEmail[] = [
  {
    id: "em_001",
    tenantId: "broker_a",
    from: "claims@insurer.de",
    subject: "Leitungswasserschaden – Herr Müller – Unterlagen fehlen",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    body:
      "Guten Tag,\n\nwir benötigen noch den Kostenvoranschlag Maler sowie Fotos vom Schadenort. Ohne diese Unterlagen können wir den Fall nicht weiter bearbeiten.\n\nBitte bis 18.08.2025 nachreichen.\n\nVG\nSchaden-Team",
    attachments: [{ id: "att_001", name: "Schadenmeldung.pdf", type: "pdf" }],
  },
  {
    id: "em_002",
    tenantId: "broker_a",
    from: "kunde.mueller@email.com",
    subject: "Re: Leitungswasserschaden – Fotos & Rechnung",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    body:
      "Hallo,\n\nanbei Fotos und die Rechnung für die Trockenlegung. Den Kostenvoranschlag Maler bekomme ich erst nächste Woche.\n\nDanke!",
    attachments: [{ id: "att_002", name: "Fotos.zip", type: "img" }],
  },
  {
    id: "em_003",
    tenantId: "broker_b",
    from: "underwriting@insurer.de",
    subject: "Kfz-Police Frau Lange – Kündigungsfrist / Wechsel",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    body:
      "Bitte beachten: Kündigungsfrist 1 Monat zum Ende der Versicherungsperiode. Für einen Wechsel benötigen wir noch die aktuelle SF-Klasse Bestätigung.",
  },
  {
    id: "em_004",
    tenantId: "broker_b",
    from: "kunde.schmidt@email.com",
    subject: "Policenverlängerung – Bitte heute bestätigen",
    receivedAtISO: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    body:
      "Hallo,\n\ndie Policenverlängerung für Hausrat (Nr. HR-49201) läuft heute ab. Können Sie bitte bestätigen, dass alles verlängert wird?\n\nLG",
  },
];

export const DEMO_CASES: CaseFile[] = [
  {
    id: "cs_001",
    tenantId: "broker_a",
    name: "Leitungswasserschaden Herr Müller",
    client: "Herr Müller",
    policyNumber: "HR-118822",
    status: "waiting",
    lastUpdatedISO: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "cs_002",
    tenantId: "broker_b",
    name: "Kfz Wechsel Frau Lange",
    client: "Frau Lange",
    policyNumber: "KFZ-77101",
    status: "open",
    lastUpdatedISO: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
  },
  {
    id: "cs_003",
    tenantId: "broker_b",
    name: "Policenverlängerung Frau Schmidt",
    client: "Frau Schmidt",
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
    evidence: { emailId: "em_001", quote: "…benötigen noch den Kostenvoranschlag Maler sowie Fotos…" },
  },
  {
    id: "ev_002",
    tenantId: "broker_a",
    caseId: "cs_001",
    atISO: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    title: "Client provided partial documents",
    kind: "email",
    evidence: { emailId: "em_002", quote: "…Rechnung für die Trockenlegung… Kostenvoranschlag Maler… nächste Woche…" },
  },
];

export const DEMO_SIGNALS: Signal[] = [
  {
    id: "sg_001",
    tenantId: "broker_a",
    caseId: "cs_001",
    kind: "missing_doc",
    severity: "high",
    title: "Missing doc: Painter estimate required",
    why: [
      "Insurer explicitly requested ‘Kostenvoranschlag Maler’.",
      "Client indicated it will arrive next week (delay risk).",
    ],
    recommendedActions: [
      { id: "act_req_doc", label: "Request painter estimate from client" },
      { id: "act_set_rem", label: "Set reminder for 3 days" },
    ],
    evidence: { emailId: "em_001", quote: "…Kostenvoranschlag Maler…" },
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
    title: "Renewal deadline: today",
    why: ["Client states the renewal expires today.", "No confirmation event logged yet."],
    recommendedActions: [
      { id: "act_draft_confirm", label: "Draft confirmation email" },
      { id: "act_create_task", label: "Create urgent task" },
    ],
    evidence: { emailId: "em_004", quote: "…läuft heute ab…" },
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
    title: "Potential compliance gap: SF confirmation missing",
    why: ["Underwriter requested SF-class confirmation for switching.", "Missing attachment or follow-up task."],
    recommendedActions: [
      { id: "act_req_sf", label: "Request SF confirmation" },
      { id: "act_assign", label: "Assign to colleague" },
    ],
    evidence: { emailId: "em_003", quote: "…benötigen wir noch die aktuelle SF-Klasse Bestätigung…" },
    confidence: 0.78,
    createdAtISO: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: "open",
  },
];
