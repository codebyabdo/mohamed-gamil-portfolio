import { ServiceBullet } from "./service-bullet";
import { ServiceOverview } from "./service-overview";
import { ServiceFAQ } from "./service-faq";
import { FinalCTA } from "@/components/home/final-cta";

import type { ServiceItem } from "@/types/service-item";
import { TrajectoryLine } from "@/components/shared/trajectory-line";
import { ServiceHero } from "./service-hero";

interface ServiceDetailProps {
  service: ServiceItem;
}

export function ServiceDetail({ service }: ServiceDetailProps) {

  return (
    <>
      {/* 1. HERO */}
     <ServiceHero service={service} />

      <TrajectoryLine variant="wave-divider" />

      {/* 2. OVERVIEW */}
      <ServiceOverview serviceId={service.id} />

      {/* 3. WHAT'S INCLUDED */}
      <ServiceBullet />

      {/* 5. FAQ */}
      <ServiceFAQ serviceId={service.id} />

      {/* 6. FINAL CTA */}
      <FinalCTA />
    </>
  );
}
