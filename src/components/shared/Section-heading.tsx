import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  actions?: ReactNode;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "start",
  className,
  actions,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "w-full max-w-3xl",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            isCentered && "justify-center",
          )}
        >
          <span className="text-caption font-heading font-semibold tracking-[0.08em] text-sage">
            {label}
          </span>

          <span
            aria-hidden="true"
            className="h-px w-8 bg-sage/50"
          />
        </div>
      )}

      <h2 className="text-h2 text-primary">
        {title}
      </h2>

      {description && (
        <p className="text-body-lg mt-5 max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}

      {actions && (
        <div
          className={cn(
            "mt-6",
            isCentered && "flex justify-center",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}