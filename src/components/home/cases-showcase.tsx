"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { CASES } from "@/content/case-study";

import { SectionHeading } from "@/components/shared/Section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CaseCard } from "@/components/case-study/case-Card";
import { CaseCardMotionWrapper } from "@/components/case-study/case-card-motion-wrapper";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeadingReveal } from "../shared/section-heading-reveal";

export function CasesShowcase() {
  const t = useTranslations("cases");

  return (
    <Section spacing="sm">
      <Container>
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
              href="/cases"
              className="group inline-flex shrink-0 items-center gap-2 self-start font-heading text-sm font-semibold text-primary transition-colors duration-300 hover:text-sage md:self-auto"
            >
              <span>{t("showcase.exploreAll")}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          stagger={0.12}
        >
          {CASES.slice(0, 3).map((caseStudy) => (
            <StaggerItem key={caseStudy.id}>
              <CaseCardMotionWrapper>
                <CaseCard caseStudy={caseStudy} />
              </CaseCardMotionWrapper>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
