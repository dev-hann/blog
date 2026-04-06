import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders copyright text with author name", () => {
    render(<Footer />);
    expect(screen.getByText(/hann/)).toBeTruthy();
  });

  it("renders github link", () => {
    render(<Footer />);
    const githubLink = screen.getByText("github");
    expect(githubLink).toBeTruthy();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/hann");
  });

  it("renders rss link", () => {
    render(<Footer />);
    const rssLink = screen.getByText("rss");
    expect(rssLink).toBeTruthy();
    expect(rssLink.getAttribute("href")).toBe("/feed.xml");
  });

  it("renders built with next.js text", () => {
    render(<Footer />);
    expect(screen.getByText(/built with next\.js/)).toBeTruthy();
  });
});
