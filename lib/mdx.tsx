import { MDXRemote } from "next-mdx-remote/rsc";
import type { MdxImgProps } from "@/types/mdx";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";
import Callout from "@/components/mdx/Callout";
import MDXImage from "@/components/mdx/Image";
import { rehypePlugins } from "@/lib/mdx-plugins";

const components = {
  a: CustomLink,
  pre: Pre,
  Callout,
  Image: MDXImage,
  img: ({ src, alt, width, height, caption }: MdxImgProps) => (
    <MDXImage src={src} alt={alt} width={width} height={height} caption={caption} />
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
          rehypePlugins,
        },
      }}
    />
  );
}
