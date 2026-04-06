import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-7xl font-bold text-[var(--color-text-primary)]">404</h1>
      <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
