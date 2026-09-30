import { getTranslations } from "next-intl/server";
import { Quote, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";

import type { CaseStudy } from "@/types/case-study";

interface CaseOutcomeProps {
  caseStudy: CaseStudy;
}

export async function CaseOutcome({ caseStudy }: CaseOutcomeProps) {
  const t = await getTranslations("cases");

  const progress = t(`items.${caseStudy.id}.progress`);
  const quote = t(`items.${caseStudy.id}.patientExperience.quote`);
  const author = t(`items.${caseStudy.id}.patientExperience.author`);

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Progress */}
          <Reveal direction="up" className="lg:col-span-6">
            <div className="h-full rounded-3xl border border-border bg-background p-6 lg:p-8">
              <span className="mb-4 inline-flex items-center gap-2">
                <TrendingUp aria-hidden="true" className="size-4 text-sage" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                  {t("detail.progressTitle")}
                </span>
              </span>
              <p className="text-[16px] font-medium leading-relaxed text-primary sm:text-[17px]">
                {progress}
              </p>
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal direction="up" delay={0.1} className="lg:col-span-6">
            <figure className="h-full rounded-3xl border border-border bg-background p-6 lg:p-8">
              <Quote aria-hidden="true" className="mb-4 size-6 text-clay" />
              <blockquote className="text-[15px] font-medium italic leading-relaxed text-primary">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2.5 text-[13px] text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-sage"
                />
                <span>{author}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}