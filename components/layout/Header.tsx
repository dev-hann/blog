"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "blog" },
  { href: "/posts", label: "posts" },
  { href: "/tags", label: "tags" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/search", label: "search" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-6">
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-[var(--color-text-accent)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className="text-[var(--color-text-muted)]">~/</span>
              <span className={
                pathname === link.href
                  ? "text-[var(--color-text-accent)]"
                  : ""
              }>{link.label}</span>
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--color-text-primary)]"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-2 border-t border-[var(--color-border)] px-6 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-1 text-sm transition-colors ${
                pathname === link.href
                  ? "text-[var(--color-text-accent)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className="text-[var(--color-text-muted)]">~/</span>
              <span className={
                pathname === link.href
                  ? "text-[var(--color-text-accent)]"
                  : ""
              }>{link.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
