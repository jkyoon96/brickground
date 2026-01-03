'use client';

import { Calendar, Users, MapPin, Star, LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

interface ClassStatsSectionProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { icon: Calendar, value: '156', label: '진행중인 클래스' },
  { icon: Users, value: '2,847', label: '누적 수강생' },
  { icon: MapPin, value: '48', label: '교육 장소' },
  { icon: Star, value: '4.9', label: '평균 만족도' },
];

export function ClassStatsSection({ stats = defaultStats }: ClassStatsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-10 md:gap-6 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-6"
          >
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(16,185,129,0.2)] to-[rgba(5,150,105,0.2)] md:mb-4 md:h-14 md:w-14">
              <Icon className="h-5 w-5 text-[#10B981] md:h-7 md:w-7" />
            </div>
            <div className="mb-1 text-xl font-extrabold text-[#10B981] md:text-[28px]">
              {stat.value}
            </div>
            <div className="text-xs text-[#64748B] md:text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ClassStatsSection;
