'use client';

import {
  Grid3X3,
  Box,
  Gamepad2,
  Puzzle,
  Blocks,
  Book,
  SlidersHorizontal,
  ArrowUpDown,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type ViewMode = 'grid' | 'list';

interface Category {
  id: string;
  label: string;
  icon: 'all' | 'lego' | 'figure' | 'boardgame' | 'education' | 'programbook';
}

interface ManualFilterBarProps {
  categories?: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  sortOptions?: string[];
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onFilterClick?: () => void;
}

const defaultCategories: Category[] = [
  { id: 'all', label: '전체', icon: 'all' },
  { id: 'lego', label: '레고', icon: 'lego' },
  { id: 'figure', label: '피규어', icon: 'figure' },
  { id: 'boardgame', label: '보드게임', icon: 'boardgame' },
  { id: 'education', label: '교육완구', icon: 'education' },
  { id: 'programbook', label: '프로그램북', icon: 'programbook' },
];

const iconMap = {
  all: Grid3X3,
  lego: Box,
  figure: Gamepad2,
  boardgame: Puzzle,
  education: Blocks,
  programbook: Book,
};

export function ManualFilterBar({
  categories = defaultCategories,
  selectedCategory,
  onCategoryChange,
  selectedSort = '최신순',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  onFilterClick,
}: ManualFilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isActive = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'flex flex-shrink-0 items-center gap-1.5 rounded-3xl border-2 bg-white px-3 py-2 text-[11px] font-semibold md:px-5 md:py-3 md:text-sm',
                isActive
                  ? 'border-[#9B59B6] text-[#9B59B6]'
                  : 'border-transparent text-[#64748B] hover:border-[#9B59B6]'
              )}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between gap-3 md:justify-end">
        <Button
          variant="outline"
          onClick={onFilterClick}
          className="flex items-center gap-1.5 rounded-3xl border-2 border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#1E293B] hover:border-[#9B59B6] md:px-5 md:py-2.5 md:text-sm"
        >
          <SlidersHorizontal className="h-4 w-4" />
          필터
        </Button>

        <Button
          variant="outline"
          onClick={() => onSortChange?.(selectedSort === '최신순' ? '인기순' : '최신순')}
          className="flex items-center gap-1.5 rounded-3xl border-2 border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#1E293B] hover:border-[#9B59B6] md:px-5 md:py-2.5 md:text-sm"
        >
          <ArrowUpDown className="h-4 w-4" />
          {selectedSort}
        </Button>

        {/* View Toggle */}
        <div className="flex rounded-3xl border-2 border-[#E2E8F0] bg-white p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange?.('grid')}
            className={cn(
              'h-9 w-9 rounded-[18px]',
              viewMode === 'grid' ? 'bg-[#9B59B6] text-white' : 'text-[#64748B]'
            )}
          >
            <Grid3X3 className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange?.('list')}
            className={cn(
              'h-9 w-9 rounded-[18px]',
              viewMode === 'list' ? 'bg-[#9B59B6] text-white' : 'text-[#64748B]'
            )}
          >
            <List className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManualFilterBar;
