const WORDS_PER_MINUTE = 200;
const CJK_CHARS_PER_MINUTE = 500;

const CJK_RANGE = /[\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/;

export function calculateReadingTime(content: string): number {
  if (!content || content.trim().length === 0) return 1;

  const stripped = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]*>/g, "");

  let cjkCount = 0;
  let wordCount = 0;

  const chars = [...stripped];
  for (const ch of chars) {
    if (CJK_RANGE.test(ch)) {
      cjkCount++;
    }
  }

  const withoutCjk = stripped.replace(/[\u4e00-\u9fff\uac00-\ud7af\u3040-\u309f\u30a0-\u30ff]/g, " ");
  const words = withoutCjk.split(/\s+/).filter((w) => w.length > 0);
  wordCount = words.length;

  const minutes = Math.ceil(
    wordCount / WORDS_PER_MINUTE + cjkCount / CJK_CHARS_PER_MINUTE
  );

  return Math.max(1, minutes);
}
