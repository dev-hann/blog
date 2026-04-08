"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
}

export default function MDXImage({ src, alt = "", width, height, caption, priority }: ImageProps) {
  const [error, setError] = useState(false);

  if (!src) return null;

  if (error) {
    return (
      <figure className="my-4">
        <div data-img-error className="flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-8 text-sm text-[var(--color-text-muted)]">
          {alt || "Image failed to load"}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-4">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 450}
        sizes="100vw"
        priority={priority}
        onError={() => setError(true)}
        className="w-full h-auto rounded-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
