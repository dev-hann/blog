import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Terminal from "@/components/terminal/Terminal";
import type { Post } from "@/types/post";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPosts: Post[] = Array.from({ length: 15 }, (_, i) => ({
  slug: `post-${String(i + 1).padStart(2, "0")}`,
  title: `Post ${i + 1}`,
  date: `2026-04-${String(i + 1).padStart(2, "0")}`,
  tags: i % 2 === 0 ? ["nextjs", "react"] : ["typescript"],
  summary: `Summary for post ${i + 1}`,
}));

const mockTags: Record<string, number> = { nextjs: 8, react: 8, typescript: 7 };

function renderTerminal(posts = mockPosts, tags = mockTags, postHtml: Record<string, string> = {}) {
  return render(<Terminal posts={posts} tags={tags} postHtml={postHtml} />);
}

describe("Terminal", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders welcome message", async () => {
    renderTerminal();
    expect(await screen.findByText(/Welcome to hann's blog terminal/)).toBeInTheDocument();
  });

  it("renders h1 with site name", () => {
    renderTerminal();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Blog");
  });

  it("executes ls command and shows posts", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "ls{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/more posts/)).toBeInTheDocument();
    });
  });

  it("executes clear command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "ls{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/more posts/)).toBeInTheDocument();
    });
    await user.type(input, "clear{Enter}");
    await waitFor(() => {
      expect(screen.queryByText(/Welcome to/)).not.toBeInTheDocument();
      expect(screen.queryByText(/more posts/)).not.toBeInTheDocument();
    });
  });

  it("executes help command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "help{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    });
  });

  it("executes whoami command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "whoami{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/developer & writer/)).toBeInTheDocument();
    });
  });

  it("executes about command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "about{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/developer & writer/)).toBeInTheDocument();
    });
  });

  it("executes date command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "date{Enter}");
    await waitFor(() => {
      const dateElements = screen.getAllByText(/\w{3} \w{3} \d/);
      expect(dateElements.length).toBeGreaterThan(0);
    });
  });

  it("executes echo command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "echo hello world{Enter}");
    await waitFor(() => {
      expect(screen.getByText("hello world")).toBeInTheDocument();
    });
  });

  it("executes neofetch command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "neofetch{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/Next\.js 16/)).toBeInTheDocument();
    });
  });

  it("shows error for unknown command", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "foobar{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/command not found/)).toBeInTheDocument();
    });
  });

  describe("Tab completion", () => {
    it("preserves command prefix when completing slug after 'cat '", async () => {
      const user = userEvent.setup();
      renderTerminal();
      const input = screen.getByRole("textbox");
      await user.type(input, "cat post-01{Tab}");
      await waitFor(() => {
        expect(input).toHaveValue("cat post-01 ");
      });
    });

    it("preserves 'cat ' prefix when completing partial slug", async () => {
      const user = userEvent.setup();
      renderTerminal();
      const input = screen.getByRole("textbox");
      await user.type(input, "cat post-0{Tab}");
      await waitFor(() => {
        const value = (input as HTMLInputElement).value;
        expect(value).toMatch(/^cat post-0/);
        expect(value.startsWith("cat ")).toBe(true);
      });
    });

    it("shows completions list for multiple matches", async () => {
      const user = userEvent.setup();
      renderTerminal();
      const input = screen.getByRole("textbox");
      await user.type(input, "cat {Tab}");
      await waitFor(() => {
        expect(screen.getByText(/post-01/)).toBeInTheDocument();
      });
    });

    it("completes command name with single match", async () => {
      const user = userEvent.setup();
      renderTerminal();
      const input = screen.getByRole("textbox");
      await user.type(input, "hel{Tab}");
      await waitFor(() => {
        expect(input).toHaveValue("help ");
      });
    });

    it("preserves 'tag ' prefix when completing tag name", async () => {
      const user = userEvent.setup();
      renderTerminal();
      const input = screen.getByRole("textbox");
      await user.type(input, "tag next{Tab}");
      await waitFor(() => {
        const value = (input as HTMLInputElement).value;
        expect(value).toBe("tag nextjs ");
      });
    });
  });

  it("has accessible label on command input", async () => {
    renderTerminal();
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-label", "Terminal command input");
  });

  it("terminal body has log role and aria-label", () => {
    renderTerminal();
    const log = screen.getByRole("log");
    expect(log).toHaveAttribute("aria-label", "Terminal output");
  });

  it("terminal body has aria-live polite", () => {
    renderTerminal();
    const log = screen.getByRole("log");
    expect(log).toHaveAttribute("aria-live", "polite");
  });

  it("completions have aria-live polite", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "cat {Tab}");
    await waitFor(() => {
      const completions = document.querySelector("[aria-live='polite'][data-completions]");
      expect(completions).toBeInTheDocument();
    });
  });

  it("shows error for cat without slug", async () => {
    const user = userEvent.setup();
    renderTerminal();
    const input = screen.getByRole("textbox");
    await user.type(input, "cat{Enter}");
    await waitFor(() => {
      expect(screen.getByText(/Usage: cat/)).toBeInTheDocument();
    });
  });
});
