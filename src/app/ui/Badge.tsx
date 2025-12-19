import type { Severity } from "../demo/types";

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, { label: string; bg: string; fg: string; bd: string }> = {
    low: { label: "Low", bg: "rgb(var(--muted))", fg: "rgb(var(--subtext))", bd: "rgb(var(--border))" },
    medium: { label: "Medium", bg: "rgba(234,179,8,0.12)", fg: "rgb(120 83 0)", bd: "rgba(234,179,8,0.25)" },
    high: { label: "High", bg: "rgba(37,99,235,0.10)", fg: "rgb(30 64 175)", bd: "rgba(37,99,235,0.25)" },
    critical: { label: "Critical", bg: "rgba(220,38,38,0.10)", fg: "rgb(153 27 27)", bd: "rgba(220,38,38,0.25)" },
  };

  const s = map[severity];
  return (
    <span className="chip" style={{ background: s.bg, color: s.fg, borderColor: s.bd }}>
      {s.label}
    </span>
  );
}
