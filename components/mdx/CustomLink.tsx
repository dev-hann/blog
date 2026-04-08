import React from "react";
import Link from "next/link";

interface CustomLinkProps extends React.ComponentProps<"a"> {
  href?: string;
  children: React.ReactNode;
  htmlOnly?: boolean;
}

export default function CustomLink({ href, children, htmlOnly = false, ...props }: CustomLinkProps) {
  if (!href) return <span {...props}>{children}</span>;

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        {!htmlOnly && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  }

  if (htmlOnly) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
