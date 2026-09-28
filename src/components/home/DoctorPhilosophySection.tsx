import { getLocale, getTranslations } from "next-intl/server";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export async function DoctorPhilosophySection() {
  const t = await getTranslations("home.philosophy");
  const locale = await getLocale();

  const pillars = [
    {
      number: "01",
      title: t("pillars.listening.title"),
      description: t("pillars.listening.description"),
    },
    {
      number: "02",
      title: t("pillars.transparency.title"),
      description: t("pillars.transparency.description"),
    },
    {
      number: "03",
      title: t("pillars.progression.title"),
      description: t("pillars.progression.description"),
    },
  ];

  return (
    <Section spacing="md">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="grid lg:grid-cols-12">
            {/* Visual — reveal from left (or right in RTL) */}
            <Reveal
              direction={locale === "ar" ? "right" : "left"}
              className="relative min-h-105 overflow-hidden lg:col-span-5 lg:min-h-160"
            >
              <Image
                src="/image.png"
                alt={t("imageAlt")}
                sizes="(max-width: 1024px) 100vw, 50vw"
                fill
                className="object-cover object-top"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-primary/45 via-transparent to-transparent"
              />

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="inline-flex max-w-full flex-col rounded-lg border border-border/70 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-sage"
                    />
                    <span className="font-heading text-sm font-semibold text-primary">
                      {t("caption.name")}
                    </span>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {t("caption.role")}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Content */}
            <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:col-span-7 lg:p-14 xl:p-16">
              <div>
                {/* Kicker */}
                <Reveal direction="up">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-caption font-semibold tracking-[0.08em] text-sage">
                      {t("eyebrow")}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-sage/50" />
                  </div>
                </Reveal>

                {/* Heading */}
                <Reveal direction="up" delay={0.05}>
                  <h2 className="text-h2 max-w-3xl text-primary">{t("title")}</h2>
                </Reveal>

                {/* Description */}
                <Reveal direction="up" delay={0.1}>
                  <p className="text-body-lg mt-6 max-w-2xl text-foreground/80">
                    {t("description")}
                  </p>
                </Reveal>

                {/* Pillars — staggered */}
                <Stagger className="mt-10 border-t border-border">
                  {pillars.map((pillar) => (
                    <StaggerItem key={pillar.number}>
                      <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[48px_1fr] sm:gap-5">
                        <span className="pt-0.5 font-mono text-xs font-semibold text-sage">
                          {pillar.number}
                        </span>
                        <div>
                          <h3 className="font-heading text-base font-semibold text-primary sm:text-lg">
                            {pillar.title}
                          </h3>
                          <p className="text-body-sm mt-1.5 max-w-xl text-muted-foreground">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              {/* Actions */}
              <Reveal direction="up" delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 pt-7">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 font-heading text-sm font-semibold text-primary transition-colors duration-300 hover:text-sage"
                  >
                    <span>{t("aboutLink")}</span>
                    {locale === "ar" ? <ArrowLeft /> : <ArrowRight />}
                  </Link>

                  {/* Fixed: Button asChild */}
                  <Button
                    className="rounded-full bg-primary px-5 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
                  >
                    <Link href="/contact">{t("cta")}</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}