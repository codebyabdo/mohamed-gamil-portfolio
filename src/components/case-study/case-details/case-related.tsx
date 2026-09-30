import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";

import type { CaseStudy } from "@/types/case-study";
import { CaseCard } from "../case-Card";

interface CaseRelatedProps {
  cases: CaseStudy[];
}

export async function CaseRelated({ cases }: CaseRelatedProps) {
  const t = await getTranslations("cases");

  return (
    <Section spacing="md">
      <Container>
        <SectionHeadingReveal>
          <SectionHeading
            label={t("related.eyebrow")}
            title={t("related.title")}
            description={t("related.description")}
            className="mb-10"
          />
        </SectionHeadingReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseStudy) => (
            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </Section>
  );
}