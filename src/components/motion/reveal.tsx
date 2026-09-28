"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeDown,
  scaleIn,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

const variantMap: Record<Direction, Variants> = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  fade: fadeIn,
  scale: scaleIn,
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variants?: Variants;
}

export function Reveal({
  children,
  direction = "up",
  className,
  delay = 0,
  once = true,
  amount = 0.25,
  variants,
}: RevealProps) {
  const resolved = variants ?? variantMap[direction];

  return (
    <m.div
      className={cn(className)}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </m.div>
  );
}