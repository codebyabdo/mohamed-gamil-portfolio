import { Reveal } from "@/components/motion";
import { ImageWithCaption } from "@/components/shared/image-with-caption";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { CaseStudy } from "@/types/case-study";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
interface CaseDetailProps {
  caseStudy: CaseStudy;
}

export async function CaseHero({ caseStudy }: CaseDetailProps) {
  const t = await getTranslations("cases");

  const title = t(`items.${caseStudy.id}.title`);
  const category = t(`items.${caseStudy.id}.category`);
  const summary = t(`items.${caseStudy.id}.summary`);
  const imageAlt = t(`items.${caseStudy.id}.imageAlt`);

  return (
    <Section spacing="md">
      <Container>
        <Reveal direction="up">
          <Link
            href="/cases"
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
            <span>{t("detail.backToCases")}</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading */}
          <div className="order-1 lg:col-span-7">
            <SectionHeadingReveal>
              <SectionHeading
                label={category}
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
                    {caseStudy.duration}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Tag aria-hidden="true" className="size-4 text-clay" />
                  <span className="font-medium text-primary">{category}</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal direction="up" delay={0.1} className="order-2 lg:col-span-5">
            <ImageWithCaption
              src={caseStudy.image}
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
