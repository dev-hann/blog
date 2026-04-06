"use client";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of Contents" className="hidden lg:block">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        목차
      </h2>
      <ul className="space-y-1.5 border-l border-[var(--color-border)]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-colors hover:text-[var(--color-accent)] ${
                heading.level === 3 ? "pl-6" : "pl-4"
              } text-[var(--color-text-secondary)]`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
