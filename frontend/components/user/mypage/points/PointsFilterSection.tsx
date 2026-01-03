'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type PointsFilterType = 'all' | 'earn' | 'use' | 'expire';
export type PointsPeriod = '1month' | '3months' | '6months' | 'all';

interface FilterTab {
  value: PointsFilterType;
  label: string;
}

interface PeriodOption {
  value: PointsPeriod;
  label: string;
}

interface PointsFilterSectionProps {
  selectedFilter: PointsFilterType;
  onFilterChange: (filter: PointsFilterType) => void;
  selectedPeriod: PointsPeriod;
  onPeriodChange: (period: PointsPeriod) => void;
}

const filterTabs: FilterTab[] = [
  { value: 'all', label: '전체' },
  { value: 'earn', label: '적립' },
  { value: 'use', label: '사용' },
  { value: 'expire', label: '소멸' },
];

const periodOptions: PeriodOption[] = [
  { value: '1month', label: '최근 1개월' },
  { value: '3months', label: '최근 3개월' },
  { value: '6months', label: '최근 6개월' },
  { value: 'all', label: '전체' },
];

export function PointsFilterSection({
  selectedFilter,
  onFilterChange,
  selectedPeriod,
  onPeriodChange,
}: PointsFilterSectionProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={selectedFilter === tab.value ? 'gradient' : 'outline'}
            onClick={() => onFilterChange(tab.value)}
            className={cn(
              'rounded-xl px-3 py-2 text-xs font-semibold md:px-5 md:py-2.5 md:text-sm',
              selectedFilter === tab.value
                ? 'border-transparent bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white'
                : 'border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]'
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Period Select */}
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value as PointsPeriod)}
        className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-sm text-[#1E293B] focus:border-[#0066FF] focus:outline-none"
      >
        {periodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PointsFilterSection;
