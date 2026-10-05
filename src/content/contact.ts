import type { ContactInfo } from "@/types/contact";

export const CONTACT_INFO: ContactInfo = {
  doctorName: "Dr. Mohamed Gamil",
  centerName: "Al-Jamil Physiotherapy Center",

  whatsapp: "201153414179",
  phone: "+201000000000",

  email: "contact@example.com",

  address: {
    ar: "الفيوم، مصر — عنوان تجريبي",
    en: "Fayoum, Egypt — Temporary address",
  },

  workingHours: {
    days: {
      ar: "السبت – الخميس",
      en: "Saturday – Thursday",
    },
    from: "10:00",
    to: "20:00",
  },

  social: {
    instagram: "https://instagram.com/",
  },

  mapUrl: "https://maps.google.com/",
};
