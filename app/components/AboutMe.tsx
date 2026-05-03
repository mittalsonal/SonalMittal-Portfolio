"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import MagneticButton from "@/app/components/MagneticButton";
import { profile } from "@/app/data/profile";
import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

export default function AboutMe() {
  return (
    <div className="shell section-space pt-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
        className="grid gap-12 border-y border-line/60 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-14"
      >
        <motion.div
          variants={fadeUp(0)}
          className="relative flex min-h-[560px] items-start justify-center overflow-hidden pt-12 sm:pt-14"
        >
          <div className="absolute left-[8%] top-[10%] h-28 w-28 rounded-full border border-walnut/15 bg-white/30" />
          <div className="absolute bottom-[2%] left-[-8%] h-[360px] w-[360px] rounded-full bg-walnut/8 blur-2xl" />
          <div className="absolute top-[16%] h-[420px] w-[330px] rounded-[190px] bg-[#ece5d9]" />
          <div className="absolute top-[10%] h-[460px] w-[360px] rounded-[210px] border border-line/50" />

          <div className="relative z-10 h-[390px] w-[290px] overflow-hidden rounded-[170px] border border-dashed border-walnut/35 bg-white/30 shadow-[0_18px_50px_rgba(26,22,18,0.12)]">
            <Image
              src="/images/AboutmeSection.jpeg"
              alt="Sonal Mittal portrait in about me section"
              fill
              sizes="290px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 rounded-[170px] bg-gradient-to-b from-white/10 via-transparent to-walnut/8" />
          </div>

          
        </motion.div>

        <motion.div
          variants={fadeUp(0.1)}
          className="flex flex-col justify-center"
        >
          <p className="editorial-label">Full Stack Developer | AI Engineer</p>
          <h2 className="mt-4 font-sans text-[clamp(3.3rem,8vw,6.2rem)] font-semibold uppercase leading-[0.9] text-foreground">
            About Me
          </h2>
          <p className="mt-3 font-display text-[clamp(2rem,4vw,3.35rem)] font-light italic leading-none text-walnut">
            Hi there, I&apos;m Sonal.
          </p>

          <div className="mt-8 max-w-[760px] space-y-6 text-[16px] leading-9 text-[#463b34]">
            <p>
              I am a full stack developer | AI engineer with a strong interest in building
              intelligent, scalable products that feel elegant in use and
              dependable underneath. My work usually lives at the intersection
              of modern frontend systems, backend architecture, and applied AI.
            </p>
            <p>
              I enjoy taking ideas from rough problem statements to shipped
              experiences, whether that means designing APIs, structuring data
              flows, or integrating LLM and retrieval workflows in a way that
              actually helps users.
            </p>
            <p>
              What matters most to me is building technology with clarity,
              care, and usefulness, products that are thoughtful in design and
              strong in execution.
            </p>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
