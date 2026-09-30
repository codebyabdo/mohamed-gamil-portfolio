"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils";

import { ServiceCardProps } from "@/types/service-item";

export function ServiceCard({
  slug,
  index,
  title,
  description,
  keyFocus,
  exploreLabel,
}: ServiceCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <m.article
      className={cn(
        "group relative flex h-full flex-col",
        "overflow-hidden rounded-2xl",
        "border border-border bg-surface",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-sage/40",
        "hover:shadow-[0_20px_50px_-25px_rgb(24_59_58/0.2)]",
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent line — grows on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-0.5",
          "origin-left scale-x-0 bg-linear-to-r from-sage via-sage to-clay",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-x-100",
        )}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Header: number */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
            {number}
          </span>

          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full border border-border/60 bg-background"
          >
            <span className="size-1.5 rounded-full bg-sage" />
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-[19px] font-semibold leading-snug text-primary sm:text-[21px]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Key focus — quote-like */}
        <div className="mt-5 border-t border-border pt-4">
          <span className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage">
            {exploreLabel === "Explore Service"
              ? "Clinical Focus"
              : "التركيز العلاجي"}
          </span>
          <p className="text-[13px] leading-relaxed text-foreground/80">
            {keyFocus}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <Link
            href={`/services/${slug}`}
            className={cn(
              "group/link inline-flex items-center gap-2",
              "font-heading text-[13px] font-semibold",
              "text-primary transition-colors duration-300",
              "hover:text-sage",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-sage/50 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-surface",
            )}
          >
            <span>{exploreLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "size-3.5 transition-transform duration-300",
                "group-hover/link:translate-x-1",
                "rtl:rotate-180 rtl:group-hover/link:-translate-x-1",
              )}
            />
          </Link>
        </div>
      </div>
    </m.article>
  );
}
