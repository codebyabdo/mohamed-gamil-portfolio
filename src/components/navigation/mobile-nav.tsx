"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import { navigationItems, SocialItems } from "./navigation-config";
import StaggeredMenu from "../react-bits/StaggeredMenu";

export function MobileNav() {
  const t = useTranslations("navigation");
  const locale = useLocale();

  const socialItems = useMemo(
    () =>
      SocialItems.map((item) => ({
        label: t(item.key),
        ariaLabel: t(item.key),
        link: item.href,
      })),
    [t],
  );

  const menuItems = useMemo(
    () =>
      navigationItems.map((item) => ({
        label: t(item.key),
        ariaLabel: t(item.key),
        link: item.href,
      })),
    [t],
  );

  return (
    <StaggeredMenu
      position={locale === "ar" ? "right" : "left"}
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      isFixed
      closeOnClickAway
      changeMenuColorOnOpen
      menuButtonColor="var(--color-primary)"
      openMenuButtonColor="var(--color-primary)"
      colors={[
        "var(--color-primary)",
        "var(--color-sage)",
        "var(--color-clay)",
      ]}
      accentColor="var(--color-sage)"
    />
  );
}