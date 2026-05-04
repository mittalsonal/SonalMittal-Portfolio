"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import MagneticButton from "@/app/components/MagneticButton";

const links = [
  { id: "home",     label: "Home"     },
  { id: "about-me", label: "About"    },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills"   },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers = links.map((link) => {
      const node = document.getElementById(link.id);
      if (!node) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(link.id);
          });
        },
        { threshold: 0.24, rootMargin: "-20% 0px -55% 0px" }
      );

      observer.observe(node);
      return observer;
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="shell"
        >
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 sm:px-5 ${
              scrolled
                ? "border-[#b89a6e]/30 bg-[#f2ede4]/80 shadow-[0_8px_32px_rgba(26,24,20,0.08)] backdrop-blur-2xl"
                : "border-[#b89a6e]/18 bg-[#f9f5ef]/55 shadow-soft backdrop-blur-lg"
            }`}
          >
            {/* Logo image */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
              className="flex items-center"
              data-cursor="interactive"
            >
              <Image
                src="/images/portfolio_logo.png"
                alt="Sonal Mittal logo"
                width={80}
                height={40}
                className="h-12 w-auto object-contain opacity-60"
                priority
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 rounded-full border border-[#b89a6e]/18 bg-white/35 p-1.5 sm:flex">
              {links.map((link) => {
                const active = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] transition-all duration-300 ${
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

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                href="#contact"
                variant="dark"
                className="px-5 py-2.5 text-xs uppercase tracking-[0.24em]"
                onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo("contact"); }}
              >
                Let&apos;s Talk
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-[#b89a6e]/25 sm:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 origin-center bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-5 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-px w-5 origin-center bg-foreground"
              />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-[#f2ede4]/97 backdrop-blur-xl"
          >
            {/* Logo in mobile menu */}
            <div className="mb-8">
              <Image
                src="/images/portfolio_logo.png"
                alt="Sonal Mittal logo"
                width={80}
                height={40}
                className="h-10 w-auto object-contain opacity-60"
              />
            </div>

            {links.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                onClick={() => scrollTo(link.id)}
                className={`font-display text-5xl font-light tracking-wide transition-colors duration-200 ${
                  activeSection === link.id
                    ? "italic text-[#b89a6e]"
                    : "text-foreground hover:text-[#b89a6e]"
                }`}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="mt-8"
            >
              <MagneticButton
                href="#contact"
                variant="dark"
                className="px-9 py-3.5 text-xs uppercase tracking-[0.3em]"
                onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollTo("contact"); }}
              >
                Let&apos;s Talk
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}