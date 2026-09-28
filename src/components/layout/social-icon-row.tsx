import { MessageCircle } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { SOCIAL_MEDIA_CHANNELS } from "@/content/social";
import type { SocialPlatform } from "@/types/social";

import { cn } from "@/lib/utils";

interface SocialIconRowProps {
  theme?: "dark" | "light";
  className?: string;
}

const ICONS: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  WhatsApp: MessageCircle,
};

export function SocialIconRow({
  theme = "light",
  className,
}: SocialIconRowProps) {
  const isDark = theme === "dark";

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="list"
    >
      {SOCIAL_MEDIA_CHANNELS.map((channel) => {
        const Icon = ICONS[channel.platform];
        return (
          <li key={channel.platform}>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={channel.platform}
              className={cn(
                "grid size-9 place-items-center rounded-lg border transition-colors duration-200",
                isDark
                  ? "border-primary-foreground/15 bg-primary-foreground/6 text-primary-foreground/70 hover:border-primary-foreground/30 hover:bg-primary-foreground/12 hover:text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:bg-surface/60 hover:text-primary",
              )}
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}