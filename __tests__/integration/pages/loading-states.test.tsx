import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PostDetailLoading from "@/app/posts/[slug]/loading";

describe("PostDetailLoading", () => {
  it("renders skeleton layout correctly", () => {
    render(<PostDetailLoading />);
    expect(screen.getByTestId("skeleton-body")).toBeInTheDocument();
  });

  it("renders main content skeleton", () => {
    const { container } = render(<PostDetailLoading />);
    const mainSkeleton = container.querySelector(".min-w-0.max-w-3xl");
    expect(mainSkeleton).toBeInTheDocument();
  });

  it("renders sidebar skeleton on desktop", () => {
    const { container } = render(<PostDetailLoading />);
    const sidebarSkeleton = container.querySelector("aside");
    expect(sidebarSkeleton).toBeInTheDocument();
  });
});
