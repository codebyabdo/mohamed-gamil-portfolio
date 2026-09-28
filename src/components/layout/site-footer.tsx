import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { Container } from "@/components/ui/container";
import { SocialIconRow } from "./social-icon-row";
import { navigationItems } from "../navigation/navigation-config";
import { LanguageSwitcher } from "../navigation/language-switcher";
import { BrandLockup } from "../shared/brand-lockup";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("navigation");

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
      {/* ── Ambient top line ────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sage/40 to-transparent"
      />

      <Container className="relative pt-16 pb-10 sm:pt-20 sm:pb-12">
        {/* ── Main grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 border-b border-primary-foreground/10 pb-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="flex flex-col justify-between md:col-span-5">
            <div>
              {/* Brand lockup */}
              <BrandLockup theme="dark" />


              {/* Mission */}
              <p className="max-w-sm text-[14.5px] leading-relaxed text-primary-foreground/70">
                {t("mission")}
              </p>
            </div>

            {/* Social channels */}
            <div className="mt-8">
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">
                {t("digitalPlatforms")}
              </span>
              <SocialIconRow theme="dark" />
            </div>
          </div>

          {/* Quick navigation */}
          <nav
            aria-label={t("navigation.heading")}
            className="md:col-span-4"
          >
            <h3 className="mb-4 font-heading text-[14px] font-semibold uppercase tracking-widest text-primary-foreground/80">
              {t("navigation.heading")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {navigationItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="
                      group inline-flex items-center gap-1.5 py-1.5 text-[14px]
                      text-primary-foreground/70
                      transition-colors duration-200
                      hover:text-primary-foreground
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-clay/60 transition-all duration-300 group-hover:w-3 group-hover:bg-clay"
                    />
                    <span>{tNav(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Language */}
          <div className="flex flex-col justify-between md:col-span-3">
            <div>
              <h3 className="mb-4 font-heading text-[14px] font-semibold uppercase tracking-widest text-primary-foreground/80">
                {t("contact.heading")}
              </h3>
              <ul className="space-y-3 text-[13.5px] text-primary-foreground/70">
                <li className="flex items-start gap-2.5">
                  <Sparkles
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                  />
                  <span>{t("contact.sessions")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                  />
                  <span>{t("contact.location")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                  />
                  <a
                    href="tel:+201000000000"
                    dir="ltr"
                    className="transition-colors hover:text-primary-foreground"
                  >
                    +20 100 000 0000
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-clay"
                  />
                  <a
                    href="mailto:contact@drmohamedgamil.com"
                    dir="ltr"
                    className="transition-colors hover:text-primary-foreground"
                  >
                    contact@drmohamedgamil.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Language switcher */}
            <div className="mt-6 flex items-center justify-between border-t border-primary-foreground/10 pt-4">
              <span className="text-[11px] uppercase tracking-[0.14em] text-primary-foreground/50">
                {t("languageLabel")}
              </span>
              <LanguageSwitcher theme="dark" />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-[12.5px] text-primary-foreground/50 sm:flex-row">
          <p>
            © {year} {t("brand.name")} — {t("rights")}
          </p>
          <p className="text-[11.5px] italic">{t("tagline")}</p>
        </div>
      </Container>
    </footer>
  );
}