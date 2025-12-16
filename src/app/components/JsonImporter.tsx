"use client";

import { useState } from "react";
import type { ProjectData } from "../lib/types";

export default function JsonImporter(props: {
  value: ProjectData;
  onChange: (v: ProjectData) => void;
}) {
  const { value, onChange } = props;

  const [text, setText] = useState<string>(() => JSON.stringify(value, null, 2));
  const [err, setErr] = useState<string | null>(null);

  function apply() {
    try {
      const parsed = JSON.parse(text) as ProjectData;
      if (!parsed?.project || !Array.isArray(parsed.requirements) || !Array.isArray(parsed.artifacts)) {
        throw new Error("Invalid shape. Expected { project, requirements[], artifacts[], trace[] }");
      }
      setErr(null);
      onChange(parsed);
    } catch (e: any) {
      setErr(e?.message ?? "Invalid JSON");
    }
  }

  function reload() {
    setText(JSON.stringify(value, null, 2));
    setErr(null);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-semibold">Mock backend JSON</h2>
        <p className="mt-1 text-xs text-slate-300/80">
          Edit <span className="font-mono">artifacts[].status</span> or <span className="font-mono">trace[]</span> and watch readiness update.
        </p>
      </div>

      <div className="p-5 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="w-full min-h-[220px] rounded-2xl border border-white/10 bg-black/30 p-3 font-mono text-[11px] text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/30"
        />

        {err ? (
          <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-xs text-red-100">
            <span className="font-semibold">JSON error:</span> {err}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={apply}
            className="rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-xs font-semibold"
          >
            Apply JSON
          </button>
          <button
            onClick={reload}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold"
          >
            Reload current state
          </button>
        </div>
      </div>
    </section>
  );
}
