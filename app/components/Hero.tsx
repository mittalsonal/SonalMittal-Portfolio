"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import MagneticButton from "@/app/components/MagneticButton";
import { profile } from "@/app/data/profile";
import { fadeUp, staggerContainer } from "@/app/utils/animations";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <section
      ref={sectionRef}
      className="shell section-space pt-10 sm:pt-14 lg:pt-16"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-[620px]"
        >
          <motion.p variants={fadeUp(0)} className="editorial-label">
            {profile.role}
          </motion.p>

          <motion.h1
            variants={fadeUp(0.1)}
            className="mt-6 text-balance text-[clamp(3.4rem,8vw,6.5rem)] font-light leading-[0.94] text-foreground"
          >
            Building <span className="italic text-walnut">scalable</span>{" "}
            systems
            <br />
            with intelligence
            <br />
            <span className="italic text-muted">& precision.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(0.18)}
            className="muted-copy mt-8 max-w-[540px]"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={fadeUp(0.26)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="dark">
              View Projects
            </MagneticButton>
            <MagneticButton href={profile.resumePath} variant="ghost" download>
              Download Resume
            </MagneticButton>
          </motion.div>

          
        </motion.div>

        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative"
        >
          <div className="absolute inset-x-10 top-8 h-52 rounded-full bg-walnut/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-deep text-background shadow-glow">
            <div className="pointer-events-none absolute left-[-10%] top-[8%] h-44 w-44 rounded-full bg-walnut/18 blur-3xl" />
            <div className="pointer-events-none absolute right-[-8%] top-[34%] h-52 w-52 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex min-h-[540px] flex-col">
              <div className="flex items-center justify-between px-7 pt-7 sm:px-9 sm:pt-9">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-background/70">
                  Portfolio
                </span>
                <span className="text-sm text-background/45">2025</span>
              </div>

              <div className="relative flex flex-1 flex-col items-center justify-center px-7 py-10">
                <p className="pointer-events-none absolute select-none font-display text-[5rem] italic text-walnut/10">
                  Portrait
                </p>

                <div className="absolute h-[260px] w-[260px] rounded-full border border-walnut/10" />

                <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border border-dashed border-walnut/40 bg-white/[0.03] transition-all duration-500 hover:border-walnut/70">
                  <Image
                    src="/images/HeroSection.jpeg"
                    alt="Sonal Mittal portrait in hero section"
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/8 via-transparent to-deep/12" />
                </div>

                <div className="absolute right-[calc(50%-140px)] top-[calc(50%-130px)] flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-walnut/60" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">
                    Featured
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/[0.06] bg-white/[0.025] px-7 py-5 sm:px-9">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[1.9rem] font-light leading-none text-background/92">
                    {profile.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-background/40">
                    {profile.shortRole}
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#7EB58A] shadow-[0_0_18px_rgba(126,181,138,0.75)]" />
                  <p className="text-sm text-background/72">
                    <span className="font-medium text-background">
                      {profile.availability}
                    </span>{" "}
                    - {profile.graduation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
