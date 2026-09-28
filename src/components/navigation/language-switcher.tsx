"use client";

import { useTransition } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** Visual theme — "dark" for dark backgrounds (e.g. Footer) */
  theme?: "light" | "dark";
  /** Additional className */
  className?: string;
}

export function LanguageSwitcher({
  theme = "light",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.language");

  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "ar" ? "en" : "ar";

  const label =
    nextLocale === "ar" ? t("switchToArabic") : t("switchToEnglish");

  const visibleLabel = nextLocale === "ar" ? t("arabic") : t("english");

  const handleLocaleChange = () => {
    if (isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleLocaleChange}
      disabled={isPending}
      aria-label={label}
      aria-busy={isPending}
      className={cn(
        "group relative font-heading text-xs font-semibold tracking-wide",
        "min-w-14 gap-1.5",
        isDark
          ? "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          : "text-muted-foreground hover:bg-surface hover:text-primary",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPending ? (
          <m.span
            key="pending"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center"
          >
            <Loader2 className="size-3.5 animate-spin" />
          </m.span>
        ) : (
          <m.span
            key={visibleLabel}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {visibleLabel}
          </m.span>
        )}
      </AnimatePresence>
    </Button>
  );
}