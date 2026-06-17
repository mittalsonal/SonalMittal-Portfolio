import AboutSection from "@/app/sections/AboutSection";
import AboutMeSection from "@/app/sections/AboutMeSection";
import ContactSection from "@/app/sections/ContactSection";
import HeroSection from "@/app/sections/HeroSection";
import ProcessSection from "@/app/sections/ProcessSection";
import ProjectsSection from "@/app/sections/ProjectsSection";
import ChatWidget from "@/app/components/ChatWidget";
import Cursor from "@/app/components/Cursor";
import Footer from "@/app/components/Footer";
import IntroSplash from "@/app/components/IntroSplash";
import Navbar from "@/app/components/Navbar";

export default function HomePage() {
  return (
    <>
      <IntroSplash />
      <Cursor />
      <div className="relative isolate min-h-screen overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-8%] h-72 w-72 rounded-full bg-walnut/12 blur-3xl" />
          <div className="absolute right-[-4%] top-[14%] h-80 w-80 rounded-full bg-deep/10 blur-3xl" />
          <div className="absolute bottom-[10%] left-[18%] h-64 w-64 rounded-full bg-walnut/10 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative">
          <HeroSection />
          <AboutMeSection />
          <ProjectsSection />
          <AboutSection />
          {/* <ProcessSection /> */}
          <ContactSection />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}
