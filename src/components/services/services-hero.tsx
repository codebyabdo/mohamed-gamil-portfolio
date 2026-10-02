import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";

export async function ServicesHero() {
  const t = await getTranslations("services.hero");

  return (
    <Section spacing="sm">
      <Container>
        <div className="max-w-3xl">
          {/* ── Heading ─────────────────────────────── */}
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
      </Container>
    </Section>
  );
}
