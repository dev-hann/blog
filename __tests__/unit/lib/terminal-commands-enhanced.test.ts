import { describe, it, expect } from "vitest";
import { executeCommand } from "@/lib/terminal/commands";
import type { CommandContext } from "@/lib/terminal/types";

const mockContext: CommandContext = {
  posts: [
    {
      slug: "test-post",
      title: "Test Post",
      date: "2026-04-01",
      tags: ["nextjs"],
      summary: "A test post",
      draft: false,
    },
  ],
  tags: { nextjs: 1 },
};

describe("Terminal Commands - Enhanced Error Handling", () => {
  it("provides helpful error for grep with empty query", async () => {
    const result = await executeCommand("grep ", mockContext, []);
    expect(result.lines[0].type).toBe("error");
    expect(result.lines[0].content).toContain("Usage");
  });

  it("provides helpful error for grep with only whitespace", async () => {
    const result = await executeCommand("grep   ", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("provides helpful error for echo without message", async () => {
    const result = await executeCommand("echo", mockContext, []);
    expect(result.lines[0].content).toBe("");
  });

  it("provides helpful error for multiple arguments to cat", async () => {
    const result = await executeCommand("cat post1 post2", mockContext, []);
    expect(result.lines[0].type).toBe("error");
    expect(result.lines[0].content).toContain("Usage");
  });

  it("provides helpful error for tag with only whitespace", async () => {
    const result = await executeCommand("tag   ", mockContext, []);
    expect(result.lines[0].type).toBe("error");
    expect(result.lines[0].content).toContain("Usage");
  });
});
