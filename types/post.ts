export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  draft?: boolean;
}

export interface PostDetail extends Post {
  content: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export type PostHtmlMap = Record<string, string>;
