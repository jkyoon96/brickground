'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface CategoryPillsProps {
  categories: CategoryItem[];
  selected?: string | string[];
  onChange?: (id: string) => void;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function CategoryPills({
  categories,
  selected,
  onChange,
  multiple = false,
  size = 'md',
  variant = 'default',
  className,
}: CategoryPillsProps) {
  const isSelected = (id: string) => {
    if (Array.isArray(selected)) {
      return selected.includes(id);
    }
    return selected === id;
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((category) => {
        const active = isSelected(category.id);
        return (
          <motion.button
            key={category.id}
            onClick={() => onChange?.(category.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
              sizeClasses[size],
              active
                ? variant === 'ghost'
                  ? 'bg-pixar-blue/10 text-pixar-blue'
                  : 'bg-pixar-blue text-white shadow-md shadow-pixar-blue/25'
                : variant === 'outline'
                ? 'border-2 border-gray-200 text-gray-600 hover:border-pixar-blue hover:text-pixar-blue'
                : variant === 'ghost'
                ? 'text-gray-600 hover:bg-gray-100'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {category.icon && (
              <span className="flex-shrink-0">{category.icon}</span>
            )}
            <span>{category.label}</span>
            {category.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-xs',
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {category.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export default CategoryPills;
