import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generateMetadata({ title, description, path, image }: MetaOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? `${SITE_CONFIG.url}/og-default.svg`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
