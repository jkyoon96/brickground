'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Heart,
  Coins,
  Ticket,
  User,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface MypageMenuProps {
  items?: MenuItem[];
  settingsItem?: MenuItem;
}

const defaultItems: MenuItem[] = [
  { icon: LayoutDashboard, label: '대시보드', href: '/mypage' },
  { icon: Package, label: '주문 내역', href: '/mypage/orders' },
  { icon: Heart, label: '위시리스트', href: '/mypage/wishlist' },
  { icon: Ticket, label: '쿠폰함', href: '/mypage/coupons' },
  { icon: Coins, label: '포인트', href: '/mypage/points' },
];

const defaultSettingsItem: MenuItem = {
  icon: User,
  label: '프로필 설정',
  href: '/mypage/profile',
};

export function MypageMenu({
  items = defaultItems,
  settingsItem = defaultSettingsItem,
}: MypageMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/mypage') {
      return pathname === '/mypage';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      {/* Main Menu Items */}
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-4 rounded-2xl p-4 transition-all',
              active
                ? 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]'
                : 'text-[#64748B] hover:bg-[rgba(0,102,255,0.08)]'
            )}
          >
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-xl',
                active ? 'bg-[rgba(0,102,255,0.1)]' : 'bg-[#F8FAFC]'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5',
                  active ? 'text-[#0066FF]' : 'text-[#64748B]'
                )}
              />
            </div>
            <span
              className={cn('font-semibold', active && 'text-[#0066FF]')}
            >
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Divider */}
      <hr className="my-2 border-[#E2E8F0]" />

      {/* Settings Item */}
      <Link
        href={settingsItem.href}
        className={cn(
          'flex items-center gap-4 rounded-2xl p-4 transition-all',
          isActive(settingsItem.href)
            ? 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]'
            : 'text-[#64748B] hover:bg-[rgba(0,102,255,0.08)]'
        )}
      >
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            isActive(settingsItem.href)
              ? 'bg-[rgba(0,102,255,0.1)]'
              : 'bg-[#F8FAFC]'
          )}
        >
          <settingsItem.icon
            className={cn(
              'h-5 w-5',
              isActive(settingsItem.href) ? 'text-[#0066FF]' : 'text-[#64748B]'
            )}
          />
        </div>
        <span
          className={cn(
            'font-semibold',
            isActive(settingsItem.href) && 'text-[#0066FF]'
          )}
        >
          {settingsItem.label}
        </span>
      </Link>
    </div>
  );
}

export default MypageMenu;
