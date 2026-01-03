'use client';

import Link from 'next/link';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';

interface RecentManual {
  id: string;
  title: string;
  viewedAt: string;
}

interface RecentManualsProps {
  manuals: RecentManual[];
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function RecentManuals({
  manuals,
  showViewAll = true,
  onViewAll,
}: RecentManualsProps) {
  if (manuals.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border-t border-[#E2E8F0] pt-6 md:mt-[60px] md:pt-10">
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#1E293B] md:gap-2.5 md:text-2xl">
          <Clock className="h-6 w-6 text-[#9B59B6] md:h-7 md:w-7" />
          최근 본 매뉴얼
        </h2>
        {showViewAll && (
          <Link
            href="/manuals/recent"
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-semibold text-[#0066FF] hover:underline"
          >
            전체보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Recent List */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:gap-4">
        {manuals.map((manual) => (
          <Link
            key={manual.id}
            href={`/manual/${manual.id}`}
            className="flex w-[140px] flex-shrink-0 items-center gap-2.5 rounded-xl bg-white p-3 shadow-[0_4px_20px_rgba(155,89,182,0.15)] transition-transform hover:-translate-y-0.5 md:w-[200px] md:gap-3 md:p-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#9B59B6] to-[#5C6BC0] md:h-12 md:w-12">
              <BookOpen className="h-5 w-5 text-white md:h-6 md:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#1E293B] md:text-sm">
                {manual.title}
              </p>
              <p className="text-[11px] text-[#64748B] md:text-xs">{manual.viewedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentManuals;
