import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata } from "@/lib/metadata";
import PageContainer from "@/components/ui/PageContainer";

export const metadata = generateMetadata({
  title: "About",
  description: `${SITE_CONFIG.author} — developer & writer`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE_CONFIG.author,
            description: SITE_CONFIG.description,
            url: SITE_CONFIG.url,
            sameAs: [SITE_CONFIG.github],
          }),
        }}
      />
      <h1 id="about-heading" className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        About
      </h1>
      <section aria-labelledby="about-heading" className="space-y-4">
        <p className="text-[var(--color-text-secondary)]">
          <span className="text-[var(--color-text-accent)]">{SITE_CONFIG.author}</span> — developer & writer
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
            GitHub<span className="sr-only"> (opens in new tab)</span>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
