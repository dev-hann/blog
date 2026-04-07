"use client";

import { useState, useEffect } from "react";

const THRESHOLD = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > THRESHOLD);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] shadow-lg transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      ↑
    </button>
  );
}
