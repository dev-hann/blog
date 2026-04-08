/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";

export default function NoScriptFallback() {
  return (
    <noscript data-noscript="true">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .noscript-fallback {
              padding: 2rem;
              color: var(--color-text-muted);
              background: var(--color-bg-primary);
              min-height: 100vh;
            }
            .noscript-fallback h2 {
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 1rem;
              color: var(--color-text-primary);
            }
            .noscript-fallback a {
              display: block;
              margin: 0.5rem 0;
              color: var(--color-accent);
            }
          `,
        }}
      />
      <div className="noscript-fallback">
        <h2>Blog</h2>
        <nav>
          <a href="/posts">Posts</a>
          <a href="/tags">Tags</a>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
          <a href="/search">Search</a>
        </nav>
      </div>
    </noscript>
  );
}
