"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Shield } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

import type { InquiryType, PreferredTime } from "@/types/contact";

const INQUIRY_OPTIONS: InquiryType[] = [
  "sportsInjuries",
  "backPain",
  "jointPain",
  "rehabilitation",
  "general",
];

const TIME_OPTIONS: PreferredTime[] = ["morning", "evening", "anytime"];

export function BookingRequestForm() {
  const t = useTranslations("contact.booking");
  const tInquiries = useTranslations("contact.inquiries");
  const locale = useLocale() as "ar" | "en";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState<InquiryType | "">("");
  const [preferredTime, setPreferredTime] = useState<PreferredTime | "">("");

  const isValid =
    name.trim().length >= 2 &&
    phone.trim().length >= 8 &&
    inquiry !== "" &&
    preferredTime !== "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const url = createWhatsAppUrl({
      name: name.trim(),
      phone: phone.trim(),
      inquiry: tInquiries(inquiry as InquiryType),
      preferredTime: t(preferredTime as PreferredTime),
      locale,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        <div id="booking" className="mx-auto max-w-2xl">
          {/* Heading */}
          <Reveal direction="up">
            <div className="text-center">
              <EyebrowTag variant="sage" marker="→">
                {t("eyebrow")}
              </EyebrowTag>
              <h2 className="mt-5 font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                {t("description")}
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="up" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="
                mt-10 rounded-3xl
                border border-border bg-background
                p-6 sm:p-8
                shadow-[0_2px_4px_rgb(24_59_58/0.03),0_24px_60px_-20px_rgb(24_59_58/0.12)]
              "
            >
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-heading text-[13.5px] font-semibold text-primary"
                  >
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    required
                    className={cn(
                      "w-full rounded-xl border border-border bg-surface px-4 py-3",
                      "text-[14.5px] text-primary placeholder:text-muted-foreground/60",
                      "outline-none transition-colors duration-200",
                      "focus:border-sage focus:ring-2 focus:ring-sage/20",
                    )}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-heading text-[13.5px] font-semibold text-primary"
                  >
                    {t("phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    dir="ltr"
                    required
                    className={cn(
                      "w-full rounded-xl border border-border bg-surface px-4 py-3",
                      "text-[14.5px] text-primary placeholder:text-muted-foreground/60",
                      "outline-none transition-colors duration-200",
                      "focus:border-sage focus:ring-2 focus:ring-sage/20",
                    )}
                  />
                </div>

                {/* Inquiry */}
                <div>
                  <label
                    htmlFor="inquiry"
                    className="mb-2 block font-heading text-[13.5px] font-semibold text-primary"
                  >
                    {t("inquiry")}
                  </label>
                  <select
                    id="inquiry"
                    value={inquiry}
                    onChange={(e) =>
                      setInquiry(e.target.value as InquiryType | "")
                    }
                    required
                    className={cn(
                      "w-full rounded-xl border border-border bg-surface px-4 py-3",
                      "text-[14.5px] text-primary",
                      "outline-none transition-colors duration-200",
                      "focus:border-sage focus:ring-2 focus:ring-sage/20",
                      !inquiry && "text-muted-foreground/60",
                    )}
                  >
                    <option value="" disabled>
                      {t("inquiryPlaceholder")}
                    </option>
                    {INQUIRY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {tInquiries(option)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Time — radio group */}
                <div>
                  <span className="mb-2 block font-heading text-[13.5px] font-semibold text-primary">
                    {t("preferredTime")}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TIME_OPTIONS.map((option) => {
                      const isActive = preferredTime === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPreferredTime(option)}
                          aria-pressed={isActive}
                          className={cn(
                            "rounded-full border px-4 py-2",
                            "text-[13px] font-medium",
                            "transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50",
                            isActive
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-primary",
                          )}
                        >
                          {t(option)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!isValid}
                    size="lg"
                    className="w-full rounded-full bg-primary px-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90 disabled:opacity-50"
                  >
                    <MessageCircle className="me-2 size-4" />
                    {t("submit")}
                  </Button>
                </div>

                {/* Privacy note */}
                <p className="flex items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
                  <Shield
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-sage"
                  />
                  <span>{t("privacyNote")}</span>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}