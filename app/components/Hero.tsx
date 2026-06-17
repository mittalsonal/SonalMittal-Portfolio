"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import MagneticButton from "@/app/components/MagneticButton";
import { profile } from "@/app/data/profile";
import { fadeUp, staggerContainer } from "@/app/utils/animations";


/* ─── Floating pill ──────────────────────────────────────────── */
function FloatingPill({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex items-center gap-2 rounded-full border border-white/12 bg-deep/80 px-3 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY    = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY     = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const glowX     = useTransform(springX, [-300, 300], [-30, 30]);
  const glowY     = useTransform(springY, [-300, 300], [-30, 30]);
  const glowXNeg  = useTransform(springX, [-300, 300], [15, -15]);
  const glowYNeg  = useTransform(springY, [-300, 300], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const headline = [
    [
      { text: "I build", italic: false, walnut: false },
      { text: "scalable,", italic: false, walnut: false },
    ],
    [
      { text: "intelligent", italic: true, walnut: true },
      { text: "systems.", italic: false, walnut: false },
    ],
  ];

  // ✅ Updated supporting label (was: FULL STACK DEVELOPER & AI ENGINEER)
  const supportingLabel = "FULL-STACK ENGINEER · AI-POWERED PRODUCTS";

  // ✅ Shorter, stronger description (was: profile.summary)
  const heroDescription =
    "I turn real-world problems into scalable digital products using full-stack development and Generative AI.";

  // ✅ Updated stats (was: profile.stats — "2 Companies" / "AI/ML Core Domain" dropped)
  const heroStats = [
    { value: "4+", label: "Production Projects" },
    { value: "1+", label: "Year Industry Experience" },
    { value: "Full-Stack + AI", label: "Core Specialization" },
  ];

  // ✅ Updated availability copy (was: "Open to opportunities — May 2025 graduate")
  const availabilityText = "Available for Full-Stack & AI Engineering roles";

  // ✅ Reduced + reordered tags (was: ["Next.js", "LangChain", "GenAI", "Node.js"])
  const techTags = ["NEXT.JS", "NODE.JS", "PYTHON", "GENAI"];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="shell relative min-h-screen overflow-hidden"
    >
      {/* Mouse-reactive ambient glows */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute right-[12%] top-[5%] h-[650px] w-[650px] rounded-full bg-walnut/11 blur-[140px]"
      />
      <motion.div
        style={{ x: glowXNeg, y: glowYNeg }}
        className="pointer-events-none absolute bottom-[5%] left-[2%] h-[380px] w-[380px] rounded-full bg-walnut/7 blur-[100px]"
      />

      <div className="relative grid min-h-screen items-center gap-10 pt-32 pb-10 lg:grid-cols-[1fr_400px] lg:gap-14 xl:grid-cols-[1fr_420px]">

        {/* ── LEFT: Text ── */}
        <motion.div
          style={{ y: textY }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="z-10 flex flex-col justify-center"
        >
          {/* Role label */}
          <motion.div variants={fadeUp(0)} className="flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="inline-block h-px w-8 bg-walnut/60"
            />
            <span className="editorial-label">{supportingLabel}</span>
          </motion.div>

          <h1
            className="mt-6 font-light text-foreground"
            style={{ fontSize: "clamp(3.2rem,6.5vw,5.5rem)", lineHeight: "0.97" }}
          >
            {headline.map((line, li) => (
              <span
                key={li}
                className="block overflow-hidden"
                style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
              >
                {line.map((word: { text: string; italic: boolean; walnut: boolean; muted?: boolean }, wi) => {
                  const delay = 0.08 + li * 0.09 + wi * 0.06;
                  return (
                    <motion.span
                      key={wi}
                      initial={{ y: "105%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                      className={`inline-block mr-[0.22em] ${word.italic ? "italic" : ""} ${
                        word.walnut ? "text-walnut" : word.muted ? "text-muted" : ""
                      }`}
                    >
                      {word.text}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Bio */}
          <motion.p variants={fadeUp(0.4)} className="muted-copy mt-8 max-w-[500px]">
            {heroDescription}
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp(0.46)} className="mt-8 flex gap-8">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="group flex flex-col gap-1 cursor-default"
              >
                <span className="font-display text-2xl font-light text-foreground transition-colors duration-300 group-hover:text-walnut">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp(0.52)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              variant="dark"
              className="group min-h-[44px] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-1.5">
                Explore My Work
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </MagneticButton>
            <MagneticButton
              href={profile.resumePath}
              variant="ghost"
              download
              className="group min-h-[44px] transition-colors duration-300 hover:border-foreground/40"
            >
              <span className="inline-flex items-center gap-1.5">
                Download Resume
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </span>
            </MagneticButton>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: Photo Card ── */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.94, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="relative flex items-center justify-center lg:justify-end pb-10 lg:pb-16 transition-transform duration-300"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, ease: "linear", repeat: Infinity }}
            className="absolute inset-[-30px] rounded-[46px] border border-dashed border-walnut/10 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            className="absolute inset-[-16px] rounded-[40px] border border-walnut/6 pointer-events-none"
          />

          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-deep shadow-glow">
            <div className="pointer-events-none absolute left-[-20%] top-[5%] h-80 w-80 rounded-full bg-walnut/22 blur-3xl" />
            <div className="pointer-events-none absolute right-[-15%] bottom-[10%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex items-center justify-between px-5 pt-5 z-10">
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-background/60"
              >
                Portfolio
              </motion.span>
              {/* ✅ Role label added in place of static year (was: 2025) */}
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-[10px] uppercase tracking-[0.2em] text-background/40"
              >
                AI Engineer
              </motion.span>
            </div>

            {/* ✅ Reduced image height for more breathing room below (was: h-[340px] sm:h-[380px] lg:h-[400px]) */}
            <div className="relative mt-3 h-[290px] sm:h-[320px] lg:h-[340px] w-full overflow-hidden">
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-display text-[6rem] italic text-walnut/6 leading-none z-0">
                Sonal
              </p>

              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/HeroSection.jpeg"
                  alt="Sonal Mittal"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-deep via-deep/65 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-deep/20 to-transparent z-10" />
            </div>

            <div className="relative -mt-2 space-y-3 px-5 pb-5 z-20">
              <div className="flex items-baseline gap-3">
                {/* ✅ Name made slightly larger/clearer (was: text-[1.55rem]) */}
                <span className="font-display text-[1.75rem] font-light leading-none text-background">
                  {profile.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-background/38">
                  {profile.shortRole}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/5 px-4 py-2.5">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#7EB58A] shadow-[0_0_18px_rgba(126,181,138,0.75)]"
                />
                <p className="text-sm text-background/70">
                  <span className="font-medium text-background">{availabilityText}</span>
                </p>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3 pt-0.5">
                {[
                  { label: "GitHub",   href: profile.github   },
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "X",        href: profile.twitter  },
                ].map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.07, borderColor: "rgba(255,255,255,0.28)" }}
                    className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-background/45 transition-colors duration-200 hover:text-background/80"
                  >
                    {s.label}
                    <span className="text-[9px] opacity-60">↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* ✅ Clearer scroll copy (was: "Scroll") */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted/55">
          Scroll to explore ↓
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-walnut/45 to-transparent"
        />
      </motion.div>
    </section>
  );
}