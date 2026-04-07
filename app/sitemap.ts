import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_CONFIG.url, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_CONFIG.url}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_CONFIG.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_CONFIG.url}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_CONFIG.url}/search`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_CONFIG.url}/tags`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tagPages: MetadataRoute.Sitemap = Object.keys(tags).map((tag) => ({
    url: `${SITE_CONFIG.url}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}
