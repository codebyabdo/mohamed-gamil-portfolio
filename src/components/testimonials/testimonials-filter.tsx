"use client";

import { useTranslations } from "next-intl";

import {
  FilterChips,
  type FilterOption,
} from "@/components/shared/filter-chips";

export type TestimonialFilter = "all" | "written" | "video" | "caseLinked";

interface TestimonialsFilterProps {
  value: TestimonialFilter;
  onChange: (value: TestimonialFilter) => void;
  counts?: Record<string, number>;
}

export function TestimonialsFilter({
  value,
  onChange,
  counts,
}: TestimonialsFilterProps) {
  const t = useTranslations("testimonials.filter");

  const options: FilterOption[] = [
    { value: "all", label: t("all"), count: counts?.all },
    { value: "written", label: t("written"), count: counts?.written },
    { value: "video", label: t("video"), count: counts?.video },
    {
      value: "caseLinked",
      label: t("caseLinked"),
      count: counts?.caseLinked,
    },
  ];

  return (
    <FilterChips
      options={options}
      value={value}
      onChange={(v) => onChange(v as TestimonialFilter)}
      layoutId="testimonials-filter"
      aria-label={t("ariaLabel")}
    />
  );
}