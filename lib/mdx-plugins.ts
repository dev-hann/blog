import type { Pluggable } from "unified";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export const rehypePlugins: Pluggable[] = [
  rehypeSlug,
  [rehypePrettyCode, { theme: "github-dark" }],
];
