import { SITE_CONFIG } from "@/lib/constants";

interface MetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export default function Meta({ title, description, path, image }: MetaProps) {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? `${SITE_CONFIG.url}/og-default.png`;

  return (
    <head>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={url} />
    </head>
  );
}
