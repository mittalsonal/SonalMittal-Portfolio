export type ProjectAccent = "cream" | "dark" | "walnut";

export interface Project {
  id: string;
  title: string;
  year: string;
  accent: ProjectAccent;
  label: string;
  tech: string[];
  summary: string;
  impact: string;
  metric: string;
  imagePlaceholder: string;
  imageHint: string;
  image?: string;    
  isMock?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}
