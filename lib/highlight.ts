import { escapeHtml } from "@/lib/utils";

export function highlightText(text: string, query: string): string {
  const escaped = escapeHtml(text);
  if (!query.trim()) return escaped;

  const regex = new RegExp(`(${escapeRegex(escapeHtml(query))})`, "gi");
  return escaped.replace(regex, "<mark>$1</mark>");
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
