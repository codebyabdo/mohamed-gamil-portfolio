import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════════ */
type EmptyStateVariant = "default" | "search" | "filter" | "error";

interface EmptyStateProps {
  /** Icon to display — usually a lucide-react icon */
  icon?: ReactNode;
  /** Primary title */
  title: string;
  /** Optional description */
  description?: string;
  /** Optional actions (buttons, links) */
  actions?: ReactNode;
  /** Visual variant — affects the icon container style */
  variant?: EmptyStateVariant;
  /** Additional className for the wrapper */
  className?: string;
}

/* ═════════════════════════════════════════════════
   Variant styles (module scope)
   ═════════════════════════════════════════════════ */
const VARIANT_STYLES: Record<
  EmptyStateVariant,
  {
    iconRing: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  default: {
    iconRing: "border-border/60",
    iconBg: "bg-surface",
    iconColor: "text-muted-foreground",
  },
  search: {
    iconRing: "border-sage/30",
    iconBg: "bg-sage/5",
    iconColor: "text-sage",
  },
  filter: {
    iconRing: "border-clay/30",
    iconBg: "bg-clay/5",
    iconColor: "text-clay",
  },
  error: {
    iconRing: "border-error/30",
    iconBg: "bg-error/5",
    iconColor: "text-error",
  },
};

/* ═════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════ */
export function EmptyState({
  icon,
  title,
  description,
  actions,
  variant = "default",
  className,
}: EmptyStateProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center",
        "py-16 text-center sm:py-20",
        className,
      )}
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            "mb-6 grid size-16 place-items-center rounded-2xl border-2",
            "transition-colors duration-300",
            styles.iconRing,
            styles.iconBg,
          )}
        >
          <span className={cn("grid place-items-center", styles.iconColor)}>
            {icon}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold text-primary sm:text-xl">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* Actions */}
      {actions && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
