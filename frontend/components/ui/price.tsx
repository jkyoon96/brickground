import { cn } from '@/lib/utils';

interface PriceProps {
  value: number;
  originalValue?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    price: 'text-sm',
    original: 'text-xs',
    discount: 'text-xs',
  },
  md: {
    price: 'text-base',
    original: 'text-sm',
    discount: 'text-sm',
  },
  lg: {
    price: 'text-lg',
    original: 'text-sm',
    discount: 'text-sm',
  },
  xl: {
    price: 'text-2xl',
    original: 'text-base',
    discount: 'text-base',
  },
};

export function Price({
  value,
  originalValue,
  currency = '원',
  size = 'md',
  showDiscount = true,
  className,
}: PriceProps) {
  const hasDiscount = originalValue && originalValue > value;
  const discountPercent = hasDiscount
    ? Math.round(((originalValue - value) / originalValue) * 100)
    : 0;

  const sizes = sizeClasses[size];

  return (
    <div className={cn('flex flex-wrap items-baseline gap-2', className)}>
      {hasDiscount && showDiscount && (
        <span
          className={cn(
            'font-bold text-red-500',
            sizes.discount
          )}
        >
          {discountPercent}%
        </span>
      )}
      <span className={cn('font-bold text-gray-900', sizes.price)}>
        {value.toLocaleString()}
        <span className="text-gray-600 font-normal">{currency}</span>
      </span>
      {hasDiscount && (
        <span
          className={cn(
            'text-gray-400 line-through',
            sizes.original
          )}
        >
          {originalValue.toLocaleString()}{currency}
        </span>
      )}
    </div>
  );
}

export default Price;
