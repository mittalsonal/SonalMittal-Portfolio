"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

import { profile } from "@/app/data/profile";
import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function gmailComposeUrl(email: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/70 bg-white/60 shadow-soft sm:h-12 sm:w-12">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          {label}
        </p>
        <p className="mt-0.5 break-all text-[15px] leading-7 text-foreground sm:break-normal sm:text-[17px]">
          {value}
        </p>
      </div>
    </div>
  );

  if (!href) {
    return <div className="text-foreground">{content}</div>;
  }

  return (
    <a
      href={href}
      className="text-foreground transition-colors duration-300 hover:text-walnut"
      data-cursor="interactive"
    >
      {content}
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor="interactive"
      className="group flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-walnut"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white/55 shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5">
        {children}
      </div>
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors duration-300 group-hover:text-walnut">
        {label}
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const EmailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 7.5 12 13l8-5.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const LocationIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const AvailabilityIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 7.5V12l3 2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4.5" y="4.5" width="15" height="15" rx="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 10v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M12.5 15.5V12.5c0-1.2.7-2 1.8-2 1 0 1.7.7 1.7 1.9v3.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="8" r="0.9" fill="currentColor" />
  </svg>
);

const GitHubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.25-.01-.92-.01-1.8-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.7.12 2.5.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const XIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M17.53 3H20.5l-6.56 7.5L21 21h-5.5l-4.3-5.6L6.5 21H3.5l7-8L3 3h5.6l3.9 5.1L17.53 3Zm-1.93 15h1.7L8.6 5h-1.8l8.8 13Z"
      fill="currentColor"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Contact() {
  return (
    <div className="shell" style={{ paddingTop: 72, paddingBottom: 80 }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
        className="relative overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(139,107,74,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(26,22,18,0.04),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.62),rgba(245,240,232,0.88))] px-5 py-8 sm:px-8 sm:py-10 lg:px-12"
      >
        {/* Border overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px] border border-line/60" />

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute left-[8%] top-[10%] h-40 w-40 rounded-full bg-walnut/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-52 w-52 rounded-full bg-white/40 blur-3xl" />

        {/* Intro label */}
        <motion.div variants={fadeUp(0)} className="relative flex justify-center">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted">
            Contact
            <span className="text-walnut/60">·</span>
            Collaborate
            <span className="text-walnut/60">·</span>
            Create
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp(0.06)}
          className="relative mt-6 flex justify-center"
        >
          <div className="inline-flex max-w-[1000px] items-center justify-center rounded-[999px] border border-white/80 bg-white/72 px-6 py-3 shadow-soft sm:px-10 sm:py-5 lg:px-14">
            <h2 className="text-center font-sans text-[clamp(2rem,5.5vw,3.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-foreground">
              Let&apos;s Work Together
            </h2>
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="relative mt-10 grid gap-10 lg:grid-cols-[35%_65%] lg:items-center lg:gap-12">

          {/* Photo */}
          <motion.div
            variants={fadeUp(0.1)}
            className="relative mx-auto h-[350px] w-[297px] lg:mx-0"
          >
            {/* Stacked card layers */}
            <div className="absolute left-[24px] top-[12px] h-[286px] w-[231px] rotate-[-6deg] rounded-[8px] border border-line/60 bg-white/95 shadow-[0_10px_28px_rgba(26,22,18,0.07)]" />
            <div className="absolute left-[31px] top-[24px] h-[295px] w-[242px] rotate-[-3deg] rounded-[8px] border border-line/70 bg-[#fcfaf6] px-4 pb-5 pt-4 shadow-[0_14px_32px_rgba(26,22,18,0.10)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
              {/* Pin */}
              <div className="absolute right-3 top-[-12px] h-14 w-6 rotate-[14deg] rounded-full border-2 border-walnut/70" />

              {/* Photo */}
              <div className="relative h-[209px] overflow-hidden rounded-[4px] border border-line/50 bg-[linear-gradient(135deg,rgba(139,107,74,0.22),rgba(26,22,18,0.12))]">
                <Image
                  src="/images/ContactSection.jpeg"
                  alt="Sonal Mittal contact section portrait"
                  fill
                  sizes="242px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%,rgba(26,22,18,0.08))]" />
              </div>

              {/* Caption */}
              <div className="mt-4 px-1">
                <p className="font-display text-[22px] italic text-foreground">
                  {profile.name}
                </p>
                <p className="font-display text-[12px] italic text-muted">
                  Full-Stack + AI Engineer
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact content */}
          <motion.div
            variants={fadeUp(0.16)}
            className="flex flex-col items-start text-left"
          >
            <p className="max-w-[600px] text-[16px] leading-8 text-[#463b34]">
              I&apos;m open to full-time Full-Stack and AI Engineering roles, meaningful
              collaborations, and products that combine thoughtful design with strong
              engineering.
            </p>

            {/* Contact details */}
            <div className="mt-7 w-full max-w-md space-y-4">
              <ContactRow
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
                icon={EmailIcon}
              />
              <ContactRow
                label="Location"
                value="Gurgaon, India"
                icon={LocationIcon}
              />
              <ContactRow
                label="Availability"
                value="Full-time · Remote · Hybrid"
                icon={AvailabilityIcon}
              />
            </div>

            

            {/* CTA buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={gmailComposeUrl(profile.email)}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-[13px] uppercase tracking-[0.18em] text-background shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
              >
                Send Me an Email
                <span className="text-[11px]">↗</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-foreground/70 px-6 py-3 text-[13px] uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-foreground"
              >
                Connect on LinkedIn
                <span className="text-[11px]">↗</span>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <SocialLink href={profile.linkedin} label="LinkedIn">
                {LinkedInIcon}
              </SocialLink>
              <SocialLink href={profile.github} label="GitHub">
                {GitHubIcon}
              </SocialLink>
              <SocialLink href={profile.twitter} label="X">
                {XIcon}
              </SocialLink>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}