'use client';

import {
  Grid3X3,
  Flame,
  Sparkles,
  Box,
  Gamepad2,
  Puzzle,
  Brain,
  Sliders,
  ArrowUpDown,
  List,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CategoryTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const defaultCategories: CategoryTab[] = [
  { id: 'all', label: '전체', icon: Grid3X3 },
  { id: 'popular', label: '인기', icon: Flame },
  { id: 'new', label: '신상품', icon: Sparkles },
  { id: 'lego', label: '브릭', icon: Box },
  { id: 'figure', label: '피규어', icon: Gamepad2 },
  { id: 'boardgame', label: '보드게임', icon: Puzzle },
  { id: 'education', label: '교육완구', icon: Brain },
];

type ViewMode = 'grid' | 'list';
type SortOption = 'popular' | 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

interface ProductFilterBarProps {
  categories?: CategoryTab[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onFilterClick?: () => void;
}

export function ProductFilterBar({
  categories = defaultCategories,
  selectedCategory,
  onCategoryChange,
  sortOption = 'popular',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  onFilterClick,
}: ProductFilterBarProps) {
  const sortLabels: Record<SortOption, string> = {
    popular: '인기순',
    newest: '최신순',
    priceAsc: '낮은가격순',
    priceDesc: '높은가격순',
    rating: '평점순',
  };

  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {categories.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(id)}
            className={cn(
              'flex-shrink-0 rounded-3xl border-2 bg-white',
              selectedCategory === id
                ? 'border-[#FF6B35] text-[#FF6B35] hover:bg-white'
                : 'border-transparent text-[#64748B] hover:border-[#FF6B35] hover:bg-white'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between gap-3 md:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-gray-50"
        >
          <Sliders className="h-4 w-4" />
          필터
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const options: SortOption[] = ['popular', 'newest', 'priceAsc', 'priceDesc', 'rating'];
            const currentIndex = options.indexOf(sortOption);
            const nextIndex = (currentIndex + 1) % options.length;
            onSortChange?.(options[nextIndex]);
          }}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:bg-gray-50"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortLabels[sortOption]}
        </Button>

        <div className="flex rounded-3xl border-2 border-[#E2E8F0] bg-white p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange?.('grid')}
            className={cn(
              'h-8 w-8 rounded-full md:h-9 md:w-9',
              viewMode === 'grid' ? 'bg-[#FF6B35] text-white hover:bg-[#FF6B35]' : 'text-[#64748B]'
            )}
          >
            <Grid3X3 className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange?.('list')}
            className={cn(
              'h-8 w-8 rounded-full md:h-9 md:w-9',
              viewMode === 'list' ? 'bg-[#FF6B35] text-white hover:bg-[#FF6B35]' : 'text-[#64748B]'
            )}
          >
            <List className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterBar;
