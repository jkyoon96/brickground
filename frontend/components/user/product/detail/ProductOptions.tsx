'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Option {
  id: string;
  label: string;
  price?: number;
  isDisabled?: boolean;
  disabledReason?: string;
}

interface OptionGroup {
  title: string;
  options: Option[];
  selectedId?: string;
  multiple?: boolean;
}

interface ProductOptionsProps {
  groups: OptionGroup[];
  selectedOptions: Record<string, string[]>;
  onOptionChange: (groupIndex: number, optionId: string) => void;
}

export function ProductOptions({
  groups,
  selectedOptions,
  onOptionChange,
}: ProductOptionsProps) {
  const formatPrice = (price: number) => {
    if (price > 0) return `+₩${price.toLocaleString()}`;
    if (price < 0) return `-₩${Math.abs(price).toLocaleString()}`;
    return '';
  };

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => {
        const selectedIds = selectedOptions[groupIndex.toString()] || [];

        return (
          <div key={groupIndex}>
            <h3 className="mb-3 text-sm font-bold text-[#1E293B] md:text-[15px]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.options.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                const isDisabled = option.isDisabled;

                return (
                  <Button
                    key={option.id}
                    onClick={() => !isDisabled && onOptionChange(groupIndex, option.id)}
                    disabled={isDisabled}
                    variant="ghost"
                    className={cn(
                      'h-auto rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all md:px-6 md:py-3.5 md:text-[14px]',
                      isSelected
                        ? 'border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35] hover:bg-[#FF6B35]/20'
                        : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#FF6B35] hover:bg-white',
                      isDisabled && 'cursor-not-allowed opacity-40 hover:border-[#E2E8F0]'
                    )}
                    title={isDisabled ? option.disabledReason : undefined}
                  >
                    {option.label}
                    {option.price !== undefined && option.price !== 0 && (
                      <span className="ml-1 text-[#64748B]">
                        ({formatPrice(option.price)})
                      </span>
                    )}
                    {isDisabled && option.disabledReason && (
                      <span className="ml-1 text-xs text-[#64748B]">
                        ({option.disabledReason})
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductOptions;
