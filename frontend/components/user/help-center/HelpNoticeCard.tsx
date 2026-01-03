'use client';

import Link from 'next/link';
import { Megaphone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type NoticeBadgeType = 'important' | 'update' | 'event';

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  badge: NoticeBadgeType;
}

interface HelpNoticeCardProps {
  notices: NoticeItem[];
  viewAllHref?: string;
  onNoticeClick?: (id: string) => void;
}

const badgeConfig: Record<NoticeBadgeType, { label: string; className: string }> = {
  important: {
    label: '중요',
    className: 'bg-[#FF6B6B] text-white',
  },
  update: {
    label: '업데이트',
    className: 'bg-[#00CEC9] text-white',
  },
  event: {
    label: '이벤트',
    className: 'bg-[#FFD93D] text-[#1E293B]',
  },
};

export function HelpNoticeCard({
  notices,
  viewAllHref = '/help/notices',
  onNoticeClick,
}: HelpNoticeCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between md:mb-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-[#1E293B] md:gap-2.5 md:text-lg">
          <Megaphone className="h-5 w-5 text-[#00CEC9] md:h-[22px] md:w-[22px]" />
          공지사항
        </h3>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-semibold text-[#0066FF] hover:underline"
        >
          전체보기
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Notice List */}
      <div className="flex flex-col gap-2 md:gap-3">
        {notices.map((notice) => {
          const badge = badgeConfig[notice.badge];
          return (
            <Button
              key={notice.id}
              variant="ghost"
              onClick={() => onNoticeClick?.(notice.id)}
              className="flex h-auto flex-wrap items-center justify-start gap-2 rounded-xl bg-[#F8FAFC] p-2.5 text-left hover:bg-[rgba(0,206,201,0.1)] md:flex-nowrap md:gap-3 md:p-3.5"
            >
              <span
                className={cn(
                  'flex-shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold md:text-[11px]',
                  badge.className
                )}
              >
                {badge.label}
              </span>
              <span className="order-3 min-w-full flex-1 text-[13px] font-semibold text-[#1E293B] md:order-none md:min-w-0 md:text-sm">
                {notice.title}
              </span>
              <span className="text-xs text-[#64748B]">{notice.date}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default HelpNoticeCard;
