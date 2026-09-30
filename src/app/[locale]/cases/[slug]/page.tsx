import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { getCaseBySlug, getAllCaseSlugs } from "@/content/case-study";
import { CaseDetail } from "@/components/case-study/case-details/case-detail";


/* ─────────────────────────────────────────────
   Static params — one page per case per locale
   ───────────────────────────────────────────── */
export function generateStaticParams() {
  const slugs = getAllCaseSlugs();
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

  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) return {};

  const t = await getTranslations({ locale, namespace: "cases" });

  return {
    title: t(`items.${caseStudy.id}.title`),
    description: t(`items.${caseStudy.id}.summary`),
  };
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) {
    notFound();
  }

  return <CaseDetail caseStudy={caseStudy} />;
}