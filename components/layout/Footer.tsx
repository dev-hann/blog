import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] py-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-sm text-[var(--color-text-muted)]">
        <span>© {new Date().getFullYear()} {SITE_CONFIG.author}</span>
        <div className="flex gap-4">
          <nav aria-label="Footer navigation" className="flex gap-4">
            <Link
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--color-text-primary)]"
            >
              GitHub<span className="sr-only"> opens in new tab</span>
            </Link>
            <Link
              href="/feed.xml"
              className="transition-colors hover:text-[var(--color-text-primary)]"
            >
              RSS
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
