import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

import { InsightDetail } from "@/components/insights/insight-details/insight-detail";
import { getAllInsightSlugs, getInsightBySlug } from "@/content/insight";

/* ─────────────────────────────────────────────
   Static params
   ───────────────────────────────────────────── */
export function generateStaticParams() {
  const slugs = getAllInsightSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

/* ─────────────────────────────────────────────
   Metadata
   ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) return {};

  const insight = getInsightBySlug(slug);
  if (!insight) return {};

  const t = await getTranslations({ locale, namespace: "insights.items" });

  return {
    title: t(`${insight.id}.title`),
    description: t(`${insight.id}.summary`),
  };
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const insight = getInsightBySlug(slug);
  if (!insight) {
    notFound();
  }

  return <InsightDetail insight={insight} />;
}