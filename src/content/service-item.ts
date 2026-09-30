import type { ServiceItem } from "@/types/service-item";

export const SERVICES: ServiceItem[] = [
  {
    id: "sports-injuries",
    slug: "sports-injuries",
    num: "01",
  },
  {
    id: "back-pain",
    slug: "back-pain",
    num: "02",
    image: "/images/services/back-pain.jpg",
  },
  {
    id: "joint-pain",
    slug: "joint-pain",
    num: "03",
    image: "/images/services/joint-pain.jpg",
  },
  {
    id: "rehabilitation",
    slug: "rehabilitation",
    num: "04",
    image: "/images/services/rehabilitation.jpg",
  },
  {
    id: "sports-rehabilitation",
    slug: "sports-rehabilitation",
    num: "05",
    image: "/images/services/sports-rehabilitation.jpg",
  },
];

/* Helper — get service by slug */
export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/* Helper — get all slugs (for generateStaticParams) */
export function getAllServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}