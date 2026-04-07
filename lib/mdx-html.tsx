import { prerenderToNodeStream } from "react-dom/static";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import Callout from "@/components/mdx/Callout";
import MDXImage from "@/components/mdx/Image";

function ServerPre({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-[var(--color-bg-tertiary)] p-4 text-sm" {...props}>
      {children}
    </pre>
  );
}

function ServerLink({ href, children, ...props }: { href?: string; children: React.ReactNode; [key: string]: unknown }) {
  if (!href) return <span {...props}>{children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

const components = {
  a: ServerLink,
  pre: ServerPre,
  Callout,
  Image: MDXImage,
};

export async function renderMDXToHTML(source: string): Promise<string> {
  const { content } = await compileMDX({
    source,
    components,
    options: { mdxOptions: { rehypePlugins: [rehypeSlug] } },
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
