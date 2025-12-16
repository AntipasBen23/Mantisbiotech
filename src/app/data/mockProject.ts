import { ProjectData } from "../lib/types";

export const mockProject: ProjectData = {
  project: {
    id: "mantis-demo-001",
    name: "Mantis Demo Device – FlexValve",
    deviceClassHint: "Class II",
    submissionGoal: "Q-Sub",
  },
  requirements: [
    {
      id: "REQ-DEV-DESC-01",
      pillar: "Device Definition",
      title: "Device Description + Intended Use",
      description: "Clear device description and intended use.",
      requiredArtifacts: ["device_overview", "intended_use"],
      severity: 4,
    },
    {
      id: "REQ-DEV-SPEC-02",
      pillar: "Device Definition",
      title: "Design Inputs + Key Specifications",
      description: "Define key performance specs and design inputs.",
      requiredArtifacts: ["design_inputs", "key_specs"],
      severity: 3,
    },
    {
      id: "REQ-VV-BENCH-01",
      pillar: "Verification & Validation",
      title: "Bench Testing Evidence",
      description: "Bench tests for core performance claims.",
      requiredArtifacts: ["bench_test_report", "bench_protocol"],
      severity: 5,
    },
    {
      id: "REQ-VV-SIM-02",
      pillar: "Verification & Validation",
      title: "Simulation Supports Claims",
      description: "Simulation outputs support claims, assumptions documented.",
      requiredArtifacts: ["simulation_results", "simulation_assumptions"],
      severity: 4,
    },
    {
      id: "REQ-RISK-ISO14971-01",
      pillar: "Risk & Safety",
      title: "ISO 14971 Risk Analysis",
      description: "Risk analysis with hazards, mitigations, residual risk.",
      requiredArtifacts: ["risk_register", "hazard_analysis"],
      severity: 5,
    },
    {
      id: "REQ-RISK-BIO-02",
      pillar: "Risk & Safety",
      title: "Biocompatibility Strategy",
      description: "Biocompatibility rationale/plan appropriate to contact.",
      requiredArtifacts: ["biocomp_plan"],
      severity: 4,
    },
    {
      id: "REQ-TRACE-01",
      pillar: "Traceability",
      title: "Requirements ↔ Evidence Traceability",
      description: "Critical requirements trace to strong verification evidence.",
      requiredArtifacts: ["design_inputs", "bench_test_report", "simulation_results", "risk_register"],
      severity: 5,
    },
    {
      id: "REQ-NARR-02",
      pillar: "Regulatory Narrative",
      title: "Claims ↔ Evidence Alignment",
      description: "Every claim is explicitly supported by evidence artifacts.",
      requiredArtifacts: ["claims_list", "bench_test_report", "simulation_results"],
      severity: 5,
    },
  ],
  artifacts: [
    { id: "device_overview", name: "Device Overview", type: "doc", status: "complete", lastUpdated: "2025-12-10" },
    { id: "intended_use", name: "Intended Use Statement", type: "doc", status: "partial", lastUpdated: "2025-12-08", notes: "Needs clearer patient population + environment of use." },
    { id: "design_inputs", name: "Design Inputs", type: "doc", status: "complete", lastUpdated: "2025-12-07" },
    { id: "key_specs", name: "Key Specifications", type: "doc", status: "partial", lastUpdated: "2025-12-06", notes: "Acceptance criteria incomplete for durability metric." },

    { id: "bench_test_report", name: "Bench Test Report", type: "test", status: "missing", lastUpdated: "2025-12-01", notes: "Not uploaded / not executed yet." },
    { id: "bench_protocol", name: "Bench Test Protocol", type: "test", status: "partial", lastUpdated: "2025-12-05", notes: "Draft exists, missing acceptance criteria." },

    { id: "simulation_results", name: "Simulation Results", type: "simulation", status: "complete", lastUpdated: "2025-12-09" },
    { id: "simulation_assumptions", name: "Simulation Assumptions", type: "doc", status: "missing", lastUpdated: "2025-12-01", notes: "Key assumptions not documented." },

    { id: "risk_register", name: "Risk Register", type: "risk", status: "partial", lastUpdated: "2025-12-04", notes: "Residual risk justification incomplete." },
    { id: "hazard_analysis", name: "Hazard Analysis", type: "risk", status: "complete", lastUpdated: "2025-12-03" },

    { id: "biocomp_plan", name: "Biocompatibility Plan", type: "doc", status: "missing", lastUpdated: "2025-12-01" },
    { id: "claims_list", name: "Claims List", type: "doc", status: "partial", lastUpdated: "2025-12-08", notes: "Claims not yet tied to evidence." },
  ],
  trace: [
    { requirementId: "REQ-DEV-DESC-01", artifactId: "device_overview", strength: "strong" },
    { requirementId: "REQ-DEV-DESC-01", artifactId: "intended_use", strength: "weak" },
    { requirementId: "REQ-DEV-SPEC-02", artifactId: "design_inputs", strength: "strong" },
    { requirementId: "REQ-DEV-SPEC-02", artifactId: "key_specs", strength: "weak" },

    { requirementId: "REQ-VV-SIM-02", artifactId: "simulation_results", strength: "strong" },

    { requirementId: "REQ-RISK-ISO14971-01", artifactId: "hazard_analysis", strength: "strong" },
    { requirementId: "REQ-RISK-ISO14971-01", artifactId: "risk_register", strength: "weak" },

    { requirementId: "REQ-TRACE-01", artifactId: "design_inputs", strength: "weak" },
    { requirementId: "REQ-TRACE-01", artifactId: "simulation_results", strength: "weak" },

    { requirementId: "REQ-NARR-02", artifactId: "simulation_results", strength: "weak" },
  ],
};
