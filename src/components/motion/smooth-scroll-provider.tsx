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

  // ── Init Lenis once ─────────────────────────────
  useEffect(() => {
    // Respect reduced motion — bail out entirely
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Don't hijack touch — native momentum is better on mobile
      syncTouch: false,
      // Disable on inputs / selects / textareas automatically
      prevent: (node) =>
        node.nodeName === "INPUT" ||
        node.nodeName === "TEXTAREA" ||
        node.nodeName === "SELECT" ||
        node.hasAttribute("data-lenis-prevent"),
    });

    lenisRef.current = lenis;

    // ── RAF loop with visibility pause ────────────
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Pause when the tab is hidden (saves battery)
    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // React to reduced-motion changes at runtime
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        lenis.destroy();
        lenisRef.current = null;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Reset scroll on route change ────────────────
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // ── Anchor links (#section) ─────────────────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      lenisRef.current?.scrollTo(el, { offset: -80 }); // -80 for sticky header
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}