import Image from "next/image";

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
            <div className="flex items-center justify-between rounded-[30px] border border-line/70 bg-[#f7f2eb]/80 px-5 py-3.5 shadow-soft backdrop-blur-xl sm:px-7 sm:py-4">
              {/* Logo */}
              <a href="/" data-cursor="interactive" className="shrink-0">
                <Image
                  src="/images/portfolio_logo.png"
                  alt="S.M. logo"
                  width={48}
                  height={48}
                  className="h-10 w-auto sm:h-11"
                />
              </a>

              {/* Nav actions */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <MagneticButton href="/" variant="ghost">
                  Back Home
                </MagneticButton>
                <MagneticButton href="/#contact" variant="dark">
                  Let&apos;s Talk
                </MagneticButton>
              </div>
            </div>
          </div>
        </header>

        <main className="[&_.section-space]:pt-8 sm:[&_.section-space]:pt-10">
          <Projects
            items={showcaseProjects}
            eyebrow="Extended showcase"
            title="All projects, experiments, and concept builds."
            description="Core shipped work plus a few polished concept cards to round out the showcase."
          />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}