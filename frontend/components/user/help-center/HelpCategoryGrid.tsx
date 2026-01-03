'use client';

import Link from 'next/link';
import {
  LayoutGrid,
  ShoppingBag,
  Truck,
  RefreshCcw,
  UserCog,
  Building2,
  Palette,
  Store,
  Settings,
  LucideIcon,
} from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

interface HelpCategoryGridProps {
  categories?: HelpCategory[];
}

const defaultCategories: HelpCategory[] = [
  {
    id: 'order',
    title: '주문/결제',
    description: '주문, 결제, 쿠폰, 포인트 관련 안내',
    icon: ShoppingBag,
    href: '/help/faq?category=order',
  },
  {
    id: 'delivery',
    title: '배송',
    description: '배송 조회, 배송비, 해외배송 안내',
    icon: Truck,
    href: '/help/faq?category=delivery',
  },
  {
    id: 'return',
    title: '교환/반품/환불',
    description: '교환, 반품, 환불 절차 안내',
    icon: RefreshCcw,
    href: '/help/faq?category=return',
  },
  {
    id: 'account',
    title: '회원/계정',
    description: '회원가입, 정보변경, 탈퇴 안내',
    icon: UserCog,
    href: '/help/faq?category=account',
  },
  {
    id: 'brickart',
    title: 'BrickArt',
    description: 'BrickArt 이용 방법 안내',
    icon: Building2,
    href: '/help/faq?category=brickart',
  },
  {
    id: 'creation',
    title: 'DotArt/Creation',
    description: '창작 기능 사용법 안내',
    icon: Palette,
    href: '/help/faq?category=creation',
  },
  {
    id: 'seller',
    title: '판매자 문의',
    description: '입점, 판매자 센터 이용 안내',
    icon: Store,
    href: '/help/faq?category=seller',
  },
  {
    id: 'etc',
    title: '기타',
    description: '서비스 이용 관련 기타 문의',
    icon: Settings,
    href: '/help/faq?category=etc',
  },
];

export function HelpCategoryGrid({
  categories = defaultCategories,
}: HelpCategoryGridProps) {
  return (
    <section className="mb-10 md:mb-12">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-2xl">
        <LayoutGrid className="h-6 w-6 text-[#00CEC9] md:h-7 md:w-7" />
        도움말 카테고리
      </h2>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-5">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={category.href}
              className="group rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(0,206,201,0.15)] transition-transform hover:-translate-y-1.5 md:p-7"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(0,206,201,0.15)] to-[rgba(0,212,255,0.15)] md:mb-4 md:h-16 md:w-16">
                <Icon className="h-5 w-5 text-[#00CEC9] md:h-8 md:w-8" />
              </div>
              <h3 className="mb-1 text-[13px] font-bold text-[#1E293B] md:mb-2 md:text-base">
                {category.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-[#64748B] md:text-[13px]">
                {category.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default HelpCategoryGrid;
