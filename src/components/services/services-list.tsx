"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SERVICES } from "@/content/service-item";
import { SectionHeading } from "@/components/shared/Section-heading";
import { ServiceCard } from "./service-card";

export function ServicesList() {
  const t = useTranslations("services");

  return (
    <Section spacing="md">
      <Container>
        {/* ── Section header ─────────────────────── */}
        <div className="mb-12 max-w-3xl">
          {/* ── Heading ─────────────────────────────── */}
          <Reveal direction="up">
            <SectionHeading
              label={t("showcase.eyebrow")}
              title={t("showcase.title")}
              description={t("showcase.description")}
              className="mb-12"
            />
          </Reveal>
        </div>

        {/* ── Grid of services ───────────────────── */}
        <Stagger
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          stagger={0.1}
          amount={0.1}
        >
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                slug={service.slug}
                index={index}
                title={t(`items.${service.id}.title`)}
                description={t(`items.${service.id}.description`)}
                keyFocus={t(`items.${service.id}.keyFocus`)}
                exploreLabel={t("showcase.exploreService")}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
