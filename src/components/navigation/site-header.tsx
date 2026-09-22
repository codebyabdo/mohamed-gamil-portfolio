import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

import { DesktopNav } from "./desktop-nav";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteHeader() {
  const t = await getTranslations("navigation");

  return (
    <header className="relative z-[var(--z-header)] w-full">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex min-h-20 items-center justify-between gap-6">
          {/* Brand */}

          <Link
            href="/"
            aria-label="Al-Jamil — Home"
            className="group inline-flex shrink-0 flex-col"
          >
            <span className="font-heading text-lg font-semibold tracking-tight text-primary transition-colors duration-300 group-hover:text-sage">
              Al-Jamil
            </span>

            <span className="mt-0.5 font-body text-xs font-medium text-muted-foreground">
              الجميل
            </span>
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden md:flex md:items-center md:gap-3">
            <DesktopNav />

            <div className="h-6 w-px bg-border" aria-hidden="true" />

            <LanguageSwitcher />

            <Button
              size="sm"
              className="rounded-full bg-primary px-5 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90"
            >
              <Link href="/contact">{t("bookSession")}</Link>
            </Button>
          </div>

          {/* Mobile placeholder */}

          <div className="md:hidden" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
