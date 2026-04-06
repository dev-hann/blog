import { getAllPosts } from "@/lib/posts";
import PostListItem from "@/components/post/PostListItem";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-2">
        <p className="font-mono text-[var(--color-prompt)]">
          $ <span className="text-[var(--color-text-primary)]">whoami</span>
        </p>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
          {SITE_CONFIG.author} — developer &amp; writer
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          &gt; {SITE_CONFIG.description}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <p className="font-mono text-[var(--color-prompt)]">
          $ <span className="text-[var(--color-text-primary)]">ls -t ~/posts | head -5</span>
        </p>
        <div className="flex flex-col">
          {posts.map((post) => (
            <PostListItem key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
