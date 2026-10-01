export type TestimonialType = "written" | "video" | "case-linked";

export interface Testimonial {
  id: string;
  type: TestimonialType;
  /** Whether this testimonial has a context (role/location) */
  hasContext?: boolean;
  /** Video only */
  videoThumbnail?: string;
  videoDuration?: string;
  /** Case-linked only */
  caseSlug?: string;
}