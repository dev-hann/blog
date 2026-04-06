import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TableOfContents from "@/components/post/TableOfContents";

vi.mock("next/navigation", () => ({
  usePathname: () => "/posts/test-post",
  useRouter: () => ({ push: vi.fn() }),
}));

const mockHeadings = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "getting-started", text: "Getting Started", level: 2 },
  { id: "installation", text: "Installation", level: 3 },
  { id: "configuration", text: "Configuration", level: 3 },
  { id: "advanced", text: "Advanced Topics", level: 2 },
];

describe("TableOfContents", () => {
  it("generates TOC from headings", () => {
    render(<TableOfContents headings={mockHeadings} />);
    expect(screen.getByText("Introduction")).toBeTruthy();
    expect(screen.getByText("Getting Started")).toBeTruthy();
    expect(screen.getByText("Installation")).toBeTruthy();
    expect(screen.getByText("Configuration")).toBeTruthy();
    expect(screen.getByText("Advanced Topics")).toBeTruthy();
  });

  it("links to correct heading ids", () => {
    render(<TableOfContents headings={mockHeadings} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("#introduction");
    expect(hrefs).toContain("#getting-started");
    expect(hrefs).toContain("#installation");
    expect(hrefs).toContain("#configuration");
    expect(hrefs).toContain("#advanced");
  });
});
