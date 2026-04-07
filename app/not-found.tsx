import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-primary)] px-4">
      <h1 className="text-6xl font-bold text-[var(--color-text-primary)]">404</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Page not found.
      </p>
      <Link
        href="/"
        className="mt-6 rounded bg-[var(--color-accent)] px-6 py-2 text-sm text-[var(--color-bg-primary)] transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Go Home
      </Link>
    </main>
  );
}
