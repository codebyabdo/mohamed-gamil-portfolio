import { getLocale, getTranslations } from "next-intl/server";
import { Check, MapPin, Sparkles, Volume2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ImageWithCaption } from "@/components/shared/image-with-caption";
import { SectionHeading } from "@/components/shared/Section-heading";

/* ═════════════════════════════════════════════════
   Module-scope data
   ═════════════════════════════════════════════════ */
const FEATURES = [
  { key: "schedule", Icon: Check },
  { key: "equipment", Icon: Sparkles },
  { key: "quiet", Icon: Volume2 },
] as const;

const LOCATIONS = ["newCairo", "maadi"] as const;

export async function ClinicalEnvironment() {
  const t = await getTranslations("about.clinical");
  const locale = await getLocale();

  return (
    <Section spacing="md">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-1 lg:col-span-6">
            {/* ── Heading ─────────────────────────────── */}
            <Reveal direction="up">
              <SectionHeading
                label={t("eyebrow")}
                title={t("title")}
                description={t("description")}
                className="mb-12"
              />
            </Reveal>

            {/* ── Features ──────────────────────────── */}
            <Stagger className="mt-8 space-y-4" stagger={0.08} amount={0.3}>
              {FEATURES.map(({ key, Icon }) => (
                <StaggerItem key={key}>
                  <div className="flex items-start gap-3">
                    <span
                      className="
                        mt-0.5 grid size-6 shrink-0 place-items-center
                        rounded-full border border-sage/30 bg-sage/10
                      "
                    >
                      <Icon aria-hidden="true" className="size-3.5 text-sage" />
                    </span>

                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-primary">
                        {t(`features.${key}.title`)}
                      </h3>
                      <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {t(`features.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* ── Locations ─────────────────────────── */}
            <Reveal direction="up" delay={0.15}>
              <div className="mt-8 border-t border-border pt-6">
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("locationsLabel")}
                </span>

                <ul className="flex flex-wrap gap-2">
                  {LOCATIONS.map((key) => (
                    <li
                      key={key}
                      className="
                        inline-flex items-center gap-1.5
                        rounded-full border border-border
                        bg-surface px-3 py-1.5
                        text-[12.5px] font-medium text-primary
                        transition-colors duration-200
                        hover:border-sage/40 hover:bg-sage/5
                      "
                    >
                      <MapPin aria-hidden="true" className="size-3 text-sage" />
                      {t(`locations.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── Image ────────────────────────────── */}
          <Reveal
            direction={locale === "ar" ? "left" : "right"}
            delay={0.1}
            className="order-2 lg:col-span-6"
          >
            <ImageWithCaption
              src="/about/clinic.png"
              alt={t("imageAlt")}
              title={t("imageCaption.title")}
              subtitle={t("imageCaption.subtitle")}
              sizes="(max-width: 1024px) 100vw, 50vw"
              aspect="aspect-[16/10]"
              overlay="medium"
              position="bottom-start"
              className="rounded-3xl shadow-[0_24px_60px_-20px_rgb(24_59_58/0.15)]"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
