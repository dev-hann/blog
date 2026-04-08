import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostDetail, Heading } from "@/types/post";
import { ERROR_MESSAGES } from "@/lib/constants";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function isValidDate(dateString: string): boolean {
  if (!dateString || typeof dateString !== "string") return false;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  
  return dateString.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/) !== null;
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFrontmatter(slug: string, data: Record<string, unknown>): Omit<Post, 'content'> {
  return {
    slug,
    title: (data.title as string) ?? "",
    date: (data.date as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    summary: (data.summary as string) ?? "",
    draft: (data.draft as boolean) ?? false,
  };
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf-8");
  const { data } = matter(raw);
  return parseFrontmatter(slug, data);
}

export function getAllPosts(): Post[] {
  return getMdxFiles()
    .map(parsePost)
    .filter((p) => !p.draft && isValidDate(p.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): PostDetail {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(POSTS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(ERROR_MESSAGES.POST_NOT_FOUND(slug));
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    ...parseFrontmatter(slug, data),
    content,
  };
}

export function getAllTags(): Record<string, number> {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  return tagCounts;
}

export function extractHeadings(content: string): Heading[] {
  const stripped = content.replace(/```[\s\S]*?```/g, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const usedIds: Record<string, number> = {};
  let match;
  while ((match = headingRegex.exec(stripped)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/\s+#+\s*$/, "");
    const baseId = text
      .toLowerCase()
      .replace(/[^\w\s가-힣-]/g, "")
      .replace(/\s+/g, "-");
    const count = usedIds[baseId] ?? 0;
    usedIds[baseId] = count + 1;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    headings.push({ id, text, level });
  }
  return headings;
}

export function getAdjacentPosts(
  slug: string
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
