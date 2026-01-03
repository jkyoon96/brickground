'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type CouponStatusFilter = 'available' | 'used' | 'expired';

interface FilterTab {
  value: CouponStatusFilter;
  label: string;
  count: number;
}

interface CouponsFilterTabsProps {
  tabs: FilterTab[];
  selectedTab: CouponStatusFilter;
  onTabChange: (tab: CouponStatusFilter) => void;
}

export function CouponsFilterTabs({
  tabs,
  selectedTab,
  onTabChange,
}: CouponsFilterTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={selectedTab === tab.value ? 'gradient' : 'outline'}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'rounded-xl px-3 py-2 text-xs font-semibold md:px-5 md:py-2.5 md:text-sm',
            selectedTab === tab.value
              ? 'border-transparent bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white'
              : 'border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]'
          )}
        >
          {tab.label} ({tab.count})
        </Button>
      ))}
    </div>
  );
}

export default CouponsFilterTabs;
