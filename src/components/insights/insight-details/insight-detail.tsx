import { FinalCTA } from "@/components/home/final-cta";
import { SocialBlock } from "@/components/home/social-block";

import { getRelatedInsights } from "@/content/insight";
import type { InsightItem } from "@/types/insight";

import { InsightHero } from "./insight-hero";
import { InsightBody } from "./insight-body";
import { InsightSources } from "./insight-sources";
import { InsightRelated } from "./insight-related";
import { getLocale } from "next-intl/server";
import { TrajectoryLine } from "@/components/shared/trajectory-line";

interface InsightDetailProps {
  insight: InsightItem;
}

export async function InsightDetail({ insight }: InsightDetailProps) {
  const related = getRelatedInsights(insight);
  const locale = await getLocale();

  return (
    <>
      {/* 1. Hero — title + meta + image */}
      <InsightHero insight={insight} />

      <TrajectoryLine dot={false} color="var(--color-primary)" />

      {/* 2. Body content */}
      <InsightBody insight={insight} />
      <TrajectoryLine
        variant="arrow-flow"
        color="var(--color-primary)"
        flip={locale === "ar"}
      />

      {/* 3. Sources — video/social posts (only if available) */}
      {insight.sources && insight.sources.length > 0 && (
        <InsightSources insight={insight} sources={insight.sources} />
      )}

      {/* 4. Related insights */}
      {related.length > 0 && <InsightRelated insights={related} />}

      {/* 5. Social + Final CTA */}
      <SocialBlock />
      <FinalCTA />
    </>
  );
}
