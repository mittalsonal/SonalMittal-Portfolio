import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript", "HTML", "CSS"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Django", "Flask", "REST APIs", "MongoDB"]
  },
  {
    title: "AI / ML",
    items: ["LLMs", "LangChain", "RAG", "TensorFlow", "OpenCV", "GenAI"]
  },
  {
    title: "Tooling",
    items: ["Git", "GitHub", "Postman", "Jupyter", "Streamlit", "SQL"]
  }
];

export const allSkills = skillGroups.flatMap((group) => group.items);
