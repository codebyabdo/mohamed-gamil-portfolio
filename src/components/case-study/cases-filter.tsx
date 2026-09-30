"use client";

import { useTranslations } from "next-intl";

import { FilterChips, type FilterOption } from "@/components/shared/filter-chips";

interface CasesFilterProps {
  value: string;
  onChange: (value: string) => void;
  counts?: Record<string, number>;
}

export function CasesFilter({ value, onChange, counts }: CasesFilterProps) {
  const t = useTranslations("cases.filter");

  const options: FilterOption[] = [
    { value: "all", label: t("all"), count: counts?.all },
    { value: "shoulder", label: t("shoulder"), count: counts?.shoulder },
    { value: "spine", label: t("spine"), count: counts?.spine },
    { value: "sports", label: t("sports"), count: counts?.sports },
  ];

  return (
    <FilterChips
      options={options}
      value={value}
      onChange={onChange}
      layoutId="cases-filter"
      aria-label={t("ariaLabel")}
    />
  );
}