import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";

import type { InsightItem } from "@/types/insight";
import { InsightCard } from "../insight-card";

interface InsightRelatedProps {
  insights: InsightItem[];
}

export async function InsightRelated({ insights }: InsightRelatedProps) {
  const t = await getTranslations("insights");

  return (
    <Section spacing="md">
      <Container>
        {/* Heading */}
        <div className="mb-10 max-w-2xl">
          <Reveal direction="up">
            <EyebrowTag variant="sage">
              {t("related.eyebrow")}
            </EyebrowTag>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
              {t("related.title")}
            </h2>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {insights.map((item) => (
            <InsightCard key={item.slug} insight={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}