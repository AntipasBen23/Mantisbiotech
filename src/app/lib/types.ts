export type Pillar =
  | "Device Definition"
  | "Verification & Validation"
  | "Risk & Safety"
  | "Traceability"
  | "Regulatory Narrative";

export type ArtifactStatus = "complete" | "partial" | "missing";
export type Severity = 1 | 2 | 3 | 4 | 5; // 5 = most severe

export type Requirement = {
  id: string;
  pillar: Pillar;
  title: string;
  description: string;
  requiredArtifacts: string[];
  severity: Severity;
};

export type Artifact = {
  id: string;
  name: string;
  type: "doc" | "test" | "simulation" | "risk" | "trace" | "other";
  status: ArtifactStatus;
  lastUpdated: string; // ISO
  notes?: string;
};

export type TraceLink = {
  requirementId: string;
  artifactId: string;
  strength: "strong" | "weak";
};

export type ProjectData = {
  project: {
    id: string;
    name: string;
    deviceClassHint: "Class I" | "Class II" | "Class III" | "Unknown";
    submissionGoal: "Q-Sub" | "510(k)" | "De Novo" | "PMA" | "Unknown";
  };
  requirements: Requirement[];
  artifacts: Artifact[];
  trace: TraceLink[];
};
