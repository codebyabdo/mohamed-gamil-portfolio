import { getTranslations } from "next-intl/server";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { ImageWithCaption } from "@/components/shared/image-with-caption";
import { SectionHeading } from "../shared/Section-heading";
import { SectionHeadingReveal } from "../shared/section-heading-reveal";

import type { ServiceItem } from "@/types/service-item";

interface ServiceDetailProps {
  service: ServiceItem;
}

export async function ServiceHero({ service }: ServiceDetailProps) {
  const t = await getTranslations("services");

  const title = t(`items.${service.id}.title`);
  const description = t(`items.${service.id}.description`);
  const keyFocus = t(`items.${service.id}.keyFocus`);
  const imageAlt = t(`items.${service.id}.imageAlt`);

  return (
      <Section spacing="md">
        <Container>
          {/* Back link */}
          <Reveal direction="up">
            <Link
              href="/services"
              className="
                group mb-8 inline-flex items-center gap-2
                font-heading text-[13px] font-semibold
                text-muted-foreground
                transition-colors duration-300
                hover:text-primary
              "
            >
              <ArrowLeft
                aria-hidden="true"
                className="
                  size-4 transition-transform duration-300
                  group-hover:-translate-x-1
                  rtl:rotate-180 rtl:group-hover:translate-x-1
                "
              />
              <span>{t("detail.backToServices")}</span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Heading */}
            <div className="order-1 lg:col-span-7">
              <SectionHeadingReveal>
                <SectionHeading
                  label={t("showcase.areasOfCare")}
                  title={title}
                  description={description}
                  className="mb-0"
                />
              </SectionHeadingReveal>

              {/* Key focus */}
              <Reveal direction="up" delay={0.15}>
                <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                    {t("showcase.clinicalFocus")}
                  </span>
                  <p className="mt-2 text-[15px] leading-relaxed text-primary">
                    {keyFocus}
                  </p>
                </div>
              </Reveal>

              {/* CTAs */}
              <Reveal direction="up" delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    render={<Link href="/contact" />}
                    size="lg"
                    className="rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
                  >
                    <Calendar className="me-2 size-4" />
                    {t("detail.bookCta")}
                  </Button>

                  <Button
                    render={<Link href="/contact" />}
                    variant="ghost"
                    size="lg"
                    className="rounded-full border border-border-strong/60 bg-transparent px-6 font-heading text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/30 hover:bg-primary/3"
                  >
                    <MessageCircle className="me-2 size-4" />
                    {t("detail.askCta")}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Image */}
            <Reveal
              direction="up"
              delay={0.1}
              className="order-2 lg:col-span-5"
            >
              <ImageWithCaption
                src={service.image ?? "/service/doctor.png"}
                alt={imageAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                aspect="aspect-[4/5]"
                overlay="soft"
                className="rounded-3xl shadow-[0_24px_60px_-20px_rgb(24_59_58/0.15)]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>
  );
}
