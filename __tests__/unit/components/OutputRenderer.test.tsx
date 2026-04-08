import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OutputRenderer from "@/components/terminal/OutputRenderer";

describe("OutputRenderer", () => {
  it("renders input line with prompt", () => {
    const { container } = render(<OutputRenderer line={{ id: "1", type: "input", content: "ls" }} />);
    expect(container.textContent).toContain("$ ls");
  });

  it("renders output line", () => {
    const { container } = render(<OutputRenderer line={{ id: "2", type: "output", content: "Hello world" }} />);
    expect(container.textContent).toContain("Hello world");
  });

  it("renders error line with error styling", () => {
    render(<OutputRenderer line={{ id: "3", type: "error", content: "Not found" }} />);
    const el = screen.getByText("Not found");
    expect(el).toBeInTheDocument();
    expect(el.className).toContain("output-error");
  });

  it("renders mdx line with mdx-content class", () => {
    const { container } = render(<OutputRenderer line={{ id: "4", type: "mdx", content: "<p>MDX</p>" }} />);
    const wrapper = container.querySelector(".mdx-content");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.innerHTML).toContain("<p>MDX</p>");
  });

  it("renders html line", () => {
    const { container } = render(<OutputRenderer line={{ id: "5", type: "html", content: "<strong>Bold</strong>" }} />);
    expect(container.innerHTML).toContain("<strong>Bold</strong>");
  });
});
