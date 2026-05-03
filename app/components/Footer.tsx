import { profile } from "@/app/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-deep px-5 py-8 text-background/55 sm:px-8 lg:px-12">
      <div className="shell flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 {profile.name}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          <a href="/#home" data-cursor="interactive">
            Homefu
          </a>
          <a href="/#about-me" data-cursor="interactive">
            About
          </a>
          <a href="/#projects" data-cursor="interactive">
            Projects
          </a>
          <a href="/#contact" data-cursor="interactive">
            Contact
          </a>
        </div>
        <p className="text-[#7eb58a]">{profile.availability}</p>
      </div>
    </footer>
  );
}
