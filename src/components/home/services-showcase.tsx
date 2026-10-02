"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { SERVICES } from "@/content/service-item";
import { cn } from "@/lib/utils";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/Section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";
import { TrajectoryLine } from "@/components/shared/trajectory-line";

export function ServicesShowcase() {
  const t = useTranslations("services");
  const previewServices = SERVICES.slice(0, 4);

  const [selectedId, setSelectedId] = useState(previewServices[0]?.id ?? "");

  const activeService = useMemo(
    () =>
      previewServices.find((service) => service.slug === selectedId) ??
      previewServices[0],
    [previewServices, selectedId],
  );

  if (!activeService) return null;

  const activeTitle = t(`items.${activeService.id}.title`);
  const activeDescription = t(`items.${activeService.id}.description`);
  const activeKeyFocus = t(`items.${activeService.id}.keyFocus`);
  const activeImageAlt = t(`items.${activeService.id}.imageAlt`);

  return (
    <Section spacing="md">
      <Container>
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <SectionHeadingReveal>
            <SectionHeading
              label={t("showcase.eyebrow")}
              title={t("showcase.title")}
              description={t("showcase.description")}
              className="mb-0"
            />
          </SectionHeadingReveal>

          <Reveal direction="up" delay={0.1}>
            <Link
              href="/services"
              className={cn(
                "group inline-flex shrink-0 items-center gap-2 self-start",
                "font-heading text-sm font-semibold text-primary",
                "transition-colors duration-300 hover:text-sage",
                "md:self-auto",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-(--focus-ring-color)",
                "focus-visible:ring-offset-2",
              )}
            >
              <span>{t("showcase.exploreAll")}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Services Showcase */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Service Navigation */}
          <Stagger className="flex flex-col gap-2 lg:col-span-5" amount={0.1}>
            {previewServices.map((service) => {
              const isSelected = service.id === activeService.id;
              const title = t(`items.${service.id}.title`);
              const description = t(`items.${service.id}.description`);

              return (
                <StaggerItem key={service.id}>
                  <m.button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(service.id)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "group relative flex w-full items-start gap-4 rounded-lg border p-5 text-start",
                      "transition-colors duration-300",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-(--focus-ring-color)",
                      "focus-visible:ring-offset-2",
                      isSelected
                        ? "border-sage/60 bg-surface shadow-sm"
                        : "border-border bg-transparent hover:border-border-strong hover:bg-surface/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-4 inset-s-0 w-0.5 rounded-full transition-all duration-300",
                        isSelected
                          ? "bg-clay"
                          : "bg-transparent group-hover:bg-sage/40",
                      )}
                    />

                    <span
                      className={cn(
                        "shrink-0 pt-0.5 font-mono text-xs font-semibold",
                        isSelected ? "text-clay" : "text-muted-foreground",
                      )}
                    >
                      {service.num}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span
                          className={cn(
                            "font-heading text-base font-semibold transition-colors sm:text-lg",
                            isSelected ? "text-primary" : "text-foreground",
                          )}
                        >
                          {title}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className={cn(
                            "size-4 shrink-0 transition-all duration-300",
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground/50 group-hover:text-muted-foreground",
                            "rtl:rotate-180",
                          )}
                        />
                      </span>
                      <span className="mt-1.5 block line-clamp-2 text-body-sm text-muted-foreground">
                        {description}
                      </span>
                    </span>
                  </m.button>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Active Service */}
          <Reveal direction="up" delay={0.15} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <m.article
                key={activeService.id}
                id={`service-panel-${activeService.id}`}
                aria-label={activeTitle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex min-h-105 flex-col overflow-hidden rounded-3xl border border-border bg-surface"
              >
                {/* Image */}
                {activeService.image && (
                  <div className="relative h-52 overflow-hidden sm:h-60">
                    <m.div
                      key={`img-${activeService.id}`}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeService.image}
                        alt={activeImageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover"
                      />
                    </m.div>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-primary/50 via-primary/5 to-transparent"
                    />

                    <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
                      <span className="rounded-full border border-white/30 bg-primary/70 px-3 py-1.5 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
                        {activeService.num}
                      </span>
                      <span className="text-xs font-medium text-white/90">
                        {t("showcase.clinicalCare")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="p-6 sm:p-8 lg:p-10">
                    {!activeService.image && (
                      <div className="mb-5 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-sage">
                          {activeService.num}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {t("showcase.clinicalCare")}
                        </span>
                      </div>
                    )}

                    <h3 className="text-h3 text-primary">{activeTitle}</h3>
                    <p className="text-body-lg mt-4 max-w-2xl text-foreground/80">
                      {activeDescription}
                    </p>

                    <div className="mt-7 rounded-lg border border-border bg-background p-5 sm:p-6">
                      <span className="text-caption font-heading font-semibold tracking-[0.08em] text-sage">
                        {t("showcase.clinicalFocus")}
                      </span>
                      <p className="text-body mt-2 text-primary">
                        {activeKeyFocus}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 sm:px-8 lg:px-10">
                    <span className="text-body-sm text-muted-foreground">
                      {t("showcase.footer")}
                    </span>

                    {/* ← Updated: use slug instead of #anchor */}
                    <Link
                      href={`/services/${activeService.slug}`}
                      className={cn(
                        "group inline-flex items-center gap-2",
                        "font-heading text-sm font-semibold text-primary",
                        "transition-colors duration-300 hover:text-sage",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-(--focus-ring-color)",
                        "focus-visible:ring-offset-2",
                      )}
                    >
                      <span>{t("showcase.exploreService")}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </m.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>

      {/* ← Fixed: no aria-hidden on Reveal */}
      <div aria-hidden="true" className="mt-12">
        <TrajectoryLine variant="wave-divider" color="var(--color-primary)" />
      </div>
    </Section>
  );
}
