import type { CaseStudy } from "@/types/case-study";

export const CASES: CaseStudy[] = [
  {
    id: "rotator-cuff-functional-rehab",
    image: "/service/doctor.png",
    duration: "10 Weeks",
    relatedCaseIds: [
      "lumbar-spine-desk-worker",
      "post-acl-athletic-progression",
    ],
  },
];

export const BRAND = {
  name: {
    ar: 'د. محمد جميل',
    en: 'Dr. Mohamed Gamil',
  },
  mark: {
    ar: 'الجميل',
    en: 'Al Gamil',
  },
  title: {
    ar: 'أخصائي العلاج الطبيعي وإعادة التأهيل',
    en: 'Physiotherapist & Rehabilitation Specialist',
  },
  tagline: {
    ar: 'الحركة تبدأ بالفهم',
    en: 'Movement begins with understanding',
  },
  ctaBook: {
    ar: 'احجز جلسة',
    en: 'Book a Session',
  },
  ctaContact: {
    ar: 'تواصل معي',
    en: 'Get in Touch',
  },
  ctaExplore: {
    ar: 'اكتشف خبرتي',
    en: 'Explore My Experience',
  },
  ctaCases: {
    ar: 'استكشف الحالات',
    en: 'Explore Cases',
  },
  ctaTestimonials: {
    ar: 'شاهد آراء المرضى',
    en: 'Read Patient Stories',
  },
  ctaFollow: {
    ar: 'تابعني على وسائل التواصل',
    en: 'Follow Me',
  },
};