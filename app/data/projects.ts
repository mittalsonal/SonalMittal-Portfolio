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
    imageHint: "Search, retrieval, grounded answers",
    link: "https://github.com/mittalsonal/AI-Second-Brain" // 🔗 replace with real URL
  },
  
  {
  id: "bigcat-realty",
  image: "/images/Project/Bigcat.png",
  title: "BigCat Realty Platform",
  year: "2025",
  accent: "walnut",
  label: "Full-stack product",
  tech: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
  summary:
    "A modern real estate platform designed to help users discover, compare, and explore residential and commercial properties across prime locations with a seamless browsing experience.",
  impact:
    "Enhanced property discovery with intuitive UI, improved lead generation flow, and optimized performance for faster search and better user engagement.",
  metric: "High-conversion property discovery platform",
  imagePlaceholder: "Real Estate Dashboard",
  imageHint: "Property search, listings, city exploration",
  link: "https://www.bigcatrealty.com/" 
},
{
  id: "blue-collar-construction",
  image: "/images/Project/bluecollar.png",
  title: "Blue Collar Construction LLC",
  year: "2025",
  accent: "dark",
  label: "Full-stack website",
  tech: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  summary:
    "A modern remodeling and construction website built to showcase residential and commercial services, project portfolios, and a streamlined customer inquiry experience for homeowners and businesses.",
  impact:
    "Improved lead generation and client trust through a clean UI, structured service presentation, and optimized performance across devices.",
  metric: "40+ projects showcased with strong client engagement",
  imagePlaceholder: "Construction & Remodeling Showcase",
  imageHint: "Kitchen remodels, residential projects, service sections",
  link: "https://bluecollarbuilding.com/"
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
    imageHint: "Draft generation, refinement, tone control",
    link: "https://github.com/mittalsonal/Linkdin-Post-Generator-" // 🔗 replace with real URL
  },
  {
  id: "relisync-crm-platform",
  title: "Relisync CRM Platform",
  year: "2026",
  accent: "walnut",
  label: "Full-stack product",
  tech: ["React", "Next.js", "Node.js", "MongoDB", "CRM Systems"],
  summary:
    "A scalable real estate CRM platform that centralizes property listings, buyer management, visit tracking, and team collaboration into one intelligent system.",
  impact:
    "Enhanced operational efficiency for property advisors by simplifying lead management, improving visibility across listings, and enabling data-driven decision making.",
  metric: "End-to-end real estate workflow automation",
  imagePlaceholder: "CRM Dashboard & Analytics",
  imageHint: "Dashboard, leads, visits, analytics, collaboration",
  link: "https://relisync.akoodedemo.com/"
}
];

export const mockProjects: Project[] = [
  {
  id: "plant-chat-platform",
  image: "/images/Project/plantchat.png",
  title: "Plant Chat",
  year: "2026",
  accent: "cream",
  label: "AI-powered product",
  tech: ["Next.js", "React", "Node.js", "AI/LLM", "Data Analytics"],
  summary:
    "A next-generation wellness platform that blends AI, plant-based research, and user-generated data to deliver personalized health insights and holistic guidance.",
  impact:
    "Transformed traditional wellness exploration into an interactive, data-driven experience through AI recommendations, surveys, and continuous learning flows.",
  metric: "Evidence-informed, AI-guided wellness ecosystem",
  imagePlaceholder: "Wellness Journey Interface",
  imageHint: "AI chat, surveys, insights, plant-based health",
  link: "https://plantchat.com/"
},
  // {
  //   id: "vision-commerce-assistant",
  //   title: "Vision Commerce Assistant",
  //   year: "2026",
  //   accent: "cream",
  //   label: "AI commerce concept",
  //   tech: ["Python", "FastAPI", "OpenCV", "Vector Search"],
  //   summary:
  //     "A concept assistant that blends product search with visual similarity and conversational recommendations.",
  //   impact:
  //     "Imagined a smoother shopping flow where discovery feels guided, visual, and much more contextual.",
  //   metric: "Visual product discovery",
  //   imagePlaceholder: "Vision Search",
  //   imageHint: "Image matching, product recall",
  //   isMock: true
  // },
  // {
  //   id: "smart-interview-prep",
  //   title: "Smart Interview Prep",
  //   year: "2026",
  //   accent: "walnut",
  //   label: "Ed-tech concept",
  //   tech: ["React", "Node.js", "LLMs", "MongoDB"],
  //   summary:
  //     "A guided prep platform for technical candidates with adaptive question sets and personalized feedback loops.",
  //   impact:
  //     "Framed a more supportive interview-prep journey through structured practice and AI-generated improvement cues.",
  //   metric: "Adaptive prep journeys",
  //   imagePlaceholder: "Practice Studio",
  //   imageHint: "Question sets, scores, feedback",
  //   isMock: true
  // },
  // {
  //   id: "content-ops-studio",
  //   title: "ContentOps Studio",
  //   year: "2026",
  //   accent: "dark",
  //   label: "Workflow concept",
  //   tech: ["Next.js", "Server Actions", "CMS", "Automation"],
  //   summary:
  //     "A content operations concept focused on approvals, campaign workflows, and reusable brand publishing systems.",
  //   impact:
  //     "Explored how editorial teams could move faster with cleaner governance and fewer repetitive coordination steps.",
  //   metric: "Faster approval cycles",
  //   imagePlaceholder: "Editorial Board",
  //   imageHint: "Publishing queues, reviews, approvals",
  //   isMock: true
  // }
];

export const homeProjects = projects.slice(0, 3);

export const showcaseProjects = [...projects, ...mockProjects];