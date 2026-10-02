import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import type { InsightItem } from "@/types/insight";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insight: InsightItem;
  id?: string;
}

export function InsightCard({ insight, id }: InsightCardProps) {
  const t = useTranslations("insights.items");

  const title = t(`${insight.id}.title`);
  const summary = t(`${insight.id}.summary`);
  const categoryLabel = t(`${insight.id}.categoryLabel`);
  const topic = t(`${insight.id}.topic`);
  const meta = t(`${insight.id}.readTimeOrDuration`);
  const imageAlt = t(`${insight.id}.title`);

  return (
    <article
      id={id}
      className={cn(
        "group h-full overflow-hidden rounded-2xl border border-border bg-surface",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-0.5",
        "hover:border-sage/60",
        "hover:shadow-[0_16px_40px_-20px_rgb(24_59_58/0.15)]",
      )}
    >
      <Link
        href={`/insights/${insight.slug}`}
        className={cn(
          "flex h-full flex-col justify-between",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-sage/50",
          "focus-visible:ring-offset-2",
        )}
      >
        {/* Image */}
        <div>
          <div className="relative aspect-16/10 overflow-hidden bg-primary/10">
            <Image
              src={insight.image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />

            {/* Topic badge */}
            <span className="absolute start-4 top-4 rounded-md border border-border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
              {topic}
            </span>

            {/* Meta badge */}
            <span className="absolute end-4 bottom-4 inline-flex items-center gap-1 rounded-md bg-primary/85 px-2.5 py-1 text-[11px] font-medium text-primary-foreground backdrop-blur-sm">
              <Clock aria-hidden="true" className="size-3" />
              {meta}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
              {categoryLabel}
            </span>

            <h2 className="mt-3 font-heading text-[20px] font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-sage sm:text-[22px]">
              {title}
            </h2>

            <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-muted-foreground">
              {summary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border px-6 py-4 text-[13.5px] font-semibold text-primary">
          <span className="transition-colors duration-300 group-hover:text-sage">
            {t(`${insight.id}.cta`)}
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </div>
      </Link>
    </article>
  );
}
