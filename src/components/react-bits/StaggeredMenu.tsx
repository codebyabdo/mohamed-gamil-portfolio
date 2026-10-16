"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@/i18n/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuLinkRenderProps {
  item: StaggeredMenuItem;
  children: React.ReactNode;
  className: string;
  href: string;
  "aria-label": string;
  "data-index": number;
  onClick: () => void;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  renderItem?: (props: StaggeredMenuLinkRenderProps) => React.ReactNode;
}

const StaggeredMenuItemLink: React.FC<{
  item: StaggeredMenuItem;
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const commonClassName =
    "sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-[clamp(2.5rem,6vw,4rem)] font-semibold uppercase leading-none tracking-[-2px] text-foreground no-underline transition-colors duration-150 ease-linear hover:text-(--sm-accent)";

  const content = (
    <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
      {item.label}
    </span>
  );

  return (
    <li
      className="sm-panel-itemWrap relative overflow-hidden leading-none"
      key={`${item.label}-${index}`}
    >
      <Link
        href={item.link}
        className={commonClassName}
        aria-label={item.ariaLabel}
        data-index={index + 1}
        onClick={onClick}
      >
        {content}
      </Link>
    </li>
  );
};

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  accentColor = "#5227FF",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  renderItem,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const busyRef = useRef(false);

  const reducedMotionRef = useRef(false);

  /*
   * Keep the latest callbacks available without forcing
   * animation callbacks/effects to recreate unnecessarily.
   */
  const onMenuOpenRef = useRef(onMenuOpen);
  const onMenuCloseRef = useRef(onMenuClose);

  useEffect(() => {
    onMenuOpenRef.current = onMenuOpen;
    onMenuCloseRef.current = onMenuClose;
  }, [onMenuOpen, onMenuClose]);

  /*
   * Respect the user's system motion preference.
   *
   * GSAP is not controlled by Framer Motion's MotionConfig,
   * so this needs to be handled explicitly here.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updateReducedMotion();

    mediaQuery.addEventListener("change", updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateReducedMotion);
    };
  }, []);

  /*
   * Initial GSAP state.
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) {
        return;
      }

      const preLayers = preContainer
        ? (Array.from(
            preContainer.querySelectorAll(".sm-prelayer"),
          ) as HTMLElement[])
        : [];

      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;

      gsap.set([panel, ...preLayers], {
        xPercent: offscreen,
        opacity: 1,
      });

      if (preContainer) {
        gsap.set(preContainer, {
          xPercent: 0,
          opacity: 1,
        });
      }

      gsap.set(plusH, {
        transformOrigin: "50% 50%",
        rotate: 0,
      });

      gsap.set(plusV, {
        transformOrigin: "50% 50%",
        rotate: 90,
      });

      gsap.set(icon, {
        rotate: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(textInner, {
        yPercent: 0,
      });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, {
          color: menuButtonColor,
        });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  /*
   * Instantly reset the visual state.
   * Used for reduced-motion mode.
   */
  const setOpenStateImmediately = useCallback(
    (isOpen: boolean) => {
      const panel = panelRef.current;
      const layers = preLayerElsRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      const button = toggleBtnRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) {
        return;
      }

      const offscreen = position === "left" ? -100 : 100;

      openTlRef.current?.kill();
      closeTweenRef.current?.kill();
      spinTweenRef.current?.kill();
      textCycleAnimRef.current?.kill();
      colorTweenRef.current?.kill();
      itemEntranceTweenRef.current?.kill();

      openTlRef.current = null;
      closeTweenRef.current = null;
      spinTweenRef.current = null;
      textCycleAnimRef.current = null;
      colorTweenRef.current = null;
      itemEntranceTweenRef.current = null;

      gsap.set([...layers, panel], {
        xPercent: isOpen ? 0 : offscreen,
      });

      gsap.set(plusH, {
        rotate: isOpen ? 45 : 0,
      });

      gsap.set(plusV, {
        rotate: isOpen ? -45 : 90,
      });

      gsap.set(icon, {
        rotate: 0,
      });

      gsap.set(textInner, {
        yPercent: 0,
      });

      if (button) {
        gsap.set(button, {
          color: isOpen ? openMenuButtonColor : menuButtonColor,
        });
      }

      const itemEls = Array.from(
        panel.querySelectorAll(".sm-panel-itemLabel"),
      ) as HTMLElement[];

      gsap.set(itemEls, {
        yPercent: isOpen ? 0 : 140,
        rotate: isOpen ? 0 : 10,
      });

      const numberEls = Array.from(
        panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
      ) as HTMLElement[];

      gsap.set(numberEls, {
        "--sm-num-opacity": isOpen ? 1 : 0,
      });

      const socialTitle = panel.querySelector(
        ".sm-socials-title",
      ) as HTMLElement | null;

      const socialLinks = Array.from(
        panel.querySelectorAll(".sm-socials-link"),
      ) as HTMLElement[];

      if (socialTitle) {
        gsap.set(socialTitle, {
          opacity: isOpen ? 1 : 0,
        });
      }

      gsap.set(socialLinks, {
        y: isOpen ? 0 : 25,
        opacity: isOpen ? 1 : 0,
      });
    },
    [menuButtonColor, openMenuButtonColor, position],
  );

  /*
   * Build the opening timeline.
   */
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      return null;
    }

    openTlRef.current?.kill();

    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];

    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];

    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;

    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;

    const layerStates = layers.map((element) => ({
      element,
      start: offscreen,
    }));

    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, {
        yPercent: 140,
        rotate: 10,
      });
    }

    if (numberEls.length) {
      gsap.set(numberEls, {
        "--sm-num-opacity": 0,
      });
    }

    if (socialTitle) {
      gsap.set(socialTitle, {
        opacity: 0,
      });
    }

    if (socialLinks.length) {
      gsap.set(socialLinks, {
        y: 25,
        opacity: 0,
      });
    }

    const tl = gsap.timeline({
      paused: true,
    });

    layerStates.forEach(({ element, start }, index) => {
      tl.fromTo(
        element,
        { xPercent: start },
        {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        index * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;

    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);

    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      {
        xPercent: 0,
        duration: panelDuration,
        ease: "power4.out",
      },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        itemsStart,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: {
              each: 0.08,
              from: "start",
            },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          socialsStart,
        );
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: {
              each: 0.08,
              from: "start",
            },
            onComplete: () => {
              gsap.set(socialLinks, {
                clearProps: "opacity",
              });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;

    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (reducedMotionRef.current) {
      setOpenStateImmediately(true);
      busyRef.current = false;
      return;
    }

    if (busyRef.current) {
      return;
    }

    busyRef.current = true;

    const tl = buildOpenTimeline();

    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });

    tl.play(0);
  }, [buildOpenTimeline, setOpenStateImmediately]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      busyRef.current = false;
      return;
    }

    if (reducedMotionRef.current) {
      setOpenStateImmediately(false);
      busyRef.current = false;
      return;
    }

    const all: HTMLElement[] = [...layers, panel];

    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];

        if (itemEls.length) {
          gsap.set(itemEls, {
            yPercent: 140,
            rotate: 10,
          });
        }

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        ) as HTMLElement[];

        if (numberEls.length) {
          gsap.set(numberEls, {
            "--sm-num-opacity": 0,
          });
        }

        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;

        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];

        if (socialTitle) {
          gsap.set(socialTitle, {
            opacity: 0,
          });
        }

        if (socialLinks.length) {
          gsap.set(socialLinks, {
            y: 25,
            opacity: 0,
          });
        }

        busyRef.current = false;
      },
    });
  }, [position, setOpenStateImmediately]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const horizontal = plusHRef.current;
    const vertical = plusVRef.current;

    if (!icon || !horizontal || !vertical) {
      return;
    }

    spinTweenRef.current?.kill();

    if (reducedMotionRef.current) {
      gsap.set(horizontal, {
        rotate: opening ? 45 : 0,
      });

      gsap.set(vertical, {
        rotate: opening ? -45 : 90,
      });

      gsap.set(icon, {
        rotate: 0,
      });

      return;
    }

    if (opening) {
      gsap.set(icon, {
        rotate: 0,
        transformOrigin: "50% 50%",
      });

      spinTweenRef.current = gsap
        .timeline({
          defaults: {
            ease: "power4.out",
          },
        })
        .to(
          horizontal,
          {
            rotate: 45,
            duration: 0.5,
          },
          0,
        )
        .to(
          vertical,
          {
            rotate: -45,
            duration: 0.5,
          },
          0,
        );
    } else {
      spinTweenRef.current = gsap
        .timeline({
          defaults: {
            ease: "power3.inOut",
          },
        })
        .to(
          horizontal,
          {
            rotate: 0,
            duration: 0.35,
          },
          0,
        )
        .to(
          vertical,
          {
            rotate: 90,
            duration: 0.35,
          },
          0,
        )
        .to(
          icon,
          {
            rotate: 0,
            duration: 0.001,
          },
          0,
        );
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const button = toggleBtnRef.current;

      if (!button) {
        return;
      }

      colorTweenRef.current?.kill();

      const targetColor = opening ? openMenuButtonColor : menuButtonColor;

      if (reducedMotionRef.current || !changeMenuColorOnOpen) {
        gsap.set(button, {
          color: targetColor,
        });

        return;
      }

      colorTweenRef.current = gsap.to(button, {
        color: targetColor,
        delay: 0.18,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    const button = toggleBtnRef.current;

    if (!button) {
      return;
    }

    const targetColor =
      changeMenuColorOnOpen && openRef.current
        ? openMenuButtonColor
        : menuButtonColor;

    gsap.set(button, {
      color: targetColor,
    });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;

    if (!inner) {
      return;
    }

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";

    if (reducedMotionRef.current) {
      setTextLines([targetLabel]);

      requestAnimationFrame(() => {
        gsap.set(inner, {
          yPercent: 0,
        });
      });

      return;
    }

    const cycles = 3;

    const sequence: string[] = [currentLabel];

    let last = currentLabel;

    for (let index = 0; index < cycles; index += 1) {
      last = last === "Menu" ? "Close" : "Menu";
      sequence.push(last);
    }

    if (last !== targetLabel) {
      sequence.push(targetLabel);
    }

    sequence.push(targetLabel);

    setTextLines(sequence);

    gsap.set(inner, {
      yPercent: 0,
    });

    const lineCount = sequence.length;

    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const focusFirstItem = useCallback(() => {
    requestAnimationFrame(() => {
      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const firstFocusableItem = panel.querySelector<HTMLElement>(
        ".sm-panel-itemWrap a, .sm-panel-itemWrap button",
      );

      firstFocusableItem?.focus();
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;

    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpenRef.current?.();
      playOpen();

      animateIcon(true);
      animateColor(true);
      animateText(true);

      focusFirstItem();
      return;
    }

    onMenuCloseRef.current?.();

    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);

    requestAnimationFrame(() => {
      toggleBtnRef.current?.focus();
    });
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    focusFirstItem,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) {
      return;
    }

    openRef.current = false;
    setOpen(false);

    onMenuCloseRef.current?.();

    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);

    requestAnimationFrame(() => {
      toggleBtnRef.current?.focus();
    });
  }, [playClose, animateIcon, animateColor, animateText]);

  /*
   * Close when clicking outside the panel.
   */
  useEffect(() => {
    if (!closeOnClickAway || !open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const panel = panelRef.current;
      const button = toggleBtnRef.current;

      if (
        panel &&
        !panel.contains(target) &&
        button &&
        !button.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  /*
   * Escape closes the menu.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  /*
   * Cleanup all GSAP animations on unmount.
   */
  useEffect(() => {
    return () => {
      openTlRef.current?.kill();
      closeTweenRef.current?.kill();
      spinTweenRef.current?.kill();
      textCycleAnimRef.current?.kill();
      colorTweenRef.current?.kill();
      itemEntranceTweenRef.current?.kill();
    };
  }, []);

  const wrapperStyle = accentColor
    ? ({
        "--sm-accent": accentColor,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={cn(
        "sm-scope pointer-events-none",
        isFixed
          ? "fixed inset-0 z-40 h-dvh w-screen overflow-hidden"
          : "relative h-full w-full",
      )}
    >
      <div
        className={cn(
          "staggered-menu-wrapper pointer-events-none relative z-40 h-dvh w-full",
          className,
        )}
        style={wrapperStyle}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Pre-layers */}
        <div
          ref={preLayersRef}
          className={cn(
            "sm-prelayers pointer-events-none absolute bottom-0 top-0 z-[5] w-[clamp(260px,38vw,420px)]",
            position === "left" ? "left-0 right-auto" : "right-0 left-auto",
          )}
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors.length > 0 ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];

            const layers = [...raw];

            if (layers.length >= 3) {
              const middle = Math.floor(layers.length / 2);

              layers.splice(middle, 1);
            }

            return layers.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="sm-prelayer absolute inset-0 h-full w-full"
                style={{
                  background: color,
                }}
              />
            ));
          })()}
        </div>

        {/* Header */}
        <header
          className="staggered-menu-header pointer-events-none absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-transparent p-6 sm:p-8"
          aria-label="Main navigation header"
        >
          <div
            className="sm-logo pointer-events-auto flex select-none items-center"
            aria-label="Logo"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt=""
                className="sm-logo-img block h-8 w-auto object-contain"
              />
            ) : null}
          </div>

          <button
            ref={toggleBtnRef}
            className={cn(
              "sm-toggle pointer-events-auto relative inline-flex",
              "items-center gap-1.5",
              "cursor-pointer border-0 bg-transparent",
              "font-medium leading-none",
              "overflow-visible",
              "focus-visible:outline-2 focus-visible:outline-offset-4",
              "focus-visible:outline-(--sm-accent)",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              className="sm-toggle-textWrap relative inline-block h-[1em] w-auto min-w-[var(--sm-toggle-width,auto)] overflow-hidden whitespace-nowrap"
              aria-hidden="true"
            >
              <span
                ref={textInnerRef}
                className="sm-toggle-textInner flex flex-col leading-none"
              >
                {textLines.map((line, index) => (
                  <span
                    className="sm-toggle-line block h-[1em] leading-none"
                    key={`${line}-${index}`}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center will-change-transform"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-xs bg-current will-change-transform"
              />

              <span
                ref={plusVRef}
                className="sm-icon-line absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-xs bg-current will-change-transform"
              />
            </span>
          </button>
        </header>

        {/* Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className={cn(
            "staggered-menu-panel fixed inset-y-0 z-10 flex flex-col overflow-y-auto",
            "h-dvh w-full md:w-[46vw] md:max-w-[560px]",
            "bg-background p-[6em_2em_2em]",
            "backdrop-blur-md",
            position === "left" ? "left-0 right-auto" : "right-0 left-auto",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
          style={{
            WebkitBackdropFilter: "blur(12px)",
          }}
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <div className="sm-panel-inner flex flex-1 flex-col gap-5">
            <ul
              className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length > 0 ? (
                items.map((item, index) => (
                  <StaggeredMenuItemLink
                    key={`${item.label}-${index}`}
                    item={item}
                    index={index}
                    onClick={closeMenu}
                  />
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative inline-block cursor-default pr-[1.4em] text-[clamp(2.5rem,6vw,4rem)] font-semibold uppercase leading-none tracking-[-2px] text-foreground">
                    <span className="sm-panel-itemLabel inline-block origin-[50%_100%]">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto flex flex-col gap-3 pt-8"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium text-(--sm-accent)">
                  Socials
                </h3>

                <ul
                  className="sm-socials-list m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0"
                  role="list"
                >
                  {socialItems.map((social, index) => (
                    <li
                      key={`${social.label}-${index}`}
                      className="sm-socials-item"
                    >
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link relative inline-block py-0.5 text-[1.1rem] font-medium text-foreground no-underline transition-[color,opacity] duration-300 ease-linear hover:text-(--sm-accent) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--sm-accent)"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaggeredMenu;
