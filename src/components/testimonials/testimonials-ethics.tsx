import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";

export async function TestimonialsEthics() {
  const t = await getTranslations("testimonials.ethics");

  return (
    <Section spacing="sm">
      <Container>
        <Reveal direction="up">
          <aside
            className="
              flex flex-col items-center gap-3
              rounded-2xl border border-border bg-surface
              px-6 py-5 text-center sm:flex-row sm:text-start
            "
          >
            <span
              className="
                grid size-10 shrink-0 place-items-center rounded-xl
                border border-border/60 bg-background
              "
            >
              <ShieldCheck
                aria-hidden="true"
                className="size-4 text-sage"
              />
            </span>
            <p className="text-[13px] leading-relaxed text-muted-foreground sm:text-[13.5px]">
              {t("note")}
            </p>
          </aside>
        </Reveal>
      </Container>
    </Section>
  );
}