import Image from "next/image";
import { Play } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";

import type { InsightItem } from "@/types/insight";

interface InsightCoverProps {
  insight: InsightItem;
}

export async function InsightCover({ insight }: InsightCoverProps) {
  const isVideo = insight.category === "videos";
  const hasVideoSource = insight.sources?.some((s) => s.type === "youtube");

  return (
    <Section spacing="sm">
      <Container>
        <Reveal direction="up">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-primary/10 shadow-[0_24px_60px_-20px_rgb(24_59_58/0.2)]">
            <Image
              src={insight.image}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent"
            />

            {/* Play button — if video */}
            {isVideo && hasVideoSource && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="grid size-16 place-items-center rounded-full bg-background/95 text-primary shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play
                    aria-hidden="true"
                    className="size-6 translate-x-0.5 fill-current"
                  />
                </span>
              </div>
            )}

            {/* Duration badge */}
            {insight.videoDuration && (
              <span className="absolute end-4 bottom-4 rounded-full bg-primary/85 px-3 py-1 font-mono text-[11px] font-medium text-primary-foreground backdrop-blur-sm">
                {insight.videoDuration}
              </span>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}