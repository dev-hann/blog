import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg-primary)]">
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">hann@blog: ~</span>
      </div>
      <div className="terminal-body">
        <div className="space-y-2">
          <Skeleton data-testid="terminal-line" className="h-4 w-72" />
          <Skeleton data-testid="terminal-line" className="h-4 w-96" />
          <Skeleton data-testid="terminal-line" className="h-4 w-64" />
          <Skeleton data-testid="terminal-line" className="h-4 w-48" />
        </div>
        <div className="mt-4 flex items-center gap-0">
          <span className="text-[var(--color-prompt)]">$ </span>
          <Skeleton data-testid="terminal-prompt" className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
