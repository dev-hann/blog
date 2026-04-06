"use client";

import { useState, useRef, useEffect } from "react";

interface CommandInputProps {
  onSubmit: (command: string) => void;
  history: string[];
  historyIndex: number;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onShowCompletions: (completions: string[]) => void;
  completions: string[];
  slugs: string[];
  tagNames: string[];
  disabled?: boolean;
}

const COMMAND_LIST = [
  "help", "ls", "cat", "tags", "tag", "about", "projects",
  "grep", "whoami", "neofetch", "date", "echo", "history", "clear",
];

function getCompletions(
  input: string,
  commands: string[],
  slugs: string[],
  tags: string[]
): string[] {
  const parts = input.split(/\s+/);

  if (parts.length === 1) {
    return commands.filter((cmd) => cmd.startsWith(parts[0]));
  }

  if (parts[0] === "cat" && parts.length === 2) {
    return slugs.filter((s) => s.startsWith(parts[1]));
  }

  if (parts[0] === "tag" && parts.length === 2) {
    return tags.filter((t) => t.startsWith(parts[1]));
  }

  return [];
}

export default function CommandInput({
  onSubmit,
  history,
  historyIndex,
  onHistoryUp,
  onHistoryDown,
  onShowCompletions,
  completions,
  slugs,
  tagNames,
  disabled,
}: CommandInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (historyIndex === -1) {
      setInput("");
    } else if (historyIndex >= 0 && historyIndex < history.length) {
      setInput(history[history.length - 1 - historyIndex]);
    }
  }, [historyIndex, history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = input;
      setInput("");
      onSubmit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onHistoryUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onHistoryDown();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = getCompletions(input, COMMAND_LIST, slugs, tagNames);
      if (available.length === 1) {
        setInput(available[0] + " ");
      } else if (available.length > 1) {
        onShowCompletions(available);
      }
    }
  };

  return (
    <div className="command-input-line">
      <span className="text-[var(--color-prompt)]">$ </span>
      <input
        ref={inputRef}
        type="text"
        className="command-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus
      />
    </div>
  );
}
