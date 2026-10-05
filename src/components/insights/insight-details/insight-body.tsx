import { Quote, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

import type { InsightItem, InsightContent } from "@/types/insight";

interface InsightBodyProps {
  insight: InsightItem;
}

export async function InsightBody({ insight }: InsightBodyProps) {
  const tItems = await getTranslations("insights.items");

  /* ─────────────────────────────────────────────
     Read structured content from translations
     ───────────────────────────────────────────── */
  const content = tItems.raw(`${insight.id}.content`) as InsightContent;


  return (
    <Section spacing="md">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* ── Intro ─────────────────────────────── */}
          <Reveal direction="up">
            <p
              className="
                text-[19px] font-medium leading-[1.85] text-primary
                sm:text-[21px]
              "
            >
              {content.intro}
            </p>
          </Reveal>

          {/* ── Sections ──────────────────────────── */}
          <Stagger className="mt-12 space-y-10" stagger={0.1}>
            {content.sections?.map((section, index) => (
              <StaggerItem key={index}>
                <article className="group relative">
                  {/* Number badge */}
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="
                        grid size-8 place-items-center rounded-lg
                        border border-border bg-surface
                        font-mono text-[11px] font-semibold
                        text-sage transition-colors duration-300
                        group-hover:border-sage/40 group-hover:bg-sage/5
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-border"
                    />
                  </div>

                  {/* Heading */}
                  <h2
                    className="
                      font-heading text-[22px] font-semibold leading-snug
                      tracking-[-0.02em] text-primary sm:text-[26px]
                    "
                  >
                    {section.heading}
                  </h2>

                  {/* Body */}
                  <p
                    className="
                      mt-4 text-[16px] leading-[1.85] text-foreground/80
                      sm:text-[17px]
                    "
                  >
                    {section.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          {/* ── Quote ─────────────────────────────── */}
          {content.quote && (
            <Reveal direction="up" className="mt-14">
              <figure
                className="
                  relative overflow-hidden rounded-2xl
                  border border-border bg-surface
                  px-6 py-8 sm:px-10 sm:py-10
                "
              >
                {/* Decorative quote mark */}
                <Quote
                  aria-hidden="true"
                  className="
                    absolute inset-e-6 top-6 size-16 text-sage/10
                    sm:size-20
                  "
                />

                <blockquote
                  className="
                    relative font-heading text-[20px] font-medium italic
                    leading-relaxed text-primary
                    sm:text-[24px]
                  "
                >
                  &ldquo;{content.quote}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          )}

          {/* ── Takeaway ──────────────────────────── */}
          {content.takeaway && (
            <Reveal direction="up" className="mt-10">
              <aside
                className="
                  flex items-start gap-4 rounded-2xl
                  border border-sage/30 bg-sage/4
                  p-5 sm:p-6
                "
              >
                <span
                  className="
                    grid size-9 shrink-0 place-items-center
                    rounded-lg border border-sage/30 bg-background
                  "
                >
                  <Sparkles
                    aria-hidden="true"
                    className="size-4 text-sage"
                  />
                </span>

                <p
                  className="
                    text-[15px] font-medium leading-relaxed text-primary
                    sm:text-[15.5px]
                  "
                >
                  {content.takeaway}
                </p>
              </aside>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}