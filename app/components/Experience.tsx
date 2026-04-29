import type { ExperienceItem } from "@/app/data/types";

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative rounded-[26px] border border-line/70 bg-white/35 p-6 shadow-soft"
        >
          <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-line/80 bg-background font-sans text-xs font-medium text-muted">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="pl-12">
            <p className="text-sm uppercase tracking-[0.28em] text-muted">
              {item.period}
            </p>
            <h3 className="mt-4 text-[2rem] font-light">{item.role}</h3>
            <p className="mt-1 font-display text-xl italic text-walnut">
              {item.company}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#6b5f54]">
              {item.summary}
            </p>

            <ul className="mt-5 space-y-3">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-7 text-[#6b5f54]"
                >
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-walnut" />
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
