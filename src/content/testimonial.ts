import type { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: Testimonial[] = [
  // ── Case-linked ───────────────────────────────
  {
    id: "tarekRotatorCuff",
    type: "case-linked",
    hasContext: true,
    caseSlug: "rotator-cuff-functional-rehab",
  },
  {
    id: "karimAcl",
    type: "case-linked",
    hasContext: true,
    caseSlug: "post-acl-athletic-progression",
  },

  // ── Written ───────────────────────────────────
  {
    id: "mahmoudLumbar",
    type: "written",
    hasContext: true,
  },
  {
    id: "nadiaClinical",
    type: "written",
    hasContext: true,
  },

  // ── Video ─────────────────────────────────────
  {
    id: "sarahAcl",
    type: "video",
    hasContext: true,
    videoThumbnail: "/service/doctor.png",
    videoDuration: "2:14",
  },
  {
    id: "omarCalisthenics",
    type: "video",
    hasContext: true,
    videoThumbnail: "/service/doctor.png",
    videoDuration: "1:48",
  },
];