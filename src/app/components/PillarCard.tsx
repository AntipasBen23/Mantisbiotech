"use client";

import type { Pillar } from "../lib/types";

export default function PillarCard(props: {
  pillar: Pillar;
  score: number;
  status: "good" | "warn" | "bad";
  gaps: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const { pillar, score, status, gaps, selected, onSelect } = props;

  const dot =
    status === "good"
      ? "bg-emerald-400"
      : status === "warn"
      ? "bg-amber-300"
      : "bg-red-400";

  const label =
    status === "good" ? "Ready-ish" : status === "warn" ? "At risk" : "Blocked";

  return (
    <button
      onClick={onSelect}
      className={`text-left rounded-2xl border bg-black/20 p-3 transition
        ${selected ? "border-sky-400/50 bg-sky-400/10" : "border-white/10 hover:bg-white/[0.04]"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs font-semibold">{pillar}</div>
        <div className="text-[11px] font-mono text-slate-300/80">{score}%</div>
      </div>

      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="font-semibold">{label}</span>
        <span className="text-slate-300/60">•</span>
        <span>{gaps} gaps</span>
      </div>
    </button>
  );
}
