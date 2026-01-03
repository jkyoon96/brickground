'use client';

import { Package, Store, Star, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const defaultStats: StatItem[] = [
  { icon: Package, value: '12,847', label: '전체 상품' },
  { icon: Store, value: '456', label: '브랜드' },
  { icon: Star, value: '89.2K', label: '리뷰' },
  { icon: Truck, value: '무료배송', label: '5만원 이상' },
];

interface ProductStatsSectionProps {
  stats?: StatItem[];
}

export function ProductStatsSection({ stats = defaultStats }: ProductStatsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mb-10 md:gap-6 lg:grid-cols-4">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6"
        >
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#FFD93D]/20 md:mb-4 md:h-14 md:w-14">
            <Icon className="h-5 w-5 text-[#FF6B35] md:h-7 md:w-7" />
          </div>
          <div className="mb-1 text-[22px] font-extrabold text-[#FF6B35] md:text-[28px]">
            {value}
          </div>
          <div className="text-xs text-[#64748B] md:text-sm">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductStatsSection;
