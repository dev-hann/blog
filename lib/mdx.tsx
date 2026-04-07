import { MDXRemote } from "next-mdx-remote/rsc";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";
import Callout from "@/components/mdx/Callout";
import MDXImage from "@/components/mdx/Image";

const components = {
  a: CustomLink,
  pre: Pre,
  Callout,
  Image: MDXImage,
};

export function renderMDX(
  source: string,
  overrides?: Record<string, React.ComponentType<Record<string, unknown>>>
) {
  return (
    <MDXRemote source={source} components={{ ...components, ...overrides }} />
  );
}
