import { MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getWhatsAppChatUrl, getPhoneUrl } from "@/lib/whatsapp";

const METHODS = [
  {
    key: "whatsapp",
    Icon: MessageCircle,
    accent: "text-sage",
    bg: "bg-sage/5",
    border: "border-sage/20",
    href: "whatsapp",
  },
  {
    key: "phone",
    Icon: Phone,
    accent: "text-clay",
    bg: "bg-clay/5",
    border: "border-clay/20",
    href: "phone",
  },
] as const;

export async function ContactMethods() {
  const t = await getTranslations("contact.methods");

  const hrefs = {
    whatsapp: getWhatsAppChatUrl(),
    phone: getPhoneUrl(),
  };

  return (
    <Section spacing="md">
      <Container>
        <Reveal direction="up">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
            {t("title")}
          </h2>
        </Reveal>

        <Stagger
          className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2"
          stagger={0.1}
        >
          {METHODS.map(({ key, Icon, accent, bg, border }) => (
            <StaggerItem key={key}>
              <a
                href={hrefs[key]}
                target={key === "whatsapp" ? "_blank" : undefined}
                rel={key === "whatsapp" ? "noopener noreferrer" : undefined}
                className={`
                  group flex h-full flex-col items-start gap-4
                  rounded-2xl border ${border} ${bg}
                  p-6 lg:p-8
                  transition-[border-color,box-shadow,transform] duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]
                `}
              >
                <span
                  className={`
                    grid size-12 place-items-center rounded-2xl
                    border ${border} bg-background
                  `}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-5 ${accent}`}
                  />
                </span>

                <div>
                  <h3 className="font-heading text-[18px] font-semibold text-primary sm:text-[20px]">
                    {t(key)}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                    {t(`${key}Description`)}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}