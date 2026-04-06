const projects = [
  {
    name: "Blog",
    description: "Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그",
    stack: ["nextjs", "typescript", "tailwindcss", "mdx"],
    github: "https://github.com/hann",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">ls -la ~/projects</span>
      </p>

      <div className="flex flex-col gap-2 font-mono text-sm">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex flex-col gap-1 border-b border-[var(--color-border)] pb-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-text-muted)]">drwxr-xr-x</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-accent)] hover:underline"
              >
                {project.name}/
              </a>
              <span className="text-[var(--color-text-secondary)]">
                {project.description}
              </span>
            </div>
            <div className="flex gap-1.5 pl-[7.5rem]">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs text-[var(--color-text-accent)]"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
