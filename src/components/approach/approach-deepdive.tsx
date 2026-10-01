import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-badge";

const CARDS = ["listen", "testing"] as const;

export async function ApproachDeepdive() {
  const t = await getTranslations("approach.deepdive");

  return (
    <Section spacing="md">
      <Container>
        <Reveal direction="up">
          <EyebrowTag variant="clay" marker="→">
            {t("eyebrow")}
          </EyebrowTag>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map((key, index) => (
            <Reveal key={key} direction="up" delay={index * 0.1}>
              <article className="h-full rounded-2xl border border-border bg-surface p-8 lg:p-10">
                <h3 className="font-heading text-[20px] font-semibold leading-snug text-primary sm:text-[22px]">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                  {t(`cards.${key}.description`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}