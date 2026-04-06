import type { CommandContext, CommandResult, TerminalLine } from "./types";
import { SITE_CONFIG } from "@/lib/constants";

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function line(type: TerminalLine["type"], content: string): TerminalLine {
  return { id: genId(), type, content };
}

function out(content: string): TerminalLine {
  return line("output", content);
}

function err(content: string): TerminalLine {
  return line("error", content);
}

function formatPostEntry(post: { date: string; title: string; tags: string[] }): string {
  const tagSpans = post.tags.map((t) => `<span class="output-accent">[${t}]</span>`).join(" ");
  return `<span class="output-muted">  ${post.date}</span>  ${post.title}  ${tagSpans}`;
}

function handleHelp(): CommandResult {
  return {
    lines: [
      out("Available commands:"),
      out("  ls          List posts"),
      out("  ls --all    List all posts"),
      out("  cat &lt;slug&gt;  Read a post (e.g., cat sample-post-01)"),
      out("  tags        Show all tags"),
      out("  tag &lt;name&gt;  Filter posts by tag"),
      out("  about       About the author"),
      out("  projects    List projects"),
      out("  grep &lt;q&gt;    Search posts"),
      out("  whoami      Who are you?"),
      out("  neofetch    System info"),
      out("  date        Current date/time"),
      out("  echo &lt;msg&gt;  Echo a message"),
      out("  clear       Clear terminal"),
      out("  history     Show command history"),
      out("  help        Show this help"),
      out(""),
    ],
  };
}

function handleLs(args: string[], context: CommandContext): CommandResult {
  const showAll = args.includes("--all");
  const posts = showAll ? context.posts : context.posts.slice(0, 10);

  if (posts.length === 0) {
    return { lines: [out("No posts found.")] };
  }

  const lines: TerminalLine[] = posts.map((post) => out(formatPostEntry(post)));

  if (!showAll && context.posts.length > 10) {
    lines.push(out(""));
    lines.push(out(`  ... (${context.posts.length - 10} more posts. Use 'ls --all' to see all)`));
  }

  return { lines };
}

function handleCat(args: string[], context: CommandContext): CommandResult {
  const slug = args[0];
  if (!slug) {
    return { lines: [err("Usage: cat <slug>")] };
  }

  const post = context.posts.find((p) => p.slug === slug);
  if (!post) {
    return { lines: [err(`cat: ${slug}: No such post`)] };
  }

  return {
    lines: [
      out(`---`),
      out(`<span class="output-muted">title:</span> ${post.title}`),
      out(`<span class="output-muted">date:</span> ${post.date}`),
      out(`<span class="output-muted">tags:</span> [${post.tags.join(", ")}]`),
      out(`<span class="output-muted">summary:</span> ${post.summary}`),
      out(`---`),
      out(""),
      out(`<span class="output-muted">(Full MDX rendering coming in T3)</span>`),
    ],
  };
}

function handleTags(context: CommandContext): CommandResult {
  const entries = Object.entries(context.tags);
  if (entries.length === 0) {
    return { lines: [out("No tags found.")] };
  }

  const tagStrings = entries.map(([tag, count]) => `${tag} (${count})`);
  return { lines: [out(`  ${tagStrings.join("   ")}`)] };
}

function handleTag(args: string[], context: CommandContext): CommandResult {
  const tagName = args[0];
  if (!tagName) {
    return { lines: [err("Usage: tag <name>")] };
  }

  const filtered = context.posts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tagName.toLowerCase())
  );

  if (filtered.length === 0) {
    return { lines: [err(`tag: no posts found with tag '${tagName}'`)] };
  }

  return { lines: filtered.map((post) => out(formatPostEntry(post))) };
}

function handleAbout(): CommandResult {
  return {
    lines: [
      out(`<span class="output-accent">${SITE_CONFIG.author}</span> — developer &amp; writer`),
      out(""),
      out(`github: <a href="${SITE_CONFIG.github}" target="_blank" rel="noopener">${SITE_CONFIG.github}</a>`),
      out(`blog:   ${SITE_CONFIG.description}`),
    ],
  };
}

function handleProjects(): CommandResult {
  return {
    lines: [
      out(`<span class="output-muted">  drwxr-xr-x</span>  <span class="output-accent">blog/</span>    Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그`),
      out(`                <span class="output-accent">[nextjs]</span> <span class="output-accent">[typescript]</span> <span class="output-accent">[tailwindcss]</span> <span class="output-accent">[mdx]</span>`),
    ],
  };
}

function handleGrep(args: string[], context: CommandContext): CommandResult {
  const query = args[0];
  if (!query) {
    return { lines: [err("Usage: grep <query>")] };
  }

  const lowerQuery = query.toLowerCase();
  const matches = context.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.summary.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );

  if (matches.length === 0) {
    return { lines: [out(`No results found for '${query}'`)] };
  }

  const lines: TerminalLine[] = [out(`${matches.length} result${matches.length > 1 ? "s" : ""} found:`)];
  lines.push(...matches.map((post) => out(formatPostEntry(post))));

  return { lines };
}

function handleWhoami(): CommandResult {
  return {
    lines: [
      out(`<span class="output-accent">${SITE_CONFIG.author}</span> — developer &amp; writer`),
      out(`<span class="output-muted">&gt;</span> ${SITE_CONFIG.description}`),
    ],
  };
}

function handleNeofetch(context: CommandContext): CommandResult {
  const postCount = context.posts.length;
  const tagCount = Object.keys(context.tags).length;

  return {
    lines: [
      out(`<span class="output-accent">        .--.</span>        <span class="output-accent">${SITE_CONFIG.author}@blog</span>`),
      out(`<span class="output-accent">       |o_o |</span>       ----------`),
      out(`<span class="output-accent">       |:_/ |</span>       OS: Next.js 16.2.2`),
      out(`<span class="output-accent">      //   \ \</span>      Framework: React 19`),
      out(`<span class="output-accent">     (|     | )</span>     Styling: Tailwind CSS v4`),
      out(`<span class="output-accent">    /'\_   _/\`</span>\\     Content: MDX`),
      out(`<span class="output-accent">    \___)=(___/</span>     Posts: ${postCount}`),
      out(`                    Tags: ${tagCount}`),
    ],
  };
}

function handleDate(): CommandResult {
  return { lines: [out(new Date().toString())] };
}

function handleEcho(args: string[]): CommandResult {
  return { lines: [out(args.join(" "))] };
}

function handleHistory(history: string[]): CommandResult {
  if (history.length === 0) {
    return { lines: [out("(no history)")] };
  }

  const lines: TerminalLine[] = history.map((cmd, i) =>
    out(`  ${String(i + 1).padStart(4)}  ${cmd}`)
  );

  return { lines };
}

export function executeCommand(
  input: string,
  context: CommandContext,
  history: string[]
): CommandResult {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);

  const commands: Record<string, () => CommandResult> = {
    help: () => handleHelp(),
    ls: () => handleLs(args, context),
    cat: () => handleCat(args, context),
    tags: () => handleTags(context),
    tag: () => handleTag(args, context),
    about: () => handleAbout(),
    projects: () => handleProjects(),
    grep: () => handleGrep(args, context),
    whoami: () => handleWhoami(),
    neofetch: () => handleNeofetch(context),
    date: () => handleDate(),
    echo: () => handleEcho(args),
    history: () => handleHistory(history),
    clear: () => ({ lines: [] }),
  };

  const handler = commands[cmd];
  if (!handler) {
    return {
      lines: [
        err(`bash: ${cmd}: command not found`),
        out("Type 'help' for available commands."),
      ],
    };
  }

  return handler();
}
