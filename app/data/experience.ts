import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "akoode",
    role: "Software Engineer",
    company: "Akoode Technologies",
    period: "June 2025 - Present",
    summary:
      "Leading delivery across multiple projects with a focus on scalable architecture, API quality, and shipping AI-enabled product features.",
    bullets: [
      "Led SDLC for multiple projects using Next.js, Node.js, and MongoDB.",
      "Optimized Django and Flask APIs, reducing response latency by 20 percent.",
      "Improved team performance by 30 percent through stronger architectural decisions."
    ]
  },
  {
    id: "kodevortex",
    role: "Full Stack Developer",
    company: "KodeVortex",
    period: "Aug 2024 - June 2025",
    summary:
      "Built product features across the stack and introduced AI-assisted capabilities to deliver a more capable learning experience.",
    bullets: [
      "Built a learning platform serving 500 plus users with React, Node.js, and Express.",
      "Integrated object detection with OpenCV and TensorFlow plus voice APIs.",
      "Reduced application load time by 25 percent through optimization and indexing improvements."
    ]
  }
];
