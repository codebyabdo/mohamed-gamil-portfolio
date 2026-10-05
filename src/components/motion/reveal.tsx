"use client";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, type ReactNode } from "react";
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
  const shouldReduceMotion = useReducedMotion();
  const resolvedVariants = variants ?? variantMap[direction];
  const finalVariants = useMemo<Variants>(() => {
    if (!shouldReduceMotion) {
      return resolvedVariants;
    }
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01, delay: 0 } },
    };
  }, [resolvedVariants, shouldReduceMotion]);
  return (
    <m.div
      className={cn(className)}
      variants={finalVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={!shouldReduceMotion && delay > 0 ? { delay } : undefined}
    >
      {children}
    </m.div>
  );
}
