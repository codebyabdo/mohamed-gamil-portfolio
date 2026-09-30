import type { CaseStudy } from "@/types/case-study";

export const CASES: CaseStudy[] = [
  {
    id: "rotator-cuff-functional-rehab",
    slug: "rotator-cuff-functional-rehab",
    image: "/service/doctor.png",
    duration: "10 Weeks",
    category: "shoulder",
    relatedCaseIds: [
      "lumbar-spine-desk-worker",
      "post-acl-athletic-progression",
    ],
  },
  {
    id: "shoulder-impingement-overhead",
    slug: "shoulder-impingement-overhead",
    image: "/service/doctor.png",
    duration: "8 Weeks",
    category: "shoulder",
  },
  {
    id: "lumbar-spine-desk-worker",
    slug: "lumbar-spine-desk-worker",
    image: "/service/doctor.png",
    duration: "12 Weeks",
    category: "spine",
  },

];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

export const CASE_CATEGORIES = [
  "shoulder",
  "spine",
  "sports",
  "rehabilitation",
] as const;

export function getCaseBySlug(slug: string) {
  return CASES.find((c) => c.slug === slug);
}

export function getCaseById(id: string) {
  return CASES.find((c) => c.id === id);
}

export function getRelatedCases(caseStudy: CaseStudy) {
  if (!caseStudy.relatedCaseIds) return [];
  return caseStudy.relatedCaseIds
    .map((slug) => getCaseBySlug(slug))
    .filter((c): c is CaseStudy => c !== undefined);
}

export function getAllCaseSlugs() {
  return CASES.map((c) => c.slug);
}