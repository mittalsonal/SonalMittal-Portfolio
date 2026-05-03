import About from "@/app/components/About";

export default function AboutSection() {
  return (
    // ✅ Changed id from "about" → "skills" so the Skills nav link scrolls here
    <section id="skills" className="relative">
      <About />
    </section>
  );
}