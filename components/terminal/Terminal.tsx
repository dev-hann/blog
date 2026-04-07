"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CommandInput from "./CommandInput";
import OutputRenderer from "./OutputRenderer";
import type { TerminalLine } from "@/lib/terminal/types";
import { executeCommand } from "@/lib/terminal/commands";
import { SITE_CONFIG } from "@/lib/constants";
import type { Post } from "@/types/post";

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

interface TerminalProps {
  posts: Post[];
  tags: Record<string, number>;
}

function createWelcomeLines(): TerminalLine[] {
  return [
    { id: genId(), type: "output", content: `Welcome to ${SITE_CONFIG.author}'s blog terminal v1.0` },
    { id: genId(), type: "output", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
    { id: genId(), type: "output", content: `Type 'help' for available commands.` },
    { id: genId(), type: "output", content: "" },
  ];
}

export default function Terminal({ posts, tags }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(createWelcomeLines);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completions, setCompletions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slugs = posts.map((p) => p.slug);
  const tagNames = Object.keys(tags);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, completions]);

  const execute = useCallback(
    async (rawInput: string) => {
      const input = rawInput.trim();
      setCompletions([]);

      if (!input) return;

      const inputLine: TerminalLine = {
        id: genId(),
        type: "input",
        content: input,
      };

      if (input === "clear") {
        setLines([]);
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        return;
      }

      setIsProcessing(true);
      setLines((prev) => [...prev, inputLine]);
      const result = await executeCommand(input, { posts, tags }, history);
      setIsProcessing(false);

      setLines((prev) => [...prev, ...result.lines]);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
    },
    [posts, tags, history]
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

  const handleShowCompletions = useCallback((items: string[]) => {
    setCompletions(items);
  }, []);

  const handleBodyClick = () => {
    const input = scrollRef.current?.querySelector(".command-input") as HTMLInputElement | null;
    input?.focus();
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--color-bg-primary)]">
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">hann@blog: ~</span>
      </div>
      <div className="terminal-body" ref={scrollRef} onClick={handleBodyClick}>
        {lines.map((line) => (
          <OutputRenderer key={line.id} line={line} />
        ))}
        {completions.length > 0 && (
          <div className="output-line output-muted">
            {completions.join("  ")}
          </div>
        )}
        <CommandInput
          onSubmit={execute}
          history={history}
          historyIndex={historyIndex}
          onHistoryUp={handleHistoryUp}
          onHistoryDown={handleHistoryDown}
          onShowCompletions={handleShowCompletions}
          slugs={slugs}
          tagNames={tagNames}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
}
