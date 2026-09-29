"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../shared/Section-heading";
import { Button } from "../ui/button";

/* ═════════════════════════════════════════════════
   Types
   ═════════════════════════════════════════════════ */
type TabKey = "education" | "certifications" | "experience";

interface TabConfig {
  key: TabKey;
  Icon: React.ComponentType<{ className?: string }>;
}

/* ═════════════════════════════════════════════════
   Module-scope data
   ═════════════════════════════════════════════════ */
const TABS: TabConfig[] = [
  { key: "education", Icon: GraduationCap },
  { key: "certifications", Icon: Award },
  { key: "experience", Icon: Briefcase },
];

const EDUCATION_ITEMS = ["bachelor", "master", "phd"] as const;
const CERT_ITEMS = [
  "mckenzie",
  "maitland",
  "dryNeedling",
  "sportsRehab",
  "manualTherapy",
  "painScience",
] as const;
const EXPERIENCE_ITEMS = ["clinic1", "hospital", "sports", "academic"] as const;

/* ═════════════════════════════════════════════════
   Sub-components (module scope — React Compiler safe)
   ═════════════════════════════════════════════════ */

interface TimelineItemProps {
  year: string;
  title: string;
  org: string;
  location?: string;
  note?: string;
  Icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}

function TimelineItem({
  year,
  title,
  org,
  location,
  note,
  Icon,
  isLast,
}: TimelineItemProps) {
  return (
    <div className="group relative flex gap-5 sm:gap-6">
      {/* Timeline line + node */}
      <div className="relative flex shrink-0 flex-col items-center">
        <span
          className="
            grid size-10 place-items-center rounded-full
            border border-border bg-surface
            text-sage
            transition-colors duration-300
            group-hover:border-sage/50 group-hover:bg-sage/5
          "
        >
          <Icon className="size-4" />
        </span>

        {!isLast && (
          <span
            aria-hidden="true"
            className="mt-2 w-px flex-1 bg-linear-to-b from-border to-transparent"
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-8", isLast && "pb-0")}>
        <span className="mb-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
          <Calendar className="size-3" />
          {year}
        </span>

        <h4 className="font-heading text-[16px] font-semibold text-primary sm:text-[17px]">
          {title}
        </h4>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
          <span>{org}</span>
          {location && (
            <>
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-border-strong"
              />
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {location}
              </span>
            </>
          )}
        </div>

        {note && (
          <p className="mt-2.5 max-w-prose text-[13px] leading-relaxed text-muted-foreground/90">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

interface CertCardProps {
  code: string;
  title: string;
  issuer: string;
  year: string;
}

function CertCard({ code, title, issuer, year }: CertCardProps) {
  return (
    <article
      className="
        group h-full
        rounded-2xl border border-border bg-surface p-5
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-sage/40
        hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]
      "
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-clay">
          {code}
        </span>
        <span
          aria-hidden="true"
          className="rounded-full border border-border/60 bg-background px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground"
        >
          {year}
        </span>
      </div>

      <h4 className="font-heading text-[14.5px] font-semibold leading-snug text-primary">
        {title}
      </h4>

      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
        {issuer}
      </p>
    </article>
  );
}

/* ═════════════════════════════════════════════════
   Main component
   ═════════════════════════════════════════════════ */
export function Credentials() {
  const t = useTranslations("about.credentials");
  const [activeTab, setActiveTab] = useState<TabKey>("education");

  return (
    <Section spacing="sm">
      <Container>
        {/* ── Heading ─────────────────────────────── */}
        <Reveal direction="up">
          <SectionHeading
            label={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12"
          />
        </Reveal>

        {/* ── Tabs ────────────────────────────────── */}
        <Reveal direction="up" delay={0.1}>
          <div
            role="tablist"
            aria-label={t("tabsAriaLabel")}
            className="
      relative mb-10 inline-flex items-center gap-1
      rounded-full border border-border
      bg-surface p-1
      shadow-[0_1px_2px_rgb(24_59_58/0.04)]
    "
          >
            {TABS.map(({ key, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  id={`tab-${key}`}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-2",
                    "text-[12.5px] font-medium tracking-[0.01em]",
                    "transition-colors duration-300",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-sage/50",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {/* Active pill background — animates between tabs */}
                  {isActive && (
                    <m.span
                      layoutId="credentials-tab-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}

                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 transition-colors duration-300",
                      isActive ? "text-primary" : "text-current",
                    )}
                  />

                  <span>{t(`tabs.${key}`)}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Tab content ─────────────────────────── */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <AnimatePresence mode="wait">
            {/* EDUCATION + EXPERIENCE — timeline */}
            {(activeTab === "education" || activeTab === "experience") && (
              <m.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto max-w-3xl"
              >
                {(activeTab === "education"
                  ? EDUCATION_ITEMS
                  : EXPERIENCE_ITEMS
                ).map((key, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const Icon = activeTab === "education" ? BookOpen : Briefcase;

                  return (
                    <TimelineItem
                      key={key}
                      year={t(`${activeTab}.items.${key}.year`)}
                      title={t(`${activeTab}.items.${key}.title`)}
                      org={t(`${activeTab}.items.${key}.org`)}
                      location={
                        t.has(`${activeTab}.items.${key}.location`)
                          ? t(`${activeTab}.items.${key}.location`)
                          : undefined
                      }
                      note={
                        t.has(`${activeTab}.items.${key}.note`)
                          ? t(`${activeTab}.items.${key}.note`)
                          : undefined
                      }
                      Icon={Icon}
                      isLast={isLast}
                    />
                  );
                })}
              </m.div>
            )}

            {/* CERTIFICATIONS — grid */}
            {activeTab === "certifications" && (
              <m.div
                key="certifications"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Stagger
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  stagger={0.08}
                >
                  {CERT_ITEMS.map((key) => (
                    <StaggerItem key={key}>
                      <CertCard
                        code={t(`certifications.items.${key}.code`)}
                        title={t(`certifications.items.${key}.title`)}
                        issuer={t(`certifications.items.${key}.issuer`)}
                        year={t(`certifications.items.${key}.year`)}
                      />
                    </StaggerItem>
                  ))}
                </Stagger>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
