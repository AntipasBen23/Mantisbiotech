export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card p-8">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-[rgb(var(--subtext))]">{body}</div>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
