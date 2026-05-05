"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

const visitButtonClasses: Record<Project["accent"], string> = {
  cream: "border-foreground/20 text-foreground/70 hover:bg-foreground/8 hover:border-foreground/40 hover:text-foreground",
  dark: "border-white/20 text-background/70 hover:bg-white/10 hover:border-white/40 hover:text-background",
  walnut: "border-white/20 text-background/70 hover:bg-white/10 hover:border-white/40 hover:text-background"
};

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectCard({
  project,
  index,
  total
}: ProjectCardProps) {
  const baseCardClasses = `group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-5 sm:p-6 shadow-soft transition-colors duration-300 md:min-h-[610px] ${accentClasses[project.accent]}`;

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={baseCardClasses}
      data-cursor="interactive"
    >
      {/* Media */}
      <div
        className={`relative overflow-hidden rounded-[18px] sm:rounded-[22px] border p-0 ${mediaClasses[project.accent]} ${borderToneClasses[project.accent]}`}
      >
        <div className="absolute left-[-12%] top-[-14%] h-24 w-24 rounded-full bg-current/10 blur-2xl" />
        <div className="absolute bottom-[-20%] right-[-8%] h-24 w-24 rounded-full bg-current/10 blur-2xl" />
        <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-current/10" />

        <div className="relative flex aspect-[16/10] overflow-hidden rounded-[14px] sm:rounded-[18px] border border-current/10 bg-white/10">
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

      {/* Content */}
      <div className="mt-4 sm:mt-4">
        {/* <p className="text-[11px] uppercase tracking-[0.34em] text-current/60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p> */}
        <h3 className=" text-[1.7rem] sm:text-[2rem] font-light leading-tight">
          {project.title}
        </h3>
        <p className="mt-2 sm:mt-3 text-sm uppercase tracking-[0.22em] text-current/55">
          {project.year} - {project.label}
        </p>
        <p className="mt-3 sm:mt-4 text-[15px] leading-7 text-current/78">
          {project.summary}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-current/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-current/66"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Visit Button */}
      {project.link && (
        <div className="mt-5 sm:mt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-all duration-200 ${visitButtonClasses[project.accent]}`}
          >
            Visit Project
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      )}
    </motion.article>
  );
}