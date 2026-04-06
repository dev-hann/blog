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

export default function Terminal({ posts, tags }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      { id: genId(), type: "output", content: `Welcome to ${SITE_CONFIG.author}'s blog terminal v1.0` },
      { id: genId(), type: "output", content: `Type 'help' for available commands.` },
      { id: genId(), type: "output", content: "" },
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

      const result = executeCommand(input, { posts, tags }, history);
      setLines((prev) => [...prev, inputLine, ...result.lines]);
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
