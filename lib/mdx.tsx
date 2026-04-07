import { MDXRemote } from "next-mdx-remote/rsc";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";

const components = {
  a: CustomLink,
  pre: Pre,
};

export function renderMDX(
  source: string,
  overrides?: Record<string, React.ComponentType<Record<string, unknown>>>
) {
  return (
    <MDXRemote source={source} components={{ ...components, ...overrides }} />
  );
}
