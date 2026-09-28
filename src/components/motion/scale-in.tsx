"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  from?: number;
  delay?: number;
  duration?: number;
}

export function ScaleIn({
  children,
  className,
  from = 0.92,
  delay = 0,
  duration = 0.5,
}: ScaleInProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}