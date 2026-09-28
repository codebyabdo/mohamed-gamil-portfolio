"use client";

import { useId } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";

/* ═════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════ */
interface TrajectoryLineProps {
  variant?:
    | "subtle-curve"
    | "wave-divider"
    | "upward-arc"
    | "horizontal-guide"
    | "spark"
    | "arrow-flow";
  className?: string;
  color?: string;
  /** Animate the line drawing on view */
  animated?: boolean;
  /** Show endpoint dot (when applicable) */
  dot?: boolean;
  /** Flip horizontally — useful for RTL layouts */
  flip?: boolean;
}

/* ═════════════════════════════════════════════
   Shared constants (module scope)
   ═════════════════════════════════════════════ */
const DRAW_TRANSITION = {
  duration: 1.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

/* ═════════════════════════════════════════════
   Wrapper (module scope)
   ═════════════════════════════════════════════ */
interface WrapperProps {
  className?: string;
  flip?: boolean;
  children: React.ReactNode;
}

function Wrapper({ className, flip, children }: WrapperProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none overflow-hidden",
        flip && "scale-x-[-1]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ═════════════════════════════════════════════
   AnimatedPath (module scope)
   ═════════════════════════════════════════════ */
interface AnimatedPathProps {
  d: string;
  gradientId: string;
  animated: boolean;
  width?: number;
  opacity?: number;
  delay?: number;
}

function AnimatedPath({
  d,
  gradientId,
  animated,
  width = 1.5,
  opacity = 1,
  delay = 0,
}: AnimatedPathProps) {
  return (
    <m.path
      d={d}
      stroke={`url(#${gradientId})`}
      strokeWidth={width}
      strokeLinecap="round"
      strokeOpacity={opacity}
      fill="none"
      initial={animated ? { pathLength: 0 } : false}
      whileInView={animated ? { pathLength: 1 } : undefined}
      viewport={viewportOnce}
      transition={animated ? { ...DRAW_TRANSITION, delay } : undefined}
    />
  );
}

/* ═════════════════════════════════════════════
   AnimatedDot (module scope)
   ═════════════════════════════════════════════ */
interface AnimatedDotProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  animated: boolean;
  delay?: number;
}

function AnimatedDot({
  cx,
  cy,
  r,
  fill,
  animated,
  delay = 0,
}: AnimatedDotProps) {
  return (
    <m.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      initial={animated ? { opacity: 0, scale: 0 } : false}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={viewportOnce}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

/* ═════════════════════════════════════════════
   Shared gradient defs (module scope component)
   ═════════════════════════════════════════════ */
interface GradientDefsProps {
  id: string;
  color: string;
}

function GradientDefs({ id, color }: GradientDefsProps) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={color} stopOpacity="0.15" />
        <stop offset="50%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor="var(--color-clay)" stopOpacity="0.9" />
      </linearGradient>
    </defs>
  );
}

/* ═════════════════════════════════════════════
   Main component
   ═════════════════════════════════════════════ */
export function TrajectoryLine({
  variant = "subtle-curve",
  className,
  color = "var(--color-sage)",
  animated = true,
  dot = true,
  flip = false,
}: TrajectoryLineProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `tl-grad-${uid}`;

  /* ═══════════════════════════════════════════
     Variant: upward-arc
     ═══════════════════════════════════════════ */
  if (variant === "upward-arc") {
    return (
      <Wrapper className={className} flip={flip}>
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <GradientDefs id={gradientId} color={color} />

          {/* Background dashed guide */}
          <path
            d="M0 100 C 350 110, 650 20, 1200 40"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="4 8"
            strokeOpacity="0.3"
          />

          <AnimatedPath
            d="M0 90 C 400 100, 750 30, 1200 25"
            gradientId={gradientId}
            animated={animated}
            width={1.75}
          />

          {dot && (
            <AnimatedDot
              cx={1190}
              cy={25}
              r={3.5}
              fill="var(--color-sage)"
              animated={animated}
              delay={1.4}
            />
          )}
        </svg>
      </Wrapper>
    );
  }

  /* ═══════════════════════════════════════════
     Variant: wave-divider
     ═══════════════════════════════════════════ */
  if (variant === "wave-divider") {
    return (
      <Wrapper className={cn("py-4", className)} flip={flip}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <GradientDefs id={gradientId} color={color} />

          {/* Secondary dashed wave */}
          <path
            d="M0,55 C 380,25 600,75 960,45 C 1200,25 1380,60 1440,50"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="6 6"
          />

          <AnimatedPath
            d="M0,45 C 320,10 520,70 880,35 C 1140,10 1340,55 1440,40"
            gradientId={gradientId}
            animated={animated}
            opacity={0.8}
          />
        </svg>
      </Wrapper>
    );
  }

  /* ═══════════════════════════════════════════
     Variant: horizontal-guide
     ═══════════════════════════════════════════ */
  if (variant === "horizontal-guide") {
    return (
      <Wrapper className={className} flip={flip}>
        <svg
          viewBox="0 0 600 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          <GradientDefs id={gradientId} color={color} />

          <AnimatedPath
            d="M0 12 Q 180 2, 350 18 T 600 10"
            gradientId={gradientId}
            animated={animated}
            opacity={0.6}
          />

          {dot && (
            <AnimatedDot
              cx={594}
              cy={10}
              r={3}
              fill="var(--color-clay)"
              animated={animated}
              delay={1.4}
            />
          )}
        </svg>
      </Wrapper>
    );
  }

  /* ═══════════════════════════════════════════
     Variant: spark
     ═══════════════════════════════════════════ */
  if (variant === "spark") {
    return (
      <Wrapper className={className} flip={flip}>
        <svg
          viewBox="0 0 200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          <GradientDefs id={gradientId} color={color} />

          <AnimatedPath
            d="M5 20 Q 60 5, 100 20 T 195 20"
            gradientId={gradientId}
            animated={animated}
            width={2}
          />

          <AnimatedDot
            cx={5}
            cy={20}
            r={2.5}
            fill={color}
            animated={animated}
            delay={1.4}
          />

          <AnimatedDot
            cx={100}
            cy={20}
            r={2.5}
            fill={color}
            animated={animated}
            delay={1.55}
          />

          {dot && (
            <AnimatedDot
              cx={195}
              cy={20}
              r={3}
              fill="var(--color-clay)"
              animated={animated}
              delay={1.7}
            />
          )}
        </svg>
      </Wrapper>
    );
  }

  /* ═══════════════════════════════════════════
     Variant: arrow-flow
     ═══════════════════════════════════════════ */
  if (variant === "arrow-flow") {
    return (
      <Wrapper className={className} flip={flip}>
        <svg
          viewBox="0 0 800 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <GradientDefs id={gradientId} color={color} />

          <AnimatedPath
            d="M5 20 Q 200 5, 400 20 T 760 20"
            gradientId={gradientId}
            animated={animated}
            width={1.75}
            opacity={0.9}
          />

          {dot && (
            <>
              <m.path
                d="M755 15 L770 20 L755 25"
                stroke="var(--color-clay)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={animated ? { opacity: 0, x: -6 } : false}
                whileInView={animated ? { opacity: 1, x: 0 } : undefined}
                viewport={viewportOnce}
                transition={{
                  duration: 0.4,
                  delay: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <AnimatedDot
                cx={5}
                cy={20}
                r={2.5}
                fill={color}
                animated={animated}
                delay={1.4}
              />
            </>
          )}
        </svg>
      </Wrapper>
    );
  }

  /* ═══════════════════════════════════════════
     Default: subtle-curve
     ═══════════════════════════════════════════ */
  return (
    <Wrapper className={className} flip={flip}>
      <svg
        viewBox="0 0 1000 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        preserveAspectRatio="none"
      >
        <GradientDefs id={gradientId} color={color} />

        <AnimatedPath
          d="M0 50 C 300 45, 600 10, 1000 30"
          gradientId={gradientId}
          animated={animated}
          opacity={0.85}
        />

        {dot && (
          <AnimatedDot
            cx={994}
            cy={30}
            r={3}
            fill="var(--color-sage)"
            animated={animated}
            delay={1.4}
          />
        )}
      </svg>
    </Wrapper>
  );
}
