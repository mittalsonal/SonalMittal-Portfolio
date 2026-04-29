"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringTargetX = useMotionValue(-100);
  const ringTargetY = useMotionValue(-100);
  const ringX = useSpring(ringTargetX, {
    stiffness: 240,
    damping: 24,
    mass: 0.4
  });
  const ringY = useSpring(ringTargetY, {
    stiffness: 240,
    damping: 24,
    mass: 0.4
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updateMode = () => {
      setEnabled(mediaQuery.matches);
    };

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    const handlePointerMove = (event: PointerEvent) => {
      setVisible(true);
      dotX.set(event.clientX - 4);
      dotY.set(event.clientY - 4);
      ringTargetX.set(event.clientX - 16);
      ringTargetY.set(event.clientY - 16);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            'a, button, input, textarea, select, [data-cursor="interactive"]'
          )
        )
      );
    };

    const hideCursor = () => setVisible(false);

    if (mediaQuery.matches) {
      window.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseleave", hideCursor);
    }

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, [dotX, dotY, ringTargetX, ringTargetY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-2 w-2 rounded-full bg-walnut md:block"
        style={{
          x: dotX,
          y: dotY,
          scale: active ? 1.9 : 1,
          opacity: visible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden h-8 w-8 rounded-full border border-walnut/35 bg-transparent md:block"
        style={{
          x: ringX,
          y: ringY,
          scale: active ? 1.2 : 1,
          opacity: visible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      />
    </>
  );
}
