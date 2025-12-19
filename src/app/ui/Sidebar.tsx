"use client";

type Route =
  | { name: "dashboard" }
  | { name: "inbox" }
  | { name: "radar" }
  | { name: "signal"; id: string }
  | { name: "settings" };

function Item({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border p-4 transition",
        active ? "bg-white" : "bg-white/70 hover:bg-white",
      ].join(" ")}
      style={{ borderColor: "rgb(var(--border))" }}
    >
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-[rgb(var(--subtext))] mt-1">{subtitle}</div>
    </button>
  );
}

export function Sidebar({ route, onNavigate }: { route: Route; onNavigate: (r: Route) => void }) {
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="text-sm font-semibold">Navigation</div>
        <div className="mt-3 space-y-2">
          <Item
            active={route.name === "dashboard"}
            title="Dashboard"
            subtitle="High-level view"
            onClick={() => onNavigate({ name: "dashboard" })}
          />
          <Item
            active={route.name === "inbox"}
            title="Inbox"
            subtitle="Ingest & extract"
            onClick={() => onNavigate({ name: "inbox" })}
          />
          <Item
            active={route.name === "radar"}
            title="Risk Radar"
            subtitle="Signals & triage"
            onClick={() => onNavigate({ name: "radar" })}
          />
          <Item
            active={route.name === "settings"}
            title="Settings"
            subtitle="Rules, roles, audit"
            onClick={() => onNavigate({ name: "settings" })}
          />
        </div>
      </div>

      <div className="card p-4">
        <div className="text-sm font-semibold">What this demo proves</div>
        <ul className="mt-2 text-xs text-[rgb(var(--subtext))] space-y-1 list-disc pl-5">
          <li>Evidence-first signals (no “magic”)</li>
          <li>Deterministic rules + triage UX</li>
          <li>Inbox → timeline → actions loop</li>
        </ul>
      </div>
    </div>
  );
}
