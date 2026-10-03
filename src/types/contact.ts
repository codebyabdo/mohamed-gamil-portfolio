export type InquiryType =
  | "sportsInjuries"
  | "backPain"
  | "jointPain"
  | "rehabilitation"
  | "general";

export type PreferredTime = "morning" | "evening" | "anytime";

export interface ContactInfo {
  doctorName: string;
  centerName: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: {
    ar: string;
    en: string;
  };
  workingHours: {
    days: { ar: string; en: string };
    from: string;
    to: string;
  };
  social: {
    instagram?: string;
  };
  mapUrl?: string;
}