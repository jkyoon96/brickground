'use client';

import { Box, Users, Heart, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface CreationStatsSectionProps {
  stats?: {
    totalCreations?: number | string;
    creators?: number | string;
    likes?: number | string;
    downloads?: number | string;
  };
}

export function CreationStatsSection({ stats }: CreationStatsSectionProps) {
  const formatValue = (value: number | string | undefined): string => {
    if (!value) return '0';
    if (typeof value === 'string') return value;
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return value.toLocaleString();
  };

  const statItems: Stat[] = [
    {
      icon: Box,
      value: formatValue(stats?.totalCreations) || '12,847',
      label: '총 창작물',
    },
    {
      icon: Users,
      value: formatValue(stats?.creators) || '4,523',
      label: '창작자',
    },
    {
      icon: Heart,
      value: formatValue(stats?.likes) || '89.2K',
      label: '좋아요',
    },
    {
      icon: Download,
      value: formatValue(stats?.downloads) || '34.1K',
      label: '다운로드',
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="rounded-[20px] bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,206,201,0.15)]"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00CEC9]/20 to-[#00D4FF]/20">
              <Icon className="h-7 w-7 text-[#00CEC9]" />
            </div>
            <div className="mb-1 text-[28px] font-extrabold text-[#00CEC9]">
              {stat.value}
            </div>
            <div className="text-sm text-[#64748B]">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CreationStatsSection;
