import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";
import Callout from "@/components/mdx/Callout";
import MDXImage from "@/components/mdx/Image";

const components = {
  a: CustomLink,
  pre: Pre,
  Callout,
  Image: MDXImage,
  img: ({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: unknown }) => (
    <MDXImage src={src} alt={alt} {...(props as Record<string, unknown>)} />
  ),
};

export function renderMDX(
  source: string,
  overrides?: Record<string, React.ComponentType<Record<string, unknown>>>
) {
  return (
    <MDXRemote
      source={source}
      components={{ ...components, ...overrides }}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: "github-dark" }],
          ],
        },
      }}
    />
  );
}
