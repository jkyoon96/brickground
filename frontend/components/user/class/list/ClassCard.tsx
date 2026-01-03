'use client';

import Link from 'next/link';
import {
  Users,
  Clock,
  MapPin,
  CheckCircle,
  Flame,
  Sparkles,
  Calendar,
  BookOpen,
  CalendarCheck,
  Repeat,
  Puzzle,
  Palette,
  Box,
  Bot,
  Blocks,
  Gamepad2,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type ClassBadgeType = 'popular' | 'new' | 'soon' | null;
export type ClassStatusType = 'open' | 'few' | 'closed';
export type ClassType = 'experience' | 'afterSchool' | 'oneDay' | 'regular';

interface ClassCardProps {
  id: string;
  title: string;
  classType: ClassType;
  targetAge: string;
  schedule: string;
  location: string;
  price: number;
  priceUnit: string;
  badge?: ClassBadgeType;
  status: ClassStatusType;
  iconType?: 'puzzle' | 'palette' | 'cube' | 'bot' | 'blocks' | 'gamepad';
  onApply?: (id: string) => void;
}

const classTypeConfig: Record<ClassType, { label: string; icon: LucideIcon }> = {
  experience: { label: '체험수업', icon: Sparkles },
  afterSchool: { label: '방과후수업', icon: BookOpen },
  oneDay: { label: '원데이클래스', icon: CalendarCheck },
  regular: { label: '정기클래스', icon: Repeat },
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

const iconMap: Record<string, LucideIcon> = {
  puzzle: Puzzle,
  palette: Palette,
  cube: Box,
  bot: Bot,
  blocks: Blocks,
  gamepad: Gamepad2,
};

export function ClassCard({
  id,
  title,
  classType,
  targetAge,
  schedule,
  location,
  price,
  priceUnit,
  badge,
  status,
  iconType = 'puzzle',
  onApply,
}: ClassCardProps) {
  const typeConfig = classTypeConfig[classType];
  const TypeIcon = typeConfig.icon;
  const PreviewIcon = iconMap[iconType] || Puzzle;
  const isClosed = status === 'closed';

  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(16,185,129,0.15)] transition-transform hover:-translate-y-1.5">
      {/* Thumbnail */}
      <Link href={`/class/${id}`}>
        <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7]">
          {/* Preview Icon */}
          <div className="flex flex-col items-center gap-3">
            <PreviewIcon className="h-12 w-12 text-[#10B981] md:h-16 md:w-16" />
            <span className="text-sm font-semibold text-[#10B981]">{title.split(' ')[0]}</span>
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                'absolute left-3 top-3 flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold',
                badgeConfig[badge].className
              )}
            >
              {(() => {
                const BadgeIcon = badgeConfig[badge].icon;
                return <BadgeIcon className="h-3 w-3" />;
              })()}
              {badgeConfig[badge].label}
            </span>
          )}

          {/* Status */}
          <span
            className={cn(
              'absolute right-3 top-3 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-white',
              statusConfig[status].className
            )}
          >
            {statusConfig[status].label}
          </span>
        </div>
      </Link>

      {/* Body */}
      <Link href={`/class/${id}`} className="block">
        <div className="p-4 md:p-5">
          {/* Type Badge */}
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[rgba(16,185,129,0.1)] px-2.5 py-1 text-xs font-semibold text-[#10B981]">
            <TypeIcon className="h-3.5 w-3.5" />
            {typeConfig.label}
          </div>

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-base font-bold leading-snug text-[#1E293B] transition-colors hover:text-[#10B981] md:text-lg">
            {title}
          </h3>

          {/* Info */}
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
              <Users className="h-4 w-4 text-[#10B981]" />
              <span>대상: {targetAge}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
              <Clock className="h-4 w-4 text-[#10B981]" />
              <span>{schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] md:text-[13px]">
              <MapPin className="h-4 w-4 text-[#10B981]" />
              <span>{location}</span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col items-stretch gap-3 border-t border-[#E2E8F0] pt-4 md:flex-row md:items-center md:justify-between">
            <div className="text-lg font-extrabold text-[#10B981] md:text-xl">
              {price.toLocaleString()}원{' '}
              <span className="text-sm font-semibold text-[#64748B]">/{priceUnit}</span>
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                if (!isClosed) {
                  onApply?.(id);
                }
              }}
              disabled={isClosed}
              className={cn(
                'w-full rounded-xl md:w-auto',
                isClosed
                  ? 'bg-[#94A3B8] hover:bg-[#94A3B8]'
                  : 'bg-[#10B981] hover:bg-[#059669]'
              )}
            >
              {isClosed ? (
                '마감'
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  신청
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ClassCard;
