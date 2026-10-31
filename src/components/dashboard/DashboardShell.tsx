"use client";

import type { ReactNode } from "react";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

export interface DashboardNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

export function DashboardShell({
  title,
  subtitle,
  nav,
  active,
  onSelect,
  children,
}: {
  title: string;
  subtitle: string;
  nav: DashboardNavItem[];
  active: string;
  onSelect: (key: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-mist">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0 lg:pb-0">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={clsx(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors lg:w-full",
                active === item.key
                  ? "glass-card text-white"
                  : "text-mist hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={16} className={active === item.key ? "text-violet-bright" : ""} />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
