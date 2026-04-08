import React from "react";
import { describe, it, expect, vi } from "vitest";
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
  it("renders Giscus container", async () => {
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    expect(screen.getByTestId("giscus")).toBeInTheDocument();
  });

  it("has correct data attributes", async () => {
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    const el = screen.getByTestId("giscus");
    expect(el).toHaveAttribute("data-repo");
    expect(el).toHaveAttribute("data-repo-id");
    expect(el).toHaveAttribute("data-mapping", "pathname");
    expect(el).toHaveAttribute("data-theme", "dark");
  });

  it("renders comment section with heading", async () => {
    const { default: Giscus } = await import("@/components/comment/Giscus");
    render(<Giscus />);
    const section = screen.getByTestId("comment-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-comment-section");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("댓글");
  });
});
