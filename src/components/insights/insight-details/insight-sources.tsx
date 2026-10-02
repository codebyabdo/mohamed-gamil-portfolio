import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { EyebrowTag } from "@/components/shared/eyebrow-tag";
import { cn } from "@/lib/utils";

import type { InsightItem, InsightSource, InsightSourceType } from "@/types/insight";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

/* ═════════════════════════════════════════════════
   Source type → icon + accent
   ═════════════════════════════════════════════════ */
const SOURCE_META: Record<
  InsightSourceType,
  {
    Icon: React.ComponentType<{ className?: string }>;
    accent: string;
    bg: string;
    border: string;
  }
> = {
  youtube: {
    Icon: FaYoutube,
    accent: "text-error",
    bg: "bg-error/5",
    border: "border-error/20",
  },
  instagram: {
    Icon: FaInstagram,
    accent: "text-clay",
    bg: "bg-clay/5",
    border: "border-clay/20",
  },
  twitter: {
    Icon: FaTwitter,
    accent: "text-info",
    bg: "bg-info/5",
    border: "border-info/20",
  },
  linkedin: {
    Icon: FaLinkedin,
    accent: "text-info",
    bg: "bg-info/5",
    border: "border-info/20",
  },
  video: {
    Icon: FaYoutube,
    accent: "text-error",
    bg: "bg-error/5",
    border: "border-error/20",
  },
};

interface InsightSourcesProps {
  insight: InsightItem;
  sources: InsightSource[];
}

export async function InsightSources({ insight, sources }: InsightSourcesProps) {
  const t = await getTranslations("insights.sources");
  const tItems = await getTranslations("insights.items");

  const title = tItems(`${insight.id}.title`);

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        {/* Heading */}
        <div className="mb-10 max-w-2xl">
          <Reveal direction="up">
            <EyebrowTag variant="clay" marker="→">
              {t("eyebrow")}
            </EyebrowTag>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <h2 className="mt-5 font-heading text-2xl font-bold tracking-[-0.02em] text-primary sm:text-3xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
              {t("description", { title })}
            </p>
          </Reveal>
        </div>

        {/* Sources grid */}
        <Stagger
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {sources.map((source, index) => {
            const meta = SOURCE_META[source.type];
            const Icon = meta.Icon;

            const defaultLabel = t(`types.${source.type}`);
            const label = source.label ?? defaultLabel;

            return (
              <StaggerItem key={`${source.type}-${index}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex h-full flex-col",
                    "rounded-2xl border bg-background p-6",
                    "transition-[border-color,box-shadow,transform] duration-300",
                    "hover:-translate-y-0.5",
                    "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]",
                    meta.border,
                  )}
                >
                  {/* Icon row */}
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl border",
                        meta.bg,
                        meta.border,
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className={cn("size-5", meta.accent)}
                      />
                    </span>

                    <ExternalLink
                      aria-hidden="true"
                      className="size-4 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    />
                  </div>

                  {/* Label */}
                  <h3 className="font-heading text-[15px] font-semibold leading-snug text-primary">
                    {label}
                  </h3>

                  {/* Hint */}
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {t(`hints.${source.type}`)}
                  </p>

                  {/* Bottom accent line — appears on hover */}
                  <span
                    aria-hidden="true"
                    className="
                      mt-auto h-px w-full origin-left scale-x-0
                      bg-linear-to-r from-sage to-clay
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}