import { getTranslations } from "next-intl/server";
import {
  Activity,
  Award,
  Briefcase,
  Clock,
  HeartPulse,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";

/* ═════════════════════════════════════════════════
   Static data — icons & variant mapping
   (module scope — React Compiler safe)
   ═════════════════════════════════════════════════ */

const STATS = [
  { key: "years", Icon: Clock, suffix: "+" },
  { key: "patients", Icon: Users, suffix: "+" },
  { key: "specialties", Icon: Award, suffix: "" },
  { key: "satisfaction", Icon: HeartPulse, suffix: "%" },
] as const;

const CASE_TYPES = [
  { key: "sports", Icon: Zap },
  { key: "postSurgery", Icon: Activity },
  { key: "chronic", Icon: Stethoscope },
  { key: "preventive", Icon: Briefcase },
] as const;

/* ═════════════════════════════════════════════════
   Component
   ═════════════════════════════════════════════════ */
export async function ProfessionalIdentity() {
  const t = await getTranslations("about.identity");

  return (
    <Section spacing="md">
      <Container>
        {/* ── Section header ───────────────────────── */}
        <Reveal direction="up">
          <SectionHeading
            label={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12"
          />
        </Reveal>

        {/* ═══════════════════════════════════════════
            Row 1 — Bio + Stats
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Bio */}
          <Reveal direction="up" className="lg:col-span-7">
            <article className="h-full rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
              <h3 className="mb-4 font-heading text-xl font-semibold text-primary sm:text-2xl">
                {t("bio.title")}
              </h3>

              <div className="space-y-4">
                <p className="text-[15px] leading-relaxed text-foreground/80 sm:text-base">
                  {t("bio.p1")}
                </p>
                <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {t("bio.p2")}
                </p>
              </div>

              {/* Specialties — chips */}
              <div className="mt-8">
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("bio.specialtiesLabel")}
                </span>

                <ul className="flex flex-wrap gap-2">
                  {["ortho", "sports", "neuro", "pediatric"].map((key) => (
                    <li
                      key={key}
                      className="
                        inline-flex items-center gap-1.5
                        rounded-full border border-border
                        bg-background px-3 py-1.5
                        text-[12.5px] font-medium text-primary
                        transition-colors duration-200
                        hover:border-sage/50 hover:bg-sage/5
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-sage"
                      />
                      {t(`bio.specialties.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Stats */}
          <Reveal direction="up" delay={0.1} className="lg:col-span-5">
            <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ key, Icon, suffix }) => (
                <div
                  key={key}
                  className="
                    group relative flex flex-col justify-between
                    overflow-hidden rounded-2xl
                    border border-border bg-surface p-5 sm:p-6
                    transition-colors duration-300
                    hover:border-sage/40
                  "
                >
                  {/* Icon */}
                  <div className="mb-5 grid size-9 place-items-center rounded-lg bg-background">
                    <Icon aria-hidden="true" className="size-4 text-sage" />
                  </div>

                  {/* Number */}
                  <div>
                    <span className="block font-display text-3xl font-bold leading-none tracking-[-0.02em] text-primary sm:text-4xl">
                      <Counter to={Number(t(`stats.${key}.value`))} />
                      <span className="text-clay">{suffix}</span>
                    </span>

                    <span className="mt-2 block text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {t(`stats.${key}.label`)}
                    </span>
                  </div>

                  {/* Hover accent */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-x-0 bottom-0 h-0.5
                      origin-left scale-x-0 bg-linear-to-r from-sage to-clay
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ═══════════════════════════════════════════
            Row 2 — Case types
            ═══════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-14">
          <Reveal direction="up">
            <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t("casesLabel")}
            </span>
          </Reveal>

          <Stagger
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            stagger={0.08}
          >
            {CASE_TYPES.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <article
                  className="
                    group h-full
                    rounded-2xl border border-border
                    bg-surface p-5
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-sage/40
                    hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]
                  "
                >
                  <div className="mb-4 grid size-9 place-items-center rounded-lg border border-border/60 bg-background">
                    <Icon aria-hidden="true" className="size-4 text-primary" />
                  </div>

                  <h4 className="font-heading text-[15px] font-semibold text-primary">
                    {t(`cases.${key}.title`)}
                  </h4>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {t(`cases.${key}.description`)}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
