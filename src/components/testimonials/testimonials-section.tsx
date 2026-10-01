import { TESTIMONIALS } from "@/content/testimonial";

import { TrajectoryDivider } from "@/components/shared/trajectory-divider";

import { TestimonialsHero } from "./testimonials-hero";
import { TestimonialsList } from "./testimonials-list";
import { TestimonialsEthics } from "./testimonials-ethics";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export async function TestimonialsSection() {
  return (
    <>
      {/* 1. Hero */}
      <TestimonialsHero />

      {/* Trajectory transition */}
      <div className="mx-auto max-w-4xl px-4">
        <TrajectoryDivider showLabels />
      </div>

      {/* 2. Filter + List */}
      <Section spacing="sm">
        <Container>
          <TestimonialsList testimonials={TESTIMONIALS} />
        </Container>
      </Section>

      {/* 3. Ethical note */}
      <TestimonialsEthics />
    </>
  );
}