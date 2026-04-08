import React from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/structured-data";
import type { Project } from "@/types/project";
import TagBadge from "@/components/tag/TagBadge";
import PageContainer from "@/components/ui/PageContainer";
import projectsData from "@/content/projects.json";

export const metadata = generateMetadata({
  title: "Projects",
  description: "Projects by " + SITE_CONFIG.author,
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = projectsData as Project[];
  const projectUrl = `${SITE_CONFIG.url}/projects`;

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLd({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Projects",
            description: "Projects by " + SITE_CONFIG.author,
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: project.name,
                description: project.description,
                applicationCategory: project.tags.join(", "),
                url: project.github || project.demo,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Projects",
            description: "Projects by " + SITE_CONFIG.author,
            url: projectUrl,
          }),
        }}
      />
      <h1 id="projects-heading" className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        Projects
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            aria-labelledby={`project-${project.name}`}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
          >
            <h2 id={`project-${project.name}`} className="text-lg font-semibold text-[var(--color-text-primary)]">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
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
                  GitHub<span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-text-accent)] hover:underline"
                >
                  Demo<span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
