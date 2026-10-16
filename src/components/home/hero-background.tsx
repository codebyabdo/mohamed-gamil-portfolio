"use client";

import { useMemo } from "react";
import GhostFibers from "../react-bits/GhostFibers";

export function HeroBackground() {
  const { primary, sage } = useMemo(() => {
    if (typeof window === "undefined") {
      return { primary: "#183b3a", sage: "#769a91" };
    }
    const styles = getComputedStyle(document.documentElement);
    return {
      primary:
        styles.getPropertyValue("--color-primary").trim() || "#183b3a",
      sage: styles.getPropertyValue("--color-sage").trim() || "#769a91",
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
      style={{
        // Fade out the canvas near the bottom so it blends into
        // the next section instead of bleeding into it.
        maskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
      }}
    >
      <GhostFibers
        lineColor={primary}
        glowColor={sage}
        speed={0.55}
        scale={1}
        rotation={0}
        rotationSpeed={0.08}
        layers={8}
        waveAmplitude={0.12}
        waveFrequency={2.5}
        waveSpeed={0.7}
        layerSpeed={0.08}
        twist={0.18}
        twistFrequency={5}
        twistSpeed={1.2}
        lineFrequency={4}
        lineSpacing={1.5}
        lineSharpness={7}
        glowFalloff={7}
        glowIntensity={1}
        brightness={1.8}
        blueBoost={1.15}
        vignette={0.65}
        grain={0}
        dpr={1.25}
        lightMode={true}
        fps={60}
        paused={false}
      />
    </div>
  );
}