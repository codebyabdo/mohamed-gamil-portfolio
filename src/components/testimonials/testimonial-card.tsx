"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/* ═════════════════════════════════════════════════
   Written testimonial
   ═════════════════════════════════════════════════ */
function WrittenCard({ testimonial }: TestimonialCardProps) {
  const t = useTranslations("testimonials");
  const tItems = useTranslations("testimonials.items");

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between",
        "rounded-2xl border border-border bg-surface p-6 lg:p-7",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-sage/40",
        "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]",
      )}
    >
      <div>
        <Quote
          aria-hidden="true"
          className="size-6 text-clay"
        />

        <blockquote className="mt-4 font-heading text-[17px] font-normal leading-relaxed text-primary lg:text-[18px]">
          {tItems(`${testimonial.id}.quote`)}
        </blockquote>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
        <div>
          <span className="block font-heading text-[14.5px] font-semibold text-primary">
            {tItems(`${testimonial.id}.author`)}
          </span>
          {testimonial.hasContext && (
            <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
              {tItems(`${testimonial.id}.context`)}
            </span>
          )}
        </div>

        <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage">
          {t("types.written")}
        </span>
      </div>
    </article>
  );
}

/* ═════════════════════════════════════════════════
   Video testimonial
   ═════════════════════════════════════════════════ */
function VideoCard({ testimonial }: TestimonialCardProps) {
  const t = useTranslations("testimonials");
  const tItems = useTranslations("testimonials.items");
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between overflow-hidden",
        "rounded-2xl border border-border bg-surface",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-sage/40",
        "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]",
      )}
    >
      {/* Video area */}
      <div className="relative aspect-16/10 overflow-hidden bg-primary/20">
        <Image
          src={testimonial.videoThumbnail ?? "/service/doctor.png"}
          alt={tItems(`${testimonial.id}.author`)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        {/* Consent overlay */}
        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="
              absolute inset-0 flex flex-col items-center justify-center gap-3
              bg-primary/40 backdrop-blur-[1px]
              transition-colors duration-300 hover:bg-primary/30
            "
            aria-label={t("video.play")}
          >
            <span
              className="
                grid size-14 place-items-center rounded-full
                bg-background text-primary shadow-md
                transition-transform duration-300 hover:scale-105
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="ms-0.5 size-5 fill-current"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>

            {testimonial.videoDuration && (
              <span className="rounded-full bg-primary/80 px-2.5 py-0.5 text-[11.5px] font-medium text-primary-foreground">
                {testimonial.videoDuration}
              </span>
            )}
          </button>
        )}

        {/* Consent text (after "play") */}
        {playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary p-6 text-center text-primary-foreground">
            <p className="text-[13px] leading-relaxed text-primary-foreground/75">
              {t("video.consentNote")}
            </p>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="mt-3 text-[13px] text-clay underline hover:text-clay/80"
            >
              {t("video.close")}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <p className="text-[14px] leading-relaxed text-foreground/80">
          {tItems(`${testimonial.id}.quote`)}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <span className="block font-heading text-[14.5px] font-semibold text-primary">
              {tItems(`${testimonial.id}.author`)}
            </span>
            {testimonial.hasContext && (
              <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                {tItems(`${testimonial.id}.context`)}
              </span>
            )}
          </div>

          <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage">
            {t("types.video")}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ═════════════════════════════════════════════════
   Case-linked testimonial
   ═════════════════════════════════════════════════ */
function CaseLinkedCard({ testimonial }: TestimonialCardProps) {
  const t = useTranslations("testimonials");
  const tItems = useTranslations("testimonials.items");

  return (
    <article
      className={cn(
        "relative flex h-full flex-col justify-between",
        "rounded-2xl border border-sage/40 bg-surface p-6 lg:p-7",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary",
        "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.2)]",
      )}
    >
      {/* Badge */}
      <span className="absolute inset-e-4 top-4 rounded-md bg-primary px-2.5 py-0.5 text-[10.5px] font-medium text-primary-foreground">
        {t("types.caseLinked")}
      </span>

      <div>
        <Quote aria-hidden="true" className="size-6 text-clay" />

        <blockquote className="mt-4 font-heading text-[17px] font-normal leading-relaxed text-primary lg:text-[18px]">
          {tItems(`${testimonial.id}.quote`)}
        </blockquote>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="mb-3">
          <span className="block font-heading text-[14.5px] font-semibold text-primary">
            {tItems(`${testimonial.id}.author`)}
          </span>
          {testimonial.hasContext && (
            <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
              {tItems(`${testimonial.id}.context`)}
            </span>
          )}
        </div>

        {testimonial.caseSlug && (
          <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
            <div className="min-w-0 flex-1">
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage">
                {t("caseReference")}
              </span>
              <span className="mt-0.5 block truncate text-[13px] font-medium text-primary">
                {tItems(`${testimonial.id}.caseTitle`)}
              </span>
            </div>

            <Link
              href={`/cases/${testimonial.caseSlug}`}
              className="
                shrink-0 text-[12px] font-semibold text-primary underline-offset-4
                transition-colors duration-300 hover:text-sage hover:underline
              "
            >
              {t("viewCase")}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/* ═════════════════════════════════════════════════
   Router
   ═════════════════════════════════════════════════ */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  switch (testimonial.type) {
    case "written":
      return <WrittenCard testimonial={testimonial} />;
    case "video":
      return <VideoCard testimonial={testimonial} />;
    case "case-linked":
      return <CaseLinkedCard testimonial={testimonial} />;
    default:
      return null;
  }
}