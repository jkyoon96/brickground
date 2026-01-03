'use client';

import Link from 'next/link';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface UpcomingClass {
  id: string;
  month: string;
  day: number;
  dayOfWeek: string;
  time: string;
  title: string;
  location: string;
}

interface UpcomingClassSectionProps {
  classes: UpcomingClass[];
  onViewAll?: () => void;
}

export function UpcomingClassSection({ classes, onViewAll }: UpcomingClassSectionProps) {
  if (classes.length === 0) return null;

  return (
    <section className="mt-10 border-t border-[#E2E8F0] pt-6 md:mt-[60px] md:pt-10">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1E293B] md:gap-2.5 md:text-2xl">
          <Calendar className="h-5 w-5 text-[#10B981] md:h-7 md:w-7" />
          다가오는 클래스
        </h2>
        <Button
          variant="ghost"
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-semibold text-[#0066FF]"
        >
          전체보기
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* List */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:gap-4">
        {classes.map((item) => (
          <Link
            key={item.id}
            href={`/class/${item.id}`}
            className="w-[200px] shrink-0 rounded-xl bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-transform hover:-translate-y-1 md:w-[280px] md:p-5"
          >
            {/* Date */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white md:h-12 md:w-12">
                <span className="text-[10px] font-semibold uppercase">{item.month}</span>
                <span className="text-base font-extrabold leading-none md:text-lg">{item.day}</span>
              </div>
              <div className="text-xs text-[#64748B] md:text-[13px]">
                {item.dayOfWeek} {item.time}
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-[#1E293B] md:text-[15px]">
              {item.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <MapPin className="h-3.5 w-3.5" />
              {item.location}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default UpcomingClassSection;
