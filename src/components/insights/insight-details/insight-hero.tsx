import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";
import { ImageWithCaption } from "@/components/shared/image-with-caption";

import type { InsightItem } from "@/types/insight";

interface InsightHeroProps {
  insight: InsightItem;
}

export async function InsightHero({ insight }: InsightHeroProps) {
  const t = await getTranslations("insights");
  const tItems = await getTranslations("insights.items");

  const title = tItems(`${insight.id}.title`);
  const summary = tItems(`${insight.id}.summary`);
  const categoryLabel = tItems(`${insight.id}.categoryLabel`);
  const topic = tItems(`${insight.id}.topic`);
  const meta = tItems(`${insight.id}.readTimeOrDuration`);

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  }).format(new Date(insight.publishedDate));

  return (
    <Section spacing="md">
      <Container>
        {/* Back link */}
        <Reveal direction="up">
          <Link
            href="/insights"
            className="
              group mb-8 inline-flex items-center gap-2
              font-heading text-[13px] font-semibold
              text-muted-foreground transition-colors duration-300
              hover:text-primary
            "
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
            />
            <span>{t("detail.backToInsights")}</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading */}
          <div className="order-1 lg:col-span-7">
            <SectionHeadingReveal>
              <SectionHeading
                label={topic}
                title={title}
                description={summary}
                className="mb-0"
              />
            </SectionHeadingReveal>

            {/* Meta */}
            <Reveal direction="up" delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar aria-hidden="true" className="size-4 text-sage" />
                  <span className="font-medium text-primary">
                    {formattedDate}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="size-4 text-clay" />
                  <span className="font-medium text-primary">{meta}</span>
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                  {categoryLabel}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal direction="up" delay={0.1} className="order-2 lg:col-span-5">
            <ImageWithCaption
              src={insight.image}
              alt={title}
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