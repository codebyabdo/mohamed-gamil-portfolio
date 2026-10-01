import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Section } from "@/components/ui/section";
import { TESTIMONIALS } from "@/content/testimonial";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/Section-heading";
import { Reveal } from "@/components/motion";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";

export async function TestimonialShowcase() {
  const t = await getTranslations("testimonials");
  const tItems = await getTranslations("testimonials.items");
  const locale = await getLocale();

  // Featured testimonial — prefer video, fallback to any
  const featuredTestimonial =
    TESTIMONIALS.find((testimonial) => testimonial.type === "video") ??
    TESTIMONIALS[0];

  if (!featuredTestimonial) return null;

  const isArabic = locale === "ar";

  /* ─────────────────────────────────────────────
     Read from items.<id>.* (new structure)
     ───────────────────────────────────────────── */
  const author = tItems(`${featuredTestimonial.id}.author`);
  const context = featuredTestimonial.hasContext
    ? tItems(`${featuredTestimonial.id}.context`)
    : "";
  const quote = tItems(`${featuredTestimonial.id}.quote`);

  const hasVideo = featuredTestimonial.type === "video";

  return (
    <Section spacing="md">
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <SectionHeadingReveal>
            <SectionHeading
              label={t("hero.eyebrow")}
              title={t("hero.title")}
              description={t("hero.description")}
              className="mb-0"
            />
          </SectionHeadingReveal>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* ── Featured video / image ─────────────── */}
          <Reveal
            direction={isArabic ? "right" : "left"}
            className="relative lg:col-span-6"
          >
            <div className="group relative aspect-16/10 overflow-hidden rounded-[20px] bg-primary/10 shadow-lg">
              {hasVideo ? (
                <>
                  <Image
                    src={featuredTestimonial.videoThumbnail ?? "/service/doctor.png"}
                    alt={author}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="grid size-14 place-items-center rounded-full bg-background text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="size-6 translate-x-0.5 fill-current" />
                    </span>
                  </div>

                  {/* Author + duration */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-xs text-white">
                    <div>
                      <span className="block text-sm font-bold">{author}</span>
                      <span className="text-white/75">{context}</span>
                    </div>

                    {featuredTestimonial.videoDuration && (
                      <span className="rounded bg-black/60 px-2 py-1 font-mono">
                        {featuredTestimonial.videoDuration}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src="/service/doctor.png"
                    alt={author}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />

                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-xs text-white">
                    <div>
                      <span className="block text-sm font-bold">{author}</span>
                      <span className="text-white/75">{context}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Reveal>

          {/* ── Quote + author + CTA ───────────────── */}
          <Reveal
            direction={isArabic ? "left" : "right"}
            delay={0.15}
            className="space-y-5 lg:col-span-6"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
              {hasVideo ? t("types.video") : t("types.written")}
            </span>

            <blockquote
              className={[
                "text-lg font-medium leading-relaxed text-primary sm:text-xl md:text-2xl",
                isArabic ? "not-italic" : "italic",
              ].join(" ")}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="space-y-1">
              <span className="block text-sm font-bold text-primary">
                {author}
              </span>
              {context && (
                <span className="block text-xs text-muted-foreground">
                  {context}
                </span>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/testimonials"
                className="
                  inline-flex h-11 items-center gap-2
                  rounded-full border border-border bg-surface
                  px-5 text-xs font-semibold text-primary
                  transition-colors duration-300
                  hover:bg-surface/60 hover:border-border-strong
                "
              >
                <span>{t("hero.readAll")}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 rtl:rotate-180"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}