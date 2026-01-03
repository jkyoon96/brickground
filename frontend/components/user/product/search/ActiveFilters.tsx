'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Filter {
  id: string;
  label: string;
}

interface ActiveFiltersProps {
  filters: Filter[];
  onRemove: (filterId: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          onClick={() => onRemove(filter.id)}
          variant="outline"
          size="sm"
          className="h-auto rounded-[20px] border-2 border-[#FF6B35] bg-white px-3 py-1.5 text-xs font-semibold text-[#FF6B35] transition-colors hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] md:px-4 md:py-2 md:text-[13px]"
        >
          {filter.label}
          <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>
      ))}
      <Button
        onClick={onClearAll}
        variant="link"
        size="sm"
        className="h-auto px-2 py-1 text-xs text-[#64748B] underline md:text-[13px]"
      >
        필터 초기화
      </Button>
    </div>
  );
}

export default ActiveFilters;
