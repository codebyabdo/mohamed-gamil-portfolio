import type { InsightItem } from "@/types/insight";

export const INSIGHTS: InsightItem[] = [
  {
    slug: "why-pain-doesnt-mean-damage",
    id: "why-pain-doesnt-mean-damage",
    category: "articles",
    image:"/service/doctor.png",
    publishedDate: "2026-08-15",
    sources: [
      {
        type: "youtube",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        type: "instagram",
        url: "https://instagram.com/p/example",
      },
    ],
  },
  {
    slug: "desk-workers-movement-guide",
    id: "desk-workers-movement-guide",
    category: "guides",
    image:"/service/doctor.png",
    publishedDate: "2026-08-02",
    sources: [
      {
        type: "instagram",
        url: "https://instagram.com/p/example2",
      },
    ],
  },
  {
    slug: "load-management-muscle-strains",
    id: "load-management-muscle-strains",
    category: "videos",
    image:"/service/doctor.png",
    publishedDate: "2026-07-20",
    videoDuration: "04:20",
    sources: [
      {
        type: "youtube",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        label: "Full video breakdown",
      },
      {
        type: "twitter",
        url: "https://twitter.com/example/status/123",
      },
    ],
  },
  {
    slug: "pain-relief-vs-complete-rehab",
    id: "pain-relief-vs-complete-rehab",
    category: "social",
    image:"/service/doctor.png",
    publishedDate: "2026-07-08",
    sources: [
      {
        type: "instagram",
        url: "https://instagram.com/p/example3",
        label: "Original Instagram post",
      },
      {
        type: "linkedin",
        url: "https://linkedin.com/posts/example",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Helpers (نفس اللي عندك)
   ───────────────────────────────────────────── */
export const INSIGHT_CATEGORIES = [
  "articles",
  "guides",
  "videos",
  "social",
] as const;

export function getInsightBySlug(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

export function getAllInsightSlugs() {
  return INSIGHTS.map((i) => i.slug);
}

export function getRelatedInsights(
  insight: InsightItem,
  limit = 3,
): InsightItem[] {
  return INSIGHTS.filter(
    (i) => i.slug !== insight.slug && i.category === insight.category,
  ).slice(0, limit);
}