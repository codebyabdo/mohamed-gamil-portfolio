"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { viewportOnce, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrap a SectionHeading to reveal it on scroll.
 * Use this in Server Components where you can't use motion directly.
 */
export function SectionHeadingReveal({
  children,
  className,
  delay = 0,
}: SectionHeadingRevealProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transitions.slow, delay }}
    >
      {children}
    </m.div>
  );
}