export function formatDate(dateStr: string): string {
  const normalized = dateStr.split("T")[0];
  const parts = normalized.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  if (!y || !m || !d) return dateStr;
  return `${y}년 ${m}월 ${d}일`;
}
