import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "../shared/Section-heading";

export async function CasesHero() {
  const t = await getTranslations("cases.showcase");

  return (
    <Section spacing="sm">
      <Container>
        <div className="max-w-3xl">
          {/* ── Heading ─────────────────────────────── */}
          <Reveal direction="up">
            <SectionHeading
              label={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              className="mb-12"
            />
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mt-8">
              <Button
                render={<Link href="/contact" />}
                size="lg"
                className="rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
              >
                {t("cta")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}