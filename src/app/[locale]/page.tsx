import { DoctorPhilosophySection } from "@/components/home/DoctorPhilosophySection";
import { Hero } from "@/components/home/hero";
import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { CasesShowcase } from "@/components/home/cases-showcase";
import { InteractiveTrajectory } from "@/components/home/interactive-trajectory";
import { TestimonialShowcase } from "@/components/home/testimonial-showcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <DoctorPhilosophySection />
      <div className="max-w-4xl mx-auto px-4">
        <TrajectoryDivider />
      </div>
      <ServicesShowcase />
      <CasesShowcase />
      <InteractiveTrajectory />
      <TestimonialShowcase />
    </main>
  );
}
