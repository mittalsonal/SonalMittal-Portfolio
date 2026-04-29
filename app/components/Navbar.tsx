"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import MagneticButton from "@/app/components/MagneticButton";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("projects");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers = links.map((link) => {
      const node = document.getElementById(link.id);

      if (!node) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.id);
            }
          });
        },
        {
          threshold: 0.24,
          rootMargin: "-20% 0px -55% 0px"
        }
      );

      observer.observe(node);

      return observer;
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="shell"
      >
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-3 shadow-soft transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-line/70 bg-[#f7f2eb]/85 backdrop-blur-xl"
              : "border-line/50 bg-[#fbf7f0]/65 backdrop-blur-lg"
          }`}
        >
          <a
            href="#home"
            className="font-display text-xl uppercase tracking-[0.4em] text-foreground"
            data-cursor="interactive"
          >
            S.M.
          </a>

          <nav className="hidden items-center gap-2 rounded-full border border-line/70 bg-white/35 p-1.5 sm:flex">
            {links.map((link) => {
              const active = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                  data-cursor="interactive"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <MagneticButton href="#contact" variant="dark" className="px-5 py-2.5 text-xs uppercase tracking-[0.24em]">
            Let&apos;s Talk
          </MagneticButton>
        </div>
      </motion.div>
    </header>
  );
}
