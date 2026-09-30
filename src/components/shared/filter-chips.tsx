"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterChipsProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  layoutId?: string;
  className?: string;
  "aria-label"?: string;
}

export function FilterChips({
  options,
  value,
  onChange,
  layoutId = "filter-chips",
  className,
  "aria-label": ariaLabel,
}: FilterChipsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex w-fit flex-wrap items-center gap-1",
        "rounded-full border border-border bg-surface p-1",
        "shadow-[0_1px_2px_rgb(24_59_58/0.04)]",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2",
              "text-[12.5px] font-medium tracking-[0.01em]",
              "transition-colors duration-300",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-sage/50",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-primary"   // ← fix: contrast
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {/* Animated pill background */}
            {isActive && (
              <m.span
                layoutId={layoutId}
                className="inset-0 rounded-full bg-primary"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
              />
            )}

            {/* Icon */}
            {option.icon && (
              <span
                aria-hidden="true"
                className={cn(
                  "size-3 top-4 shrink-0 transition-colors duration-300",
                  isActive ? "text-primary" : "text-current",
                )}
              >
                {option.icon}
              </span>
            )}

            <span>{option.label}</span>

            {/* Count badge */}
            {typeof option.count === "number" && (
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1",
                  "font-mono text-[10px] font-semibold",
                  "transition-colors duration-300",
                  isActive
                    ? "bg-primary-foreground/20 text-primary"
                    : "bg-surface text-muted-foreground",
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}