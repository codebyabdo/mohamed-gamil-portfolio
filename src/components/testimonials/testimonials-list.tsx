"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SearchX } from "lucide-react";

import { TestimonialsFilter, type TestimonialFilter } from "./testimonials-filter";
import { TestimonialCard } from "./testimonial-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion";

import type { Testimonial } from "@/types/testimonial";

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

export function TestimonialsList({ testimonials }: TestimonialsListProps) {
  const t = useTranslations("testimonials");
  const [filter, setFilter] = useState<TestimonialFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return testimonials;
    // normalize `case-linked` → `caseLinked` for the filter key
    const normalizedType = filter === "caseLinked" ? "case-linked" : filter;
    return testimonials.filter((t) => t.type === normalizedType);
  }, [testimonials, filter]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: testimonials.length };
    for (const t of testimonials) {
      const key = t.type === "case-linked" ? "caseLinked" : t.type;
      result[key] = (result[key] ?? 0) + 1;
    }
    return result;
  }, [testimonials]);

  return (
    <div>
      <TestimonialsFilter value={filter} onChange={setFilter} counts={counts} />

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
          <Stagger
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {filtered.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  );
}