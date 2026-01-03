'use client';

import {
  Grid3X3,
  Sparkles,
  BookOpen,
  CalendarCheck,
  Repeat,
  MapPin,
  SlidersHorizontal,
  ArrowUpDown,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type ClassCategory = 'all' | 'experience' | 'afterSchool' | 'oneDay' | 'regular';
export type ClassSortOption = 'popular' | 'newest' | 'price' | 'rating';

interface CategoryTab {
  value: ClassCategory;
  label: string;
  icon: LucideIcon;
}

interface ClassFilterBarProps {
  selectedCategory: ClassCategory;
  onCategoryChange: (category: ClassCategory) => void;
  selectedSort: ClassSortOption;
  onSortChange: (sort: ClassSortOption) => void;
  onLocationFilter?: () => void;
  onFilterClick?: () => void;
}

const categories: CategoryTab[] = [
  { value: 'all', label: '전체', icon: Grid3X3 },
  { value: 'experience', label: '체험수업', icon: Sparkles },
  { value: 'afterSchool', label: '방과후수업', icon: BookOpen },
  { value: 'oneDay', label: '원데이클래스', icon: CalendarCheck },
  { value: 'regular', label: '정기클래스', icon: Repeat },
];

const sortLabels: Record<ClassSortOption, string> = {
  popular: '인기순',
  newest: '최신순',
  price: '가격순',
  rating: '평점순',
};

export function ClassFilterBar({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  onLocationFilter,
  onFilterClick,
}: ClassFilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.value}
              variant="outline"
              size="sm"
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                'shrink-0 rounded-3xl border-2 bg-white',
                selectedCategory === cat.value
                  ? 'border-[#10B981] text-[#10B981] hover:bg-white'
                  : 'border-transparent text-[#64748B] hover:border-[#10B981] hover:bg-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* Filter Actions */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onLocationFilter}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#10B981] hover:bg-white"
        >
          <MapPin className="h-4 w-4" />
          지역
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#10B981] hover:bg-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
          필터
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextSort: ClassSortOption =
              selectedSort === 'popular'
                ? 'newest'
                : selectedSort === 'newest'
                  ? 'price'
                  : selectedSort === 'price'
                    ? 'rating'
                    : 'popular';
            onSortChange(nextSort);
          }}
          className="rounded-3xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#10B981] hover:bg-white"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortLabels[selectedSort]}
        </Button>
      </div>
    </div>
  );
}

export default ClassFilterBar;
