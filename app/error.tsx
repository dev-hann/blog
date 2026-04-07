"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center bg-[var(--color-bg-primary)] px-4 py-24">
      <h1 className="text-6xl font-bold text-[var(--color-text-primary)]">Oops</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Something went wrong.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-[var(--color-accent)] px-6 py-2 text-sm text-[var(--color-bg-primary)] transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Try again
      </button>
    </div>
  );
}
