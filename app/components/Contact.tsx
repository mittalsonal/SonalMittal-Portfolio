"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { profile } from "@/app/data/profile";
import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

function SocialIcon({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className="flex h-14 w-14 items-center justify-center rounded-full border border-line/70 bg-white/55 text-foreground shadow-soft"
      data-cursor="interactive"
    >
      {children}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 text-foreground transition-colors duration-300 hover:text-walnut"
      data-cursor="interactive"
    >
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-line/70 bg-white/60 shadow-soft">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          {label}
        </p>
        <p className="mt-0.5 break-all text-[15px] sm:text-[18px] sm:break-normal leading-7 text-foreground">
          {value}
        </p>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <div className="shell section-space">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
        className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(139,107,74,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(26,22,18,0.04),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.62),rgba(245,240,232,0.88))] px-5 py-10 sm:px-8 sm:py-14 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[40px] border border-line/60" />
        <div className="pointer-events-none absolute left-[8%] top-[10%] h-40 w-40 rounded-full bg-walnut/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-52 w-52 rounded-full bg-white/40 blur-3xl" />

        <motion.div
          variants={fadeUp(0)}
          className="relative flex justify-center gap-4"
        >
          <SocialIcon label="GitHub">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-full w-full items-center justify-center"
              aria-label="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.25-.01-.92-.01-1.8-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.7.12 2.5.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </SocialIcon>
          <SocialIcon label="X (Twitter)">
            <a
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex h-full w-full items-center justify-center"
              aria-label="Twitter"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17.53 3H20.5l-6.56 7.5L21 21h-5.5l-4.3-5.6L6.5 21H3.5l7-8L3 3h5.6l3.9 5.1L17.53 3Zm-1.93 15h1.7L8.6 5h-1.8l8.8 13Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </SocialIcon>
          <SocialIcon label="LinkedIn">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-full w-full items-center justify-center"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="4.5"
                  y="4.5"
                  width="15"
                  height="15"
                  rx="3.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 10v5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M12.5 15.5V12.5c0-1.2.7-2 1.8-2 1 0 1.7.7 1.7 1.9v3.1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="8" r="0.9" fill="currentColor" />
              </svg>
            </a>
          </SocialIcon>
        </motion.div>

        <motion.div
          variants={fadeUp(0.08)}
          className="relative mt-8 flex justify-center"
        >
          <div className="inline-flex max-w-[1100px] items-center justify-center rounded-[999px] border border-white/80 bg-white/72 px-8 py-7 shadow-soft sm:px-14 sm:py-9 lg:px-20">
            <h2 className="text-center font-sans text-[clamp(3.6rem,10vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-foreground">
              Get In Touch!
            </h2>
          </div>
        </motion.div>

        <div className="relative mt-12 grid gap-12 lg:grid-cols-[320px_1fr] lg:items-end lg:gap-16">
          <motion.div
            variants={fadeUp(0.12)}
            className="relative mx-auto h-[320px] w-[270px] lg:mx-0"
          >
            <div className="absolute left-[18px] top-[10px] h-[260px] w-[210px] rotate-[-8deg] rounded-[8px] border border-line/60 bg-white/95 shadow-soft" />
            <div className="absolute left-[42px] top-[0px] h-[260px] w-[210px] rotate-[7deg] rounded-[8px] border border-line/60 bg-white/95 shadow-soft" />

            <div className="absolute left-[28px] top-[22px] h-[268px] w-[220px] rotate-[-4deg] rounded-[8px] border border-line/70 bg-[#fcfaf6] px-4 pb-5 pt-4 shadow-[0_18px_40px_rgba(26,22,18,0.12)]">
              <div className="absolute right-3 top-[-12px] h-14 w-6 rotate-[14deg] rounded-full border-2 border-walnut/70" />

              <div className="relative h-[190px] overflow-hidden rounded-[4px] border border-line/50 bg-[linear-gradient(135deg,rgba(139,107,74,0.22),rgba(26,22,18,0.12))]">
                <Image
                  src="/images/ContactSection.jpeg"
                  alt="Sonal Mittal contact section portrait"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%,rgba(26,22,18,0.08))]" />
              </div>

              <div className="mt-4 px-1">
                <p className="font-display text-[22px] italic text-foreground">
                  {profile.name}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp(0.18)}
            className="flex flex-col items-start text-left lg:items-start lg:text-left"
          >
            <p className="w-full max-w-[720px] text-center text-[16px] leading-9 text-[#463b34] lg:text-left">
              I&apos;m open to thoughtful collaborations, ambitious full-time
              roles, and creative engineering work where design sensitivity and
              system thinking can live in the same room.
            </p>

            {/* Contact rows — left-aligned on all sizes, full width on mobile */}
            <div className="mt-10 w-full max-w-sm space-y-5 lg:max-w-none">
              <ContactRow
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7.5 12 13l8-5.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                }
              />

              <ContactRow
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6.5 4.5h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 6.7 2 2 0 0 1 6.5 4.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>

            <div className="mt-10 flex w-full justify-center lg:justify-start">
              <div className="inline-flex items-center gap-3 rounded-full border border-foreground px-6 py-3 text-sm uppercase tracking-[0.22em] text-foreground shadow-soft">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7EB58A]" />
                Open to opportunities
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}