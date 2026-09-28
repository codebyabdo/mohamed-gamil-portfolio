import { TrajectoryLine } from "./trajectory-line"

{/* افتراضي — subtle curve */}
<TrajectoryLine />

{/* Wave divider بين sections */}
<TrajectoryLine variant="wave-divider" className="my-12" />

{/* Upward arc قبل CTA */}
<TrajectoryLine variant="upward-arc" className="mb-8" />

{/* Horizontal guide في section header */}
<TrajectoryLine
  variant="horizontal-guide"
  className="max-w-md"
  color="rgba(255,255,255,0.35)"
/>

{/* Spark صغير قبل عنوان */}
<TrajectoryLine variant="spark" className="h-6 w-32 mx-auto" />

{/* Arrow flow قبل steps */}
<TrajectoryLine variant="arrow-flow" className="my-6" />

{/* RTL — يقلب */}
<TrajectoryLine variant="upward-arc" flip />

{/* بدون animations */}
<TrajectoryLine animated={false} />