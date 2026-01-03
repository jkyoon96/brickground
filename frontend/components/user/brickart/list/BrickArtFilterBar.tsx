'use client';

import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type BrickArtCategory = 'all' | 'popular' | 'new' | 'hobby' | 'figure' | 'interior';
export type BrickArtSortOption = 'popular' | 'latest' | 'views' | 'likes';
export type ViewMode = 'grid' | 'list';

interface BrickArtFilterBarProps {
  selectedCategory: BrickArtCategory;
  sortOption: BrickArtSortOption;
  viewMode: ViewMode;
  onCategoryChange: (category: BrickArtCategory) => void;
  onSortChange: (sort: BrickArtSortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const categories: { id: BrickArtCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'popular', label: '인기' },
  { id: 'new', label: '신규' },
  { id: 'hobby', label: '취미/DIY' },
  { id: 'figure', label: '피규어' },
  { id: 'interior', label: '인테리어' },
];

const sortOptions: { id: BrickArtSortOption; label: string }[] = [
  { id: 'popular', label: '인기순' },
  { id: 'latest', label: '최신순' },
  { id: 'views', label: '조회순' },
  { id: 'likes', label: '좋아요순' },
];

export function BrickArtFilterBar({
  selectedCategory,
  sortOption,
  viewMode,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
}: BrickArtFilterBarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={selectedCategory === category.id ? 'gradient' : 'outline'}
            size="sm"
            className={cn(
              'shrink-0 border-2',
              selectedCategory === category.id
                ? 'border-[#0066FF]'
                : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#0066FF]'
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Sort & View */}
      <div className="flex items-center gap-3">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as BrickArtSortOption)}
          className="cursor-pointer rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E293B] outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex overflow-hidden rounded-xl border-2 border-[#E2E8F0] bg-white">
          <Button
            onClick={() => onViewModeChange('grid')}
            variant={viewMode === 'grid' ? 'gradient' : 'ghost'}
            size="icon"
            className={cn(
              'rounded-none',
              viewMode !== 'grid' && 'text-[#64748B]'
            )}
          >
            <Grid3X3 className="h-[18px] w-[18px]" />
          </Button>
          <Button
            onClick={() => onViewModeChange('list')}
            variant={viewMode === 'list' ? 'gradient' : 'ghost'}
            size="icon"
            className={cn(
              'rounded-none',
              viewMode !== 'list' && 'text-[#64748B]'
            )}
          >
            <List className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BrickArtFilterBar;
