'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type WishlistCategory = 'all' | 'brickart' | 'dotart' | 'shop';

interface CategoryTab {
  value: WishlistCategory;
  label: string;
  count: number;
}

interface WishlistFilterBarProps {
  categories?: CategoryTab[];
  selectedCategory: WishlistCategory;
  onCategoryChange: (category: WishlistCategory) => void;
  isAllSelected: boolean;
  onSelectAllToggle: () => void;
  onDeleteSelected: () => void;
  onAddSelectedToCart: () => void;
  selectedCount?: number;
}

const defaultCategories: CategoryTab[] = [
  { value: 'all', label: '전체', count: 23 },
  { value: 'brickart', label: 'BrickArt', count: 5 },
  { value: 'dotart', label: 'DotArt', count: 8 },
  { value: 'shop', label: 'Shop', count: 10 },
];

export function WishlistFilterBar({
  categories = defaultCategories,
  selectedCategory,
  onCategoryChange,
  isAllSelected,
  onSelectAllToggle,
  onDeleteSelected,
  onAddSelectedToCart,
  selectedCount = 0,
}: WishlistFilterBarProps) {
  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((tab) => (
            <Button
              key={tab.value}
              variant={selectedCategory === tab.value ? 'gradient' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(tab.value)}
              className={cn(
                'rounded-xl',
                selectedCategory === tab.value
                  ? 'border-transparent bg-gradient-to-r from-[#0066FF] to-[#3B82F6]'
                  : 'border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-transparent'
              )}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Select All */}
          <label
            onClick={onSelectAllToggle}
            className="flex cursor-pointer items-center gap-2"
          >
            <div
              className={cn(
                'flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 transition-all',
                isAllSelected
                  ? 'border-[#0066FF] bg-gradient-to-br from-[#0066FF] to-[#3B82F6]'
                  : 'border-[#E2E8F0]'
              )}
            >
              {isAllSelected && <Check className="h-4 w-4 text-white" />}
            </div>
            <span className="text-sm font-semibold text-[#64748B]">전체선택</span>
          </label>

          {/* Delete Selected */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            className="rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
          >
            선택삭제
          </Button>

          {/* Add to Cart */}
          <Button
            variant="gradient"
            size="sm"
            onClick={onAddSelectedToCart}
            disabled={selectedCount === 0}
            className="rounded-lg bg-gradient-to-r from-[#0066FF] to-[#3B82F6] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)]"
          >
            선택 장바구니 담기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishlistFilterBar;
