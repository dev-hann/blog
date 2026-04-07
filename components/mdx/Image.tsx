import Image from "next/image";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export default function MDXImage({ src, alt = "", width, height, caption }: ImageProps) {
  if (!src) return null;

  return (
    <figure className="my-4">
      <Image
        src={src}
        alt={alt}
        width={width ?? 800}
        height={height ?? 450}
        sizes="100vw"
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
