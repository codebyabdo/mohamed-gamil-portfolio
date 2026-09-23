import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

import { DesktopNav } from "./desktop-nav";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

export async function SiteHeader() {
  const t = await getTranslations("navigation");

  return (
    <header className="relative z-(--z-header) w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex min-h-16 items-center gap-3 sm:min-h-20 sm:gap-6">
          {/* ── Brand — always visible, never shrinks ── */}
          <Link
            href="/"
            aria-label="Al-Jamil — الجميل — Home"
            className="group inline-flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            {/* Monogram mark */}
            <span
              aria-hidden="true"
              className="relative grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-sage sm:size-10"
            >
              <span className="font-heading text-[13px] font-semibold leading-none tracking-tight sm:text-sm">
                AJ
              </span>
            </span>

            {/* Wordmark + Arabic */}
            <span className="flex flex-col leading-none">
              <span className="font-heading text-[15px] font-semibold tracking-[-0.02em] text-primary transition-colors duration-300 group-hover:text-sage sm:text-base">
                Al-Jamil
              </span>

              <span
                dir="rtl"
                lang="ar"
                className="mt-1 font-body text-[11px] font-medium tracking-normal text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80 sm:text-xs"
              >
                الجميل
              </span>

              {/* Hover accent underline */}
              <span
                aria-hidden="true"
                className="mt-1 h-px w-0 bg-sage transition-[width] duration-300 ease-out group-hover:w-full"
              />
            </span>
          </Link>

          {/* ── Desktop cluster — visible from 2xl up ── */}
          <div className="ml-auto hidden items-center justify-end gap-2 2xl:flex xl:gap-3">
            <DesktopNav />

            <div
              className="mx-1 h-6 w-px shrink-0 bg-border"
              aria-hidden="true"
            />

            <LanguageSwitcher />

            {/* asChild → renders the Link with button styles,
                no <a> inside <button> */}
            <Button
              size="lg"
              className="shrink-0  bg-primary px-4 py-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90 xl:px-5"
            >
              <Link href="/contact">{t("bookSession")}</Link>
            </Button>
          </div>

          {/* ── Mobile nav — visible below 2xl ── */}
          <div className="ml-auto shrink-0 2xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
