"use client";

import { motion } from "framer-motion";

import MagneticButton from "@/app/components/MagneticButton";
import ProjectCard from "@/app/components/ProjectCard";
import type { Project } from "@/app/data/types";
import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

interface ProjectsProps {
  items: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showViewAllButton?: boolean;
}

export default function Projects({
  items,
  eyebrow = "Selected projects",
  title = "Shipped with intention",
  description = "A mix of AI systems, production engineering, and full-stack product builds designed for practical impact.",
  showViewAllButton = false
}: ProjectsProps) {
  return (
    <div className="shell section-space">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp(0)}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="editorial-label">{eyebrow}</p>
            <h2 className="mt-4 text-5xl font-light italic sm:text-6xl">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">{description}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-5 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((project, index) => (
            <motion.div key={project.id} variants={fadeUp(0.08)}>
              <ProjectCard project={project} index={index} total={items.length} />
            </motion.div>
          ))}
        </motion.div>

        {showViewAllButton ? (
          <motion.div
            variants={fadeUp(0.12)}
            className="mt-10 flex justify-center"
          >
            <MagneticButton href="/projects" variant="dark">
              View All Projects
            </MagneticButton>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}