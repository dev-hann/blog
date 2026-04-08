"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" aria-labelledby="error-heading" className="flex flex-col items-center justify-center bg-[var(--color-bg-primary)] px-4 py-24">
      <h1 id="error-heading" className="text-6xl font-bold text-[var(--color-text-primary)]">Oops</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        {error.message || "Something went wrong."}
      </p>
      <Button variant="primary" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
