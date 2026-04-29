import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
      delay
    }
  }
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease,
      delay
    }
  }
});

export const softScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease
    }
  }
};

export const viewport = {
  once: true,
  amount: 0.18
} as const;
