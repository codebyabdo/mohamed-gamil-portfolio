import { getLocale, getTranslations } from "next-intl/server";

import { getRelatedCases } from "@/content/case-study";
import type { CaseStudy } from "@/types/case-study";

import { FinalCTA } from "@/components/home/final-cta";

import { CaseHero } from "./case-hero";
import { CaseTriad } from "./case-triad";
import { CaseJourney } from "./case-journey";
import { CaseOutcome } from "./case-outcome";
import { CaseRelated } from "./case-related";
import { TrajectoryLine } from "@/components/shared/trajectory-line";

interface CaseDetailProps {
  caseStudy: CaseStudy;
}

export async function CaseDetail({ caseStudy }: CaseDetailProps) {
  const t = await getTranslations("cases");
  const locale = await getLocale();

  /* ─────────────────────────────────────────────
     Check if the FULL content exists
     ───────────────────────────────────────────── */
  const hasFullContent = t.has(`items.${caseStudy.id}.caseProblem`);

  const relatedCases = getRelatedCases(caseStudy);

  return (
    <>
      {/* 1. HERO */}
      <CaseHero caseStudy={caseStudy} />

      <TrajectoryLine dot={false} color="var(--color-primary)" />

      {/* 2-4. FULL CONTENT — only if available */}
      {hasFullContent && (
        <>
          {/* 2. Problem + Challenge + Approach */}
          <CaseTriad caseStudy={caseStudy} />

          {/* 3. Journey */}
          <CaseJourney caseStudy={caseStudy} />

          <TrajectoryLine
            variant="arrow-flow"
            color="var(--color-primary)"
            flip={locale === "ar"}
          />
          {/* 4. Progress + Quote */}
          <CaseOutcome caseStudy={caseStudy} />
        </>
      )}

      {/* 5. Related cases */}
      {relatedCases.length > 0 && <CaseRelated cases={relatedCases} />}

      {/* 6. Final CTA */}
      <FinalCTA />
    </>
  );
}
