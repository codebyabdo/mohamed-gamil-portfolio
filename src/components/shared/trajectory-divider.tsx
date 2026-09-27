import { cn } from "@/lib/utils";

interface TrajectoryDividerProps {
  className?: string;
  showLabels?: boolean;
  labels?: string[];
}

const defaultLabels = [
  "Assessment",
  "Understanding",
  "Treatment",
  "Recovery",
  "Progress",
];

export function TrajectoryDivider({
  className,
  showLabels = false,
  labels = defaultLabels,
}: TrajectoryDividerProps) {
  return (
    <div
      aria-hidden={!showLabels}
      className={cn(
        "w-full select-none py-6",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-4xl">
        <svg
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full overflow-visible"
          role={showLabels ? "img" : undefined}
          aria-label={
            showLabels
              ? "Treatment journey from assessment to progress"
              : undefined
          }
        >
          {/* Main trajectory */}
          <path
            d="M 20 40 Q 200 10, 400 35 T 780 15"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeOpacity="0.18"
            strokeDasharray="4 5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Softer trajectory accent */}
          <path
            d="M 20 40 Q 200 10, 400 35 T 780 15"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeLinecap="round"
            fill="none"
          />

          {/* Assessment */}
          <circle
            cx="20"
            cy="40"
            r="3.5"
            fill="var(--color-sage)"
          />

          {/* Understanding */}
          <circle
            cx="210"
            cy="22"
            r="3"
            fill="var(--color-sage)"
            fillOpacity="0.75"
          />

          {/* Treatment */}
          <circle
            cx="400"
            cy="35"
            r="3.5"
            fill="var(--color-sage)"
          />

          {/* Recovery */}
          <circle
            cx="590"
            cy="22"
            r="3"
            fill="var(--color-sage)"
            fillOpacity="0.75"
          />

          {/* Progress */}
          <circle
            cx="780"
            cy="15"
            r="4"
            fill="var(--color-primary)"
          />

          {/* Final accent */}
          <circle
            cx="780"
            cy="15"
            r="7"
            stroke="var(--color-clay)"
            strokeWidth="1"
            strokeOpacity="0.35"
            fill="none"
          />
        </svg>

        {showLabels && (
          <div className="mt-2 grid grid-cols-5 text-center font-body text-[11px] font-medium text-muted-foreground sm:text-xs">
            {labels.slice(0, 5).map((label, index) => (
              <span key={`${label}-${index}`} className="px-1">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}