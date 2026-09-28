import { getTranslations } from "next-intl/server";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { TrajectoryLine } from "@/components/shared/trajectory-line";
import { EyebrowTag } from "../shared/eyebrow-badge";

export async function FinalCTA() {
  const t = await getTranslations("home.finalCta");
  return (
    <Section spacing="lg" className="relative overflow-hidden bg-surface">
      {/* Decorative trajectory */}
      <Reveal
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
      >
        <TrajectoryLine variant="wave-divider" color="var(--color-primary)" />
      </Reveal>
      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <Reveal direction="up">
            <EyebrowTag variant="clay">{t("eyebrow")}</EyebrowTag>
          </Reveal>
          {/* Headline */}
          <Reveal direction="up" delay={0.05}>
            <h2 className="text-h2 mt-7 text-primary"> {t("title")} </h2>
          </Reveal>
          {/* Description */}
          <Reveal direction="up" delay={0.1}>
            <p className="text-body-lg mx-auto mt-6 max-w-2xl text-muted-foreground ">
              {t("description")}
            </p>
          </Reveal>
          {/* CTAs */}
          <Reveal direction="up" delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className=" inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_rgb(24_59_58/0.35)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_14px_36px_-10px_rgb(24_59_58/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2 sm:px-7 "
              >
                {t("primaryCta")}
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/about"
                className=" inline-flex h-12 items-center justify-center rounded-full border border-border-strong/60 bg-transparent px-6 font-heading text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2 sm:px-7 "
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </Reveal>
          {/* Contact options */}
          <Reveal direction="up" delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              {/* WhatsApp */}
              <Link
                href="/contact"
                className=" inline-flex items-center gap-2 font-medium transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2 rounded-sm "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4 text-sage"
                />
                <span>{t("whatsapp")}</span>
              </Link>
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-border-strong"
              />
              {/* Phone */}
              <Link
                href="/contact"
                className=" inline-flex items-center gap-2 font-medium transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2 rounded-sm "
              >
                <PhoneCall aria-hidden="true" className="size-4 text-clay" />
                <span>{t("phone")}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
