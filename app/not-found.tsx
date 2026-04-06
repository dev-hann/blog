import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 py-16 font-mono">
      <p className="text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">cd ~/unknown-page</span>
      </p>
      <p className="text-sm text-[var(--color-text-muted)]">
        bash: no such file or directory: ~/unknown-page
      </p>
      <p className="mt-4 text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">cd ~/</span>
      </p>
      <Link
        href="/"
        className="text-sm text-[var(--color-text-accent)] hover:underline"
      >
        Go to home
      </Link>
    </div>
  );
}
