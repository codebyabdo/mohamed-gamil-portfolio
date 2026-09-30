export type CaseCategory = "shoulder" | "spine" | "sports" | "rehabilitation";
export interface CaseStudy {
  id: string;
  slug: string;
  image: string;
  duration: string;
  category: CaseCategory;
  relatedCaseIds?: string[];
}