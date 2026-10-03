import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_KEYS = ["booking", "preparation", "consultation", "service"] as const;

export async function ContactFAQ() {
  const t = await getTranslations("contact.faq");

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal direction="up">
            <EyebrowTag variant="sage" marker="→">
              {t("title")}
            </EyebrowTag>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="mt-8">
              <Accordion>
                {FAQ_KEYS.map((key) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger>
                      {t(`items.${key}.question`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t(`items.${key}.answer`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
