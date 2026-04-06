import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post/PostCard";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {SITE_CONFIG.name}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          {SITE_CONFIG.description}
        </p>
        <nav className="flex gap-4">
          <Link
            href="/posts"
            className="text-sm text-[var(--color-text-accent)] hover:underline"
          >
            포스트
          </Link>
          <Link
            href="/tags"
            className="text-sm text-[var(--color-text-accent)] hover:underline"
          >
            태그
          </Link>
        </nav>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
          최신 포스트
        </h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
