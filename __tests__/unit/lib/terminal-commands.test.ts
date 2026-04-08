import { describe, it, expect } from "vitest";
import { executeCommand, getCompletions, COMMAND_LIST } from "@/lib/terminal/commands";
import type { CommandContext } from "@/lib/terminal/types";

const mockContext: CommandContext = {
  posts: [
    {
      slug: "test-post-1",
      title: "Test Post 1",
      date: "2026-04-01",
      tags: ["nextjs", "react"],
      summary: "A test post",
      draft: false,
    },
    {
      slug: "test-post-2",
      title: "Test Post 2",
      date: "2026-04-02",
      tags: ["typescript", "javascript"],
      summary: "Another test post",
      draft: false,
    },
  ],
  tags: { nextjs: 1, react: 1, typescript: 1, javascript: 1 },
  postHtml: {},
};

describe("executeCommand", () => {
  it("handles help command", async () => {
    const result = await executeCommand("help", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines[0].content).toContain("Available commands");
  });

  it("handles ls command", async () => {
    const result = await executeCommand("ls", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines[0].content).toContain("Test Post 1");
  });

  it("handles ls --all command", async () => {
    const result = await executeCommand("ls --all", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(1);
    expect(result.lines[1].content).toContain("Test Post 2");
  });

  it("handles cat command with valid slug", async () => {
    const result = await executeCommand("cat test-post-1", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles cat command with invalid slug", async () => {
    const result = await executeCommand("cat invalid-slug", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("handles cat command without slug", async () => {
    const result = await executeCommand("cat", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("handles tags command", async () => {
    const result = await executeCommand("tags", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles tag command with valid tag", async () => {
    const result = await executeCommand("tag nextjs", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
    expect(result.lines[0].content).toContain("Test Post 1");
  });

  it("handles tag command with invalid tag", async () => {
    const result = await executeCommand("tag invalid", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("handles tag command without tag name", async () => {
    const result = await executeCommand("tag", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("handles about command", async () => {
    const result = await executeCommand("about", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles projects command", async () => {
    const result = await executeCommand("projects", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles grep command with valid query", async () => {
    const result = await executeCommand("grep Test", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(1);
  });

  it("handles grep command with invalid query", async () => {
    const result = await executeCommand("grep invalid", mockContext, []);
    expect(result.lines[0].content).toContain("No results");
  });

  it("handles grep command without query", async () => {
    const result = await executeCommand("grep", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("handles whoami command", async () => {
    const result = await executeCommand("whoami", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles neofetch command", async () => {
    const result = await executeCommand("neofetch", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles date command", async () => {
    const result = await executeCommand("date", mockContext, []);
    expect(result.lines.length).toBe(1);
  });

  it("handles echo command", async () => {
    const result = await executeCommand("echo Hello World", mockContext, []);
    expect(result.lines[0].content).toContain("Hello World");
  });

  it("handles links command", async () => {
    const result = await executeCommand("links", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it("handles history command with history", async () => {
    const result = await executeCommand("history", mockContext, ["cmd1", "cmd2"]);
    expect(result.lines.length).toBe(2);
  });

  it("handles history command without history", async () => {
    const result = await executeCommand("history", mockContext, []);
    expect(result.lines[0].content).toContain("(no history)");
  });

  it("handles clear command", async () => {
    const result = await executeCommand("clear", mockContext, []);
    expect(result.lines).toEqual([]);
  });

  it("handles unknown command", async () => {
    const result = await executeCommand("unknown", mockContext, []);
    expect(result.lines[0].type).toBe("error");
  });

  it("is case-insensitive for commands", async () => {
    const result = await executeCommand("HELP", mockContext, []);
    expect(result.lines.length).toBeGreaterThan(0);
  });
});

describe("getCompletions", () => {
  it("returns command completions for empty input", () => {
    const completions = getCompletions("", COMMAND_LIST, [], []);
    expect(completions.length).toBe(COMMAND_LIST.length);
  });

  it("returns filtered command completions for partial input", () => {
    const completions = getCompletions("he", COMMAND_LIST, [], []);
    expect(completions).toContain("help");
    expect(completions.length).toBeGreaterThan(0);
  });

  it("returns slug completions for cat command", () => {
    const slugs = ["test-post-1", "test-post-2"];
    const completions = getCompletions("cat test", COMMAND_LIST, slugs, []);
    expect(completions).toContain("test-post-1");
    expect(completions).toContain("test-post-2");
  });

  it("returns tag completions for tag command", () => {
    const tags = ["nextjs", "react", "typescript"];
    const completions = getCompletions("tag ne", COMMAND_LIST, [], tags);
    expect(completions).toContain("nextjs");
  });

  it("returns empty array for unknown command", () => {
    const completions = getCompletions("unknown test", COMMAND_LIST, [], []);
    expect(completions).toEqual([]);
  });

  it("returns empty array for cat command without slug part", () => {
    const completions = getCompletions("cat ", COMMAND_LIST, [], []);
    expect(completions).toEqual([]);
  });

  it("returns empty array for tag command without tag part", () => {
    const completions = getCompletions("tag ", COMMAND_LIST, [], []);
    expect(completions).toEqual([]);
  });
});

describe("COMMAND_LIST", () => {
  it("contains all expected commands", () => {
    expect(COMMAND_LIST).toContain("help");
    expect(COMMAND_LIST).toContain("ls");
    expect(COMMAND_LIST).toContain("cat");
    expect(COMMAND_LIST).toContain("tags");
    expect(COMMAND_LIST).toContain("tag");
    expect(COMMAND_LIST).toContain("about");
    expect(COMMAND_LIST).toContain("projects");
    expect(COMMAND_LIST).toContain("grep");
    expect(COMMAND_LIST).toContain("whoami");
    expect(COMMAND_LIST).toContain("neofetch");
    expect(COMMAND_LIST).toContain("date");
    expect(COMMAND_LIST).toContain("echo");
    expect(COMMAND_LIST).toContain("links");
    expect(COMMAND_LIST).toContain("history");
    expect(COMMAND_LIST).toContain("clear");
  });
});