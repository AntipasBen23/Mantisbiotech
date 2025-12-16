"use client";

import { useMemo, useState } from "react";
import type { Artifact } from "../lib/types";
import type { Gap } from "../lib/scoring";

function sevLabel(sev: number) {
  if (sev >= 5) return "Critical";
  if (sev >= 4) return "High";
  if (sev >= 3) return "Medium";
  return "Low";
}

function sevStyle(sev: number) {
  if (sev >= 5) return "border-red-400/40 bg-red-400/10";
  if (sev >= 4) return "border-amber-300/30 bg-amber-300/10";
  return "border-white/10 bg-white/[0.03]";
}

function artifactName(artifacts: Artifact[], id: string) {
  const a = artifacts.find((x) => x.id === id);
  return a ? a.name : id;
}

export default function GapList(props: {
  gaps: Gap[];
  reviewerMode: boolean;
  artifacts: Artifact[];
}) {
  const { gaps, reviewerMode, artifacts } = props;
  const [openId, setOpenId] = useState<string | null>(null);

  const ordered = useMemo(() => {
    const copy = [...gaps];
    if (reviewerMode) {
      copy.sort((a, b) => {
        if (b.severity !== a.severity) return b.severity - a.severity;
        return (
          b.missingArtifacts.length +
          b.weakTraceArtifacts.length -
          (a.missingArtifacts.length + a.weakTraceArtifacts.length)
        );
      });
    }
    return copy;
  }, [gaps, reviewerMode]);

  if (!ordered.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-emerald-400/10 px-4 py-3 text-sm text-slate-200/90">
        <span className="font-semibold">No open gaps in this pillar.</span>{" "}
        Either you’re actually ready (rare) or your requirements are incomplete (more common).
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ordered.map((g) => {
        const open = openId === g.requirementId;

        return (
          <div key={g.requirementId} className={`rounded-2xl border ${sevStyle(g.severity)}`}>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-semibold text-sm">{g.title}</div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold">
                      {sevLabel(g.severity)} (S{g.severity})
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-300">
                      {g.requirementId}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-slate-300/80">{g.reasons[0]}</div>
                </div>

                <button
                  onClick={() => setOpenId(open ? null : g.requirementId)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold"
                >
                  {open ? "Hide details" : "View why"}
                </button>
              </div>

              {open && (
                <div className="mt-4 space-y-3">
                  <div className="h-px bg-white/10" />

                  <div className="text-sm text-slate-200/90">
                    <span className="font-semibold">Why this blocks submission:</span>
                    <ul className="mt-2 list-disc pl-5 text-xs text-slate-300/80 space-y-1">
                      {g.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {g.missingArtifacts.length > 0 && (
                    <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-3">
                      <div className="text-xs font-semibold">Missing evidence artifacts</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.missingArtifacts.map((id) => (
                          <span
                            key={id}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-200"
                          >
                            {id} <span className="text-slate-300/60">•</span>{" "}
                            <span className="font-sans">{artifactName(artifacts, id)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {g.weakTraceArtifacts.length > 0 && (
                    <div className="rounded-xl border border-amber-300/25 bg-amber-300/10 p-3">
                      <div className="text-xs font-semibold">Weak / absent trace links</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.weakTraceArtifacts.map((id) => (
                          <span
                            key={id}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-200"
                          >
                            {id} <span className="text-slate-300/60">•</span>{" "}
                            <span className="font-sans">{artifactName(artifacts, id)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
