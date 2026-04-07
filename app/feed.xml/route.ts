import { getAllPosts } from "@/lib/posts";
import { generateRSS } from "@/lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const xml = generateRSS(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
