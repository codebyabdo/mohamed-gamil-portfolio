import { getTranslations } from "next-intl/server";
import { Activity, Target, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/shared/Section-heading";
import { SectionHeadingReveal } from "@/components/shared/section-heading-reveal";

const HIGHLIGHTS = [
  { key: "assessment", Icon: Activity },
  { key: "approach", Icon: Target },
  { key: "progress", Icon: TrendingUp },
] as const;

interface ServiceOverviewProps {
  serviceId: string;
}

export async function ServiceOverview({ serviceId }: ServiceOverviewProps) {
  const t = await getTranslations("services");

  return (
    <Section spacing="md">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — narrative */}
          <div className="lg:col-span-7">
            <SectionHeadingReveal>
              <SectionHeading
                label={t(`overview.${serviceId}.eyebrow`)}
                title={t(`overview.${serviceId}.title`)}
                description={t(`overview.${serviceId}.p1`)}
                className="mb-0"
              />
            </SectionHeadingReveal>

            <Reveal direction="up" delay={0.1}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-muted-foreground">
                {t(`overview.${serviceId}.p2`)}
              </p>
            </Reveal>
          </div>

          {/* Right — highlights */}
          <Stagger
            className="space-y-4 lg:col-span-5"
            stagger={0.1}
            amount={0.3}
          >
            {HIGHLIGHTS.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background">
                    <Icon aria-hidden="true" className="size-4 text-sage" />
                  </span>

                  <div>
                    <h3 className="font-heading text-[15px] font-semibold text-primary">
                      {t(`overview.${serviceId}.highlights.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                      {t(`overview.${serviceId}.highlights.${key}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
