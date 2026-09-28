"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  amount?: number;
}

export function Stagger({
  children,
  stagger = 0.08,
  delayChildren = 0.1,
  className,
  amount = 0.25,
}: StaggerProps) {
  return (
    <m.div
      className={cn(className)}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount }}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div className={cn(className)} variants={staggerItem}>
      {children}
    </m.div>
  );
}