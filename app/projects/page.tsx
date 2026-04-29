import ChatWidget from "@/app/components/ChatWidget";
import Cursor from "@/app/components/Cursor";
import Footer from "@/app/components/Footer";
import MagneticButton from "@/app/components/MagneticButton";
import Projects from "@/app/components/Projects";
import { showcaseProjects } from "@/app/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <div className="relative isolate min-h-screen overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-walnut/12 blur-3xl" />
          <div className="absolute right-[-4%] top-[14%] h-80 w-80 rounded-full bg-deep/10 blur-3xl" />
          <div className="absolute bottom-[10%] left-[18%] h-64 w-64 rounded-full bg-walnut/10 blur-3xl" />
        </div>

        <header className="px-4 pt-4">
          <div className="shell">
            <div className="flex flex-col gap-6 rounded-[30px] border border-line/70 bg-[#f7f2eb]/80 px-6 py-6 shadow-soft backdrop-blur-xl sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/"
                  className="font-display text-xl uppercase tracking-[0.4em] text-foreground"
                  data-cursor="interactive"
                >
                  S.M.
                </a>

                <div className="flex flex-wrap gap-3">
                  <MagneticButton href="/" variant="ghost">
                    Back Home
                  </MagneticButton>
                  <MagneticButton href="/#contact" variant="dark">
                    Let&apos;s Talk
                  </MagneticButton>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                <div>
                  <p className="editorial-label">Extended showcase</p>
                  <h1 className="mt-4 text-balance text-[clamp(3rem,7vw,5.8rem)] font-light leading-[0.95] italic">
                    All projects, experiments, and concept builds.
                  </h1>
                </div>
                <p className="max-w-xl text-[15px] leading-8 text-[#6b5f54]">
                  This page expands the portfolio shelf with the core shipped work
                  plus a few additional concept cards to help present a broader
                  visual showcase for now.
                </p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Projects
            items={showcaseProjects}
            eyebrow="All projects"
            title="A broader project archive"
            description="Real portfolio work first, followed by a few polished concept cards to round out the showcase page until more case studies are added."
          />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}
