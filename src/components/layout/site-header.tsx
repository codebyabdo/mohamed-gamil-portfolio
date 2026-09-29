import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { BrandLockup } from "@/components/shared/brand-lockup";

export async function SiteHeader() {
  const t = await getTranslations("navigation");

  return (
    <header className="sticky top-0 z-(--z-header) w-full border-b border-border/40 bg-background/95 backdrop-blur-sm transition-colors duration-300 supports-backdrop-blur:bg-background/90">
      <div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex min-h-16 items-center sm:min-h-20">
          {/* Brand */}
          <BrandLockup />

          {/* Desktop Navigation — visible from 2xl up */}
          <div className="ms-auto hidden items-center gap-3 2xl:flex xl:gap-4">
            <DesktopNav />

            <div
              className="mx-1 h-6 w-px shrink-0 bg-border"
              aria-hidden="true"
            />

            <LanguageSwitcher />

            <Button className="shrink-0 rounded-full bg-primary px-5 py-6 font-heading text-sm font-semibold text-primary-foreground shadow-none transition-colors duration-300 hover:bg-primary/90">
              <Link href="/contact">{t("bookSession")}</Link>
            </Button>
          </div>

          {/* Mobile / Tablet Navigation — visible below 2xl */}
          <div className="ms-auto shrink-0 2xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
