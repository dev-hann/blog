import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.author} &middot; built with next.js
        </p>
        <div className="flex gap-4">
          <Link
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-accent)]"
          >
            github
          </Link>
          <Link
            href="/feed.xml"
            className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-accent)]"
          >
            rss
          </Link>
        </div>
      </div>
    </footer>
  );
}
