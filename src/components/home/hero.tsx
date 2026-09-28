"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import { HeroBackground } from "./hero-background";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { transitions } from "@/lib/motion";
import { EyebrowTag } from "../shared/eyebrow-badge";
import { Activity } from "lucide-react";
import { Reveal } from "../motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <>
      <HeroBackground />
      <Section className="relative isolate z-10 flex items-center overflow-hidden">
        <Container className="relative flex w-full flex-col items-center py-24 text-center sm:py-28 md:py-32">
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-col items-center"
          >
            {/* Eyebrow */}
            <Reveal className="mb-4" direction="scale">
              <EyebrowTag
                variant="sage"
                icon={<Activity className="size-3.5" />}
              >
                {t("eyebrow")}
              </EyebrowTag>
            </Reveal>

            {/* Main Headline */}
            <m.h1
              variants={itemVariants}
              className="
                max-w-4xl
                text-balance
                font-display
                text-[46px]
                font-semibold
                leading-[1.12]
                tracking-tight
                text-primary
                sm:text-[62px]
                md:text-[76px]
                lg:text-[88px]
              "
            >
              {t("title")}
            </m.h1>

            {/* Description */}
            <m.p
              variants={itemVariants}
              className="
                mt-6 md:mt-7
                max-w-2xl
                text-balance
                text-[17px]
                font-normal
                leading-[1.8]
                text-muted
                sm:text-[19px]
                md:text-[21px]
              "
            >
              {t("description")}
            </m.p>

            {/* CTAs */}
            <m.div
              variants={itemVariants}
              className="
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
                <Button className="h-13 min-w-38.75 px-8 text-[15px] font-semibold shadow-xs">
                  {t("primaryCta")}
                </Button>
              </Link>

              <Link href="/approach">
                <Button
                  variant="secondary"
                  className="
                    h-13
                    min-w-38.75
                    border border-border
                    bg-surface/70
                    px-8
                    text-[15px]
                    font-semibold
                    text-primary
                    shadow-none
                    backdrop-blur-sm
                    hover:bg-surface
                  "
                >
                  {t("secondaryCta")}
                </Button>
              </Link>
            </m.div>
          </m.div>
        </Container>
      </Section>
    </>
  );
}
