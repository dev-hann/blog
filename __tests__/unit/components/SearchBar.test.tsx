import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/search/SearchBar";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPosts = [
  {
    slug: "react-hooks",
    title: "React Hooks 가이드",
    date: "2026-04-01",
    summary: "React 훅에 대한 완벽 가이드",
    tags: ["react", "hooks"],
  },
  {
    slug: "nextjs-blog",
    title: "Next.js 블로그 만들기",
    date: "2026-03-20",
    summary: "Next.js로 블로그를 만드는 방법",
    tags: ["nextjs", "react"],
  },
  {
    slug: "typescript-tips",
    title: "TypeScript 팁",
    date: "2026-03-10",
    summary: "타입스크립트 유용한 팁 모음",
    tags: ["typescript"],
  },
];

describe("SearchBar", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("renders search input", () => {
    render(<SearchBar posts={mockPosts} />);
    expect(screen.getByPlaceholderText("검색어를 입력하세요...")).toBeTruthy();
  });

  it("filters results by title", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText("검색어를 입력하세요...");
    await user.type(input, "React Hooks");
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText("React Hooks 가이드")).toBeTruthy();
  });

  it("filters results by tag", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText("검색어를 입력하세요...");
    await user.type(input, "typescript");
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText("TypeScript 팁")).toBeTruthy();
  });

  it("shows empty message for no results", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText("검색어를 입력하세요...");
    await user.type(input, "없는검색어");
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText(/검색 결과가 없습니다/)).toBeTruthy();
  });

  it("debounces input", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText("검색어를 입력하세요...");
    await user.type(input, "React");
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByText("React Hooks 가이드")).toBeNull();
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByText("React Hooks 가이드")).toBeTruthy();
  });
});
