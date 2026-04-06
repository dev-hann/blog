import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import PostBody from "@/components/post/PostBody";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
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

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <time className="text-sm text-[var(--color-text-muted)]">
            {formatDate(post.date)}
          </time>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <PostBody content={post.content} />
    </article>
  );
}
