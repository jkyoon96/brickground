'use client';

import { Info } from 'lucide-react';

interface ApplyNotesCardProps {
  notes: string[];
  title?: string;
}

export function ApplyNotesCard({ notes, title = '안내사항' }: ApplyNotesCardProps) {
  return (
    <div className="rounded-[20px] bg-[rgba(16,185,129,0.1)] p-3.5 md:p-5">
      {/* Title */}
      <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#1E293B] md:mb-3 md:text-base">
        <Info className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
        {title}
      </h4>

      {/* Notes List */}
      <ul className="space-y-1 text-xs leading-relaxed text-[#64748B] md:text-[13px] md:leading-[1.8]">
        {notes.map((note, index) => (
          <li key={index} className="relative pl-4 before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-[#10B981]">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplyNotesCard;
