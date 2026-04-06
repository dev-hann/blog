import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, extractHeadings } from "@/lib/posts";
import PostBody from "@/components/post/PostBody";
import TableOfContents from "@/components/post/TableOfContents";
import Giscus from "@/components/comment/Giscus";
import TagBadge from "@/components/tag/TagBadge";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
    return null;
  }

  const headings = extractHeadings(post.content);

  return (
    <article>
      <header className="mb-8">
        <p className="font-mono text-[var(--color-prompt)]">
          $ <span className="text-[var(--color-text-primary)]">cat ~/posts/{slug}.mdx</span>
        </p>

        <div className="mt-4 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 font-mono text-sm">
          <p className="text-[var(--color-text-muted)]">---</p>
          <p>
            <span className="text-[var(--color-text-muted)]">title:</span>{" "}
            <span className="text-[var(--color-text-primary)]">{post.title}</span>
          </p>
          <p>
            <span className="text-[var(--color-text-muted)]">date:</span>{" "}
            <span className="text-[var(--color-text-primary)]">{formatDate(post.date)}</span>
          </p>
          <p>
            <span className="text-[var(--color-text-muted)]">tags:</span>{" "}
            <span className="text-[var(--color-text-primary)]">
              [{post.tags.join(", ")}]
            </span>
          </p>
          <p className="text-[var(--color-text-muted)]">---</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <div className="lg:flex lg:gap-8">
        <div className="min-w-0 flex-1">
          <PostBody content={post.content} />
        </div>
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      <Giscus />
    </article>
  );
}
