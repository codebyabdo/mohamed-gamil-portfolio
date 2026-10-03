import { ContactHero } from "./contact-hero";
import { ContactMethods } from "./contact-methods";
import { BookingRequestForm } from "./booking-request-form";
import { ContactInformation } from "./contact-information";
import { ContactMap } from "./contact-map";
import { ContactFAQ } from "./contact-faq";
import { TrajectoryLine } from "../shared/trajectory-line";
import { getLocale } from "next-intl/server";

export async function ContactSection() {
  const locale = await getLocale();
  return (
    <>
      {/* 1. Hero */}
      <ContactHero />
      <TrajectoryLine
        variant="arrow-flow"
        color="var(--color-primary)"
        flip={locale === "ar"}
      />
      {/* 2. Choose method */}
      <ContactMethods />

      {/* 3. Booking request form */}
      <BookingRequestForm />

      <TrajectoryLine dot={false} color="var(--color-primary)" />
      {/* 4. Center information */}
      <ContactInformation />

      {/* 5. Map */}
      <ContactMap />
      <TrajectoryLine variant="wave-divider" color="var(--color-primary)" />

      {/* 6. FAQ */}
      <ContactFAQ />
    </>
  );
}
