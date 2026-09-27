export type TestimonialType = "written" | "video" | "case-linked";

export interface Testimonial {
  id: string;
  type: TestimonialType;
  authorKey: string;
  roleOrContextKey?: string;
  quoteKey: string;
  videoThumbnail?: string;
  videoDuration?: string;
  caseId?: string;
  caseTitleKey?: string;
}