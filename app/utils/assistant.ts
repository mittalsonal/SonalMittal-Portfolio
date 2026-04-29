import { experience } from "@/app/data/experience";
import { profile } from "@/app/data/profile";
import { projects } from "@/app/data/projects";
import { allSkills, skillGroups } from "@/app/data/skills";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ContextChunk {
  title: string;
  text: string;
}

const contextChunks: ContextChunk[] = [
  {
    title: "Profile",
    text: `${profile.name} is a ${profile.role}. ${profile.summary} ${profile.status} Education: ${profile.education}.`
  },
  ...projects.map((project) => ({
    title: project.title,
    text: `${project.title} (${project.year}) uses ${project.tech.join(", ")}. ${project.summary} ${project.impact}`
  })),
  ...experience.map((item) => ({
    title: `${item.company} experience`,
    text: `${item.role} at ${item.company} (${item.period}). ${item.summary} ${item.bullets.join(" ")}`
  })),
  ...skillGroups.map((group) => ({
    title: `${group.title} skills`,
    text: `${group.title}: ${group.items.join(", ")}`
  }))
];

const tokenize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+\s.]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export const buildPortfolioContext = () => ({
  profile,
  projects,
  experience,
  skills: skillGroups
});

const rankContext = (question: string) => {
  const tokens = tokenize(question);

  return contextChunks
    .map((chunk) => {
      const haystack = chunk.text.toLowerCase();
      const score = tokens.reduce((total, token) => {
        if (haystack.includes(token)) {
          return total + (token.length > 4 ? 2 : 1);
        }

        return total;
      }, 0);

      return { chunk, score };
    })
    .sort((left, right) => right.score - left.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 3)
    .map((entry) => entry.chunk);
};

const skillSummary = `Sonal works across the stack with ${allSkills
  .slice(0, 8)
  .join(", ")}, and has deeper AI/ML experience with ${skillGroups[2].items.join(", ")}.`;

const projectSummary = `She has shipped ${projects
  .map((project) => project.title)
  .join(", ")}.`;

export const generateAssistantReply = (question: string) => {
  const lowerQuestion = question.toLowerCase();

  if (/(available|hire|hiring|job|opportunity)/.test(lowerQuestion)) {
    return `Yes - ${profile.name} is ${profile.status.toLowerCase()} You can reach her at ${profile.email}.`;
  }

  if (/(about|who is|tell me about sonal)/.test(lowerQuestion)) {
    return `${profile.name} is a ${profile.role} focused on AI-powered product engineering. ${profile.summary}`;
  }

  if (/(skill|stack|tech|technology|tools)/.test(lowerQuestion)) {
    return skillSummary;
  }

  if (/(second brain|rag)/.test(lowerQuestion)) {
    const project = projects.find((item) => item.id === "ai-second-brain");
    return `${project?.title} is a RAG-based knowledge system built with ${project?.tech.join(", ")}. ${project?.impact}`;
  }

  if (/(linkedin)/.test(lowerQuestion)) {
    const project = projects.find((item) => item.id === "linkedin-post-generator");
    return `${project?.title} uses ${project?.tech.join(", ")}. ${project?.impact}`;
  }

  if (/(project|build|portfolio|work)/.test(lowerQuestion)) {
    return `${projectSummary} The strongest examples are AI Second Brain, the LinkedIn Post Generator, and her production work across Akoode and KodeVortex.`;
  }

  if (/(experience|company|companies|akoode|kodevortex)/.test(lowerQuestion)) {
    return `Sonal has experience at Akoode Technologies and KodeVortex, where she led full-stack delivery, API optimization, and practical AI integrations for real products.`;
  }

  const ranked = rankContext(question);

  if (ranked.length > 0) {
    return ranked.map((item) => item.text).join(" ");
  }

  return `${profile.name} is a ${profile.role} with experience across Next.js, Node.js, Django, MongoDB, LangChain, and LLM-powered systems. Ask about her projects, experience, or availability for more detail.`;
};
