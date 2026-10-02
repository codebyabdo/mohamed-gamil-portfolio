"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SearchX } from "lucide-react";

import { InsightsFilter } from "./insights-filter";
import { InsightCard } from "./insight-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Stagger, StaggerItem } from "@/components/motion";

import type { InsightItem } from "@/types/insight";

interface InsightsListProps {
  insights: InsightItem[];
}

export function InsightsList({ insights }: InsightsListProps) {
  const t = useTranslations("insights");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return insights;
    return insights.filter((i) => i.category === filter);
  }, [insights, filter]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: insights.length };
    for (const i of insights) {
      result[i.category] = (result[i.category] ?? 0) + 1;
    }
    return result;
  }, [insights]);

  return (
    <Section spacing="md">
      <Container>
        <InsightsFilter value={filter} onChange={setFilter} counts={counts} />

        <div className="mt-8">
          {filtered.length === 0 ? (
            <EmptyState
              variant="filter"
              icon={<SearchX className="size-6" />}
              title={t("empty.title")}
              description={t("empty.description")}
              actions={
                <Button
                  variant="ghost"
                  onClick={() => setFilter("all")}
                  className="rounded-full border border-border px-5"
                >
                  {t("empty.clearFilter")}
                </Button>
              }
            />
          ) : (
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              stagger={0.1}
            >
              {filtered.map((insight) => (
                <StaggerItem key={insight.id}>
                  <InsightCard insight={insight} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>
    </Section>
  );
}
