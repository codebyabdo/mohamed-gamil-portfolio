"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app with:
 *  - LazyMotion + domAnimation → lighter bundle
 *  - MotionConfig respects `prefers-reduced-motion: reduce`
 *
 * IMPORTANT: with `strict`, you MUST use `m.div` (not `motion.div`)
 * throughout the app.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}