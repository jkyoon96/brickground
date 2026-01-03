'use client';

import { useState } from 'react';
import {
  Grid3X3,
  Flame,
  Clock,
  Building2,
  Car,
  Gamepad2,
  Trees,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const defaultCategories: Category[] = [
  { id: 'all', label: '전체', icon: Grid3X3 },
  { id: 'hot', label: '인기', icon: Flame },
  { id: 'new', label: '최신', icon: Clock },
  { id: 'architecture', label: '건축', icon: Building2 },
  { id: 'vehicle', label: '탈것', icon: Car },
  { id: 'character', label: '캐릭터', icon: Gamepad2 },
  { id: 'nature', label: '자연', icon: Trees },
];

interface CreationFilterBarProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSortClick?: () => void;
}

export function CreationFilterBar({
  categories = defaultCategories,
  selectedCategory = 'all',
  onCategoryChange,
  searchValue = '',
  onSearchChange,
  onSortClick,
}: CreationFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <Button
              key={category.id}
              variant={isActive ? 'outline' : 'ghost'}
              onClick={() => onCategoryChange?.(category.id)}
              className={cn(
                'flex-shrink-0 rounded-3xl border-2 px-5 py-3 text-sm font-semibold',
                isActive
                  ? 'border-[#00CEC9] text-[#00CEC9] hover:bg-transparent hover:text-[#00CEC9]'
                  : 'border-transparent bg-white text-[#64748B] hover:border-[#00CEC9] hover:bg-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Filter Actions */}
      <div className="flex gap-3">
        {/* Search Box */}
        <div className="flex flex-1 items-center gap-2.5 rounded-3xl border-2 border-[#E2E8F0] bg-white px-5 py-2.5 lg:flex-initial">
          <Search className="h-[18px] w-[18px] text-[#64748B]" />
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="창작물 검색..."
            className="w-full border-none text-sm outline-none lg:w-[200px]"
          />
        </div>

        {/* Sort Button */}
        <Button
          variant="ghost"
          onClick={onSortClick}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1E293B] hover:border-[#00CEC9] hover:bg-white"
        >
          <ArrowUpDown className="h-4 w-4" />
          정렬
        </Button>
      </div>
    </div>
  );
}

export default CreationFilterBar;
