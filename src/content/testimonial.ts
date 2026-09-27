import { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-written-1",
    type: "written",
    authorKey: "sarah",
    roleOrContextKey: "marathonRunner",
    quoteKey: "sarahQuote",
  },
  {
    id: "t-case-1",
    type: "case-linked",
    authorKey: "tarek",
    roleOrContextKey: "rotatorCuffCase",
    quoteKey: "tarekQuote",
    caseId: "rotator-cuff-functional-rehab",
    caseTitleKey: "rotatorCuffRehabilitation",
  },
  {
    id: "t-video-1",
    type: "video",
    authorKey: "mahmoud",
    roleOrContextKey: "architect",
    quoteKey: "mahmoudQuote",
    videoThumbnail: "/testimonials/client1.png",
    videoDuration: "02:40",
  },
  {
    id: "t-case-2",
    type: "case-linked",
    authorKey: "karim",
    roleOrContextKey: "aclReconstructionCase",
    quoteKey: "karimQuote",
    caseId: "post-acl-athletic-progression",
    caseTitleKey: "postAclAthleticProgression",
  },
  {
    id: "t-written-2",
    type: "written",
    authorKey: "nadia",
    roleOrContextKey: "universityProfessor",
    quoteKey: "nadiaQuote",
  },
  {
    id: "t-video-2",
    type: "video",
    authorKey: "omar",
    roleOrContextKey: "calisthenicsAthlete",
    quoteKey: "omarQuote",
    videoThumbnail: "/testimonials/client2.png",
    videoDuration: "03:15",
  },
];