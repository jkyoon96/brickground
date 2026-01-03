'use client';

import { FileText } from 'lucide-react';

interface ClassDescriptionSectionProps {
  paragraphs: string[];
  bulletPoints?: string[];
}

export function ClassDescriptionSection({ paragraphs, bulletPoints }: ClassDescriptionSectionProps) {
  return (
    <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-8">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-xl">
        <FileText className="h-5 w-5 text-[#10B981] md:h-6 md:w-6" />
        수업 소개
      </h2>

      {/* Content */}
      <div className="space-y-4 text-sm leading-relaxed text-[#64748B] md:text-base md:leading-[1.8]">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="my-4 space-y-2 md:space-y-3">
            {bulletPoints.map((point, index) => (
              <li
                key={index}
                className="relative pl-5 before:absolute before:left-0 before:top-[10px] before:h-2 before:w-2 before:rounded-full before:bg-[#10B981] md:pl-6 md:before:top-[10px]"
              >
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ClassDescriptionSection;
