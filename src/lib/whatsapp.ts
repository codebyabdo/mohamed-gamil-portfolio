import { CONTACT_INFO } from "@/content/contact";

interface BookingMessage {
  name: string;
  phone: string;
  inquiry: string;
  preferredTime: string;
  locale: "ar" | "en";
}

/**
 * Build a WhatsApp deep-link URL with a pre-filled booking message.
 * The message is NOT sent automatically — the user reviews and sends it.
 */
export function createWhatsAppUrl(data: BookingMessage): string {
  const lines =
    data.locale === "ar"
      ? [
          "السلام عليكم دكتور محمد،",
          "",
          `الاسم: ${data.name}`,
          `رقم الهاتف: ${data.phone}`,
          `مجال الاستفسار: ${data.inquiry}`,
          `الوقت المناسب للتواصل: ${data.preferredTime}`,
          "",
          "أرغب في معرفة المواعيد المتاحة وطريقة حجز أول جلسة.",
          "",
          "شكرًا لحضرتك.",
        ]
      : [
          "Hello Dr. Mohamed,",
          "",
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Inquiry: ${data.inquiry}`,
          `Preferred contact time: ${data.preferredTime}`,
          "",
          "I would like to know the available appointments and how to book a first session.",
          "",
          "Thank you.",
        ];

  const message = lines.join("\n");

  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a plain WhatsApp link for direct chat (no pre-filled message).
 */
export function getWhatsAppChatUrl(): string {
  return `https://wa.me/${CONTACT_INFO.whatsapp}`;
}

/**
 * Build a tel: link for direct phone calls.
 */
export function getPhoneUrl(): string {
  return `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`;
}