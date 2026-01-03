'use client';

import Link from 'next/link';
import { Building2, Palette, Sparkles, ShoppingBag, LucideIcon } from 'lucide-react';

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: 'brickart' | 'dotart' | 'creation' | 'shop';
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

interface QuickAccessGridProps {
  items?: QuickAccessItem[];
}

const iconMap: Record<string, LucideIcon> = {
  brickart: Building2,
  dotart: Palette,
  creation: Sparkles,
  shop: ShoppingBag,
};

const defaultItems: QuickAccessItem[] = [
  {
    id: 'brickart',
    title: 'BrickArt',
    description: '3D 브릭 공간에서\n창작물을 전시하세요',
    href: '/brickarts',
    icon: 'brickart',
    gradientFrom: 'rgba(0,102,255,0.1)',
    gradientTo: 'rgba(0,206,201,0.1)',
    iconColor: '#0066FF',
  },
  {
    id: 'dotart',
    title: 'DotArt',
    description: '픽셀 아트를 만들고\n음악과 함께 감상',
    href: '/dotarts',
    icon: 'dotart',
    gradientFrom: 'rgba(162,155,254,0.2)',
    gradientTo: 'rgba(129,140,248,0.1)',
    iconColor: '#A29BFE',
  },
  {
    id: 'creation',
    title: 'Creation',
    description: '3D 창작물을 만들고\n공유하세요',
    href: '/creations',
    icon: 'creation',
    gradientFrom: 'rgba(255,159,67,0.2)',
    gradientTo: 'rgba(255,217,61,0.1)',
    iconColor: '#FF9F43',
  },
  {
    id: 'shop',
    title: 'Shop',
    description: '다양한 브릭 상품을\n만나보세요',
    href: '/products',
    icon: 'shop',
    gradientFrom: 'rgba(107,203,119,0.2)',
    gradientTo: 'rgba(116,226,145,0.1)',
    iconColor: '#6BCB77',
  },
];

export function QuickAccessGrid({ items = defaultItems }: QuickAccessGridProps) {
  return (
    <section className="relative z-20 mx-auto -mt-[30px] max-w-[1320px] px-4 pb-10 md:-mt-[60px] md:px-6 md:pb-16">
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-6">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Building2;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group rounded-[20px] border border-[#E2E8F0] bg-white p-4 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,102,255,0.15)] md:rounded-3xl md:p-8"
              style={{
                animationDelay: `${0.1 * (index + 1)}s`,
              }}
            >
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl md:mb-4 md:h-20 md:w-20 md:rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                }}
              >
                <IconComponent
                  className="h-7 w-7 md:h-10 md:w-10"
                  style={{ color: item.iconColor }}
                />
              </div>
              <h3 className="mb-1 text-base font-bold md:mb-2 md:text-xl">{item.title}</h3>
              <p className="whitespace-pre-line text-xs text-[#64748B] md:text-sm">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickAccessGrid;
