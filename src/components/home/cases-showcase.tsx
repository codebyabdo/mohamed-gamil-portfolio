import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { CASES } from "@/content/case-study";

import { SectionHeading } from "@/components/shared/Section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CaseCard } from "@/components/case-study/case-Card";

export function CasesShowcase() {
  const t = useTranslations("cases");

  return (
    <Section spacing="md">
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label={t("showcase.eyebrow")}
            title={t("showcase.title")}
            description={t("showcase.description")}
            className="mb-0"
          />

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
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CASES.slice(0, 3).map((caseStudy) => (
            <CaseCard
              key={caseStudy.id}
              caseStudy={caseStudy}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}