export const SITE_CONFIG = {
  name: "Blog",
  description: "개인 기술 블로그",
  url: "https://blog.dev",
  author: "hann",
  github: "https://github.com/hann",
  postsPerPage: 10,
} as const;

export const ERROR_MESSAGES = {
  POST_NOT_FOUND: (slug: string) => `Post not found: ${slug}`,
} as const;
