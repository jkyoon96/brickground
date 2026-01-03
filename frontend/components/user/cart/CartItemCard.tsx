'use client';

import Image from 'next/image';
import { Check, X, Minus, Plus, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CartItemOption {
  label: string;
  value: string;
}

interface CartItemTag {
  label: string;
  type: 'freeShipping' | 'todayDelivery' | 'default';
}

interface CartItemCardProps {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  options?: CartItemOption[];
  tags?: CartItemTag[];
  quantity: number;
  currentPrice: number;
  originalPrice?: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export function CartItemCard({
  id,
  name,
  brand,
  imageUrl,
  options = [],
  tags = [],
  quantity,
  currentPrice,
  originalPrice,
  isSelected,
  onSelect,
  onRemove,
  onQuantityChange,
}: CartItemCardProps) {
  const formatPrice = (price: number) => price.toLocaleString();

  const getTagStyle = (type: CartItemTag['type']) => {
    switch (type) {
      case 'freeShipping':
        return 'bg-[#6BCB77]/15 text-[#6BCB77]';
      case 'todayDelivery':
        return 'bg-[#FF6B35]/15 text-[#FF6B35]';
      default:
        return 'bg-[#F8FAFC] text-[#64748B]';
    }
  };

  return (
    <div className="flex flex-wrap gap-3 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:flex-nowrap md:gap-5 md:p-6">
      {/* Checkbox */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSelect(id)}
        className={cn(
          'h-6 w-6 flex-shrink-0 rounded-md border-2 p-0',
          isSelected
            ? 'border-[#FF6B35] bg-[#FF6B35] hover:bg-[#FF6B35]'
            : 'border-[#E2E8F0] bg-white hover:border-[#FF6B35] hover:bg-white'
        )}
      >
        {isSelected && <Check className="h-4 w-4 text-white" />}
      </Button>

      {/* Image */}
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] md:h-[140px] md:w-[140px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={140}
            height={140}
            className="h-full w-full object-cover"
          />
        ) : (
          <Package className="h-8 w-8 text-white/50 md:h-12 md:w-12" />
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
        <span className="text-xs text-[#64748B] md:text-[13px]">{brand}</span>
        <h3 className="text-sm font-bold leading-snug text-[#1E293B] md:text-lg">{name}</h3>

        {/* Options */}
        {options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {options.map((option, index) => (
              <span
                key={index}
                className="rounded-md bg-[#F8FAFC] px-2 py-1 text-[10px] text-[#64748B] md:px-2.5 md:text-xs"
              >
                {option.label}: {option.value}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  'rounded-md px-2 py-1 text-[10px] font-semibold md:px-2.5 md:text-[11px]',
                  getTagStyle(tag.type)
                )}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex w-full items-center justify-between gap-3 border-t border-[#E2E8F0] pt-3 md:w-auto md:min-w-[180px] md:flex-col md:items-end md:justify-between md:border-t-0 md:pt-0">
        {/* Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          className="h-9 w-9 rounded-full text-[#64748B] hover:bg-[#F8FAFC] md:order-first"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] p-1.5 md:gap-3 md:p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="h-7 w-7 rounded-lg bg-white shadow-sm hover:bg-[#FF6B35]/10 md:h-8 md:w-8"
          >
            <Minus className="h-4 w-4 text-[#1E293B]" />
          </Button>
          <span className="min-w-[24px] text-center text-sm font-bold text-[#1E293B] md:min-w-[30px] md:text-base">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="h-7 w-7 rounded-lg bg-white shadow-sm hover:bg-[#FF6B35]/10 md:h-8 md:w-8"
          >
            <Plus className="h-4 w-4 text-[#1E293B]" />
          </Button>
        </div>

        {/* Price */}
        <div className="text-right">
          <span className="text-base font-extrabold text-[#1E293B] md:text-xl">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && (
            <span className="ml-2 text-xs text-[#64748B] line-through md:text-sm">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
