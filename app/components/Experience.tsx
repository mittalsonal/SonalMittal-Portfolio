import type { ExperienceItem } from "@/app/data/types";

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="rounded-[20px] sm:rounded-[26px] border border-line/70 bg-white/35 p-4 sm:p-6 shadow-soft"
        >
          {/* Header row: number badge + period inline on mobile */}
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-line/80 bg-background font-sans text-[11px] sm:text-xs font-medium text-muted">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="text-[11px] sm:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em] text-muted">
              {item.period}
            </p>
          </div>

          {/* Content — full width, no left indent on mobile */}
          <div className="sm:pl-11">
            {/* Period repeated for desktop (hidden on mobile since shown above) */}
            {/* <p className="hidden sm:block text-sm uppercase tracking-[0.28em] text-muted -mt-1 mb-4">
              {item.period}
            </p> */}

            <h3 className="text-[1.6rem] sm:text-[2rem] font-light leading-tight">
              {item.role}
            </h3>
            <p className="mt-1 font-display text-lg sm:text-xl italic text-walnut">
              {item.company}
            </p>
            <p className="mt-3 text-sm leading-[1.75] text-[#6b5f54]">
              {item.summary}
            </p>

            <ul className="mt-4 space-y-2.5">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[10px_1fr] gap-2.5 text-sm leading-[1.75] text-[#6b5f54]"
                >
                  <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-walnut flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}