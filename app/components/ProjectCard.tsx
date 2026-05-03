"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/app/data/types";

const accentClasses: Record<Project["accent"], string> = {
  cream: "border-line/70 bg-white/45 text-foreground",
  dark: "border-white/10 bg-deep text-background",
  walnut: "border-walnut/30 bg-walnut text-background"
};

const mediaClasses: Record<Project["accent"], string> = {
  cream: "bg-[#ede3d4] text-walnut/35",
  dark: "bg-white/5 text-background/15",
  walnut: "bg-white/10 text-background/25"
};

const borderToneClasses: Record<Project["accent"], string> = {
  cream: "border-current/10",
  dark: "border-white/10",
  walnut: "border-white/15"
};

const badgeClasses: Record<Project["accent"], string> = {
  cream: "bg-foreground/8 border-foreground/15 text-foreground",
  dark: "bg-background/10 border-background/20 text-background",
  walnut: "bg-background/10 border-background/20 text-background"
};

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

function CardContent({
  project,
  index,
  total
}: ProjectCardProps) {
  const hasLink = Boolean(project.link);

  return (
    <>
      {/* Media area */}
      <div
        className={`relative overflow-hidden rounded-[22px] border p-0 ${mediaClasses[project.accent]} ${borderToneClasses[project.accent]}`}
      >
        <div className="absolute left-[-12%] top-[-14%] h-24 w-24 rounded-full bg-current/10 blur-2xl" />
        <div className="absolute bottom-[-20%] right-[-8%] h-24 w-24 rounded-full bg-current/10 blur-2xl" />
        <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-current/10" />

        <div className="relative flex aspect-[16/10] overflow-hidden rounded-[18px] border border-current/10 bg-white/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.34em] text-current/60">
                  Project Preview
                </p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-current/45">
                  Placeholder
                </span>
              </div>
              <div>
                <p className="font-display text-[2.1rem] font-light italic leading-none text-current/80">
                  {project.imagePlaceholder}
                </p>
                <p className="mt-3 max-w-[220px] text-xs uppercase tracking-[0.22em] text-current/50">
                  {project.imageHint}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.34em] text-current/60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-4 text-[2rem] font-light leading-none">
          {project.title}
        </h3>
        <p className="mt-3 text-sm uppercase tracking-[0.22em] text-current/55">
          {project.year} - {project.label}
        </p>
        <p className="mt-4 text-[15px] leading-7 text-current/78">
          {project.summary}
        </p>
      </div>

      {/* Tech tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-current/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-current/66"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Hover badge — shown on hover via group-hover */}
      <div
        className={`
          absolute right-4 top-4 rounded-full border px-3 py-1.5
          text-[10px] uppercase tracking-[0.2em]
          transition-all duration-200
          ${badgeClasses[project.accent]}
          ${hasLink
            ? "translate-y-0 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 group-hover:translate-y-[-2px]"
            : "translate-y-0 opacity-0 group-hover:opacity-60"
          }
        `}
      >
        {hasLink ? "View project ↗" : "Coming soon"}
      </div>
    </>
  );
}

export default function ProjectCard({
  project,
  index,
  total
}: ProjectCardProps) {
  const hasLink = Boolean(project.link);
  const isExternal =
    hasLink && (project.link!.startsWith("http") || project.link!.startsWith("//"));

  const baseCardClasses = `
    group relative flex h-full min-h-[610px] flex-col overflow-hidden
    rounded-[28px] border p-6 shadow-soft transition-colors duration-300
    ${accentClasses[project.accent]}
    ${hasLink ? "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current" : "cursor-default"}
  `;

  const motionProps = {
    whileHover: hasLink ? { y: -8, scale: 1.01 } : {},
    transition: { type: "spring" as const, stiffness: 240, damping: 22 }
  };

  const content = (
    <CardContent project={project} index={index} total={total} />
  );

  // External link — open in new tab
  if (hasLink && isExternal) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — open project in new tab`}
        className={baseCardClasses}
        data-cursor="interactive"
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  // Internal link — use Next.js Link for SPA navigation
  if (hasLink && !isExternal) {
    return (
      <motion.div className={baseCardClasses} data-cursor="interactive" {...motionProps}>
        <Link
          href={project.link!}
          className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          aria-label={`${project.title} — view project`}
        />
        {content}
      </motion.div>
    );
  }

  // No link — static card
  return (
    <motion.article
      className={baseCardClasses}
      data-cursor="interactive"
      {...motionProps}
    >
      {content}
    </motion.article>
  );
}