"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { navigationItems } from "./navigation-config";
import StaggeredMenu from "../react-bits/StaggeredMenu";

export function MobileNav() {
  const t = useTranslations("navigation");

  const menuItems = useMemo(
    () =>
      navigationItems.map((item) => ({
        label: t(item.key),
        ariaLabel: t(item.key),
        link: item.href,
      })),
    [t],
  );

  // No `2xl:hidden` here — the parent in SiteHeader handles it.
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      displaySocials={true}
      displayItemNumbering
      isFixed
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