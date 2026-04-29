"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewport } from "@/app/utils/animations";

const steps = [
  {
    index: "01",
    title: "Problem Understanding",
    description:
      "Clarify the user need, technical constraints, edge cases, and delivery goals before choosing tools or architecture."
  },
  {
    index: "02",
    title: "System Design",
    description:
      "Shape the data flow, APIs, and architecture for scalability, maintainability, and calm future iteration."
  },
  {
    index: "03",
    title: "Development",
    description:
      "Build in modular layers with strong full-stack integration, clean interfaces, and production-minded implementation."
  },
  {
    index: "04",
    title: "Optimization & Deployment",
    description:
      "Refine performance, tighten reliability, and ship with observability, deployment confidence, and room to evolve."
  }
];

export default function Process() {
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
            <p className="editorial-label">Engineering workflow</p>
            <h2 className="mt-4 text-5xl font-light italic sm:text-6xl">
              Structured, elegant execution
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">
            A practical process for turning ambiguous problems into reliable,
            thoughtful products.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-px overflow-hidden rounded-[30px] border border-line/80 bg-line/70 sm:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.index}
              variants={fadeUp(0.1)}
              whileHover={{ y: -6 }}
              className="bg-background p-7 sm:p-8"
            >
              <p className="font-display text-6xl font-light leading-none text-line">
                {step.index}
              </p>
              <h3 className="mt-5 text-3xl font-light italic">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#6b5f54]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
