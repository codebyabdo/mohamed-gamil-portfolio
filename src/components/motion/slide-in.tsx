"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  className?: string;
  delay?: number;
  duration?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function SlideIn({
  children,
  direction = "up",
  distance = 32,
  className,
  delay = 0,
  duration = 0.5,
}: SlideInProps) {
  const o = offsets[direction];

  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, x: o.x * distance, y: o.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}