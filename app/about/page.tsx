import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">cat ~/about.md</span>
      </p>

      <section className="font-mono text-sm">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
          {SITE_CONFIG.author}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          developer &amp; writer
        </p>
        <div className="mt-4 flex flex-col gap-1">
          <p>
            <span className="text-[var(--color-text-muted)]">github:</span>{" "}
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-accent)] hover:underline"
            >
              {SITE_CONFIG.github}
            </a>
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="font-mono text-[var(--color-prompt)]">
          $ <span className="text-[var(--color-text-primary)]">history</span>
        </p>
        <div className="font-mono text-sm text-[var(--color-text-secondary)]">
          <p>2018&nbsp;&nbsp;첫 코딩</p>
          <p>2020&nbsp;&nbsp;프론트엔드 개발자</p>
          <p>2024&nbsp;&nbsp;블로그 시작</p>
        </div>
      </section>
    </div>
  );
}
