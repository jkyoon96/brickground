'use client';

import { User } from 'lucide-react';

export interface InstructorInfo {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

interface ClassInstructorCardProps {
  instructor: InstructorInfo;
}

export function ClassInstructorCard({ instructor }: ClassInstructorCardProps) {
  return (
    <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-8">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-xl">
        <User className="h-5 w-5 text-[#10B981] md:h-6 md:w-6" />
        강사 소개
      </h2>

      {/* Instructor Card */}
      <div className="flex flex-col items-center gap-4 rounded-[20px] bg-[#F8FAFC] p-4 text-center md:flex-row md:gap-5 md:p-6 md:text-left">
        {/* Avatar */}
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] md:h-20 md:w-20">
          {instructor.avatarUrl ? (
            <img
              src={instructor.avatarUrl}
              alt={instructor.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 text-white md:h-10 md:w-10" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="mb-1 text-base font-bold text-[#1E293B] md:mb-1.5 md:text-lg">
            {instructor.name}
          </h3>
          <p className="mb-2 text-xs font-semibold text-[#10B981] md:mb-3 md:text-sm">
            {instructor.role}
          </p>
          <p className="text-xs leading-relaxed text-[#64748B] md:text-sm md:leading-[1.6]">
            {instructor.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ClassInstructorCard;
