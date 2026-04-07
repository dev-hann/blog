import { describe, it, expect } from "vitest";
import { executeCommand, COMMAND_LIST, getCompletions } from "@/lib/terminal/commands";
import type { CommandContext } from "@/lib/terminal/types";
import type { Post } from "@/types/post";

const mockPosts: Post[] = Array.from({ length: 15 }, (_, i) => ({
  slug: `post-${String(i + 1).padStart(2, "0")}`,
  title: `Post ${i + 1}`,
  date: `2026-04-${String(i + 1).padStart(2, "0")}`,
  tags: i % 2 === 0 ? ["nextjs", "react"] : ["typescript"],
  summary: `Summary for post ${i + 1}`,
}));

const mockContext: CommandContext = {
  posts: mockPosts,
  tags: { nextjs: 8, react: 8, typescript: 7 },
  postHtml: { "post-01": "<p>rendered</p>" },
};

const emptyContext: CommandContext = {
  posts: [],
  tags: {},
  postHtml: {},
};

describe("COMMAND_LIST", () => {
  it("contains all expected commands", () => {
    const expected = [
      "help", "ls", "cat", "tags", "tag", "about", "projects",
      "grep", "whoami", "neofetch", "date", "echo", "history", "clear",
    ];
    expect(COMMAND_LIST).toEqual(expected);
  });
});

