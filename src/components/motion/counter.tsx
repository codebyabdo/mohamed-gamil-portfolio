"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function Counter({
  from = 0,
  to,
  duration = 1.8,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const shouldReduceMotion = useReducedMotion();

  const count = useMotionValue(from);

  const rounded = useTransform(count, (value) =>
    value.toFixed(decimals),
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    // Respect the user's reduced-motion preference.
    if (shouldReduceMotion) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => {
      controls.stop();
    };
  }, [
    count,
    duration,
    inView,
    shouldReduceMotion,
    to,
  ]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      <m.span aria-hidden="true">{rounded}</m.span>
      {suffix}
    </span>
  );
}