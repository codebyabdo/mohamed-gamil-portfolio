import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";
import { CONTACT_INFO } from "@/content/contact";

const ICONS = {
  address: MapPin,
  workingHours: Clock,
  phone: Phone,
  email: Mail,
} as const;

export async function ContactInformation() {
  const t = await getTranslations("contact.information");
  const locale = await getLocale();

  const isArabic = locale === "ar";

  const items = [
    {
      key: "address" as const,
      label: t("address"),
      value: isArabic ? CONTACT_INFO.address.ar : CONTACT_INFO.address.en,
    },
    {
      key: "workingHours" as const,
      label: t("workingHours"),
      value: isArabic
        ? `${CONTACT_INFO.workingHours.days.ar} · ${t("workingTime")}`
        : `${CONTACT_INFO.workingHours.days.en} · ${t("workingTime")}`,
    },
    {
      key: "phone" as const,
      label: t("phone"),
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
      dir: "ltr" as const,
    },
    {
      key: "email" as const,
      label: t("email"),
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      dir: "ltr" as const,
    },
  ];

  return (
    <Section spacing="md">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal direction="up">
            <EyebrowTag variant="sage" marker="→">
              {t("title")}
            </EyebrowTag>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
              {t("centerName")}
            </h2>
          </Reveal>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
            stagger={0.08}
          >
            {items.map((item) => {
              const Icon = ICONS[item.key];
              const content = (
                <>
                  <span className="mb-4 grid size-10 place-items-center rounded-xl border border-border/60 bg-surface">
                    <Icon
                      aria-hidden="true"
                      className="size-4 text-sage"
                    />
                  </span>

                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </span>

                  <span
                    className="mt-2 block text-[15px] font-medium leading-relaxed text-primary"
                    dir={item.dir}
                  >
                    {item.value}
                  </span>
                </>
              );

              const className = `
                group flex h-full flex-col items-start rounded-2xl
                border border-border bg-surface p-6
                transition-[border-color,box-shadow] duration-300
                hover:border-sage/40
                hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.12)]
              `;

              return (
                <StaggerItem key={item.key}>
                  {item.href ? (
                    <a href={item.href} className={className}>
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}