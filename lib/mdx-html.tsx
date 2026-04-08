import { prerenderToNodeStream } from "react-dom/static";
import { compileMDX } from "next-mdx-remote/rsc";
import type { MdxComponentProps, MdxLinkProps } from "@/types/mdx";
import Pre from "@/components/mdx/Pre";
import CustomLink from "@/components/mdx/CustomLink";
import Callout from "@/components/mdx/Callout";
import MDXImage from "@/components/mdx/Image";
import { rehypePlugins } from "@/lib/mdx-plugins";

const components = {
  a: ({ href, children, ...props }: MdxLinkProps) => (
    <CustomLink href={href} htmlOnly {...props}>{children}</CustomLink>
  ),
  pre: ({ children, ...props }: MdxComponentProps) => <Pre htmlOnly {...props}>{children}</Pre>,
  Callout,
  Image: MDXImage,
};

export async function renderMDXToHTML(source: string): Promise<string> {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        rehypePlugins,
      },
    },
  });
  const { prelude } = await prerenderToNodeStream(content);

  return new Promise<string>((resolve, reject) => {
    let html = "";
    prelude.on("data", (chunk: Buffer) => {
      html += chunk.toString();
    });
    prelude.on("end", () => resolve(html));
    prelude.on("error", reject);
  });
}
