'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBox } from '@/components/ui/search-box';
import { CategoryPills } from '@/components/ui/category-pills';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  categories?: Array<{ id: string; label: string; count?: number }>;
  selectedCategory?: string;
  onCategoryChange?: (id: string) => void;
  filters?: FilterOption[];
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (filterId: string, values: string[]) => void;
  sortOptions?: Array<{ value: string; label: string }>;
  selectedSort?: string;
  onSortChange?: (value: string) => void;
  totalCount?: number;
  className?: string;
}

export function FilterBar({
  searchPlaceholder = '검색어를 입력하세요',
  searchValue,
  onSearchChange,
  categories = [],
  selectedCategory,
  onCategoryChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  sortOptions = [],
  selectedSort,
  onSortChange,
  totalCount,
  className,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <SearchBox
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            variant="filled"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Filter Toggle */}
          {filters.length > 0 && (
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>필터</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          )}

          {/* Sort Dropdown */}
          {sortOptions.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'sort' ? null : 'sort')
                }
                className="flex items-center gap-1"
              >
                <span>
                  {sortOptions.find((o) => o.value === selectedSort)?.label ||
                    '정렬'}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform',
                    openDropdown === 'sort' && 'rotate-180'
                  )}
                />
              </Button>
              <AnimatePresence>
                {openDropdown === 'sort' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange?.(option.value);
                          setOpenDropdown(null);
                        }}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors',
                          selectedSort === option.value &&
                            'text-pixar-blue font-medium'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Total Count */}
          {totalCount !== undefined && (
            <span className="text-sm text-gray-500">
              총 <span className="font-bold text-gray-900">{totalCount.toLocaleString()}</span>개
            </span>
          )}
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <CategoryPills
          categories={categories}
          selected={selectedCategory}
          onChange={onCategoryChange}
          size="sm"
        />
      )}

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && filters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 rounded-2xl space-y-4">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {filter.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const isActive =
                        activeFilters[filter.id]?.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            const current = activeFilters[filter.id] || [];
                            const newValues = isActive
                              ? current.filter((v) => v !== option.value)
                              : [...current, option.value];
                            onFilterChange?.(filter.id, newValues);
                          }}
                          className={cn(
                            'px-3 py-1.5 text-sm rounded-full transition-colors',
                            isActive
                              ? 'bg-pixar-blue text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          )}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    filters.forEach((f) => onFilterChange?.(f.id, []));
                  }}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                  <span>필터 초기화</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterBar;
