import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "ai-second-brain",
    image: "/images/Project/AI_QuesAnsDark.jpeg",
    title: "AI Second Brain",
    year: "2024",
    accent: "cream",
    label: "Featured build",
    tech: ["RAG", "Next.js", "FastAPI", "MongoDB", "LangChain"],
    summary:
      "An AI-powered knowledge system with semantic search, note retrieval, and PDF processing for context-aware answers.",
    impact:
      "Turned personal documents and notes into a searchable, assistant-style interface with accurate, grounded responses.",
    metric: "Context-aware Q&A over personal knowledge",
    imagePlaceholder: "Knowledge Graph",
    imageHint: "Search, retrieval, grounded answers"
  },
  {
    id: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    year: "2024",
    accent: "dark",
    label: "LLM workflow",
    tech: ["LLaMA 3.2", "LangChain", "Python", "Groq Cloud", "Streamlit"],
    summary:
      "An end-to-end LLM content workflow that generates polished LinkedIn drafts using chained prompts and lightweight controls.",
    impact:
      "Reduced manual drafting effort by 60 percent while keeping output structured, on-brand, and easy to refine.",
    metric: "60 percent less manual drafting",
    imagePlaceholder: "Prompt Flow",
    imageHint: "Draft generation, refinement, tone control"
  },
  {
    id: "learning-platform",
    title: "Learning Platform",
    year: "2025",
    accent: "cream",
    label: "Full-stack product",
    tech: ["React", "Node.js", "Express", "OpenCV", "TensorFlow"],
    summary:
      "A full-stack learning platform built for 500 plus users with object detection and voice capabilities integrated into the experience.",
    impact:
      "Improved usability and performance while expanding the platform into richer AI-enabled learning flows.",
    metric: "500 plus active users",
    imagePlaceholder: "Student Dashboard",
    imageHint: "Voice, learning paths, computer vision"
  },
  {
    id: "akoode-production-apis",
    title: "Production APIs at Akoode",
    year: "2025",
    accent: "walnut",
    label: "Backend engineering",
    tech: ["Next.js", "Node.js", "Django", "MongoDB", "REST APIs"],
    summary:
      "Production-facing platform work spanning frontend delivery, API optimization, and AI feature integration for client systems.",
    impact:
      "Reduced response latency by 20 percent and supported stronger delivery velocity across multiple projects.",
    metric: "20 percent faster API response",
    imagePlaceholder: "API Architecture",
    imageHint: "Service layers, latency optimization"
  }
];

export const mockProjects: Project[] = [
  {
    id: "insight-dashboard",
    title: "Insight Dashboard",
    year: "2026",
    accent: "cream",
    label: "Analytics concept",
    tech: ["Next.js", "TypeScript", "Charts", "PostgreSQL"],
    summary:
      "A premium analytics workspace designed to turn business signals into clean, actionable decision flows.",
    impact:
      "Created a calmer reporting experience with role-based dashboards, modular widgets, and faster executive visibility.",
    metric: "Executive-ready reporting",
    imagePlaceholder: "Data Panels",
    imageHint: "Filters, charts, KPI snapshots",
    isMock: true
  },
  {
    id: "vision-commerce-assistant",
    title: "Vision Commerce Assistant",
    year: "2026",
    accent: "dark",
    label: "AI commerce concept",
    tech: ["Python", "FastAPI", "OpenCV", "Vector Search"],
    summary:
      "A concept assistant that blends product search with visual similarity and conversational recommendations.",
    impact:
      "Imagined a smoother shopping flow where discovery feels guided, visual, and much more contextual.",
    metric: "Visual product discovery",
    imagePlaceholder: "Vision Search",
    imageHint: "Image matching, product recall",
    isMock: true
  },
  {
    id: "smart-interview-prep",
    title: "Smart Interview Prep",
    year: "2026",
    accent: "walnut",
    label: "Ed-tech concept",
    tech: ["React", "Node.js", "LLMs", "MongoDB"],
    summary:
      "A guided prep platform for technical candidates with adaptive question sets and personalized feedback loops.",
    impact:
      "Framed a more supportive interview-prep journey through structured practice and AI-generated improvement cues.",
    metric: "Adaptive prep journeys",
    imagePlaceholder: "Practice Studio",
    imageHint: "Question sets, scores, feedback",
    isMock: true
  },
  {
    id: "content-ops-studio",
    title: "ContentOps Studio",
    year: "2026",
    accent: "cream",
    label: "Workflow concept",
    tech: ["Next.js", "Server Actions", "CMS", "Automation"],
    summary:
      "A content operations concept focused on approvals, campaign workflows, and reusable brand publishing systems.",
    impact:
      "Explored how editorial teams could move faster with cleaner governance and fewer repetitive coordination steps.",
    metric: "Faster approval cycles",
    imagePlaceholder: "Editorial Board",
    imageHint: "Publishing queues, reviews, approvals",
    isMock: true
  }
];

export const homeProjects = projects.slice(0, 3);

export const showcaseProjects = [...projects, ...mockProjects];
