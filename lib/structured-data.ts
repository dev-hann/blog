export type JsonLdData = Record<string, unknown>;

export function generateJsonLd(data: JsonLdData): string {
  return JSON.stringify(data);
}
