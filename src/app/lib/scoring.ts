import { Artifact, Pillar, ProjectData, Severity, TraceLink } from "./types";

export type Gap = {
  requirementId: string;
  pillar: Pillar;
  title: string;
  severity: Severity;
  reasons: string[];
  missingArtifacts: string[];
  weakTraceArtifacts: string[];
};

export type PillarScore = {
  pillar: Pillar;
  score: number; // 0..100
  status: "good" | "warn" | "bad";
  requiredCount: number;
  satisfiedCount: number;
  gaps: Gap[];
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function statusFromScore(score: number): "good" | "warn" | "bad" {
  if (score >= 80) return "good";
  if (score >= 55) return "warn";
  return "bad";
}

function artifactById(artifacts: Artifact[], id: string): Artifact | undefined {
  return artifacts.find((a) => a.id === id);
}

function hasStrongTrace(trace: TraceLink[], requirementId: string, artifactId: string) {
  return trace.some(
    (t) =>
      t.requirementId === requirementId &&
      t.artifactId === artifactId &&
      t.strength === "strong"
  );
}

function hasAnyTrace(trace: TraceLink[], requirementId: string, artifactId: string) {
  return trace.some((t) => t.requirementId === requirementId && t.artifactId === artifactId);
}

export function computeScores(data: ProjectData): {
  overallScore: number;
  pillarScores: PillarScore[];
  totalGaps: number;
  traceCoveragePct: number;
} {
  const pillars: Pillar[] = [
    "Device Definition",
    "Verification & Validation",
    "Risk & Safety",
    "Traceability",
    "Regulatory Narrative",
  ];

  const pillarScores: PillarScore[] = pillars.map((pillar) => {
    const reqs = data.requirements.filter((r) => r.pillar === pillar);

    const gaps: Gap[] = [];
    let satisfiedCount = 0;

    for (const r of reqs) {
      const missingArtifacts: string[] = [];
      const weakTraceArtifacts: string[] = [];
      const reasons: string[] = [];

      for (const artId of r.requiredArtifacts) {
        const art = artifactById(data.artifacts, artId);

        if (!art || art.status === "missing") {
          missingArtifacts.push(artId);
          continue;
        }

        const anyTrace = hasAnyTrace(data.trace, r.id, artId);
        const strongTrace = hasStrongTrace(data.trace, r.id, artId);

        if (!anyTrace || !strongTrace) weakTraceArtifacts.push(artId);
        if (art.status === "partial") reasons.push(`Artifact "${artId}" is only partial.`);
      }

      const satisfied =
        missingArtifacts.length === 0 &&
        (pillar !== "Traceability" || weakTraceArtifacts.length === 0);

      if (satisfied) {
        satisfiedCount += 1;
      } else {
        if (missingArtifacts.length)
          reasons.push(`Missing evidence: ${missingArtifacts.map((x) => `"${x}"`).join(", ")}.`);
        if (weakTraceArtifacts.length)
          reasons.push(
            `Weak/absent trace links: ${weakTraceArtifacts.map((x) => `"${x}"`).join(", ")}.`
          );

        gaps.push({
          requirementId: r.id,
          pillar,
          title: r.title,
          severity: r.severity,
          reasons: reasons.length ? reasons : ["Not satisfied."],
          missingArtifacts,
          weakTraceArtifacts,
        });
      }
    }

    const requiredCount = reqs.length;
    const base = requiredCount === 0 ? 1 : satisfiedCount / requiredCount;

    const severityPenalty =
      requiredCount === 0
        ? 0
        : gaps.reduce((acc, g) => acc + g.severity, 0) / (requiredCount * 10);

    const score = clamp(Math.round((base - severityPenalty) * 100), 0, 100);

    return {
      pillar,
      score,
      status: statusFromScore(score),
      requiredCount,
      satisfiedCount,
      gaps,
    };
  });

  const overallScore = Math.round(
    pillarScores.reduce((acc, p) => acc + p.score, 0) / pillarScores.length
  );

  const totalGaps = pillarScores.reduce((acc, p) => acc + p.gaps.length, 0);

  const totalPairs = data.requirements.reduce((acc, r) => acc + r.requiredArtifacts.length, 0);
  const tracedPairs = data.requirements.reduce((acc, r) => {
    const traced = r.requiredArtifacts.filter((a) => hasAnyTrace(data.trace, r.id, a)).length;
    return acc + traced;
  }, 0);

  const traceCoveragePct = totalPairs === 0 ? 0 : Math.round((tracedPairs / totalPairs) * 100);

  return { overallScore, pillarScores, totalGaps, traceCoveragePct };
}
