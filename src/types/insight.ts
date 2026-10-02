export type InsightCategory = "articles" | "guides" | "videos" | "social";

export type InsightSourceType = "video" | "instagram" | "youtube" | "twitter" | "linkedin";

export interface InsightSource {
  type: InsightSourceType;
  url: string;
  /** Optional — small label to override the default */
  label?: string;
}

export interface InsightItem {
  slug: string;
  id: string;
  category: InsightCategory;
  image: string;
  publishedDate: string;
  videoDuration?: string;
  /** Optional — links to related video or social post */
  sources?: InsightSource[];
}

export interface InsightContentSection {
  heading: string;
  body: string;
}

export interface InsightContent {
  intro: string;
  sections: InsightContentSection[];
  quote?: string;
  takeaway?: string;
}