import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Section } from "../ui/section";
import { TESTIMONIALS } from "@/content/testimonial";

export async function TestimonialShowcase() {
  const t = await getTranslations("testimonials.testimonials");
  const locale = await getLocale();

  const featuredTestimonial = TESTIMONIALS.find(
    (testimonial) => testimonial.type === "video",
  );

  if (!featuredTestimonial) {
    return null;
  }

  const isArabic = locale === "ar";

  const author = t(`${featuredTestimonial.authorKey}.name`);
  const context = featuredTestimonial.roleOrContextKey
    ? t(`${featuredTestimonial.authorKey}.context`)
    : "";

  const quote = t(`${featuredTestimonial.authorKey}.quote`);

  return (
    <Section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Featured Video Testimonial */}
          <div className="relative lg:col-span-6">
            <div className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[20px] bg-black shadow-lg">
              <Image
                src={featuredTestimonial.videoThumbnail!}
                alt={author}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-primary)] shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </div>
              </div>

              {/* Video Information */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs text-white">
                <div>
                  <span className="block text-sm font-bold">
                    {author}
                  </span>

                  <span className="text-white/75">
                    {context}
                  </span>
                </div>

                {featuredTestimonial.videoDuration && (
                  <span className="rounded bg-black/60 px-2 py-1">
                    {featuredTestimonial.videoDuration}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Patient Quote */}
          <div className="space-y-5 lg:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
              {t("eyebrow")}
            </span>

            <blockquote
              className={[
                "text-lg font-medium leading-relaxed text-[var(--color-primary)] sm:text-xl md:text-2xl",
                isArabic ? "not-italic" : "italic",
              ].join(" ")}
            >
              “{quote}”
            </blockquote>

            <div className="space-y-1">
              <span className="block text-sm font-bold text-[var(--color-primary)]">
                {author}
              </span>

              <span className="block text-xs text-[var(--color-muted)]">
                {context}
              </span>
            </div>

            <div className="pt-2">
              <a
                href={`/${locale}/testimonials`}
                className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-border)]/50"
              >
                <span>{t("readAll")}</span>

                <ArrowLeft
                  className={`h-3.5 w-3.5 ${
                    isArabic ? "rotate-180" : ""
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}