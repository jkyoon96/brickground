'use client';

import { BookOpen, Box, Download, Clock } from 'lucide-react';

interface ManualStat {
  icon: 'book' | 'lego' | 'download' | 'new';
  value: string | number;
  label: string;
}

interface ManualStatsSectionProps {
  stats?: ManualStat[];
}

const defaultStats: ManualStat[] = [
  { icon: 'book', value: '2,847', label: '전체 매뉴얼' },
  { icon: 'lego', value: '1,234', label: '레고 매뉴얼' },
  { icon: 'download', value: '156K', label: '다운로드' },
  { icon: 'new', value: '24', label: '신규 (이번 주)' },
];

const iconMap = {
  book: BookOpen,
  lego: Box,
  download: Download,
  new: Clock,
};

export function ManualStatsSection({ stats = defaultStats }: ManualStatsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 md:mb-10 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={index}
            className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(155,89,182,0.15)] md:p-6"
          >
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(155,89,182,0.2)] to-[rgba(92,107,192,0.2)] md:mb-4 md:h-14 md:w-14">
              <Icon className="h-[22px] w-[22px] text-[#9B59B6] md:h-7 md:w-7" />
            </div>
            <div className="mb-1 text-[22px] font-extrabold text-[#9B59B6] md:text-[28px]">
              {stat.value}
            </div>
            <div className="text-xs text-[#64748B] md:text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ManualStatsSection;
