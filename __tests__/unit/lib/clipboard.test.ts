import { describe, it, expect, vi, beforeEach } from "vitest";
import { copyToClipboard } from "@/lib/clipboard";

const mockWriteText = vi.fn();

vi.stubGlobal("navigator", {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe("copyToClipboard", () => {
  beforeEach(() => {
    mockWriteText.mockReset();
  });

  it("copies text to clipboard successfully", async () => {
    mockWriteText.mockResolvedValue(undefined);

    await copyToClipboard("test text");

    expect(mockWriteText).toHaveBeenCalledWith("test text");
  });

  it("throws error when clipboard write fails", async () => {
    mockWriteText.mockRejectedValue(new Error("Clipboard error"));

    await expect(copyToClipboard("test text")).rejects.toThrow("Clipboard error");
  });
});
