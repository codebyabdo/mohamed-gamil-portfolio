"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageCircle, Play } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

import { PREVIEW_REELS, SOCIAL_MEDIA_CHANNELS } from "@/content/social";

import type { SocialPlatform } from "@/types/social";

import { TrajectoryLine } from "@/components/shared/trajectory-line";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const PLATFORM_ICONS: Record<SocialPlatform, React.ReactNode> = {
  Instagram: <FaInstagram aria-hidden="true" className="size-5 text-clay" />,
  YouTube: <FaYoutube aria-hidden="true" className="size-5 text-error" />,
  LinkedIn: <FaLinkedinIn aria-hidden="true" className="size-5 text-info" />,
  WhatsApp: (
    <MessageCircle aria-hidden="true" className="size-5 text-success" />
  ),
};

export function SocialBlock() {
  const t = useTranslations("social");

  return (
    <Section
      spacing="sm"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Kinetic Trajectory Header Motif */}
      <Reveal direction="fade">
        <TrajectoryLine variant="upward-arc" />
      </Reveal>
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal direction="up" className="max-w-2xl">
            <span className="mb-2 inline-block text-xs font-semibold tracking-wider text-sage">
              {t("section.eyebrow")}
            </span>
            <h2 className="text-h2 text-primary-foreground">
              {t("section.title")}
            </h2>
            <p className="text-body-lg mt-4 text-primary-foreground/70">
              {t("section.description")}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="shrink-0">
            <span className="inline-flex rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-xs font-medium text-primary-foreground/75">
              {t("section.audience")}
            </span>
          </Reveal>
        </div>

        {/* Video / Reel Preview Cards — staggered */}
        <Stagger
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          stagger={0.12}
        >
          {PREVIEW_REELS.map((reel) => {
            const title = t(`reels.${reel.id}.title`);
            const category = t(`reels.${reel.id}.category`);

            return (
              <StaggerItem key={reel.id}>
                <article className="group h-full overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/6 shadow-sm transition-colors duration-300 hover:border-primary-foreground/20 hover:bg-primary-foreground/8">
                  <div className="relative aspect-16/10 overflow-hidden bg-black/10">
                    <Image
                      src={reel.image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-transform duration-300 group-hover:scale-110"
                      >
                        <Play className="size-5 translate-x-0.5 fill-current" />
                      </span>
                      <span className="sr-only">{t("section.watchReel")}</span>
                    </div>

                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 text-xs text-white/90">
                      <span className="rounded bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                        {reel.duration}
                      </span>
                      <span>{t("section.views", { count: reel.views })}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="mb-1 block text-[11px] font-semibold tracking-wider text-sage">
                      {category}
                    </span>
                    <h3 className="line-clamp-2 font-heading text-[15px] font-semibold leading-snug text-primary-foreground">
                      {title}
                    </h3>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Social Channels — staggered */}
        <Stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {SOCIAL_MEDIA_CHANNELS.map((channel) => (
            <StaggerItem key={channel.platform}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("section.followChannel")} ${channel.platform}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-primary-foreground/10 bg-primary-foreground/6 p-5 transition-colors duration-300 hover:border-primary-foreground/20 hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {PLATFORM_ICONS[channel.platform]}
                      <span className="font-heading text-[15px] font-bold text-primary-foreground">
                        {channel.platform}
                      </span>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-primary-foreground/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="mb-2 font-mono text-xs text-sage">
                    {channel.handle}
                  </p>
                  <p className="text-body-sm text-primary-foreground/60">
                    {t(`channels.${channel.platform}.role`)}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-primary-foreground/10 pt-3 text-[11px]">
                  <span className="text-primary-foreground/50">
                    {t("section.community")}
                  </span>
                  <span className="font-semibold text-clay">
                    {channel.followers}
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
