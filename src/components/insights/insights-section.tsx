import { INSIGHTS } from "@/content/insight";

import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { InsightsHero } from "./insights-hero";
import { InsightsList } from "./insights-list";

export async function InsightsSection() {
  return (
    <>
      {/* 1. Hero */}
      <InsightsHero />

      {/* Trajectory transition */}
      <div className="mx-auto max-w-4xl px-4">
        <TrajectoryDivider variant="wave" showLabels />
      </div>

      {/* 2. Filter + Grid */}

      <InsightsList insights={INSIGHTS} />
    </>
  );
}
