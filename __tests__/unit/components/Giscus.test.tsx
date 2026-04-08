import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@giscus/react", () => ({
  default: (props: Record<string, string>) => (
    <div
      data-testid="giscus"
      data-repo={props.repo}
      data-repo-id={props.repoId}
      data-category={props.category}
      data-category-id={props.categoryId}
      data-mapping={props.mapping}
      data-theme={props.theme}
    />
  ),
}));

describe("Giscus", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("renders Giscus container when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GISCUS_REPO_ID", "test-repo-id");
    vi.stubEnv("NEXT_PUBLIC_GISCUS_CATEGORY_ID", "test-category-id");
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    expect(screen.getByTestId("giscus")).toBeInTheDocument();
  });

  it("has correct data attributes when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GISCUS_REPO_ID", "test-repo-id");
    vi.stubEnv("NEXT_PUBLIC_GISCUS_CATEGORY_ID", "test-category-id");
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    const el = screen.getByTestId("giscus");
    expect(el).toHaveAttribute("data-repo");
    expect(el).toHaveAttribute("data-repo-id", "test-repo-id");
    expect(el).toHaveAttribute("data-mapping", "pathname");
    expect(el).toHaveAttribute("data-theme", "dark");
  });

  it("renders comment section with heading", async () => {
    vi.stubEnv("NEXT_PUBLIC_GISCUS_REPO_ID", "test-repo-id");
    vi.stubEnv("NEXT_PUBLIC_GISCUS_CATEGORY_ID", "test-category-id");
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    const section = screen.getByTestId("comment-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-comment-section");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("댓글");
  });

  it("shows placeholder message when repoId or categoryId is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_GISCUS_REPO_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GISCUS_CATEGORY_ID", "");
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    expect(screen.getByText(/댓글 기능이 활성화되지 않았습니다/)).toBeInTheDocument();
    expect(screen.queryByTestId("giscus")).not.toBeInTheDocument();
  });
});
