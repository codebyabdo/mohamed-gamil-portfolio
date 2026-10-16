"use client";

import { m, useReducedMotion } from "framer-motion";

import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "char";
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

/**
 * Reveals short text word-by-word or character-by-character on scroll.
 *
 * Intended primarily for short headings and labels.
 * Avoid using it on long paragraphs because every word/character
 * becomes an individual animated element.
 */
export function TextReveal({
  children,
  className,
  delay = 0,
  splitBy = "word",
  as: Tag = "span",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const parts = splitBy === "word" ? children.split(" ") : Array.from(children);

  const animationDuration = shouldReduceMotion ? 0 : 0.55;
  const animationDelay = shouldReduceMotion ? 0 : delay;

  return (
    <Tag className={cn("inline-block", className)}>
      {parts.map((part, index) => {
        const isLastPart = index === parts.length - 1;

        return (
          <span
            key={`${part}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <m.span
              className="inline-block"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      y: "110%",
                      opacity: 0,
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: "0%",
                      opacity: 1,
                    }
              }
              viewport={viewportOnce}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: animationDuration,
                      delay: animationDelay + index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              {part}
              {splitBy === "word" && !isLastPart ? "\u00A0" : null}
            </m.span>
          </span>
        );
      })}
    </Tag>
  );
}