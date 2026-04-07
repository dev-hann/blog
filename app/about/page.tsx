import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          About
        </h1>
        <section className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-accent)]">{SITE_CONFIG.author}</span> — developer &amp; writer
          </p>
          <p className="text-[var(--color-text-secondary)]">
            {SITE_CONFIG.description}. Next.js 16 + Tailwind CSS v4 + MDX 기반으로 제작되었습니다.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[var(--color-bg-tertiary)] px-4 py-2 text-sm text-[var(--color-text-accent)] transition-colors hover:bg-[var(--color-bg-hover)]"
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
