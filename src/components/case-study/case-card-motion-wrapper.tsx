"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface CaseCardMotionWrapperProps {
  children: ReactNode;
}

/**
 * Wraps a CaseCard with a hover-lift motion effect.
 * Kept separate so CaseCard itself can stay a Server Component.
 */
export function CaseCardMotionWrapper({
  children,
}: CaseCardMotionWrapperProps) {
  return (
    <m.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </m.div>
  );
}