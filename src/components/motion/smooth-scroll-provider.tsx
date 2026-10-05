"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let isVisible = !document.hidden;
    const stopRaf = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    const startRaf = () => {
      if (!lenis || !isVisible || rafRef.current !== null) {
        return;
      }
      const raf = (time: number) => {
        if (!lenis || !isVisible) {
          rafRef.current = null;
          return;
        }
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    };
    const destroyLenis = () => {
      stopRaf();
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
    };
    const createLenis = () => {
      if (lenis || mediaQuery.matches) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        prevent: (node) =>
          node.nodeName === "INPUT" ||
          node.nodeName === "TEXTAREA" ||
          node.nodeName === "SELECT" ||
          node.hasAttribute("data-lenis-prevent"),
      });
      lenisRef.current = lenis;
      startRaf();
    };
    const syncMotionPreference = () => {
      if (mediaQuery.matches) {
        destroyLenis();
      } else {
        createLenis();
      }
    };
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        startRaf();
      } else {
        stopRaf();
      }
    };
    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      destroyLenis();
    };
  }, []);
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      if (anchor.hasAttribute("target") || anchor.hasAttribute("download")) {
        return;
      }
      const lenis = lenisRef.current;
      if (!lenis) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      let decodedId: string;
      try {
        decodedId = decodeURIComponent(id);
      } catch {
        return;
      }
      const element = document.getElementById(decodedId);
      if (!element) return;
      event.preventDefault();
      window.history.pushState(null, "", `#${encodeURIComponent(decodedId)}`);
      lenis.scrollTo(element, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);
  return <>{children}</>;
}
