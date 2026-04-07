interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "danger";
}

const typeStyles: Record<string, string> = {
  info: "border-[var(--color-info)] bg-[var(--color-info)]/10",
  warning: "border-[var(--color-warning)] bg-[var(--color-warning)]/10",
  danger: "border-[var(--color-error)] bg-[var(--color-error)]/10",
};

const typeIcons: Record<string, string> = {
  info: "ℹ",
  warning: "⚠",
  danger: "✕",
};

export default function Callout({ children, type = "info" }: CalloutProps) {
  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 ${typeStyles[type] ?? typeStyles.info}`}
      role="alert"
    >
      <div className="flex items-start gap-2">
        <span aria-hidden="true">{typeIcons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
