import { CASES } from "@/content/case-study";
import { CasesHero } from "./cases-hero";
import { CasesList } from "./cases-list";
import { TrajectoryDivider } from "@/components/shared/trajectory-divider";
import { TrajectoryLine } from "@/components/shared/trajectory-line";

export function CasesSection() {
  return (
    <>
      <CasesHero />
          <TrajectoryDivider variant="minimal" showLabels/>
          {/* <TrajectoryLine variant="wave-divider"/> */}
      
      <CasesList cases={CASES} />
    </>
  );
}