import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/content/contact";

export async function ContactMap() {
  const t = await getTranslations("contact.information");

  // If no map URL is set, show a placeholder.
  const hasMap = Boolean(CONTACT_INFO.mapUrl);

  return (
    <Section spacing="sm">
      <Container>
        <Reveal direction="up">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-surface">
            {hasMap ? (
              <>
                {/* Decorative placeholder while real map is pending */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--color-sage) 12%, transparent), transparent 50%),
                      radial-gradient(circle at 70% 70%, color-mix(in oklch, var(--color-clay) 10%, transparent), transparent 50%),
                      var(--color-surface)
                    `,
                  }}
                />

                {/* Grid pattern overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                  <span className="grid size-14 place-items-center rounded-full border border-border bg-background shadow-sm">
                    <MapPin
                      aria-hidden="true"
                      className="size-6 text-sage"
                    />
                  </span>

                  <div>
                    <span className="block font-heading text-[15px] font-semibold text-primary">
                      {t("title")}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      {t("directions")}
                    </span>
                  </div>

                  <Button
                    render={
                      <a
                        href={CONTACT_INFO.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    size="sm"
                    className="rounded-full bg-primary px-4 font-heading text-[13px] font-semibold text-primary-foreground shadow-none hover:bg-primary/90"
                  >
                    {t("directions")}
                  </Button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Map coming soon
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}