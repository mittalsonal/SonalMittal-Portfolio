"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Experience from "@/app/components/Experience";
import { education } from "@/app/data/education";
import { experience } from "@/app/data/experience";
import { profile } from "@/app/data/profile";
import { skillGroups } from "@/app/data/skills";
import type { EducationItem } from "@/app/data/types";
import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

type CareerTab = "experience" | "education";

function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative rounded-[26px] border border-line/70 bg-white/35 p-6 shadow-soft"
        >
          <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-line/80 bg-background font-sans text-xs font-medium text-muted">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="pl-12">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">
              {item.period}
            </p>
            <h3 className="mt-4 text-[2rem] font-light">{item.degree}</h3>
            <p className="mt-1 font-display text-xl italic text-walnut">
              {item.school}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#6b5f54]">
              {item.summary}
            </p>

            <ul className="mt-5 space-y-3">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-7 text-[#6b5f54]"
                >
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-walnut" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<CareerTab>("experience");

  return (
    <div className="shell section-space">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer}
          className="card-surface p-7 sm:p-9"
        >
          <motion.p variants={fadeUp(0)} className="editorial-label">
            About & Career
          </motion.p>

          <motion.h2
            variants={fadeUp(0.08)}
            className="mt-5 max-w-[620px] text-4xl font-light leading-tight italic sm:text-5xl"
          >
            &quot;I build scalable AI-powered systems that solve real
            problems.&quot;
          </motion.h2>

          <motion.p
            variants={fadeUp(0.16)}
            className="muted-copy mt-7 max-w-[620px]"
          >
            {profile.about}
          </motion.p>

          <motion.div
            variants={fadeUp(0.22)}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-muted">
                Journey
              </p>
              <div className="mt-3 inline-flex rounded-full border border-line/70 bg-white/45 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("experience")}
                  className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${
                    activeTab === "experience"
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Experience
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("education")}
                  className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${
                    activeTab === "education"
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Education
                </button>
              </div>
            </div>

            <p className="max-w-[280px] text-sm leading-7 text-muted">
              {activeTab === "experience"
                ? "A quick view of the teams, products, and engineering environments I have worked in."
                : "The academic base that shaped my full-stack and AI/ML engineering approach."}
            </p>
          </motion.div>

          <motion.div variants={fadeUp(0.28)} className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === "experience" ? (
                  <Experience items={experience} />
                ) : (
                  <EducationList items={education} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer}
          className="card-surface p-7 sm:p-9"
        >
          <motion.div
            variants={fadeUp(0)}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="editorial-label">Skills</p>
              <h2 className="mt-4 text-4xl font-light italic sm:text-5xl">
                Tools I build with
              </h2>
            </div>
            <p className="max-w-[280px] text-sm leading-7 text-muted">
              Grouped by the layers I work across most often, from product UI to
              backend systems and practical AI implementation.
            </p>
          </motion.div>

          <motion.div variants={fadeUp(0.12)} className="mt-8 space-y-4">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[24px] border border-line/70 bg-white/35 p-5 shadow-soft"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-muted">
                      {group.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#6b5f54]">
                      {group.items.length} tools in this layer.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line/80 bg-background/80 px-4 py-2 text-sm text-muted transition-colors duration-300 hover:bg-foreground hover:text-background"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
