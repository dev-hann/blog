"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/types/post";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const tocList = (
    <ul className="space-y-1 border-l border-[var(--color-border)]">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={() => setMobileOpen(false)}
            className={`block text-sm transition-colors ${
              heading.level === 3 ? "pl-6" : "pl-4"
            } ${
              activeId === heading.id
                ? "border-l-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );

  const mobileContentId = "toc-mobile-content";

  return (
    <>
      <nav aria-label="Table of contents" className="hidden lg:block">
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-muted)]">
          Table of Contents
        </h2>
        {tocList}
      </nav>
      <nav aria-label="Table of contents" className="lg:hidden">
        <button
          type="button"
          aria-label="Toggle table of contents"
          aria-expanded={mobileOpen}
          aria-controls={mobileContentId}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="mb-2 text-sm font-semibold text-[var(--color-text-muted)]"
        >
          Table of Contents ▾
        </button>
        <div
          id={mobileContentId}
          {...(mobileOpen ? {} : { "aria-hidden": "true" })}
          className={mobileOpen ? "" : "hidden"}
        >
          {tocList}
        </div>
      </nav>
    </>
  );
}
