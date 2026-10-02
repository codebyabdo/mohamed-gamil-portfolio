"use client";

import { useTranslations } from "next-intl";

import {
  FilterChips,
  type FilterOption,
} from "@/components/shared/filter-chips";

// export type InsightFilter = "all" | "articles" | "guides" | "videos" | "social";

interface InsightsFilterProps {
  value: string;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
}

export function InsightsFilter({
  value,
  onChange,
  counts,
}: InsightsFilterProps) {
  const t = useTranslations("insights.filter");

  const options: FilterOption[] = [
    { value: "all", label: t("all"), count: counts?.all },
    { value: "articles", label: t("articles"), count: counts?.articles },
    { value: "guides", label: t("guides"), count: counts?.guides },
    { value: "videos", label: t("videos"), count: counts?.videos },
    { value: "social", label: t("social"), count: counts?.social },
  ];

  return (
    <FilterChips
      options={options}
      value={value}
      onChange={onChange}
      layoutId="insights-filter"
      aria-label={t("ariaLabel")}
    />
  );
}
