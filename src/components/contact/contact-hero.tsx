import { MessageCircle, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";

export async function ContactHero() {
  const t = await getTranslations("contact.hero");

  const whatsappUrl = getWhatsAppChatUrl();

  return (
    <Section spacing="md">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="up">
            <div className="flex justify-center mb-4">
              <EyebrowTag variant="sage" marker="→">
                {t("eyebrow")}
              </EyebrowTag>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h1 className="mt-5 font-heading text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[52px] md:text-[60px]">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground sm:text-[19px]">
              {t("description")}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {/* Primary — WhatsApp */}
              <Button
                render={
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                size="lg"
                className="rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
              >
                <MessageCircle className="me-2 size-4" />
                {t("primaryCta")}
              </Button>

              {/* Secondary — Request booking */}
              <Button
                render={<a href="#booking" />}
                variant="ghost"
                size="lg"
                className="rounded-full border border-border-strong/60 bg-transparent px-6 font-heading text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary/3"
              >
                <Calendar className="me-2 size-4" />
                {t("secondaryCta")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
