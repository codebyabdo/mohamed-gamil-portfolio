"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════════ */
type EyebrowVariant = "sage" | "clay" | "primary" | "inverse";

interface EyebrowTagProps {
  children: ReactNode;
  /** Color variant */
  variant?: EyebrowVariant;
  /** Optional number/label shown before text (e.g. "01", "→", "§") */
  marker?: string;
  /** Optional icon (rendered before marker) */
  icon?: ReactNode;
  /** Custom className */
  className?: string;
  /** Entrance animation delay (seconds) */
  delay?: number;
}

/* ═════════════════════════════════════════════════
   Variant → styles
   ═════════════════════════════════════════════════ */
const VARIANT_STYLES: Record<
  EyebrowVariant,
  {
    barFrom: string;
    barTo: string;
    marker: string;
    text: string;
    icon: string;
    halo: string;
  }
> = {
  sage: {
    barFrom: "from-sage",
    barTo: "to-sage/0",
    marker: "text-sage",
    text: "text-primary",
    icon: "text-sage",
    halo: "var(--color-sage)",
  },
  clay: {
    barFrom: "from-clay",
    barTo: "to-clay/0",
    marker: "text-clay",
    text: "text-primary",
    icon: "text-clay",
    halo: "var(--color-clay)",
  },
  primary: {
    barFrom: "from-primary",
    barTo: "to-primary/0",
    marker: "text-primary",
    text: "text-primary",
    icon: "text-primary",
    halo: "var(--color-primary)",
  },
  inverse: {
    barFrom: "from-sage",
    barTo: "to-sage/0",
    marker: "text-sage",
    text: "text-primary-foreground",
    icon: "text-sage",
    halo: "var(--color-sage)",
  },
};

/* ═════════════════════════════════════════════════
   Variants (module scope)
   ═════════════════════════════════════════════════ */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const barVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const markerVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ═════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════ */
export function EyebrowTag({
  children,
  variant = "sage",
  marker,
  icon,
  className,
  delay = 0,
}: EyebrowTagProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <m.div
      className={cn("relative inline-flex items-stretch gap-3", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay }}
    >
      {/* ── Vertical bar (grows from top) ───────────── */}
      <m.span
        aria-hidden="true"
        variants={barVariants}
        className={cn(
          "block w-0.5 origin-top rounded-full bg-linear-to-b",
          styles.barFrom,
          styles.barTo,
        )}
        style={{ willChange: "transform" }}
      />

      <div className="flex items-center gap-2.5">
        {/* ── Optional icon ───────────────────────────── */}
        {icon && (
          <m.span
            variants={markerVariants}
            className={cn("shrink-0", styles.icon)}
          >
            {icon}
          </m.span>
        )}

        {/* ── Marker (e.g. "01", "→") ─────────────────── */}
        {marker && (
          <m.span
            variants={markerVariants}
            className={cn(
              "shrink-0 font-mono text-[10.5px] font-semibold tabular-nums tracking-[0.14em]",
              styles.marker,
            )}
          >
            {marker}
          </m.span>
        )}

        {/* ── Separator dot ───────────────────────────── */}
        {marker && (
          <m.span
            aria-hidden="true"
            variants={markerVariants}
            className={cn(
              "size-1 shrink-0 rounded-full",
              styles.marker.replace("text-", "bg-"),
            )}
            style={{ opacity: 0.6 }}
          />
        )}

        {/* ── Label with clip reveal ──────────────────── */}
        <span className="relative inline-block overflow-hidden">
          <m.span
            variants={textVariants}
            className={cn(
              "inline-block font-heading text-[11.5px] font-semibold uppercase tracking-[0.18em] sm:text-[12px]",
              styles.text,
            )}
          >
            {children}
          </m.span>
        </span>
      </div>

      {/* ── Soft halo (appears after entrance) ──────── */}
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-md opacity-0"
        style={{
          background: `radial-gradient(ellipse at left, color-mix(in oklch, ${styles.halo} 18%, transparent), transparent 70%)`,
        }}
        animate={{ opacity: [0, 0.7, 0.5] }}
        transition={{
          duration: 1.2,
          delay: delay + 0.8,
          ease: "easeOut",
        }}
      />
    </m.div>
  );
}