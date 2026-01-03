'use client';

import { PlusCircle, Ticket, Star, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityColor = 'green' | 'rose' | 'purple';

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  color: ActivityColor;
  title: string;
  description: string;
}

interface MypageActivityProps {
  title?: string;
  activities?: ActivityItem[];
}

const colorStyles: Record<ActivityColor, { bg: string; icon: string }> = {
  green: {
    bg: 'bg-[rgba(107,203,119,0.1)]',
    icon: 'text-[#6BCB77]',
  },
  rose: {
    bg: 'bg-[rgba(0,102,255,0.1)]',
    icon: 'text-[#0066FF]',
  },
  purple: {
    bg: 'bg-[rgba(162,155,254,0.1)]',
    icon: 'text-[#A29BFE]',
  },
};

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    icon: PlusCircle,
    color: 'green',
    title: '포인트 적립 +1,500P',
    description: '상품 리뷰 작성 · 2시간 전',
  },
  {
    id: '2',
    icon: Ticket,
    color: 'rose',
    title: '쿠폰 발급',
    description: '신규 회원 10% 할인 · 어제',
  },
  {
    id: '3',
    icon: Star,
    color: 'purple',
    title: '등급 업그레이드',
    description: 'SILVER → GOLD · 3일 전',
  },
];

export function MypageActivity({
  title = '최근 활동',
  activities = defaultActivities,
}: MypageActivityProps) {
  return (
    <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
      <h3 className="mb-4 text-lg font-bold text-[#1E293B]">{title}</h3>

      <div className="divide-y divide-[#E2E8F0]">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const styles = colorStyles[activity.color];

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 md:gap-4"
            >
              <div
                className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl md:h-10 md:w-10',
                  styles.bg
                )}
              >
                <Icon className={cn('h-4 w-4 md:h-5 md:w-5', styles.icon)} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#1E293B]">
                  {activity.title}
                </p>
                <p className="text-xs text-[#94A3B8]">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MypageActivity;
