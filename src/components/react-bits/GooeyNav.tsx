/* eslint-disable react-hooks/refs */
/* eslint-disable react-hooks/purity */
"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavRenderLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className: string;
  "aria-current"?: "page" | undefined;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onItemClick?: (index: number, item: GooeyNavItem) => void;
  renderLink?: (props: GooeyNavRenderLinkProps) => React.ReactNode;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
  renderLink,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const isMountedRef = useRef(true);

  const [internalActiveIndex, setInternalActiveIndex] =
    useState<number>(initialActiveIndex);

  const activeIndex =
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : internalActiveIndex;

  const noise = useCallback((n = 1) => n / 2 - Math.random() * n, []);

  const getXY = useCallback(
    (
      distance: number,
      pointIndex: number,
      totalPoints: number,
    ): [number, number] => {
      const angle =
        ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    },
    [noise],
  );

  const createParticle = useCallback(
    (i: number, t: number, d: [number, number], r: number) => {
      const rotate = noise(r / 10);
      return {
        start: getXY(d[0], particleCount - i, particleCount),
        end: getXY(d[1] + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate:
          rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
      };
    },
    [colors, getXY, noise, particleCount],
  );

  const trackTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      timeoutsRef.current.delete(id);
      if (isMountedRef.current) fn();
    }, delay);
    timeoutsRef.current.add(id);
    return id;
  }, []);

  const makeParticles = useCallback(
    (element: HTMLElement) => {
      const d: [number, number] = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty("--time", `${bubbleTime}ms`);

      element.querySelectorAll(".particle").forEach((p) => p.remove());

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const p = createParticle(i, t, d, r);
        element.classList.remove("active");

        trackTimeout(() => {
          if (!element.isConnected) return;
          const particle = document.createElement("span");
          const point = document.createElement("span");
          particle.classList.add("particle");
          particle.style.setProperty("--start-x", `${p.start[0]}px`);
          particle.style.setProperty("--start-y", `${p.start[1]}px`);
          particle.style.setProperty("--end-x", `${p.end[0]}px`);
          particle.style.setProperty("--end-y", `${p.end[1]}px`);
          particle.style.setProperty("--time", `${p.time}ms`);
          particle.style.setProperty("--scale", `${p.scale}`);
          particle.style.setProperty(
            "--color",
            `var(--gooey-particle-${p.color}, var(--color-sage))`,
          );
          particle.style.setProperty("--rotate", `${p.rotate}deg`);
          point.classList.add("point");
          particle.appendChild(point);
          element.appendChild(particle);

          requestAnimationFrame(() => {
            if (element.isConnected) element.classList.add("active");
          });

          trackTimeout(() => {
            particle.remove();
          }, t);
        }, 30);
      }
    },
    [
      animationTime,
      createParticle,
      noise,
      particleCount,
      particleDistances,
      particleR,
      timeVariance,
      trackTimeout,
    ],
  );

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current)
      return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    if (pos.width === 0 || pos.height === 0) return;

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      if (activeIndex === index) return;

      const liEl = e.currentTarget.closest("li") as HTMLElement | null;
      if (!liEl) return;

      if (controlledActiveIndex === undefined) {
        setInternalActiveIndex(index);
      }

      updateEffectPosition(liEl);

      if (filterRef.current) {
        filterRef.current
          .querySelectorAll(".particle")
          .forEach((p) => p.remove());
      }

      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }

      if (filterRef.current) {
        makeParticles(filterRef.current);
      }

      onItemClick?.(index, items[index]);
    },
    [
      activeIndex,
      controlledActiveIndex,
      items,
      makeParticles,
      onItemClick,
      updateEffectPosition,
    ],
  );

  useLayoutEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      activeIndex
    ] as HTMLElement | undefined;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
  }, [activeIndex, items, updateEffectPosition]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLElement | undefined;
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  useEffect(() => {
    isMountedRef.current = true;
    const timeouts = timeoutsRef.current;
    return () => {
      isMountedRef.current = false;
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  const renderedItems = useMemo(() => items, [items]);

  return (
    <>
      <style>{`
        /* ═════════════════════════════════════════════
           GooeyNav — clean pill, portfolio palette
        ═════════════════════════════════════════════ */

        .gooey-nav {
          /* Palette */
          --gooey-fg: var(--color-muted, #66716f);
          --gooey-fg-hover: var(--color-foreground, #172322);
          --gooey-active-fg: var(--color-primary-foreground, #f7f5f0);
          --gooey-pill: var(--color-primary, #183b3a);

          /* Particle colors */
          --gooey-particle-1: var(--color-sage, #769a91);
          --gooey-particle-2: var(--color-clay, #c98c70);
          --gooey-particle-3: var(--color-primary, #183b3a);
          --gooey-particle-4: var(--color-sage, #769a91);

          font-family: var(--font-heading, inherit);
        }

        /* ── Effect wrapper (positioned by JS) ────── */
        .gooey-nav .effect {
          position: absolute;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
          border-radius: 9999px;
        }

        /* Text layer: renders the active label on top of the pill */
        .gooey-nav .effect.text {
          color: transparent;
          transition: color 0.25s ease;
        }
        .gooey-nav .effect.text.active {
          color: var(--gooey-active-fg);
        }

        /* Filter layer: NO blur, NO blend — just the pill background.
           We keep the element so JS can hook into it, but style it
           as a plain rounded rect. */
        .gooey-nav .effect.filter {
          filter: none;
          mix-blend-mode: normal;
        }
        .gooey-nav .effect.filter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--gooey-pill);
          border-radius: 9999px;
          transform: scale(0.85);
          opacity: 0;
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.2s ease;
        }
        .gooey-nav .effect.filter.active::after {
          transform: scale(1);
          opacity: 1;
        }

        /* ── Particles ────────────────────────────── */
        .gooey-nav .particle,
        .gooey-nav .point {
          display: block;
          opacity: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          transform-origin: center;
          pointer-events: none;
        }
        .gooey-nav .particle {
          --time: 6000ms;
          position: absolute;
          top: calc(50% - 4px);
          left: calc(50% - 4px);
          animation: gooey-particle  var(--time) cubic-bezier(0.22, 1, 0.36, 1) 1 both;
        }
        .gooey-nav .point {
          background: var(--color);
          width: 100%;
          height: 100%;
          animation: gooey-point var(--time) cubic-bezier(0.22, 1, 0.36, 1) 1 both;
        }

        @keyframes gooey-particle {
          0% {
            transform: rotate(0deg) translate(var(--start-x), var(--start-y)) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotate)) translate(var(--end-x), var(--end-y)) scale(2);
            opacity: 0;
          }
        }
        @keyframes gooey-point {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        /* ── Nav items ────────────────────────────── */
        .gooey-nav li {
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          color: var(--gooey-fg);
          transition: color 0.25s ease;
        }
        .gooey-nav li:hover {
          color: var(--gooey-fg-hover);
        }
        .gooey-nav li.active,
        .gooey-nav li.active:hover {
          color: transparent; /* text layer renders the active label */
        }
        .gooey-nav li::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: var(--gooey-pill);
          opacity: 0;
          transform: scale(0.85);
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.2s ease;
          z-index: -1;
        }
        .gooey-nav li.active::after {
          opacity: 1;
          transform: scale(1);
        }

        /* ── Dark mode ────────────────────────────── */
        .dark .gooey-nav {
          --gooey-fg: var(--color-muted-foreground, #7b8583);
          --gooey-fg-hover: var(--color-background, #f7f5f0);
          --gooey-active-fg: var(--color-primary, #183b3a);
          --gooey-pill: var(--color-primary-foreground, #f7f5f0);
        }

        @media (prefers-reduced-motion: reduce) {
          .gooey-nav .particle,
          .gooey-nav .point {
            animation: none !important;
          }
          .gooey-nav .effect.filter::after,
          .gooey-nav li::after {
            transition-duration: 0.01ms;
          }
        }
      `}</style>

      <div className="gooey-nav relative" ref={containerRef}>
        <nav
          className="flex relative"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"
          >
            {renderedItems.map((item, index) => {
              const isActive = activeIndex === index;
              const linkProps: GooeyNavRenderLinkProps = {
                href: item.href,
                onClick: (e) => handleClick(e, index),
                className:
                  "outline-none py-[0.6em] px-[1em] inline-block rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-sage)]/50",
                "aria-current": isActive ? "page" : undefined,
                children: item.label,
              };

              return (
                <li
                  key={`${item.href}-${index}`}
                  className={`rounded-full relative cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                >
                  {renderLink ? renderLink(linkProps) : <a {...linkProps} />}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pill background layer — positioned by JS */}
        <span className="effect filter" ref={filterRef} aria-hidden="true" />

        {/* Active label overlay — renders the active text on top */}
        <span className="effect text" ref={textRef} aria-hidden="true" />
      </div>
    </>
  );
};

export default GooeyNav;