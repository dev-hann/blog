import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">About</h1>
      <section className="flex flex-col gap-4">
        <p className="text-[var(--color-text-secondary)]">
          안녕하세요, {SITE_CONFIG.author}입니다. 웹 개발과 기술에 대해 글을 씁니다.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          이 블로그는 Next.js 16과 Tailwind CSS v4로 제작되었습니다.
        </p>
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Links</h2>
        <div className="flex gap-4">
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-text-accent)] hover:underline"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
