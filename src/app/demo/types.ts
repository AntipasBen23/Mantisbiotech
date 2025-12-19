export type Severity = "low" | "medium" | "high" | "critical";
export type SignalKind = "deadline" | "missing_doc" | "sla_breach" | "anomaly" | "compliance";

export type Tenant = {
  id: "broker_a" | "broker_b";
  name: string;
};

export type EmailAttachment = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "img";
};

export type InboxEmail = {
  id: string;
  tenantId: Tenant["id"];
  from: string;
  subject: string;
  receivedAtISO: string;
  body: string;
  attachments?: EmailAttachment[];
};

export type ExtractedEntity = {
  key:
    | "client"
    | "policy_number"
    | "claim_ref"
    | "insurer"
    | "coverage"
    | "address"
    | "date"
    | "deadline"
    | "doc_required";
  value: string;
  confidence: number; // 0..1
};

export type CaseEvent = {
  id: string;
  tenantId: Tenant["id"];
  caseId: string;
  atISO: string;
  title: string;
  kind: "email" | "doc" | "task" | "note" | "system";
  evidence: { emailId?: string; quote?: string; attachmentId?: string };
};

export type CaseFile = {
  id: string;
  tenantId: Tenant["id"];
  name: string;
  client: string;
  policyNumber?: string;
  status: "open" | "waiting" | "resolved";
  lastUpdatedISO: string;
};

export type Signal = {
  id: string;
  tenantId: Tenant["id"];
  caseId: string;
  kind: SignalKind;
  severity: Severity;
  title: string;
  why: string[];
  recommendedActions: { id: string; label: string }[];
  evidence: { emailId?: string; quote?: string; attachmentId?: string; eventId?: string };
  confidence: number;
  createdAtISO: string;
  status: "open" | "snoozed" | "dismissed" | "resolved";
};

export type Job = {
  id: string;
  tenantId: Tenant["id"];
  label: string;
  step: "queued" | "extracting" | "classifying" | "signals" | "done" | "error";
  startedAt: number;
};
