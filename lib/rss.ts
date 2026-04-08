import { SITE_CONFIG } from "@/lib/constants";
import type { Post } from "@/types/post";
import { escapeHtml as escapeXml } from "@/lib/utils";

export function generateRSS(posts: Post[]): string {
  const items = posts.slice(0, 20)
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_CONFIG.url}/posts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/posts/${post.slug}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>${SITE_CONFIG.language}</language>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
