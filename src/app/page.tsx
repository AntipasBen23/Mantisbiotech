import ReadinessDashboard from "./components/ReadinessDashboard";

export default function Page() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-sm">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-base font-semibold tracking-tight">
              Submission-readiness, at-a-glance
            </h1>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              Frontend-only
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300/80 leading-relaxed">
            This demo mimics a backend artifact graph using JSON. Scoring is deterministic
            (audit-friendly) and later can be backed by real storage + an optional LLM layer
            for narrative drafting (separate from scoring).
          </p>
        </div>

        <div className="p-5">
          <ReadinessDashboard />
        </div>
      </section>
    </div>
  );
}
