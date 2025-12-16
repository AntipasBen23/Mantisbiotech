"use client";

import { useMemo, useState } from "react";
import { mockProject } from "../data/mockProject";
import { computeScores } from "../lib/scoring";
import type { Pillar, ProjectData } from "../lib/types";
import PillarCard from "./PillarCard";
import GapList from "./GapList";
import ArtifactTable from "./ArtifactTable";
import JsonImporter from "./JsonImporter";

export default function ReadinessDashboard() {
  const [data, setData] = useState<ProjectData>(mockProject);
  const [selectedPillar, setSelectedPillar] = useState<Pillar>("Device Definition");
  const [reviewerMode, setReviewerMode] = useState(false);

  const scored = useMemo(() => computeScores(data), [data]);
  const selected = scored.pillarScores.find((p) => p.pillar === selectedPillar);

  const coveragePct = useMemo(() => {
    const satisfied = scored.pillarScores.reduce((acc, p) => acc + p.satisfiedCount, 0);
    const total = scored.pillarScores.reduce((acc, p) => acc + p.requiredCount, 0) || 1;
    return Math.round((satisfied / total) * 100);
  }, [scored]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* left: dashboard */}
      <div className="lg:col-span-2 space-y-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">Readiness Overview</h2>
                <p className="mt-1 text-xs text-slate-300/80">
                  Reviewer mode prioritizes the most rejection-prone gaps first (severity-weighted).
                </p>
              </div>

              <button
                onClick={() => setReviewerMode((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition
                  ${reviewerMode ? "border-red-400/40 bg-red-400/10" : "border-white/10 bg-white/5"}`}
              >
                <span>FDA Reviewer Mode</span>
                <span
                  className={`h-5 w-9 rounded-full border border-white/10 p-0.5 transition
                    ${reviewerMode ? "bg-red-400/20" : "bg-white/5"}`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-white/80 transition
                      ${reviewerMode ? "translate-x-4" : "translate-x-0"}`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Kpi label="Overall readiness" value={`${scored.overallScore}%`} />
              <Kpi label="Coverage" value={`${coveragePct}%`} />
              <Kpi label="Trace coverage" value={`${scored.traceCoveragePct}%`} />
              <Kpi label="Open gaps" value={`${scored.totalGaps}`} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {scored.pillarScores.map((p) => (
                <PillarCard
                  key={p.pillar}
                  pillar={p.pillar}
                  score={p.score}
                  status={p.status}
                  gaps={p.gaps.length}
                  selected={p.pillar === selectedPillar}
                  onSelect={() => setSelectedPillar(p.pillar)}
                />
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-sky-400/10 px-4 py-3 text-sm text-slate-200/90">
              <span className="font-semibold">What this solves:</span>{" "}
              stop guessing “are we ready?” — see exactly where a submission breaks (missing evidence,
              weak traceability, partial artifacts).
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">{selectedPillar} — gaps & blockers</h2>
              <p className="mt-1 text-xs text-slate-300/80">
                Click a gap to see missing evidence and weak trace links (simulated artifact graph).
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {selected ? `${selected.satisfiedCount}/${selected.requiredCount} satisfied` : "—"}
            </span>
          </div>
          <div className="p-5">
            <GapList gaps={selected?.gaps ?? []} reviewerMode={reviewerMode} artifacts={data.artifacts} />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Artifacts & status</h2>
              <p className="mt-1 text-xs text-slate-300/80">
                Mimics a backend evidence store. In production: files + metadata + provenance.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {data.project.submissionGoal}
            </span>
          </div>
          <div className="p-5">
            <ArtifactTable data={data} />
          </div>
        </section>
      </div>

      {/* right: controls */}
      <div className="space-y-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Project</h2>
              <p className="mt-1 text-xs text-slate-300/80">
                {data.project.name} • {data.project.id}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {data.project.deviceClassHint}
            </span>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-xs font-semibold"
                onClick={() => setData(mockProject)}
              >
                Reset demo data
              </button>
              <button
                className="rounded-xl border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs font-semibold"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    artifacts: prev.artifacts.map((a) => ({ ...a, status: "missing" })),
                    trace: [],
                  }))
                }
              >
                Panic mode (wipe evidence)
              </button>
            </div>

            <p className="text-xs text-slate-300/80 leading-relaxed">
              “Panic mode” is deliberate: it proves this behaves like a readiness system, not a static report.
            </p>
          </div>
        </section>

        <JsonImporter value={data} onChange={setData} />

        <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm font-semibold">How this becomes real</h2>
            <p className="mt-1 text-xs text-slate-300/80">
              In production: DB-backed artifact graph + rule engine scoring; LLM only for drafting narrative,
              not for deciding readiness.
            </p>
          </div>
          <div className="p-5 text-xs text-slate-300/80 leading-relaxed">
            Deterministic scoring is the point — it’s explainable, reviewable, and doesn’t become “AI said so.”
          </div>
        </section>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
      <div className="text-xs text-slate-300/80">{label}</div>
      <div className="mt-1 text-lg font-bold tracking-tight">{value}</div>
    </div>
  );
}