describe("executeCommand", () => {
  describe("help", () => {
    it("returns command list", async () => {
      const result = await executeCommand("help", mockContext, []);
      expect(result.lines.length).toBeGreaterThan(0);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("ls");
      expect(text).toContain("cat");
      expect(text).toContain("help");
    });
  });

  describe("ls", () => {
    it("returns first 10 posts by default", async () => {
      const result = await executeCommand("ls", mockContext, []);
      const outputLines = result.lines.filter((l) => l.type === "output");
      expect(outputLines.length).toBe(12);
      expect(outputLines[11].content).toContain("5 more posts");
    });

    it("returns all posts with --all flag", async () => {
      const result = await executeCommand("ls --all", mockContext, []);
      const outputLines = result.lines.filter((l) => l.type === "output");
      expect(outputLines.length).toBe(15);
    });

    it("returns no posts message for empty context", async () => {
      const result = await executeCommand("ls", emptyContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("No posts found");
    });
  });

  describe("cat", () => {
    it("returns error when no slug provided", async () => {
      const result = await executeCommand("cat", mockContext, []);
      expect(result.lines[0].type).toBe("error");
      expect(result.lines[0].content).toContain("Usage");
    });

    it("returns error for non-existent slug", async () => {
      const result = await executeCommand("cat non-existent", mockContext, []);
      expect(result.lines[0].type).toBe("error");
      expect(result.lines[0].content).toContain("No such post");
    });

    it("renders post with valid slug", async () => {
      const result = await executeCommand("cat post-01", mockContext, []);
      expect(result.lines.length).toBeGreaterThanOrEqual(2);
      expect(result.lines[0].type).toBe("html");
      expect(result.lines[1].type).toBe("mdx");
      expect(result.lines[1].content).toBe("<p>rendered</p>");
    });

    it("falls back to frontmatter when html unavailable", async () => {
      const result = await executeCommand("cat post-02", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("Post 2");
      expect(text).toContain("MDX rendering unavailable");
    });
  });

  describe("tags", () => {
    it("returns tag list with counts", async () => {
      const result = await executeCommand("tags", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("nextjs");
      expect(text).toContain("typescript");
    });

    it("returns no tags message for empty context", async () => {
      const result = await executeCommand("tags", emptyContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("No tags found");
    });
  });

  describe("tag", () => {
    it("returns filtered posts", async () => {
      const result = await executeCommand("tag nextjs", mockContext, []);
      const outputLines = result.lines.filter((l) => l.type === "output");
      expect(outputLines.length).toBe(8);
    });

    it("returns error when no tag name provided", async () => {
      const result = await executeCommand("tag", mockContext, []);
      expect(result.lines[0].type).toBe("error");
    });

    it("returns error for non-existent tag", async () => {
      const result = await executeCommand("tag nonexistent", mockContext, []);
      expect(result.lines[0].type).toBe("error");
    });

    it("performs case-insensitive matching", async () => {
      const result = await executeCommand("tag NextJS", mockContext, []);
      const outputLines = result.lines.filter((l) => l.type === "output");
      expect(outputLines.length).toBe(8);
    });
  });

  describe("about", () => {
    it("returns author info", async () => {
      const result = await executeCommand("about", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("hann");
    });
  });

  describe("projects", () => {
    it("returns project list", async () => {
      const result = await executeCommand("projects", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("blog/");
    });
  });

  describe("grep", () => {
    it("returns search results", async () => {
      const result = await executeCommand("grep Post", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("result");
    });

    it("returns no results message", async () => {
      const result = await executeCommand("grep xyznonexistent", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("No results found");
    });

    it("returns error when no query provided", async () => {
      const result = await executeCommand("grep", mockContext, []);
      expect(result.lines[0].type).toBe("error");
    });
  });

  describe("whoami", () => {
    it("returns user info", async () => {
      const result = await executeCommand("whoami", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("hann");
    });
  });

  describe("neofetch", () => {
    it("returns system info with post and tag counts", async () => {
      const result = await executeCommand("neofetch", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("Posts: 15");
      expect(text).toContain("Tags: 3");
    });
  });

  describe("date", () => {
    it("returns current date string", async () => {
      const result = await executeCommand("date", mockContext, []);
      expect(result.lines.length).toBe(1);
      expect(result.lines[0].type).toBe("output");
      expect(new Date(result.lines[0].content).toString()).not.toBe("Invalid Date");
    });
  });

  describe("echo", () => {
    it("returns echoed message", async () => {
      const result = await executeCommand("echo hello world", mockContext, []);
      expect(result.lines[0].content).toBe("hello world");
    });

    it("returns empty string with no args", async () => {
      const result = await executeCommand("echo", mockContext, []);
      expect(result.lines[0].content).toBe("");
    });
  });

  describe("history", () => {
    it("returns history entries", async () => {
      const result = await executeCommand("history", mockContext, ["ls", "help", "date"]);
      expect(result.lines.length).toBe(3);
      expect(result.lines[0].content).toContain("ls");
    });

    it("returns no history message", async () => {
      const result = await executeCommand("history", mockContext, []);
      const text = result.lines.map((l) => l.content).join(" ");
      expect(text).toContain("no history");
    });
  });

  describe("clear", () => {
    it("returns empty lines", async () => {
      const result = await executeCommand("clear", mockContext, []);
      expect(result.lines).toEqual([]);
    });
  });

  describe("unknown command", () => {
    it("returns error for unrecognized command", async () => {
      const result = await executeCommand("foobar", mockContext, []);
      expect(result.lines[0].type).toBe("error");
      expect(result.lines[0].content).toContain("command not found");
    });
  });
});

describe("getCompletions", () => {
  const commands = COMMAND_LIST;
  const slugs = mockPosts.map((p) => p.slug);
  const tags = Object.keys(mockContext.tags);

  it("completes command names", () => {
    const result = getCompletions("he", commands, slugs, tags);
    expect(result).toEqual(["help"]);
  });

  it("completes cat with slugs", () => {
    const result = getCompletions("cat post-0", commands, slugs, tags);
    expect(result.length).toBeGreaterThan(0);
    for (const r of result) {
      expect(r).toMatch(/^post-0/);
    }
  });

  it("completes tag with tag names", () => {
    const result = getCompletions("tag next", commands, slugs, tags);
    expect(result).toContain("nextjs");
  });

  it("returns empty for no match", () => {
    const result = getCompletions("zzz", commands, slugs, tags);
    expect(result).toEqual([]);
  });
});
