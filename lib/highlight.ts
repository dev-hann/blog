export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
