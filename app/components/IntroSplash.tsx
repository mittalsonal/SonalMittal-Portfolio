"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let dismissed = false;
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      if (dismissed) {
        return;
      }

      dismissed = true;
      setClosing(true);
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 900);
    };

    const autoTimer = window.setTimeout(dismiss, 2400);
    window.addEventListener("wheel", dismiss, { once: true });
    window.addEventListener("touchstart", dismiss, { once: true });
    window.addEventListener("keydown", dismiss, { once: true });

    return () => {
      window.clearTimeout(autoTimer);
      document.body.style.overflow = "";
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-deep px-6 text-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            closing
              ? { opacity: 0, scale: 1.02 }
              : { opacity: 1, scale: 1 }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <motion.div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-walnut/20 blur-3xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.p
              className="relative font-sans text-[clamp(4rem,13vw,9rem)] font-semibold tracking-[-0.08em] text-background"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              PORTFOLIO
            </motion.p>
            <motion.div
              className="mx-auto mt-6 h-px w-0 bg-background/20"
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ duration: 0.9, delay: 0.45 }}
            />
            <motion.p
              className="relative mt-5 text-[clamp(2rem,5vw,3.4rem)] font-display italic tracking-[0.12em] text-walnut"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
            >
              Sonal Mittal
            </motion.p>
            <motion.p
              className="mt-6 text-xs uppercase tracking-[0.36em] text-background/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Full Stack Developer & AI Engineer
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
