"use client";

import { useState, useRef, Children, isValidElement } from "react";

interface PreProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

function getLanguage(children: React.ReactNode): string | null {
  const child = Children.toArray(children).find(isValidElement);
  if (!child) return null;
  const className = (child.props as { className?: string })?.className ?? "";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : null;
}

export default function Pre({ children, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const lang = getLanguage(children);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {lang && (
        <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)] opacity-60">
          {lang}
        </span>
      )}
      <pre
        ref={preRef}
        className={`overflow-x-auto rounded-lg bg-[var(--color-bg-tertiary)] p-4 text-sm${lang ? " pt-8" : ""}`}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-[var(--color-bg-secondary)] px-2 py-1 text-xs text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
