"use client";

import { m } from "framer-motion";
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
 * Reveals text word-by-word or char-by-char on scroll.
 * Only use on headings — never on long paragraphs (perf).
 */
export function TextReveal({
  children,
  className,
  delay = 0,
  splitBy = "word",
  as: Tag = "span",
}: TextRevealProps) {
  const parts = splitBy === "word" ? children.split(" ") : children.split("");

  return (
    <Tag className={cn("inline-block", className)}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <m.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {part}
            {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}