'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface CategoryPillItem {
  id: string;
  label: string;
}

interface CategoryPillsProps {
  categories: CategoryPillItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CategoryPills({ categories, selectedId, onSelect }: CategoryPillsProps) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-2 md:mb-6 md:gap-3 md:pb-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedId === category.id ? 'default' : 'outline'}
          onClick={() => onSelect(category.id)}
          className={cn(
            'whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all md:px-6 md:py-2.5',
            selectedId === category.id
              ? 'border-[#0066FF] bg-[#0066FF] text-white'
              : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#0066FF] hover:text-[#0066FF]'
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}

export default CategoryPills;
