import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Giscus from "@/components/comment/Giscus";

vi.mock("@giscus/react", () => ({
  default: () => <div data-testid="giscus-widget">Giscus Widget</div>,
}));

describe("Giscus", () => {
  it("renders giscus component", () => {
    render(<Giscus />);
    expect(screen.getByTestId("giscus-widget")).toBeTruthy();
  });

  it("has comment section wrapper", () => {
    const { container } = render(<Giscus />);
    const section = container.querySelector("[data-comment-section]");
    expect(section).toBeTruthy();
  });
});
