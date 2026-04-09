import React from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded bg-[var(--color-accent)] px-6 py-2 text-sm text-[var(--color-bg-primary)] transition-colors hover:bg-[var(--color-accent-hover)]",
  outline:
    "rounded border border-[var(--color-border)] px-6 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-accent)]",
};

function Button({ variant = "primary", asChild = false, className = "", children, ...props }: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${variantStyles[variant]} ${className} ${(child.props as Record<string, unknown>).className ? String((child.props as Record<string, unknown>).className) : ""}`,
      ...(props as Record<string, unknown>),
    } as React.Attributes);
  }

  return (
    <button className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
