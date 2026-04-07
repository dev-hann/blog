import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

async function loadComponent(name: string) {
  switch (name) {
    case "posts": {
      const mod = await import("@/app/posts/loading");
      return mod.default;
    }
    case "post-detail": {
      const mod = await import("@/app/posts/[slug]/loading");
      return mod.default;
    }
    case "search": {
      const mod = await import("@/app/search/loading");
      return mod.default;
    }
    case "tags": {
      const mod = await import("@/app/tags/loading");
      return mod.default;
    }
    default:
      throw new Error(`Unknown loading: ${name}`);
  }
}

describe("Loading pages", () => {
  it("posts loading renders skeleton", async () => {
    const Loading = await loadComponent("posts");
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("[data-testid]").length).toBeGreaterThan(0);
  });

  it("post-detail loading renders skeleton", async () => {
    const Loading = await loadComponent("post-detail");
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("[data-testid]").length).toBeGreaterThan(0);
  });

  it("search loading renders skeleton", async () => {
    const Loading = await loadComponent("search");
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("[data-testid]").length).toBeGreaterThan(0);
  });

  it("posts loading has accessible status", async () => {
    const Loading = await loadComponent("posts");
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("post-detail loading has accessible status", async () => {
    const Loading = await loadComponent("post-detail");
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("search loading has accessible status", async () => {
    const Loading = await loadComponent("search");
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("tags loading renders skeleton", async () => {
    const Loading = await loadComponent("tags");
    const { container } = render(<Loading />);
    expect(container.querySelectorAll("[data-testid]").length).toBeGreaterThan(0);
  });

  it("tags loading has accessible status", async () => {
    const Loading = await loadComponent("tags");
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
