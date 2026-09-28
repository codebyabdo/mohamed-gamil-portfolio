// lib/motion.ts
//
// Unified motion tokens + variants for the entire site.
// Mirrors the CSS tokens in `app/globals.css` so JS & CSS stay in sync.

import type { Variants, Transition } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Tokens
   ═══════════════════════════════════════════════════════════════ */

export const motionTokens = {
  duration: {
    fast: 0.16,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  ease: {
    standard: [0.2, 0, 0, 1] as const,
    emphasized: [0.16, 1, 0.3, 1] as const,
    soft: [0.22, 1, 0.36, 1] as const,
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   Base transitions
   ═══════════════════════════════════════════════════════════════ */

export const transitions = {
  fast: {
    duration: motionTokens.duration.fast,
    ease: motionTokens.ease.standard,
  } as Transition,

  normal: {
    duration: motionTokens.duration.normal,
    ease: motionTokens.ease.standard,
  } as Transition,

  slow: {
    duration: motionTokens.duration.slow,
    ease: motionTokens.ease.emphasized,
  } as Transition,

  softer: {
    duration: motionTokens.duration.slow,
    ease: motionTokens.ease.soft,
  } as Transition,

  spring: {
    type: "spring",
    stiffness: 320,
    damping: 30,
    mass: 0.7,
  } as Transition,

  springSoft: {
    type: "spring",
    stiffness: 180,
    damping: 24,
  } as Transition,
} as const;

/* ═══════════════════════════════════════════════════════════════
   Common variants
   ═══════════════════════════════════════════════════════════════ */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.normal },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transitions.slow },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transitions.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transitions.springSoft },
};

export const scaleInSoft: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transitions.slow },
};

/* ═══════════════════════════════════════════════════════════════
   Container / stagger variants
   ═══════════════════════════════════════════════════════════════ */

export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

/* ═══════════════════════════════════════════════════════════════
   Viewport defaults
   ═══════════════════════════════════════════════════════════════ */

export const viewportOnce = {
  once: true,
  amount: 0.25,
} as const;

export const viewportEarly = {
  once: true,
  amount: 0.1,
} as const;