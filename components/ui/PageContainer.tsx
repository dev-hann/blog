interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function PageContainer({ children, className, maxWidth = "max-w-3xl" }: PageContainerProps) {
  return (
    <div className={`bg-[var(--color-bg-primary)] px-4 py-8${className ? ` ${className}` : ""}`}>
      <div className={`mx-auto ${maxWidth}`}>
        {children}
      </div>
    </div>
  );
}
