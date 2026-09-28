import { DoctorPhilosophySection } from "@/components/home/DoctorPhilosophySection";
import { Hero } from "@/components/home/hero";
import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { CasesShowcase } from "@/components/home/cases-showcase";
import { InteractiveTrajectory } from "@/components/home/interactive-trajectory";
import { TestimonialShowcase } from "@/components/home/testimonial-showcase";
import { SocialBlock } from "@/components/home/social-block";
import { Reveal } from "@/components/motion";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <DoctorPhilosophySection />
      <Reveal direction="up" className="mx-auto max-w-4xl px-4">
        <TrajectoryDivider variant="wave" showLabels />
      </Reveal>
      <ServicesShowcase />
      <CasesShowcase />
      <InteractiveTrajectory />
      <TestimonialShowcase />
      <SocialBlock />
      <FinalCTA/>
    </main>
  );
}
