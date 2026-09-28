"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: FadeInProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </m.div>
  );
}