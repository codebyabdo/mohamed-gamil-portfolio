import { useTranslations } from "next-intl";

import { HeroBackground } from "./hero-background";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <>
      <HeroBackground />
      <Section className="relative isolate z-10 overflow-hidden flex items-center">
        {/* Hero Content */}
        <Container className="relative flex w-full flex-col items-center text-center py-24 sm:py-28 md:py-32">
          {/* Eyebrow */}
          <div
            className="
            animate-hero-eyebrow
            mb-6 sm:mb-8
            inline-flex items-center gap-2.5
            rounded-full
            border border-[#D9DDD8]/80
            bg-[#EFEEE8]/75
            px-4 py-1.5
            shadow-2xs
            backdrop-blur-sm
          "
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#769A91]" />

            <span className="text-[13px] sm:text-[14px] font-medium text-[#183B3A]">
              {t("eyebrow")}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="
            animate-hero-title
            max-w-4xl
            text-balance
            font-display
            text-[46px]
            font-semibold
            leading-[1.12]
            tracking-tight
            text-[#183B3A]
            sm:text-[62px]
            md:text-[76px]
            lg:text-[88px]
          "
          >
            {t("title")}
          </h1>

          {/* Description */}
          <p
            className="
            animate-hero-desc
            mt-6 md:mt-7
            max-w-2xl
            text-balance
            text-[17px]
            font-normal
            leading-[1.8]
            text-[#66716F]
            sm:text-[19px]
            md:text-[21px]
          "
          >
            {t("description")}
          </p>

          {/* CTAs */}
          <div
            className="
            animate-hero-cta
            mt-9 md:mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-3.5
            sm:gap-4
          "
          >
            <Link href="/contact">
              <Button
                className="
                h-13
                min-w-38.75
                px-8
                text-[15px]
                font-semibold
                shadow-xs
              "
              >
                {t("primaryCta")}
              </Button>
            </Link>

            <Link href="/approach">
              <Button
                variant="secondary"
                className="
                h-13
                min-w-38.75
                border border-[#D9DDD8]
                bg-[#F7F5F0]/70
                px-8
                text-[15px]
                font-semibold
                text-[#183B3A]
                shadow-none
                backdrop-blur-sm
                hover:bg-[#EFEEE8]
              "
              >
                {t("secondaryCta")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
