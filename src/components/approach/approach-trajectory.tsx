import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";
import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Steps (module scope)
   ═════════════════════════════════════════════════ */
const STEPS = ["assessment", "planning", "treatment", "followUp"] as const;

export async function ApproachTrajectory() {
  const t = await getTranslations("approach.trajectory");

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        {/* Heading */}
        <SectionHeadingReveal>
          <SectionHeading
            label={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12"
          />
        </SectionHeadingReveal>

        {/* Steps grid */}
        <Stagger
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          stagger={0.1}
        >
          {STEPS.map((key, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <StaggerItem key={key}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col justify-between",
                    "overflow-hidden rounded-2xl",
                    "border border-border bg-background p-6 sm:p-7",
                    "transition-[border-color,box-shadow] duration-300",
                    "hover:border-sage/40",
                    "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]",
                  )}
                >
                  {/* Top accent */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-0 top-0 h-0.5
                      origin-left scale-x-0
                      bg-linear-to-r from-sage to-clay
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />

                  <div>
                    {/* Number + dot */}
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-[13px] font-bold tracking-[0.14em] text-clay">
                        {number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full bg-primary"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-heading text-[18px] font-semibold leading-snug text-primary sm:text-[20px]">
                      {t(`steps.${key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-foreground/80">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mt-5 border-t border-border pt-4 text-[12.5px] leading-relaxed text-muted-foreground">
                    {t(`steps.${key}.details`)}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}