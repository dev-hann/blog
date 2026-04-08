"use client";

import { useState, useRef, Children, isValidElement, useEffect } from "react";
import { copyToClipboard } from "@/lib/clipboard";

type PreProps = React.ComponentProps<"pre"> & {
  children: React.ReactNode;
  htmlOnly?: boolean;
};

function getLanguage(children: React.ReactNode): string | null {
  const child = Children.toArray(children).find(isValidElement);
  if (!child) return null;
  const className = (child.props as { className?: string })?.className ?? "";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : null;
}

export default function Pre({ children, htmlOnly = false, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lang = htmlOnly ? null : getLanguage(children);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      if (failedTimeoutRef.current) clearTimeout(failedTimeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (htmlOnly) return;
    const text = preRef.current?.textContent ?? "";
    try {
      await copyToClipboard(text);
      setFailed(false);
      setCopied(true);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
      if (failedTimeoutRef.current) clearTimeout(failedTimeoutRef.current);
      failedTimeoutRef.current = setTimeout(() => setFailed(false), 2000);
    }
  };

  if (htmlOnly) {
    return (
      <pre
        className="overflow-x-auto rounded-lg bg-[var(--color-bg-tertiary)] p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    );
  }

  return (
    <div className="group relative">
      {lang && (
        <span className="absolute left-3 top-2 text-xs text-[var(--color-text-muted)] opacity-60" aria-label={`Language: ${lang}`}>
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
        className="absolute right-2 top-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded bg-[var(--color-bg-secondary)] px-2 py-1 text-xs text-[var(--color-text-muted)] sm:opacity-0 transition-opacity sm:group-hover:opacity-100 focus-visible:opacity-100"
        aria-label={copied ? "Code copied" : failed ? "Copy failed" : "Copy code"}
      >
        {copied ? "Copied" : failed ? "Failed" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied" : failed ? "Copy failed" : ""}
      </span>
    </div>
  );
}
