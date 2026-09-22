import type { ComponentProps } from "react";
import { Link as IntlLink } from "@/i18n/navigation";

import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof IntlLink>;

export function Link({ className, ...props }: LinkProps) {
  return (
    <IntlLink
      className={cn(
        "transition-colors motion-fast",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--focus-ring-color)]",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-background)]",
        className,
      )}
      {...props}
    />
  );
}