"use client";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { COMMAND_LIST, getCompletions } from "@/lib/terminal/commands";

interface CommandInputProps {
  onSubmit: (command: string) => void;
  history: string[];
  historyIndex: number;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onShowCompletions: (completions: string[]) => void;
  slugs: string[];
  tagNames: string[];
  disabled?: boolean;
}

function CommandInput({
  onSubmit,
  history,
  historyIndex,
  onHistoryUp,
  onHistoryDown,
  onShowCompletions,
  slugs,
  tagNames,
  disabled,
}: CommandInputProps) {
  const [typedInput, setTypedInput] = useState("");
  const savedInputRef = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const displayValue =
    historyIndex >= 0 && historyIndex < history.length
      ? history[history.length - 1 - historyIndex]
      : typedInput;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const el = e.target as HTMLInputElement;
      const value = el.value;
      setTypedInput("");
      savedInputRef.current = "";
      onSubmit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex === -1) {
        savedInputRef.current = (e.target as HTMLInputElement).value;
      }
      onHistoryUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onHistoryDown();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = (e.target as HTMLInputElement).value;
      const available = getCompletions(currentInput, COMMAND_LIST, slugs, tagNames);
      const parts = currentInput.split(/\s+/);
      if (available.length === 1) {
        const completed = parts.length === 1
          ? available[0] + " "
          : currentInput.slice(0, currentInput.lastIndexOf(" ") + 1) + available[0] + " ";
        setTypedInput(completed);
        savedInputRef.current = completed;
      } else if (available.length > 1) {
        const commonPrefix = available.reduce((a, b) => {
          let i = 0;
          while (i < a.length && i < b.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        if (commonPrefix && commonPrefix !== parts[parts.length - 1]) {
          const completed = currentInput.slice(0, currentInput.lastIndexOf(" ") + 1) + commonPrefix;
          setTypedInput(completed);
          savedInputRef.current = completed;
        }
        onShowCompletions(available);
      }
    }
  }, [historyIndex, slugs, tagNames, onSubmit, onHistoryUp, onHistoryDown, onShowCompletions]);

  return (
    <div className="command-input-line">
      <span className="text-[var(--color-prompt)]">$ </span>
      <input
        ref={inputRef}
        type="text"
        aria-label="Terminal command input"
        className="command-input"
        value={displayValue}
        onChange={(e) => {
          setTypedInput(e.target.value);
          savedInputRef.current = e.target.value;
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus
      />
    </div>
  );
}

export default React.memo(CommandInput, (prevProps, nextProps) => {
  return prevProps.onSubmit === nextProps.onSubmit &&
         prevProps.history === nextProps.history &&
         prevProps.historyIndex === nextProps.historyIndex &&
         prevProps.onHistoryUp === nextProps.onHistoryUp &&
         prevProps.onHistoryDown === nextProps.onHistoryDown &&
         prevProps.onShowCompletions === nextProps.onShowCompletions &&
         prevProps.slugs === nextProps.slugs &&
         prevProps.tagNames === nextProps.tagNames &&
         prevProps.disabled === nextProps.disabled;
});
