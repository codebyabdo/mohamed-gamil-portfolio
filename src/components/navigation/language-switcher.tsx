"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  usePathname,
  useRouter,
} from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("common.language");

  const nextLocale = locale === "ar" ? "en" : "ar";

  const label =
    nextLocale === "ar"
      ? t("switchToArabic")
      : t("switchToEnglish");

  const visibleLabel =
    nextLocale === "ar"
      ? t("arabic")
      : t("english");

  const handleLocaleChange = () => {
    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleLocaleChange}
      aria-label={label}
      className="font-heading text-xs font-semibold tracking-wide text-muted-foreground hover:bg-surface hover:text-primary"
    >
      {visibleLabel}
    </Button>
  );
}