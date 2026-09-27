"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { TRAJECTORY_STAGES } from "@/content/trajectory";

import { SectionHeading } from "../shared/Section-heading";
import { Section } from "../ui/section";
import { Container } from "../ui/container";

export function InteractiveTrajectory() {
  const t = useTranslations("trajectory");

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStage = TRAJECTORY_STAGES[activeStepIndex];

  const activeStageKey = activeStage.step as "01" | "02" | "03" | "04";

  const activeTitle = t(`stages.${activeStageKey}.title`);

  const activeShort = t(`stages.${activeStageKey}.short`);

  const activeAction = t(`stages.${activeStageKey}.action`);

  const activeTakeaway = t(`stages.${activeStageKey}.takeaway`);

  const activeMindset = t(`stages.${activeStageKey}.mindset`);

  return (
    <Section spacing="md">
      <Container>
        <SectionHeading
          label={t("showcase.eyebrow")}
          title={t("showcase.title")}
          description={t("showcase.description")}
        />

        {/* Trajectory Connector Visual */}
        <div className="relative mb-8">
          {/* Desktop trajectory */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-7 z-0 hidden h-10 lg:block"
          >
            <svg
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M 50 20 C 300 8, 700 32, 950 18"
                stroke="var(--color-primary)"
                strokeOpacity="0.18"
                strokeWidth="1.75"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Step Selector */}
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {TRAJECTORY_STAGES.map((stage, index) => {
              const isSelected = index === activeStepIndex;

              const stageKey = stage.step as "01" | "02" | "03" | "04";

              const title = t(`stages.${stageKey}.title`);

              const [titlePart, subtitlePart] = title.split("·");

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  aria-pressed={isSelected}
                  className={[
                    "text-start rounded-2xl border p-4 sm:p-5",
                    "transition-all duration-300 ease-out",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-(--focus-ring-color)",
                    "focus-visible:ring-offset-2",
                    isSelected
                      ? "border-sage bg-surface shadow-sm -translate-y-0.5"
                      : "border-border bg-background hover:border-border-strong hover:bg-surface/60",
                  ].join(" ")}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span
                      className={[
                        "font-mono text-[13px] font-bold tracking-wider",
                        isSelected ? "text-clay" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {stage.step}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "size-2.5 shrink-0 rounded-full transition-colors duration-300",
                        isSelected ? "bg-primary" : "bg-border-strong",
                      ].join(" ")}
                    />
                  </div>

                  <h4
                    className={[
                      "font-heading text-[15px] font-semibold sm:text-[16.5px]",
                      "transition-colors duration-300",
                      isSelected ? "text-primary" : "text-foreground",
                    ].join(" ")}
                  >
                    {titlePart?.trim()}
                  </h4>

                  {subtitlePart && (
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground sm:text-[13px]">
                      {subtitlePart.trim()}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage */}
        <div className="rounded-3xl border border-border bg-surface p-6 transition-all sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Main Stage */}
            <div className="lg:col-span-7">
              <div className="mb-2 inline-flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-clay">
                  {t("showcase.phase", {
                    step: activeStage.step,
                  })}
                </span>

                <span aria-hidden="true" className="h-px w-4 bg-clay/40" />
              </div>

              <h3 className="text-h3 mb-3 text-primary">{activeTitle}</h3>

              <p className="text-body-lg mb-6 text-foreground">{activeShort}</p>

              <div className="space-y-4 border-t border-border pt-4">
                <div>
                  <span className="mb-1 block text-xs font-semibold tracking-wider text-sage">
                    {t("showcase.clinicalAction")}
                  </span>

                  <p className="text-body-sm text-primary">{activeAction}</p>
                </div>

                <div>
                  <span className="mb-1 block text-xs font-semibold tracking-wider text-sage">
                    {t("showcase.yourTakeaway")}
                  </span>

                  <p className="text-body-sm text-primary">{activeTakeaway}</p>
                </div>
              </div>
            </div>

            {/* Side Card */}
            <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-6 sm:p-7 lg:col-span-5">
              <div>
                <span className="mb-3 block text-xs font-semibold tracking-wider text-sage">
                  {t("showcase.kineticMentalTrajectory")}
                </span>

                <div className="mb-5 rounded-xl border border-border bg-surface/80 p-4 text-sm font-medium leading-relaxed text-primary">
                  {activeMindset}
                </div>

                <p className="text-body-sm text-muted-foreground">
                  {t("showcase.trajectoryDescription")}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-6">
                <span className="text-xs text-muted-foreground">
                  {t("showcase.evidenceModel")}
                </span>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-sage"
                >
                  <span>{t("showcase.fullMethodology")}</span>

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
