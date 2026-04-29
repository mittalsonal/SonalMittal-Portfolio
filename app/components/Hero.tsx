"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

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

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY  = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const glowX  = useTransform(springX, [-300, 300], [-30, 30]);
  const glowY  = useTransform(springY, [-300, 300], [-30, 30]);
  const glowXNeg = useTransform(springX, [-300, 300], [15, -15]);
  const glowYNeg = useTransform(springY, [-300, 300], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const headline = [
    [{ text: "Building", italic: false, walnut: false }, { text: "scalable", italic: true, walnut: true }],
    [{ text: "systems", italic: false, walnut: false }, { text: "with", italic: false, walnut: false }],
    [{ text: "intelligence", italic: false, walnut: false }],
    [{ text: "&", italic: true, walnut: false, muted: true }, { text: "precision.", italic: true, walnut: false, muted: true }],
  ];

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


      {/* Main grid */}
      <div className="relative grid min-h-screen items-center gap-10 pt-20 pb-10 lg:grid-cols-[1fr_460px] lg:gap-14 xl:grid-cols-[1fr_500px]">

        {/* ── LEFT: Text ── */}
        <motion.div
          style={{ y: textY }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="z-10 flex flex-col justify-center"
        >
          {/* Role label with animated line */}
          <motion.div variants={fadeUp(0)} className="flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="inline-block h-px w-8 bg-walnut/60"
            />
            <span className="editorial-label">{profile.role}</span>
          </motion.div>

          {/* ── FIXED: Word-by-word headline with descender fix ── */}
          {/*
            FIX EXPLAINED:
            - Removed `leading-[0.92]` from className to avoid Tailwind overriding our inline style
            - lineHeight: "0.96" gives slightly more room than 0.92 while keeping the tight look
            - Each line span gets paddingBottom: "0.18em" so descenders (g, y, j, p, q)
              are not clipped by overflow-hidden
            - marginBottom: "-0.18em" cancels the extra padding so line spacing stays tight
          */}
          <h1
            className="mt-6 font-light text-foreground"
            style={{ fontSize: "clamp(3rem,7vw,6rem)", lineHeight: "0.96" }}
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
            {profile.summary}
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp(0.46)} className="mt-8 flex gap-8">
            {profile.stats.map((stat, i) => (
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
            <MagneticButton href="#projects" variant="dark">View Projects</MagneticButton>
            <MagneticButton href={profile.resumePath} variant="ghost" download>Download Resume</MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp(0.58)} className="mt-8 flex items-center gap-5">
            {[
              { label: "GitHub", href: profile.github },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "Twitter", href: profile.twitter },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, color: "var(--color-foreground, #1A1612)" }}
                className="text-[10px] uppercase tracking-[0.25em] text-muted/55 transition-colors duration-200"
              >
                {s.label}
              </motion.a>
            ))}
            <span className="h-px flex-1 max-w-[60px] bg-line/40" />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Photo Card ── */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.94, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end pb-10 lg:pb-16"
        >
          {/* Slow spinning outer rings */}
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

          {/* Card */}
          <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-deep shadow-glow">
            {/* Internal glows */}
            <div className="pointer-events-none absolute left-[-20%] top-[5%] h-80 w-80 rounded-full bg-walnut/22 blur-3xl" />
            <div className="pointer-events-none absolute right-[-15%] bottom-[10%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            {/* Top bar */}
            <div className="relative flex items-center justify-between px-6 pt-6 z-10">
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-background/60"
              >
                Portfolio
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-xs text-background/30"
              >
                2025
              </motion.span>
            </div>

            {/* Photo */}
            <div className="relative mt-4 h-[420px] sm:h-[480px] lg:h-[510px] w-full overflow-hidden">
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
                  sizes="(max-width: 1024px) 90vw, 500px"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>

              {/* Gradients */}
              <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-deep via-deep/65 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-deep/20 to-transparent z-10" />

              {/* Floating pills on photo */}
              <FloatingPill className="right-4 top-4 z-20" delay={1.0}>
                <span className="h-1.5 w-1.5 rounded-full bg-walnut/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-background/55">Featured</span>
              </FloatingPill>

              <FloatingPill className="left-4 bottom-20 z-20" delay={1.2}>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-[#7EB58A] shadow-[0_0_10px_rgba(126,181,138,0.8)]"
                />
                <span className="text-[10px] text-background/60">Available for hire</span>
              </FloatingPill>
            </div>

            {/* Footer */}
            <div className="relative -mt-2 space-y-3 px-6 pb-6 z-20">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[1.75rem] font-light leading-none text-background/95">
                  {profile.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-background/38">
                  {profile.shortRole}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#7EB58A] shadow-[0_0_18px_rgba(126,181,138,0.75)]"
                />
                <p className="text-sm text-background/70">
                  <span className="font-medium text-background">{profile.availability}</span>
                  {" "}— {profile.graduation}
                </p>
              </div>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Next.js", "LangChain", "GenAI", "Node.js"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.07, borderColor: "rgba(255,255,255,0.28)" }}
                    className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-background/45 cursor-default transition-colors duration-200"
                  >
                    {tag}
                  </motion.span>
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
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted/35">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-walnut/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}