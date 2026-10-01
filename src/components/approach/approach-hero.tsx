import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "../shared/eyebrow-badge";

export async function ApproachHero() {
  const t = await getTranslations("approach.hero");

  return (
    <Section spacing="md">
      <Container>
        <div className="max-w-3xl">
          <Reveal direction="up">
            <EyebrowTag variant="sage" marker="→">
              {t("eyebrow")}
            </EyebrowTag>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-5 font-heading text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[52px] md:text-[60px]">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mt-6 max-w-2xl text-[19px] font-normal leading-relaxed text-muted-foreground sm:text-[21px]">
              {t("description")}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}