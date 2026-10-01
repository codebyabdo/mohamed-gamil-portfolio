import { TrajectoryDivider } from "@/components/shared/trajectory-divider";

import { ApproachHero } from "./approach-hero";
import { ApproachTrajectory } from "./approach-trajectory";
import { ApproachDeepdive } from "./approach-deepdive";
import { ApproachVision } from "./approach-vision";
import { TrajectoryLine } from "../shared/trajectory-line";

export async function ApproachSection() {
  return (
    <>
      {/* 1. Hero */}
      <ApproachHero />

      {/* Trajectory transition */}
      <div className="mx-auto max-w-4xl px-4">
        <TrajectoryDivider variant="minimal" showLabels />
      </div>

      {/* 2. 4-step trajectory */}
      <ApproachTrajectory />

      {/* 3. Deep dive — 2 cards */}
      <ApproachDeepdive />

      {/* 4. Closing vision */}
      <ApproachVision />
      <TrajectoryLine variant="wave-divider" color="var(--color-primary)"/>
    </>
  );
}