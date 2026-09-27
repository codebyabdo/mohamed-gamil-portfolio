import GhostFibers from "../react-bits/GhostFibers";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-1 pointer-events-none">
      <GhostFibers
        lineColor="#183b3a"
        glowColor="#769a91"
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
