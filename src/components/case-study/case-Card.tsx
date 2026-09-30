import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import type { CaseStudy } from "@/types/case-study";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  caseStudy: CaseStudy;
  id?: string;
}

export function CaseCard({ caseStudy, id }: CaseCardProps) {
  const t = useTranslations("cases");

  const title = t(`items.${caseStudy.id}.title`);
  const category = t(`items.${caseStudy.id}.category`);
  const summary = t(`items.${caseStudy.id}.summary`);
  const imageAlt = t(`items.${caseStudy.id}.imageAlt`);

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
        href={`/cases/${caseStudy.slug}`}  
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
          <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
            <Image
              src={caseStudy.image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />

            <div className="absolute inset-s-4 top-4">
              <span className="inline-flex rounded-md border border-border bg-background/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                {category}
              </span>
            </div>

            <div className="absolute inset-e-4 bottom-4">
              <span className="inline-flex rounded-md bg-primary/85 px-2.5 py-1 text-[11px] font-medium text-primary-foreground backdrop-blur-sm">
                {caseStudy.duration}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-h4 text-primary transition-colors duration-300 group-hover:text-sage">
              {title}
            </h3>

            <p className="text-body-sm mt-2 line-clamp-3 text-muted-foreground">
              {summary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border-subtle px-6 py-4 text-sm font-semibold text-primary">
          <span className="transition-colors duration-300 group-hover:text-sage">
            {t("showcase.viewCase")}
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