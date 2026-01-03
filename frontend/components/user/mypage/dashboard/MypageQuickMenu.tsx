'use client';

import Link from 'next/link';
import { Package, Heart, Ticket, Coins, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuickMenuColor = 'rose' | 'purple' | 'cyan' | 'coral';

interface QuickMenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  color: QuickMenuColor;
}

interface MypageQuickMenuProps {
  title?: string;
  items?: QuickMenuItem[];
}

const colorStyles: Record<QuickMenuColor, { bg: string; icon: string }> = {
  rose: {
    bg: 'bg-[rgba(0,102,255,0.1)]',
    icon: 'text-[#0066FF]',
  },
  purple: {
    bg: 'bg-[rgba(162,155,254,0.1)]',
    icon: 'text-[#A29BFE]',
  },
  cyan: {
    bg: 'bg-[rgba(0,206,201,0.1)]',
    icon: 'text-[#00CEC9]',
  },
  coral: {
    bg: 'bg-[rgba(59,130,246,0.1)]',
    icon: 'text-[#3B82F6]',
  },
};

const defaultItems: QuickMenuItem[] = [
  { icon: Package, label: '주문 내역', href: '/mypage/orders', color: 'rose' },
  { icon: Heart, label: '위시리스트', href: '/mypage/wishlist', color: 'purple' },
  { icon: Ticket, label: '쿠폰함', href: '/mypage/coupons', color: 'cyan' },
  { icon: Coins, label: '포인트', href: '/mypage/points', color: 'coral' },
];

export function MypageQuickMenu({
  title = '빠른 메뉴',
  items = defaultItems,
}: MypageQuickMenuProps) {
  return (
    <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
      <h3 className="mb-4 text-lg font-bold text-[#1E293B]">{title}</h3>

      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const styles = colorStyles[item.color];

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 rounded-2xl p-3 transition-all hover:bg-[rgba(0,102,255,0.08)] md:p-4"
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-[14px] md:h-12 md:w-12',
                  styles.bg
                )}
              >
                <Icon className={cn('h-5 w-5 md:h-6 md:w-6', styles.icon)} />
              </div>
              <span className="text-center text-[10px] font-semibold text-[#64748B] md:text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MypageQuickMenu;
