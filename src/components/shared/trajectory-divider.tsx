"use client";

import { useId, useSyncExternalStore } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { viewportOnce, transitions } from "@/lib/motion";

/* ─────────────────────────────────────────────
   Hook: read <html lang> without causing hydration issues
   ───────────────────────────────────────────── */
function subscribeToLang(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
}

function getLangSnapshot() {
  if (typeof document === "undefined") return "en";
  return document.documentElement.lang || "en";
}

function useLang() {
  return useSyncExternalStore(subscribeToLang, getLangSnapshot, () => "en");
}

/* ─────────────────────────────────────────────
   Labels
   ───────────────────────────────────────────── */
const DEFAULT_LABELS = {
  en: ["Assessment", "Understanding", "Treatment", "Recovery", "Progress"],
  ar: ["التقييم", "الفهم", "العلاج", "التعافي", "التقدم"],
} as const;

/* ─────────────────────────────────────────────
   Variants
   ───────────────────────────────────────────── */
type Variant = "arc" | "wave" | "stepped" | "minimal";

const PATHS: Record<
  Variant,
  { d: string; cx: number[]; cy: number[] }
> = {
  arc: {
    d: "M 20 40 Q 200 10, 400 35 T 780 15",
    cx: [20, 210, 400, 590, 780],
    cy: [40, 24, 35, 42, 15],
  },
  wave: {
    d: "M 20 30 C 180 55, 300 5, 400 30 C 500 55, 620 5, 780 30",
    cx: [20, 210, 400, 590, 780],
    cy: [30, 32, 30, 28, 30],
  },
  stepped: {
    d: "M 20 45 L 210 45 L 210 25 L 400 25 L 400 40 L 590 40 L 590 20 L 780 20",
    cx: [20, 210, 400, 590, 780],
    cy: [45, 25, 40, 20, 20],
  },
  minimal: {
    d: "M 20 30 L 780 30",
    cx: [20, 210, 400, 590, 780],
    cy: [30, 30, 30, 30, 30],
  },
};

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
interface TrajectoryDividerProps {
  className?: string;
  showLabels?: boolean;
  labels?: string[];
  variant?: Variant;
  animated?: boolean;
  glow?: boolean;
}

export function TrajectoryDivider({
  className,
  showLabels = false,
  labels,
  variant = "arc",
  animated = true,
  glow = false,
}: TrajectoryDividerProps) {
  const uid = useId().replace(/:/g, "");
  const lang = useLang();

  const resolvedLabels =
    labels ?? (lang === "ar" ? DEFAULT_LABELS.ar : DEFAULT_LABELS.en);

  const path = PATHS[variant];

  return (
    <div
      aria-hidden={!showLabels}
      className={cn("w-full select-none py-6", className)}
    >
      <div className="mx-auto w-full max-w-4xl">
        <svg
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full overflow-visible"
          role={showLabels ? "img" : undefined}
          aria-label={
            showLabels
              ? "Treatment journey from assessment to progress"
              : undefined
          }
        >
          <defs>
            <linearGradient
              id={`grad-${uid}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="var(--color-sage)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>

            {glow && (
              <filter
                id={`glow-${uid}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Background guide */}
          <path
            d={path.d}
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.15"
            strokeDasharray="4 6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Animated main stroke */}
          <m.path
            d={path.d}
            stroke={`url(#grad-${uid})`}
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={viewportOnce}
            transition={{
              pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3 },
            }}
          />

          {/* Waypoints */}
          {path.cx.map((cx, i) => {
            const cy = path.cy[i];
            const isFirst = i === 0;
            const isLast = i === path.cx.length - 1;
            const r = isFirst || isLast ? 4 : 3;

            return (
              <m.g
                key={`${cx}-${cy}`}
                initial={animated ? { opacity: 0, scale: 0.5 } : false}
                whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
                viewport={viewportOnce}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                {glow && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r * 3}
                    fill="var(--color-sage)"
                    fillOpacity="0.15"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={isLast ? "var(--color-primary)" : "var(--color-sage)"}
                  filter={glow ? `url(#glow-${uid})` : undefined}
                />
                {isLast && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 3}
                    stroke="var(--color-clay)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    fill="none"
                  />
                )}
              </m.g>
            );
          })}
        </svg>

        {showLabels && (
          <div className="mt-3 grid grid-cols-5 gap-1 text-center">
            {resolvedLabels.slice(0, 5).map((label, index) => (
              <m.span
                key={`${label}-${index}`}
                initial={animated ? { opacity: 0, y: 6 } : false}
                whileInView={animated ? { opacity: 1, y: 0 } : undefined}
                viewport={viewportOnce}
                transition={{
                  ...transitions.normal,
                  delay: 0.6 + index * 0.12,
                }}
                className="px-1 font-heading text-[11px] font-medium text-muted-foreground sm:text-xs"
              >
                {label}
              </m.span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}