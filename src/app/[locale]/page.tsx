import { DoctorPhilosophySection } from "@/components/home/doctor-philosophy-section";
import { Hero } from "@/components/home/hero";
import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { CasesShowcase } from "@/components/home/cases-showcase";
import { InteractiveTrajectory } from "@/components/home/interactive-trajectory";
import { TestimonialShowcase } from "@/components/home/testimonial-showcase";
import { SocialBlock } from "@/components/home/social-block";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Doctor Philosophy */}
      <DoctorPhilosophySection />

      {/* Trajectory transition */}
      <div className="mx-auto max-w-4xl px-4">
        <TrajectoryDivider variant="wave" showLabels />
      </div>

      {/* 3. Services */}
      <ServicesShowcase />

      {/* 4. Cases */}
      <CasesShowcase />

      {/* 5. Interactive Trajectory */}
      <InteractiveTrajectory />

      {/* 6. Testimonials */}
      <TestimonialShowcase />

      {/* 7. Social Block */}
      <SocialBlock />

      {/* 8. Final CTA */}
      <FinalCTA />
    </>
  );
}