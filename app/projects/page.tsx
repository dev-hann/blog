import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata } from "@/lib/metadata";
import type { Project } from "@/types/project";

export const metadata = generateMetadata({
  title: "Projects",
  description: "Projects by " + SITE_CONFIG.author,
  path: "/projects",
});

const projects: Project[] = [
  {
    name: "Blog",
    description: "Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그",
    tags: ["nextjs", "typescript", "tailwindcss", "mdx"],
    github: SITE_CONFIG.github,
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          Projects
        </h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
            >
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-xs text-[var(--color-text-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-accent)] hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-accent)] hover:underline"
                  >
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
