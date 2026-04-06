"use client";

import { useState, useRef, useEffect } from "react";

interface CommandInputProps {
  onSubmit: (command: string) => void;
  history: string[];
  historyIndex: number;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
}

export default function CommandInput({
  onSubmit,
  history,
  historyIndex,
  onHistoryUp,
  onHistoryDown,
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
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="command-input-line" onClick={handleClick}>
      <span className="text-[var(--color-prompt)]">$ </span>
      <input
        ref={inputRef}
        type="text"
        className="command-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
