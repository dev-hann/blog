import React from "react";

type SkeletonVariant = "default" | "circle";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  default: "rounded",
  circle: "rounded-full",
};

function Skeleton({ variant = "default", width = "", height = "", className = "", ...props }: SkeletonProps) {
  const baseClassName = "animate-pulse bg-[var(--color-bg-tertiary)]";
  const sizeClassName = `${width} ${height}`.trim();
  const finalClassName = `${baseClassName} ${variantStyles[variant]} ${sizeClassName} ${className}`.trim().replace(/\s+/g, " ");

  return (
    <>
      <span className="sr-only">Loading...</span>
      <div className={finalClassName} role="status" aria-hidden="true" {...props} />
    </>
  );
}

export default React.memo(Skeleton);
