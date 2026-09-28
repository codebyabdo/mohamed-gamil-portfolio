"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import { navigationItems } from "./navigation-config";

import GooeyNav from "../react-bits/GooeyNav";

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function isNavigationItemActive(pathname: string, href: string) {
  const currentPath = normalizePathname(pathname);
  const targetPath = normalizePathname(href);

  if (targetPath === "/") return currentPath === "/";

  return (
    currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
  );
}

export function DesktopNav() {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const items = useMemo(
    () =>
      navigationItems.map((item) => ({
        label: t(item.key),
        href: item.href,
      })),
    [t],
  );

  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) =>
      isNavigationItemActive(pathname, item.href),
    );
    return idx === -1 ? 0 : idx;
  }, [items, pathname]);

  // No `hidden md:block` here — the parent controls visibility.
  return (
    <GooeyNav
      items={items}
      activeIndex={activeIndex}
      particleCount={8}
      particleDistances={[10, 60]}
      particleR={15}
      animationTime={400}
      timeVariance={150}
      colors={[1, 2, 3, 4]}
      renderLink={({ href, children, onClick, className, ...rest }) => (
        <Link href={href} onClick={onClick} className={className} {...rest}>
          {children}
        </Link>
      )}
    />
  );
}