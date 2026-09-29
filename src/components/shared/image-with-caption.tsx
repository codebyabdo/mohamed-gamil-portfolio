import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════════ */
type CaptionPosition =
  | "bottom-start"
  | "bottom-end"
  | "bottom-center"
  | "top-start"
  | "top-end";

type OverlayStrength = "none" | "soft" | "medium" | "strong";

interface ImageWithCaptionProps {
  /** Image source (required) */
  src: ImageProps["src"];
  /** Alt text for accessibility (required) */
  alt: string;
  /** Primary caption title (e.g. name) */
  title?: string;
  /** Secondary caption text (e.g. role) */
  subtitle?: string;
  /** Optional leading dot in the caption (defaults to sage if title is set) */
  showDot?: boolean;
  /** Caption position (default: bottom-start) */
  position?: CaptionPosition;
  /** Gradient overlay strength (default: soft) */
  overlay?: OverlayStrength;
  /** Priority load (for above-the-fold images) */
  priority?: boolean;
  /** `sizes` attribute for responsive loading */
  sizes?: string;
  /** Aspect ratio class (e.g. "aspect-[16/10]") */
  aspect?: string;
  /** Min height classes for responsive layouts */
  minHeight?: string;
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Extra classes on the Image element */
  imageClassName?: string;
  /** Extra classes on the caption box */
  captionClassName?: string;
}

/* ═════════════════════════════════════════════════
   Style maps (module scope — React Compiler safe)
   ═════════════════════════════════════════════════ */
const POSITION_STYLES: Record<CaptionPosition, string> = {
  "bottom-start": "inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6",
  "bottom-end": "inset-e-4 bottom-4 sm:inset-e-6 sm:bottom-6",
  "bottom-center": "inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 flex justify-center",
  "top-start": "inset-x-4 top-4 sm:inset-x-6 sm:top-6",
  "top-end": "inset-e-4 top-4 sm:inset-e-6 sm:top-6",
};

const OVERLAY_STYLES: Record<OverlayStrength, string> = {
  none: "",
  soft: "from-primary/40 via-transparent to-transparent",
  medium: "from-primary/60 via-primary/10 to-transparent",
  strong: "from-primary/80 via-primary/25 to-transparent",
};

/* ═════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════ */
export function ImageWithCaption({
  src,
  alt,
  title,
  subtitle,
  showDot = true,
  position = "bottom-start",
  overlay = "soft",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  aspect,
  minHeight,
  className,
  imageClassName,
  captionClassName,
}: ImageWithCaptionProps) {
  const hasCaption = Boolean(title || subtitle);
  const isCentered = position === "bottom-center";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspect,
        minHeight,
        className,
      )}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover object-top", imageClassName)}
      />

      {/* Gradient overlay */}
      {overlay !== "none" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-linear-to-t",
            OVERLAY_STYLES[overlay],
          )}
        />
      )}

      {/* Caption */}
      {hasCaption && (
        <div className={cn("absolute z-10", POSITION_STYLES[position])}>
          <div
            className={cn(
              "inline-flex max-w-full flex-col",
              "rounded-lg border border-border/70",
              "bg-background/90 px-4 py-3",
              "shadow-sm backdrop-blur-sm",
              isCentered && "items-center text-center",
              captionClassName,
            )}
          >
            {title && (
              <div className="flex items-center gap-2">
                {showDot && (
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-sage"
                  />
                )}
                <span className="font-heading text-sm font-semibold text-primary">
                  {title}
                </span>
              </div>
            )}

            {subtitle && (
              <span
                className={cn(
                  "text-xs text-muted-foreground",
                  title && "mt-1",
                )}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}