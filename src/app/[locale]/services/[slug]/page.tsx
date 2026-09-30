import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { getServiceBySlug, getAllServiceSlugs } from "@/content/service-item";

import { ServiceDetail } from "@/components/services/service-detail";

/* ─────────────────────────────────────────────
   Static params — generate a page per service per locale
   ───────────────────────────────────────────── */
export function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

/* ─────────────────────────────────────────────
   Metadata — dynamic per service
   ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) return {};

  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t(`items.${service.id}.title`),
    description: t(`items.${service.id}.description`),
  };
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}