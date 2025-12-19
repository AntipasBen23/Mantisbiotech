import type { DemoState } from "./state";
import type { ExtractedEntity, Job, Severity, Signal, SignalKind } from "./types";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function startJob(state: DemoState, label: string): Job {
  const job: Job = {
    id: uid("job"),
    tenantId: state.tenant.id,
    label,
    step: "queued",
    startedAt: Date.now(),
  };
  return job;
}

export function extractEntities(emailBody: string): ExtractedEntity[] {
  const entities: ExtractedEntity[] = [];

  const deadlineMatch = emailBody.match(/bis\s+(\d{2}\.\d{2}\.\d{4})/i);
  if (deadlineMatch) {
    entities.push({ key: "deadline", value: deadlineMatch[1], confidence: 0.82 });
  }

  const policyMatch = emailBody.match(/\b([A-Z]{2,5}-\d{3,})\b/);
  if (policyMatch) {
    entities.push({ key: "policy_number", value: policyMatch[1], confidence: 0.75 });
  }

  const hasPainter = /Kostenvoranschlag\s+Maler/i.test(emailBody);
  if (hasPainter) {
    entities.push({ key: "doc_required", value: "Kostenvoranschlag Maler", confidence: 0.9 });
  }

  const today = /heute/i.test(emailBody);
  if (today) {
    entities.push({ key: "date", value: "heute", confidence: 0.6 });
  }

  return entities;
}

function severityRank(s: Severity) {
  return s === "critical" ? 4 : s === "high" ? 3 : s === "medium" ? 2 : 1;
}

export function generateSignalsFromEmail(params: {
  tenantId: string;
  caseId: string;
  emailId: string;
  subject: string;
  body: string;
}): Signal[] {
  const { tenantId, caseId, emailId, subject, body } = params;

  const out: Signal[] = [];
  const now = new Date().toISOString();

  // Rule: missing doc
  if (/Kostenvoranschlag\s+Maler/i.test(body)) {
    out.push({
      id: uid("sg"),
      tenantId: tenantId as any,
      caseId,
      kind: "missing_doc" as SignalKind,
      severity: "high",
      title: "Missing doc: Painter estimate required",
      why: ["Insurer requested painter estimate.", "Without it, claim processing stalls."],
      recommendedActions: [
        { id: "act_req_doc", label: "Request painter estimate" },
        { id: "act_set_rem", label: "Set reminder" },
      ],
      evidence: { emailId, quote: "…Kostenvoranschlag Maler…" },
      confidence: 0.86,
      createdAtISO: now,
      status: "open",
    });
  }

  // Rule: urgent deadline (today)
  if (/läuft heute ab/i.test(body) || /heute.*fällig/i.test(body) || /today/i.test(body)) {
    out.push({
      id: uid("sg"),
      tenantId: tenantId as any,
      caseId,
      kind: "deadline",
      severity: "critical",
      title: "Deadline: action required today",
      why: ["Message indicates a same-day deadline.", "High client dissatisfaction risk."],
      recommendedActions: [
        { id: "act_draft_confirm", label: "Draft confirmation" },
        { id: "act_create_task", label: "Create urgent task" },
      ],
      evidence: { emailId, quote: "…heute…" },
      confidence: 0.9,
      createdAtISO: now,
      status: "open",
    });
  }

  // Rule: compliance-ish missing SF confirmation
  if (/SF-?Klasse/i.test(body) && /Bestätigung/i.test(body)) {
    out.push({
      id: uid("sg"),
      tenantId: tenantId as any,
      caseId,
      kind: "compliance",
      severity: "medium",
      title: "Potential compliance gap: SF confirmation missing",
      why: ["Underwriter requested SF confirmation.", "No follow-up task detected in timeline (demo)."],
      recommendedActions: [
        { id: "act_req_sf", label: "Request SF confirmation" },
        { id: "act_assign", label: "Assign to colleague" },
      ],
      evidence: { emailId, quote: "…SF-Klasse Bestätigung…" },
      confidence: 0.78,
      createdAtISO: now,
      status: "open",
    });
  }

  // Lightweight anomaly hint (subject patterns)
  if (/wieder/i.test(body) || /erneut/i.test(body) || /again/i.test(body)) {
    out.push({
      id: uid("sg"),
      tenantId: tenantId as any,
      caseId,
      kind: "anomaly",
      severity: "low",
      title: "Anomaly hint: repeated pattern",
      why: ["Language indicates a repeat/reopen pattern.", "Consider checking historical claims for this client."],
      recommendedActions: [{ id: "act_review_hist", label: "Review history" }],
      evidence: { emailId, quote: subject },
      confidence: 0.55,
      createdAtISO: now,
      status: "open",
    });
  }

  // Sort most severe first
  out.sort((a, b) => severityRank(b.severity) - severityRank(a.severity));
  return out;
}
