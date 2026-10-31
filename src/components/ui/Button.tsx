import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

  const styles = {
    primary: "btn-glow text-white hover:brightness-110 hover:-translate-y-0.5",
    outline:
      "border border-violet-bright/40 text-white hover:border-orange hover:bg-white/5",
    ghost: "text-mist hover:text-white",
  };

  const classes = clsx(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
