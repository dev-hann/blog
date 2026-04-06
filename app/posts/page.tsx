import { getAllPosts } from "@/lib/posts";
import PostListItem from "@/components/post/PostListItem";
import type { Post } from "@/types/post";

export default function PostsPage() {
  const posts = getAllPosts();
  const postsByYear = posts.reduce<Record<number, Post[]>>((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-8">
      <p className="font-mono text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">cat ~/posts</span>
      </p>
      {years.map((year) => (
        <section key={year}>
          <h2 className="year-divider mb-2 pb-2 font-mono text-lg text-[var(--color-text-muted)]">
            ## {year}
          </h2>
          <div className="flex flex-col">
            {postsByYear[year].map((post) => (
              <PostListItem key={post.slug} {...post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
