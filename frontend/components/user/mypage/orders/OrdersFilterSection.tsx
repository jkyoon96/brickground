'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type OrderFilterStatus = 'all' | 'paid' | 'shipping' | 'completed' | 'canceled';

interface OrdersFilterSectionProps {
  selectedFilter: OrderFilterStatus;
  onFilterChange: (filter: OrderFilterStatus) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSearch: () => void;
}

const filterTabs: { value: OrderFilterStatus; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'paid', label: '결제완료' },
  { value: 'shipping', label: '배송중' },
  { value: 'completed', label: '배송완료' },
  { value: 'canceled', label: '취소/반품' },
];

export function OrdersFilterSection({
  selectedFilter,
  onFilterChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
}: OrdersFilterSectionProps) {
  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

        {/* Date Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="rounded-xl border border-[#E2E8F0] px-3 py-2 text-sm text-[#1E293B] focus:border-[#0066FF] focus:outline-none md:px-4 md:py-2.5"
          />
          <span className="text-[#94A3B8]">~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="rounded-xl border border-[#E2E8F0] px-3 py-2 text-sm text-[#1E293B] focus:border-[#0066FF] focus:outline-none md:px-4 md:py-2.5"
          />
          <Button
            variant="outline"
            onClick={onSearch}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-sm font-semibold text-[#64748B] transition-all hover:border-[#0066FF] hover:text-[#0066FF] md:px-5 md:py-2.5"
          >
            조회
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrdersFilterSection;
