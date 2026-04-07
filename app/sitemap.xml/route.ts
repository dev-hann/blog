import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages = [
    { url: SITE_CONFIG.url, lastmod: new Date().toISOString(), changefreq: "daily", priority: "1.0" },
    { url: `${SITE_CONFIG.url}/posts`, lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.9" },
    { url: `${SITE_CONFIG.url}/about`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.5" },
    { url: `${SITE_CONFIG.url}/projects`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.5" },
    { url: `${SITE_CONFIG.url}/search`, lastmod: new Date().toISOString(), changefreq: "yearly", priority: "0.3" },
    { url: `${SITE_CONFIG.url}/tags`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: "0.7" },
  ];

  const postPages = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/posts/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: "weekly",
    priority: "0.8",
  }));

  const tagPages = Object.keys(tags).map((tag) => ({
    url: `${SITE_CONFIG.url}/tags/${tag}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "0.6",
  }));

  const allPages = [...staticPages, ...postPages, ...tagPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
