"use client";

import type { ProjectData } from "../lib/types";

function statusPill(status: string) {
  if (status === "complete") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (status === "partial") return "border-amber-300/30 bg-amber-300/10 text-amber-100";
  return "border-red-400/30 bg-red-400/10 text-red-200";
}

export default function ArtifactTable({ data }: { data: ProjectData }) {
  const reqById = new Map(data.requirements.map((r) => [r.id, r]));
  const traceByArtifact = new Map<string, string[]>();

  for (const t of data.trace) {
    const list = traceByArtifact.get(t.artifactId) ?? [];
    list.push(`${t.requirementId}:${t.strength}`);
    traceByArtifact.set(t.artifactId, list);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.03] text-slate-200/90">
          <tr className="border-b border-white/10">
            <th className="px-4 py-3 text-left text-xs font-semibold">Artifact</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Trace links</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.artifacts.map((a) => {
            const links = traceByArtifact.get(a.id) ?? [];
            return (
              <tr key={a.id} className="border-b border-white/10">
                <td className="px-4 py-3 align-top">
                  <div className="font-semibold text-slate-100">{a.name}</div>
                  <div className="mt-1 text-[11px] font-mono text-slate-300/70">{a.id}</div>
                  {a.notes ? (
                    <div className="mt-2 text-xs text-slate-300/80">{a.notes}</div>
                  ) : null}
                </td>

                <td className="px-4 py-3 align-top">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${statusPill(a.status)}`}>
                    {a.status}
                  </span>
                </td>

                <td className="px-4 py-3 align-top">
                  <span className="text-[11px] font-mono text-slate-300/80">{a.type}</span>
                </td>

                <td className="px-4 py-3 align-top">
                  {links.length === 0 ? (
                    <span className="text-xs text-slate-300/70">No links</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {links.map((x) => {
                        const [reqId, strength] = x.split(":");
                        const req = reqById.get(reqId);
                        const pill =
                          strength === "strong"
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                            : "border-amber-300/30 bg-amber-300/10 text-amber-100";

                        return (
                          <span
                            key={x}
                            title={req ? req.title : reqId}
                            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-mono ${pill}`}
                          >
                            {reqId} ({strength})
                          </span>
                        );
                      })}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 align-top">
                  <span className="text-[11px] font-mono text-slate-300/80">{a.lastUpdated}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
