import Projects from "@/app/components/Projects";
import { homeProjects } from "@/app/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative">
      <Projects items={homeProjects} showViewAllButton />
    </section>
  );
}
