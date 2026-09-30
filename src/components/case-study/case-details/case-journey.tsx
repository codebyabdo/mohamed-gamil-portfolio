import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";

import type { CaseStudy } from "@/types/case-study";

const STAGE_INDEXES = ["0", "1", "2"] as const;

interface CaseJourneyProps {
  caseStudy: CaseStudy;
}

export async function CaseJourney({ caseStudy }: CaseJourneyProps) {
  const t = await getTranslations("cases");

  const mediaNote = t.has(`items.${caseStudy.id}.journey.mediaNote`)
    ? t(`items.${caseStudy.id}.journey.mediaNote`)
    : "";

  return (
    <Section spacing="md">
      <Container>
        <SectionHeadingReveal>
          <SectionHeading
            label={t("detail.journeyTitle")}
            title={t("detail.journeyTitle")}
            description={mediaNote}
            className="mb-10"
          />
        </SectionHeadingReveal>

        <Stagger className="space-y-4" stagger={0.12} amount={0.1}>
          {STAGE_INDEXES.map((idx) => (
            <StaggerItem key={idx}>
              <article className="relative rounded-2xl border border-border bg-surface p-6 lg:p-7">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Phase */}
                  <div className="lg:col-span-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
                      {t(`items.${caseStudy.id}.journey.stages.${idx}.phase`)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-6">
                    <p className="text-[14.5px] leading-relaxed text-foreground/80">
                      {t(
                        `items.${caseStudy.id}.journey.stages.${idx}.description`,
                      )}
                    </p>
                  </div>

                  {/* Milestone */}
                  <div className="lg:col-span-3">
                    <span className="mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage">
                      {t("detail.milestoneLabel")}
                    </span>
                    <p className="text-[13.5px] font-medium leading-relaxed text-primary">
                      {t(
                        `items.${caseStudy.id}.journey.stages.${idx}.milestone`,
                      )}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}