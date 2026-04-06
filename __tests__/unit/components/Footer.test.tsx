import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Blog/)).toBeTruthy();
  });

  it("renders GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeTruthy();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/hann");
  });

  it("renders RSS link", () => {
    render(<Footer />);
    const rssLink = screen.getByText("RSS");
    expect(rssLink).toBeTruthy();
    expect(rssLink.getAttribute("href")).toBe("/feed.xml");
  });
});
