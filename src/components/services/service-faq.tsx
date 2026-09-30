import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceFAQProps {
  serviceId: string;
}

export async function ServiceFAQ({ serviceId }: ServiceFAQProps) {
  const t = await getTranslations("services");

  const questions = ["q1", "q2", "q3", "q4"] as const;

  return (
    <Section spacing="md">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — heading */}
          <div className="lg:col-span-4">
            <SectionHeadingReveal>
              <SectionHeading
                label={t("faq.eyebrow")}
                title={t("faq.title")}
                description={t("faq.description")}
                className="mb-0"
              />
            </SectionHeadingReveal>
          </div>

          {/* Right — accordion */}
          <Reveal direction="up" delay={0.1} className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-start font-heading text-[15px] font-semibold text-primary">
                    {t(`faq.items.${serviceId}.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground">
                    {t(`faq.items.${serviceId}.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
