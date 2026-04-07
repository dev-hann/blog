import type { Post } from "@/types/post";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "mdx" | "html";
  content: string;
}

export interface CommandContext {
  posts: Post[];
  tags: Record<string, number>;
  postHtml?: Record<string, string>;
}

export interface CommandResult {
  lines: TerminalLine[];
}

export type CommandHandler = (
  args: string[],
  context: CommandContext
) => CommandResult | Promise<CommandResult>;
