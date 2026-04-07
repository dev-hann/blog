import Link from "next/link";

interface CustomLinkProps extends React.ComponentProps<"a"> {
  href?: string;
  children: React.ReactNode;
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
