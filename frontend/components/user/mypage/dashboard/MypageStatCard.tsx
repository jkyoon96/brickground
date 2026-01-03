'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatColor = 'rose' | 'purple' | 'coral' | 'cyan';

interface MypageStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: StatColor;
  href?: string;
  onClick?: () => void;
}

const colorStyles: Record<StatColor, { bg: string; icon: string }> = {
  rose: {
    bg: 'bg-[rgba(0,102,255,0.1)]',
    icon: 'text-[#0066FF]',
  },
  purple: {
    bg: 'bg-[rgba(162,155,254,0.1)]',
    icon: 'text-[#A29BFE]',
  },
  coral: {
    bg: 'bg-[rgba(59,130,246,0.1)]',
    icon: 'text-[#3B82F6]',
  },
  cyan: {
    bg: 'bg-[rgba(0,206,201,0.1)]',
    icon: 'text-[#00CEC9]',
  },
};

export function MypageStatCard({
  icon: Icon,
  label,
  value,
  color = 'rose',
  href,
  onClick,
}: MypageStatCardProps) {
  const styles = colorStyles[color];

  const content = (
    <div
      className={cn(
        'cursor-pointer rounded-[20px] border border-[#E2E8F0] bg-white p-5 text-center transition-all md:p-6',
        'hover:-translate-y-1 hover:border-[#0066FF] hover:shadow-[0_12px_30px_rgba(0,102,255,0.15)]'
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl md:h-14 md:w-14',
          styles.bg
        )}
      >
        <Icon className={cn('h-6 w-6 md:h-7 md:w-7', styles.icon)} />
      </div>
      <p className="mb-1 text-sm text-[#64748B]">{label}</p>
      <p className="text-xl font-bold text-[#1E293B] md:text-2xl">{value}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default MypageStatCard;
