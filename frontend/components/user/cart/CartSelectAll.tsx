'use client';

import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CartSelectAllProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
}

export function CartSelectAll({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDeleteSelected,
}: CartSelectAllProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between">
      {/* Select All */}
      <Button variant="ghost" onClick={onSelectAll} className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
            isAllSelected
              ? 'border-[#FF6B35] bg-[#FF6B35]'
              : 'border-[#E2E8F0] bg-white hover:border-[#FF6B35]'
          )}
        >
          {isAllSelected && <Check className="h-4 w-4 text-white" />}
        </div>
        <span className="text-sm font-semibold text-[#1E293B] md:text-[15px]">
          전체 선택 ({selectedCount}/{totalCount})
        </span>
      </Button>

      {/* Delete Selected */}
      <Button
        variant="outline"
        onClick={onDeleteSelected}
        disabled={selectedCount === 0}
        className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-[#E2E8F0] bg-transparent px-4 py-2 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#FF6B6B] hover:text-[#FF6B6B] disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-2.5"
      >
        <Trash2 className="h-4 w-4" />
        선택 삭제
      </Button>
    </div>
  );
}

export default CartSelectAll;
