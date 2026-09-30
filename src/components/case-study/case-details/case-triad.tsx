import { getTranslations } from "next-intl/server";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";

import type { CaseStudy } from "@/types/case-study";

interface CaseTriadProps {
  caseStudy: CaseStudy;
}

export async function CaseTriad({ caseStudy }: CaseTriadProps) {
  const t = await getTranslations("cases");

  const caseProblem = t(`items.${caseStudy.id}.caseProblem`);
  const challenge = t(`items.${caseStudy.id}.challenge`);
  const approach = t(`items.${caseStudy.id}.approach`);

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Problem */}
          <Reveal direction="up">
            <article className="h-full rounded-2xl border border-border bg-background p-6 lg:p-7">
              <span className="mb-4 grid size-10 place-items-center rounded-xl border border-border/60 bg-surface">
                <Target aria-hidden="true" className="size-4 text-sage" />
              </span>
              <h3 className="font-heading text-[16px] font-semibold text-primary">
                {t("detail.overviewTitle")}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {caseProblem}
              </p>
            </article>
          </Reveal>

          {/* Challenge */}
          <Reveal direction="up" delay={0.1}>
            <article className="h-full rounded-2xl border border-border bg-background p-6 lg:p-7">
              <span className="mb-4 grid size-10 place-items-center rounded-xl border border-border/60 bg-surface">
                <TrendingUp aria-hidden="true" className="size-4 text-clay" />
              </span>
              <h3 className="font-heading text-[16px] font-semibold text-primary">
                {t("detail.challengeTitle")}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {challenge}
              </p>
            </article>
          </Reveal>

          {/* Approach */}
          <Reveal direction="up" delay={0.15}>
            <article className="h-full rounded-2xl border border-border bg-background p-6 lg:p-7">
              <span className="mb-4 grid size-10 place-items-center rounded-xl border border-border/60 bg-surface">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-4 text-primary"
                />
              </span>
              <h3 className="font-heading text-[16px] font-semibold text-primary">
                {t("detail.approachTitle")}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                {approach}
              </p>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}