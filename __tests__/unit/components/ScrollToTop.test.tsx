import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToTop from "@/components/ui/ScrollToTop";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollY", 0);
    window.scrollTo = vi.fn();
  });

  it("renders nothing when not scrolled", () => {
    vi.stubGlobal("scrollY", 0);
    const { container } = render(<ScrollToTop />);
    expect(container.innerHTML).toBe("");
  });

  it("does not render button initially", () => {
    const { container } = render(<ScrollToTop />);
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders button after scrolling past threshold", () => {
    vi.stubGlobal("scrollY", 500);
    const listeners: Array<() => void> = [];
    vi.spyOn(window, "addEventListener").mockImplementation((_evt, cb) => {
      listeners.push(cb as () => void);
    });
    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

    render(<ScrollToTop />);
    act(() => {
      for (const fn of listeners) fn();
    });

    expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
  });

  it("scrolls to top on click", async () => {
    vi.stubGlobal("scrollY", 500);
    const listeners: Array<() => void> = [];
    vi.spyOn(window, "addEventListener").mockImplementation((_evt, cb) => {
      listeners.push(cb as () => void);
    });
    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

    render(<ScrollToTop />);
    act(() => {
      for (const fn of listeners) fn();
    });

    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Scroll to top"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
