import Link from "next/link";

interface CustomLinkProps {
  href?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

export default function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (!href) return <span {...props}>{children}</span>;

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
