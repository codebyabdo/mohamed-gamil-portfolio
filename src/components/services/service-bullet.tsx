import { getTranslations } from "next-intl/server";
import { ClipboardCheck, HandHeart, Repeat } from "lucide-react";

import { Stagger, StaggerItem } from "../motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";

/* ═════════════════════════════════════════════════
   Included items — modulescope
   ═════════════════════════════════════════════════ */
const INCLUDED = [
  { key: "assessment", Icon: ClipboardCheck },
  { key: "treatment", Icon: HandHeart },
  { key: "followUp", Icon: Repeat },
] as const;

export async function ServiceBullet() {
  const t = await getTranslations("services");

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        {/* ── Heading ─────────────────────────────── */}
        <div className="mb-12">
          <SectionHeadingReveal>
            <SectionHeading
              label={t("eyebrow")}
              title={t("detail.includedTitle")}
              description={t("description")}
              className="mb-0"
            />
          </SectionHeadingReveal>
        </div>

        {/* ── Cards ───────────────────────────────── */}
        <Stagger
          className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
          stagger={0.1}
        >
          {INCLUDED.map(({ key, Icon }) => (
            <StaggerItem key={key}>
              <article
                className="
                  group relative flex h-full flex-col
                  overflow-hidden rounded-2xl
                  border border-border bg-background p-6
                  transition-[border-color,box-shadow] duration-300
                  hover:border-sage/40
                  hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]
                "
              >
                {/* Top accent line — grows on hover */}
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

                {/* Icon */}
                <span
                  className="
                    mb-5 grid size-10 place-items-center
                    rounded-xl border border-border/60 bg-surface
                    transition-colors duration-300
                    group-hover:border-sage/30 group-hover:bg-sage/5
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4.5 text-sage"
                  />
                </span>

                {/* Title */}
                <h3 className="font-heading text-[16px] font-semibold leading-snug text-primary">
                  {t(`detail.included.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                  {t(`detail.included.${key}.description`)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}