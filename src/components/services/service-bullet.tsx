import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "../motion";
import { Container } from "../ui/container";
import { Section } from "../ui/section";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../shared/Section-heading";

export async function ServiceBullet() {
  const t = await getTranslations("services");

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        {/* ── Heading ─────────────────────────────── */}
          <Reveal direction="up">
            <SectionHeading
              label={t("eyebrow")}
              title={t("detail.includedTitle")}
              description={t("description")}
              className="mb-12"
            />
          </Reveal>

        <Stagger
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          stagger={0.1}
        >
          {(["assessment", "treatment", "followUp"] as const).map((key) => (
            <StaggerItem key={key}>
              <div className="rounded-2xl border border-border bg-background p-6">
                <CheckCircle2
                  aria-hidden="true"
                  className="mb-4 size-5 text-sage"
                />
                <h3 className="font-heading text-[16px] font-semibold text-primary">
                  {t(`detail.included.${key}.title`)}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {t(`detail.included.${key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
