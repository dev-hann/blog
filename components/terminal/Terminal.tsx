"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CommandInput from "./CommandInput";
import OutputRenderer from "./OutputRenderer";
import type { TerminalLine, CommandContext, CommandResult } from "@/lib/terminal/types";
import { SITE_CONFIG } from "@/lib/constants";
import type { Post } from "@/types/post";

function helpCommand(): CommandResult {
  const lines: TerminalLine[] = [
    { id: crypto.randomUUID(), type: "output", content: `Available commands:` },
    { id: crypto.randomUUID(), type: "output", content: `  help     Show this help message` },
    { id: crypto.randomUUID(), type: "output", content: `  ls       List all posts` },
    { id: crypto.randomUUID(), type: "output", content: `  clear    Clear the terminal` },
    { id: crypto.randomUUID(), type: "output", content: `  about    About me` },
    { id: crypto.randomUUID(), type: "output", content: `  date     Show current date` },
    { id: crypto.randomUUID(), type: "output", content: `  echo     Echo arguments` },
    { id: crypto.randomUUID(), type: "output", content: `  whoami   Who am I?` },
    { id: crypto.randomUUID(), type: "output", content: `` },
  ];
  return { lines };
}

function lsCommand(context: CommandContext): CommandResult {
  if (context.posts.length === 0) {
    return { lines: [{ id: crypto.randomUUID(), type: "output", content: "No posts found." }] };
  }
  const lines: TerminalLine[] = context.posts.map((post) => ({
    id: crypto.randomUUID(),
    type: "output",
    content: `  ${post.date}\t<span class="output-accent">${post.title}</span>\t<span class="output-muted">${post.tags.join(", ")}</span>`,
  }));
  return { lines };
}

function aboutCommand(): CommandResult {
  return {
    lines: [
      { id: crypto.randomUUID(), type: "output", content: `<span class="output-accent">${SITE_CONFIG.author}</span> — developer & writer` },
      { id: crypto.randomUUID(), type: "output", content: `${SITE_CONFIG.description}` },
      { id: crypto.randomUUID(), type: "output", content: `GitHub: <a href="${SITE_CONFIG.github}" target="_blank" rel="noopener">${SITE_CONFIG.github}</a>` },
    ],
  };
}

function dateCommand(): CommandResult {
  return {
    lines: [
      { id: crypto.randomUUID(), type: "output", content: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }) },
    ],
  };
}

function echoCommand(args: string[]): CommandResult {
  return {
    lines: [{ id: crypto.randomUUID(), type: "output", content: args.join(" ") }],
  };
}

function whoamiCommand(): CommandResult {
  return {
    lines: [{ id: crypto.randomUUID(), type: "output", content: SITE_CONFIG.author }],
  };
}

interface TerminalProps {
  posts: Post[];
  tags: Record<string, number>;
}

export default function Terminal({ posts, tags }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const context: CommandContext = { posts, tags };

  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      { id: crypto.randomUUID(), type: "output", content: `Welcome to ${SITE_CONFIG.author}'s blog terminal v1.0` },
      { id: crypto.randomUUID(), type: "output", content: `Type 'help' for available commands.` },
      { id: crypto.randomUUID(), type: "output", content: `` },
    ];
    setLines(welcomeLines);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const execute = useCallback(
    (rawInput: string) => {
      const input = rawInput.trim();
      if (!input) return;

      const inputLine: TerminalLine = {
        id: crypto.randomUUID(),
        type: "input",
        content: input,
      };

      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);

      const parts = input.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      let result: CommandResult;
      switch (cmd) {
        case "help":
          result = helpCommand();
          break;
        case "ls":
          result = lsCommand(context);
          break;
        case "about":
          result = aboutCommand();
          break;
        case "date":
          result = dateCommand();
          break;
        case "echo":
          result = echoCommand(args);
          break;
        case "whoami":
          result = whoamiCommand();
          break;
        default:
          result = {
            lines: [
              {
                id: crypto.randomUUID(),
                type: "error",
                content: `command not found: ${cmd}. Type 'help' for available commands.`,
              },
            ],
          };
      }

      setLines((prev) => [...prev, inputLine, ...result.lines]);
    },
    [context]
  );

  const handleHistoryUp = useCallback(() => {
    if (history.length === 0) return;
    setHistoryIndex((prev) => {
      if (prev < history.length - 1) return prev + 1;
      return prev;
    });
  }, [history]);

  const handleHistoryDown = useCallback(() => {
    setHistoryIndex((prev) => {
      if (prev > 0) return prev - 1;
      return -1;
    });
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg-primary)]">
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">hann@blog: ~</span>
      </div>
      <div className="terminal-body" ref={scrollRef}>
        {lines.map((line) => (
          <OutputRenderer key={line.id} line={line} />
        ))}
        <CommandInput
          onSubmit={execute}
          history={history}
          historyIndex={historyIndex}
          onHistoryUp={handleHistoryUp}
          onHistoryDown={handleHistoryDown}
        />
      </div>
    </div>
  );
}
