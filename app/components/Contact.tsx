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
      className="flex items-center justify-center gap-4 text-center text-foreground transition-colors duration-300 hover:text-walnut sm:justify-start sm:text-left"
      data-cursor="interactive"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line/70 bg-white/60 shadow-soft">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          {label}
        </p>
        <p className="mt-1 text-[18px] leading-8 text-foreground">{value}</p>
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
          <SocialIcon label="TikTok">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 4c.5 1.7 1.8 3.2 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M13 4v10.2a3.8 3.8 0 1 1-3.8-3.7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SocialIcon>
          <SocialIcon label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="4.5"
                y="4.5"
                width="15"
                height="15"
                rx="4.2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="12"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="17.2" cy="6.9" r="1" fill="currentColor" />
            </svg>
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
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted">
                  Polaroid portrait
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp(0.18)}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <p className="max-w-[720px] text-[16px] leading-9 text-[#463b34]">
              I&apos;m open to thoughtful collaborations, ambitious full-time
              roles, and creative engineering work where design sensitivity and
              system thinking can live in the same room.
            </p>

            <div className="mt-10 space-y-6">
              <ContactRow
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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

            <div className="mt-10 flex justify-center lg:justify-start">
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
