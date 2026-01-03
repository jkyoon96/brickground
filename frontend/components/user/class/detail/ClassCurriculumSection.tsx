'use client';

import { ListChecks } from 'lucide-react';

export interface CurriculumItem {
  number: number;
  title: string;
  description: string;
}

interface ClassCurriculumSectionProps {
  items: CurriculumItem[];
}

export function ClassCurriculumSection({ items }: ClassCurriculumSectionProps) {
  return (
    <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-8">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-xl">
        <ListChecks className="h-5 w-5 text-[#10B981] md:h-6 md:w-6" />
        커리큘럼
      </h2>

      {/* Curriculum List */}
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map((item) => (
          <div
            key={item.number}
            className="flex gap-3 rounded-xl bg-[#F8FAFC] p-3 md:gap-4 md:p-5"
          >
            {/* Number Circle */}
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#10B981] text-xs font-extrabold text-white md:h-10 md:w-10 md:text-base">
              {item.number}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-bold text-[#1E293B] md:mb-1.5 md:text-base">
                {item.title}
              </h4>
              <p className="text-xs text-[#64748B] md:text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClassCurriculumSection;
