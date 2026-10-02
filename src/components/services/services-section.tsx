import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { ServicesHero } from "./services-hero";
import { ServicesList } from "./services-list";

export function ServicesSection() {
  return (
  <div>
  <ServicesHero />

    <TrajectoryDivider variant="wave" showLabels/>

    <ServicesList/>


  </div>

  )
}
