import { MDXRemote } from "next-mdx-remote/rsc";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";

const components = {
  a: CustomLink,
  pre: Pre,
};

export function renderMDX(source: string) {
  return <MDXRemote source={source} components={components} />;
}
