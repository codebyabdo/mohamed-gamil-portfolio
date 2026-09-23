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
        rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
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
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
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
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
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
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as
      | HTMLElement
      | undefined;
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

        :root {
                    --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
}

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
          opacity: 1;
          pointer-events: none;
          display: grid;
          place-items: center;
          z-index: 1;
          
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
        .effect.filter {
            filter: blur(7px) contrast(100) blur(1);
          mix-blend-mode: normal;
        }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }

        .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: var(--gooey-pill);
            transform: scale(0);
            opacity: 0;
            z-index: 1;
            border-radius: 9999px;
        }
        .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

        /* ── Particles ────────────────────────────── */
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }

        /* ── Nav items ────────────────────────────── */
          li.active {
            color: black;
            text-shadow: none;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
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
