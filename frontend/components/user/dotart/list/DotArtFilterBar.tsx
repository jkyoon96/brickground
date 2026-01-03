'use client';

import { Grid3X3, Flame, Clock, Box, Music, GraduationCap, Search, Grid2X2, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type DotArtCategory = 'all' | 'popular' | 'latest' | '3d' | 'music' | 'school';
export type DotArtSortOption = 'likes' | 'latest' | 'views' | 'comments';
export type DotArtViewMode = 'grid' | 'large';

interface DotArtFilterBarProps {
  selectedCategory: DotArtCategory;
  sortOption: DotArtSortOption;
  viewMode: DotArtViewMode;
  searchValue?: string;
  onCategoryChange: (category: DotArtCategory) => void;
  onSortChange: (sort: DotArtSortOption) => void;
  onViewModeChange: (mode: DotArtViewMode) => void;
  onSearchChange?: (value: string) => void;
}

const categories: { id: DotArtCategory; label: string; icon: typeof Grid3X3 }[] = [
  { id: 'all', label: '전체', icon: Grid3X3 },
  { id: 'popular', label: '인기', icon: Flame },
  { id: 'latest', label: '최신', icon: Clock },
  { id: '3d', label: '3D', icon: Box },
  { id: 'music', label: '음악', icon: Music },
  { id: 'school', label: '학교', icon: GraduationCap },
];

const sortOptions: { id: DotArtSortOption; label: string }[] = [
  { id: 'likes', label: '좋아요순' },
  { id: 'latest', label: '최신순' },
  { id: 'views', label: '조회순' },
  { id: 'comments', label: '댓글순' },
];

export function DotArtFilterBar({
  selectedCategory,
  sortOption,
  viewMode,
  searchValue = '',
  onCategoryChange,
  onSortChange,
  onViewModeChange,
  onSearchChange,
}: DotArtFilterBarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      {/* Left - Categories & Search */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-3xl border-2 border-transparent px-5 py-3 text-sm font-semibold transition-all',
                  selectedCategory === category.id
                    ? 'border-[#9B5DE5] bg-[rgba(155,93,229,0.05)] text-[#9B5DE5]'
                    : 'bg-white text-[#64748B] hover:border-[#9B5DE5] hover:text-[#9B5DE5]'
                )}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="flex items-center gap-2 rounded-3xl bg-white px-4 py-2 shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
          <Search className="h-5 w-5 text-[#64748B]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="작품 검색..."
            className="w-[200px] border-none text-sm outline-none"
          />
        </div>
      </div>

      {/* Right - Sort & View */}
      <div className="flex items-center gap-3">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as DotArtSortOption)}
          className="cursor-pointer rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex gap-1 rounded-xl bg-white p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-all',
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] text-white'
                : 'text-[#64748B]'
            )}
          >
            <Grid2X2 className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange('large')}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-all',
              viewMode === 'large'
                ? 'bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] text-white'
                : 'text-[#64748B]'
            )}
          >
            <LayoutGrid className="h-[18px] w-[18px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DotArtFilterBar;
