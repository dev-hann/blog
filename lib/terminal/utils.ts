import { escapeHtml } from "@/lib/utils";

let idCounter = 0;

export function genId(): string {
  idCounter += 1;
  return Date.now().toString(36) + "-" + idCounter.toString(36);
}

export function _resetIdCounter(): void {
  idCounter = 0;
}

export { escapeHtml };
