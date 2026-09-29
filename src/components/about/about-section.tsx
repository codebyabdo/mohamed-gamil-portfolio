import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { HeroAbout } from "./hero-about";
import { ProfessionalIdentity } from "./professional-identity";
import { PersonalPhilosophy } from "./personal-philosophy";
import { TrajectoryLine } from "@/components/shared/trajectory-line";
import { Credentials } from "./credentials";
import { ClinicalEnvironment } from "./clinical-environment";
import { SocialBlock } from "@/components/home/social-block";
import { FinalCTA } from "@/components/home/final-cta";
import { Reveal } from "@/components/motion";

export async function AboutSection() {
  return (
    <div>
      {/* 1. HERO */}
      <HeroAbout />

      {/* Trajectory transition */}
      <Reveal aria-hidden="true">
        <TrajectoryDivider variant="minimal" showLabels />
      </Reveal>

      {/* 2. PROFESSIONAL IDENTITY */}
      <ProfessionalIdentity />
      {/* Decorative trajectory */}
      <Reveal aria-hidden="true">
        <TrajectoryLine variant="wave-divider" color="var(--color-primary)" />
      </Reveal>
      {/* 3. PERSONAL PHILOSOPHY */}
      <PersonalPhilosophy />

      {/* 4. CREDENTIALS  */}
      <Credentials />

      {/* 5. Clinical Environment */}
      <ClinicalEnvironment />

      {/* 6. Social Block */}
      <SocialBlock />

      {/* 7. CTA */}
      <FinalCTA />
    </div>
  );
}
