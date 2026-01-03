'use client';

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  readonly = true,
  onChange,
  className,
}: RatingProps) {
  const stars = [];
  const starSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  for (let i = 1; i <= max; i++) {
    const filled = value >= i;
    const halfFilled = value >= i - 0.5 && value < i;

    stars.push(
      <Button
        key={i}
        type="button"
        variant="ghost"
        size="icon"
        disabled={readonly}
        onClick={() => onChange?.(i)}
        className={cn(
          'focus:outline-none transition-transform h-auto w-auto p-0',
          !readonly && 'hover:scale-110 cursor-pointer'
        )}
      >
        {halfFilled ? (
          <StarHalf
            className={cn(starSize, 'text-yellow-400 fill-yellow-400')}
          />
        ) : (
          <Star
            className={cn(
              starSize,
              filled
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            )}
          />
        )}
      </Button>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">{stars}</div>
      {showValue && (
        <span className={cn('font-semibold text-gray-900', textSize)}>
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn('text-gray-500', textSize)}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export default Rating;
