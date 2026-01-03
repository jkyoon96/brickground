'use client';

import {
  Puzzle,
  Palette,
  Box,
  Bot,
  Blocks,
  Gamepad2,
  Sparkles,
  Flame,
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ClassBadgeType = 'popular' | 'new' | 'soon' | null;
export type ClassStatusType = 'open' | 'few' | 'closed';
export type ClassType = 'experience' | 'afterSchool' | 'oneDay' | 'regular';
export type ClassIconType = 'puzzle' | 'palette' | 'cube' | 'bot' | 'blocks' | 'gamepad';

interface ClassDetailHeroProps {
  title: string;
  classType: ClassType;
  badge?: ClassBadgeType;
  status: ClassStatusType;
  iconType?: ClassIconType;
  targetAge: string;
  duration: string;
  location: string;
  rating: number;
  reviewCount: number;
}

const classTypeConfig: Record<ClassType, { label: string; icon: LucideIcon }> = {
  experience: { label: '체험수업', icon: Sparkles },
  afterSchool: { label: '방과후수업', icon: Sparkles },
  oneDay: { label: '원데이클래스', icon: Sparkles },
  regular: { label: '정기클래스', icon: Sparkles },
};

const badgeConfig: Record<Exclude<ClassBadgeType, null>, { label: string; icon: LucideIcon; className: string }> = {
  popular: {
    label: '인기',
    icon: Flame,
    className: 'bg-[#FFD93D] text-[#1E293B]',
  },
  new: {
    label: 'NEW',
    icon: Sparkles,
    className: 'bg-[#6BCB77] text-white',
  },
  soon: {
    label: '곧 시작',
    icon: Calendar,
    className: 'bg-[#F97316] text-white',
  },
};

const statusConfig: Record<ClassStatusType, { label: string; className: string }> = {
  open: { label: '모집중', className: 'bg-[#10B981]' },
  few: { label: '마감임박', className: 'bg-[#F97316]' },
  closed: { label: '마감', className: 'bg-[#FF6B6B]' },
};

const iconMap: Record<ClassIconType, LucideIcon> = {
  puzzle: Puzzle,
  palette: Palette,
  cube: Box,
  bot: Bot,
  blocks: Blocks,
  gamepad: Gamepad2,
};

export function ClassDetailHero({
  title,
  classType,
  badge,
  status,
  iconType = 'puzzle',
  targetAge,
  duration,
  location,
  rating,
  reviewCount,
}: ClassDetailHeroProps) {
  const typeConfig = classTypeConfig[classType];
  const TypeIcon = typeConfig.icon;
  const PreviewIcon = iconMap[iconType];

  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(16,185,129,0.15)]">
      {/* Hero Image */}
      <div className="relative flex aspect-[16/9] flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] md:aspect-[16/9]">
        <PreviewIcon className="h-12 w-12 text-[#10B981] md:h-20 md:w-20" />
        <span className="text-sm font-bold text-[#10B981] md:text-lg">{title.split(' ')[0]} 체험</span>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2 md:left-5 md:top-5">
          <span className="flex items-center gap-1.5 rounded-2xl bg-[#10B981] px-2.5 py-1.5 text-[11px] font-bold text-white md:px-4 md:py-2 md:text-[13px]">
            <TypeIcon className="h-3 w-3 md:h-4 md:w-4" />
            {typeConfig.label}
          </span>
          {badge && (
            <span
              className={cn(
                'flex items-center gap-1.5 rounded-2xl px-2.5 py-1.5 text-[11px] font-bold md:px-4 md:py-2 md:text-[13px]',
                badgeConfig[badge].className
              )}
            >
              {(() => {
                const BadgeIcon = badgeConfig[badge].icon;
                return <BadgeIcon className="h-3 w-3 md:h-4 md:w-4" />;
              })()}
              {badgeConfig[badge].label}
            </span>
          )}
        </div>

        {/* Status */}
        <span
          className={cn(
            'absolute right-3 top-3 rounded-2xl px-2.5 py-1.5 text-[11px] font-bold text-white md:right-5 md:top-5 md:px-4 md:py-2 md:text-[13px]',
            statusConfig[status].className
          )}
        >
          {statusConfig[status].label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8">
        {/* Type Tag */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-xl bg-[rgba(16,185,129,0.1)] px-3 py-1.5 text-xs font-semibold text-[#10B981] md:mb-4 md:text-[13px]">
          <TypeIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {typeConfig.label}
        </div>

        {/* Title */}
        <h1 className="mb-3 text-lg font-extrabold leading-tight text-[#1E293B] md:mb-4 md:text-[32px]">
          {title}
        </h1>

        {/* Meta */}
        <div className="mb-4 flex flex-wrap gap-3 md:mb-5 md:gap-6">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] md:text-sm">
            <Users className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
            {targetAge}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] md:text-sm">
            <Clock className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
            {duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] md:text-sm">
            <MapPin className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
            {location}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-4 w-4 md:h-[18px] md:w-[18px]',
                  star <= Math.round(rating)
                    ? 'fill-[#FFD93D] text-[#FFD93D]'
                    : 'fill-[#E2E8F0] text-[#E2E8F0]'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-[#64748B] md:text-sm">
            {rating.toFixed(1)} ({reviewCount}개 리뷰)
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClassDetailHero;
