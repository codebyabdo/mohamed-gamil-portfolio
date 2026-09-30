"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

import { CasesFilter } from "./cases-filter";
import { CaseCard } from "@/components/case-study/case-Card";
import { Stagger, StaggerItem } from "@/components/motion";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

import type { CaseStudy } from "@/types/case-study";
import { Section } from "../ui/section";
import { Container } from "../ui/container";

interface CasesListProps {
  cases: CaseStudy[];
}

export function CasesList({ cases }: CasesListProps) {
  const t = useTranslations("cases");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return cases;
    return cases.filter((c) => c.category === filter);
  }, [cases, filter]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: cases.length };
    for (const c of cases) {
      result[c.category] = (result[c.category] ?? 0) + 1;
    }
    return result;
  }, [cases]);

  return (
    <Section spacing="md">
      <Container>
        <CasesFilter value={filter} onChange={setFilter} counts={counts} />

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
            <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((caseStudy) => (
                <StaggerItem key={caseStudy.id}>
                  <CaseCard caseStudy={caseStudy} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>
    </Section>
  );
}
