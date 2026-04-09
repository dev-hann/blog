import React from "react";

interface PageHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

function PageHeading({ children, ...props }: PageHeadingProps) {
  return (
    <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]" {...props}>
      {children}
    </h1>
  );
}

export default PageHeading;
