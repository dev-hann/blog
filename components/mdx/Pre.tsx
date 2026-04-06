interface PreProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function Pre({ children, ...props }: PreProps) {
  return (
    <pre
      className="overflow-x-auto rounded-lg bg-[var(--color-bg-tertiary)] p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  );
}
