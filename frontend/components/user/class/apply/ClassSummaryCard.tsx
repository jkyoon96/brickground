'use client';

import {
  Puzzle,
  Palette,
  Box,
  Bot,
  Blocks,
  Gamepad2,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  LucideIcon,
} from 'lucide-react';

type ClassIconType = 'puzzle' | 'palette' | 'cube' | 'bot' | 'blocks' | 'gamepad';

interface ClassSummaryCardProps {
  classType: string;
  title: string;
  iconType?: ClassIconType;
  schedule: string;
  location: string;
  participantCount: number;
}

const iconMap: Record<ClassIconType, LucideIcon> = {
  puzzle: Puzzle,
  palette: Palette,
  cube: Box,
  bot: Bot,
  blocks: Blocks,
  gamepad: Gamepad2,
};

export function ClassSummaryCard({
  classType,
  title,
  iconType = 'puzzle',
  schedule,
  location,
  participantCount,
}: ClassSummaryCardProps) {
  const Icon = iconMap[iconType];

  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(16,185,129,0.15)]">
      {/* Thumbnail */}
      <div className="flex aspect-[16/8] flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] md:aspect-[16/10]">
        <Icon className="h-9 w-9 text-[#10B981] md:h-12 md:w-12" />
        <span className="text-xs font-semibold text-[#10B981] md:text-sm">
          {title.split(' ')[0]} 체험
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Type Badge */}
        <div className="mb-2 inline-flex items-center gap-1 rounded-md bg-[rgba(16,185,129,0.1)] px-2 py-1 text-[11px] font-semibold text-[#10B981] md:mb-2.5 md:text-xs">
          <Sparkles className="h-3 w-3" />
          {classType}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-sm font-bold leading-snug text-[#1E293B] md:mb-3 md:text-lg">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
            <Calendar className="h-3.5 w-3.5 text-[#10B981] md:h-4 md:w-4" />
            {schedule}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
            <MapPin className="h-3.5 w-3.5 text-[#10B981] md:h-4 md:w-4" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
            <Users className="h-3.5 w-3.5 text-[#10B981] md:h-4 md:w-4" />
            참여자 {participantCount}명
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassSummaryCard;
