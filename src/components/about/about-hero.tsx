import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { ImageWithCaption } from "@/components/shared/image-with-caption";
import { EyebrowTag } from "../shared/eyebrow-badge";

export async function AboutHero() {
  const t = await getTranslations("about.hero");
  const locale = await getLocale();

  return (
    <Section spacing="md">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-white ">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ── Portrait ─────────────────────────────── */}
            <Reveal
              direction={locale === "ar" ? "right" : "left"}
              className="lg:col-span-5"
            >
              <ImageWithCaption
                src="/image.png"
                alt={t("imageAlt")}
                title={t("caption.name")}
                subtitle={t("caption.role")}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="min-h-105 lg:min-h-160"
                overlay="strong"
                position="bottom-start"
                priority
              />
            </Reveal>

            {/* ── Copy ─────────────────────────────────── */}
            <div className="order-1 flex flex-col items-start lg:order-2 lg:col-span-7">
              {/* Eyebrow */}
              <Reveal direction="up">
                <EyebrowTag variant="sage" marker="→">
                  {t("eyebrow")}
                </EyebrowTag>
              </Reveal>

              {/* Headline */}
              <Reveal direction="up" delay={0.05}>
                <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.15] text-primary sm:text-[52px] md:text-[60px]">
                  {t("title")}
                </h1>
              </Reveal>

              {/* Description */}
              <Reveal direction="up" delay={0.1}>
                <p className="mt-6 text-[19px] font-normal leading-relaxed text-foreground sm:text-[21px]">
                  {t("description")}
                </p>
              </Reveal>

              {/* CTA */}
              <Reveal direction="up" delay={0.15}>
                <div className="pt-6">
                  <Button
                    render={<Link href="/contact" />}
                    size="lg"
                    className="rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
                  >
                    {t("cta")}
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
