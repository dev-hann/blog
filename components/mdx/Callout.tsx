type CalloutType = "info" | "warning" | "danger";

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
}

const typeStyles: Record<CalloutType, string> = {
  info: "border-[var(--color-info)] bg-[var(--color-info)]/10",
  warning: "border-[var(--color-warning)] bg-[var(--color-warning)]/10",
  danger: "border-[var(--color-error)] bg-[var(--color-error)]/10",
};

const typeIcons: Record<CalloutType, string> = {
  info: "ℹ",
  warning: "⚠",
  danger: "✕",
};

const typeRoles: Record<CalloutType, string> = {
  info: "note",
  warning: "status",
  danger: "alert",
};

const typeLabels: Record<CalloutType, string> = {
  info: "Information",
  warning: "Warning",
  danger: "Danger",
};

export default function Callout({ children, type = "info" }: CalloutProps) {
  const labelId = `callout-label-${type}`;
  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 ${typeStyles[type]}`}
      role={typeRoles[type]}
      aria-labelledby={labelId}
    >
      <div className="flex items-start gap-2">
        <span id={labelId} className="sr-only">{typeLabels[type]}</span>
        <span aria-hidden="true">{typeIcons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
