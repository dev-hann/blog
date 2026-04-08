import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import NoScriptFallback from "@/components/ui/NoScriptFallback";

describe("NoScriptFallback", () => {
  it("renders noscript element", () => {
    const { container } = render(<NoScriptFallback />);
    const noscript = container.querySelector("noscript");
    expect(noscript).toBeTruthy();
  });

  it("has data-noscript attribute", () => {
    const { container } = render(<NoScriptFallback />);
    const noscript = container.querySelector("noscript");
    expect(noscript).toHaveAttribute("data-noscript", "true");
  });
});
