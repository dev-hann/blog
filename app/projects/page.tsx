import { SITE_CONFIG } from "@/lib/constants";

const projects = [
  {
    name: "Blog",
    description: "Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    github: "https://github.com/hann",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-accent)]"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {project.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
