import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";

export async function ApproachVision() {
  const t = await getTranslations("approach.vision");

  return (
    <Section spacing="sm">
      <Container>
        <Reveal direction="up">
          <article
            className="
              relative overflow-hidden rounded-3xl
              border border-border
              bg-primary px-6 py-12 text-primary-foreground
              sm:px-10 sm:py-14 lg:px-16 lg:py-20
            "
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklch, var(--color-sage) 25%, transparent), transparent 70%)",
              }}
            />

            <div className="relative mx-auto max-w-3xl text-center">
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                  <Quote aria-hidden="true" className="size-4" />
                  {t("eyebrow")}
                </span>
              </Reveal>

              <Reveal direction="up" delay={0.05}>
                <blockquote className="mt-6 font-heading text-[24px] font-semibold leading-[1.25] text-primary-foreground sm:text-[32px] md:text-[40px]">
                  &ldquo;{t("quote")}&rdquo;
                </blockquote>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <p className="mt-6 text-[14px] text-primary-foreground/70">
                  — {t("author")}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.15}>
                <div className="mt-8 flex justify-center">
                  <Button
                    render={<Link href="/contact" />}
                    size="lg"
                    className="rounded-full bg-primary-foreground px-6 font-heading text-sm font-semibold text-primary shadow-none transition-colors duration-300 hover:bg-primary-foreground/90"
                  >
                    {t("cta")}
                  </Button>
                </div>
              </Reveal>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}