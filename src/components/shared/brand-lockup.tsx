import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════════ */
type BrandSize = "sm" | "md" | "lg";
type BrandTheme = "light" | "dark";

interface BrandLockupProps {
  /** Visual theme — "dark" for dark backgrounds (e.g. Footer) */
  theme?: BrandTheme;
  /** Size of the monogram and text */
  size?: BrandSize;
  /** Layout orientation */
  orientation?: "horizontal" | "stacked";
  /** Show the underline hover accent */
  underline?: boolean;
  /** Custom className */
  className?: string;
  /** Custom link href (defaults to "/") */
  href?: string;
}

/* ═════════════════════════════════════════════════
   Style maps (module scope — React Compiler safe)
   ═════════════════════════════════════════════════ */
const SIZE_STYLES: Record<
  BrandSize,
  {
    monogram: string;
    monogramText: string;
    name: string;
    mark: string;
    gap: string;
  }
> = {
  sm: {
    monogram: "size-8 sm:size-9",
    monogramText: "text-[12px] sm:text-[13px]",
    name: "text-[13.5px] sm:text-sm",
    mark: "text-[10px] sm:text-[10.5px]",
    gap: "gap-2 sm:gap-2.5",
  },
  md: {
    monogram: "size-9 sm:size-10",
    monogramText: "text-[13px] sm:text-sm",
    name: "text-[15px] sm:text-base",
    mark: "text-[11px] sm:text-xs",
    gap: "gap-2.5 sm:gap-3",
  },
  lg: {
    monogram: "size-10 sm:size-11",
    monogramText: "text-[14px] sm:text-[15px]",
    name: "text-[16px] sm:text-[17px]",
    mark: "text-[11.5px] sm:text-[12.5px]",
    gap: "gap-3 sm:gap-3.5",
  },
};

const THEME_STYLES: Record<
  BrandTheme,
  {
    monogramBg: string;
    monogramText: string;
    name: string;
    mark: string;
    underline: string;
  }
> = {
  light: {
    monogramBg: "bg-primary text-primary-foreground group-hover:bg-sage",
    monogramText: "text-primary-foreground",
    name: "text-primary group-hover:text-sage",
    mark: "text-muted-foreground group-hover:text-foreground/80",
    underline: "bg-sage",
  },
  dark: {
    monogramBg:
      "bg-primary-foreground text-primary group-hover:bg-sage group-hover:text-primary-foreground",
    monogramText: "text-primary group-hover:text-primary-foreground",
    name: "text-primary-foreground group-hover:text-sage",
    mark: "text-primary-foreground/60 group-hover:text-primary-foreground/90",
    underline: "bg-sage",
  },
};

/* ═════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════ */
export function BrandLockup({
  theme = "light",
  size = "md",
  orientation = "horizontal",
  underline = true,
  className,
  href = "/",
}: BrandLockupProps) {
  const s = SIZE_STYLES[size];
  const c = THEME_STYLES[theme];

  const isStacked = orientation === "stacked";

  return (
    <Link
      href={href}
      aria-label="Al-Jamil — الجميل — Home"
      className={cn(
        "group inline-flex shrink-0",
        isStacked ? "flex-col items-center gap-2 text-center" : "items-center",
        !isStacked && s.gap,
        className,
      )}
    >
      {/* Monogram */}
      <span
        aria-hidden="true"
        className={cn(
          "relative grid shrink-0 place-items-center rounded-full",
          "transition-colors duration-300",
          s.monogram,
          c.monogramBg,
        )}
      >
        <span
          className={cn(
            "font-heading font-semibold leading-none tracking-tight",
            s.monogramText,
          )}
        >
          AJ
        </span>
      </span>

      {/* Wordmark + Arabic mark */}
      <span
        className={cn(
          "flex flex-col leading-none",
          isStacked && "items-center",
        )}
      >
        <span
          className={cn(
            "font-heading font-semibold tracking-[-0.02em]",
            "transition-colors duration-300",
            s.name,
            c.name,
          )}
        >
          Al-Jamil
        </span>

        <span
          className={cn(
            "font-body font-medium",
            isStacked ? "mt-1.5" : "mt-1",
            "transition-colors duration-300",
            s.mark,
            c.mark,
          )}
        >
          الجميل
        </span>

        {underline && !isStacked && (
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 h-px w-0",
              "transition-[width] duration-300 ease-out",
              "group-hover:w-full",
              c.underline,
            )}
          />
        )}
      </span>
    </Link>
  );
}