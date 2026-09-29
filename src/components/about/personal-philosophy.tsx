import { Compass, Heart, Shield } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "../shared/Section-heading";

/* ═════════════════════════════════════════════════
   Icons (module scope — React Compiler safe)
   ═════════════════════════════════════════════════ */
const VALUES = [
  {
    key: "dignity",
    Icon: Heart,
    accentClass: "text-clay",
    ringClass: "bg-clay/10",
  },
  {
    key: "precision",
    Icon: Compass,
    accentClass: "text-sage",
    ringClass: "bg-sage/10",
  },
  {
    key: "sufficiency",
    Icon: Shield,
    accentClass: "text-primary",
    ringClass: "bg-primary/10",
  },
] as const;

export async function PersonalPhilosophy() {
  const t = await getTranslations("about.philosophy");

  return (
    <Section spacing="sm">
      <Container>
        {/* ── Heading ─────────────────────────────── */}
        <Reveal direction="up">
          <SectionHeading
            label={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12"
          />
        </Reveal>

        {/* ── Values grid ─────────────────────────── */}
        <Stagger
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          stagger={0.12}
        >
          {VALUES.map(({ key, Icon, accentClass, ringClass }) => (
            <StaggerItem key={key}>
              <article
                className="
                  group relative h-full
                  rounded-2xl border border-border
                  bg-surface p-8
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-sage/40
                  hover:shadow-[0_18px_40px_-20px_rgb(24_59_58/0.15)]
                "
              >
                {/* Icon */}
                <div
                  className={`
                    mb-6 grid size-11 place-items-center rounded-xl
                    border border-border/60
                    transition-colors duration-300
                    group-hover:border-sage/30
                    ${ringClass}
                  `}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-5 ${accentClass}`}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-heading text-[17px] font-semibold leading-snug text-primary">
                  {t(`items.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.description`)}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
