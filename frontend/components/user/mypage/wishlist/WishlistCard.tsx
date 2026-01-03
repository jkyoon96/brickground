'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Bell, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type WishlistBadgeType = 'sale' | 'new' | 'soldout' | null;

interface WishlistCardProps {
  id: string;
  imageUrl?: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: WishlistBadgeType;
  isSoldOut?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onNotifyRestock?: (id: string) => void;
}

const badgeStyles: Record<Exclude<WishlistBadgeType, null>, { label: string; className: string }> = {
  sale: {
    label: '',
    className: 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]',
  },
  new: {
    label: 'NEW',
    className: 'bg-[rgba(0,206,201,0.1)] text-[#00CEC9]',
  },
  soldout: {
    label: '품절',
    className: 'bg-[rgba(148,163,184,0.2)] text-[#94A3B8]',
  },
};

export function WishlistCard({
  id,
  imageUrl,
  title,
  price,
  originalPrice,
  discountPercent,
  badge,
  isSoldOut = false,
  isSelected = false,
  onSelect,
  onRemove,
  onAddToCart,
  onNotifyRestock,
}: WishlistCardProps) {
  const getBadgeLabel = () => {
    if (badge === 'sale' && discountPercent) {
      return `${discountPercent}% OFF`;
    }
    if (badge) {
      return badgeStyles[badge].label;
    }
    return null;
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white transition-all',
        isSoldOut ? 'opacity-70' : 'hover:-translate-y-1 hover:border-[#0066FF] hover:shadow-[0_12px_30px_rgba(0,102,255,0.15)]'
      )}
    >
      {/* Checkbox */}
      <div className="absolute left-3 top-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSelect?.(id)}
          className={cn(
            'h-[22px] w-[22px] rounded-md border-2 p-0',
            isSelected
              ? 'border-[#0066FF] bg-gradient-to-br from-[#0066FF] to-[#3B82F6]'
              : 'border-[#E2E8F0] bg-white hover:bg-white'
          )}
        >
          {isSelected && <Check className="h-4 w-4 text-white" />}
        </Button>
      </div>

      {/* Image */}
      <div className="relative h-36 bg-[#F8FAFC] md:h-44">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#94A3B8]">
            No Image
          </div>
        )}

        {/* Heart Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove?.(id)}
          className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:scale-110 hover:bg-white"
        >
          <Heart className="h-5 w-5 fill-[#0066FF] text-[#0066FF]" />
        </Button>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4">
        {/* Badge */}
        {badge && (
          <div className="mb-2 flex gap-1">
            <span
              className={cn(
                'inline-flex rounded-[20px] px-2.5 py-1 text-[10px] font-bold md:text-[11px]',
                badgeStyles[badge].className
              )}
            >
              {getBadgeLabel()}
            </span>
          </div>
        )}

        {/* Title */}
        <p className="mb-2 line-clamp-2 text-sm font-semibold text-[#1E293B] md:text-base">
          {title}
        </p>

        {/* Price */}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          {originalPrice && (
            <span className="text-xs text-[#94A3B8] line-through md:text-sm">
              {originalPrice.toLocaleString()}원
            </span>
          )}
          <span
            className={cn(
              'text-base font-extrabold md:text-lg',
              isSoldOut ? 'text-[#94A3B8]' : 'text-[#0066FF]'
            )}
          >
            {price.toLocaleString()}원
          </span>
        </div>

        {/* Button */}
        {isSoldOut ? (
          <Button
            variant="secondary"
            onClick={() => onNotifyRestock?.(id)}
            className="w-full rounded-xl bg-[#F8FAFC] text-[#94A3B8]"
          >
            <Bell className="h-4 w-4" />
            재입고 알림
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={() => onAddToCart?.(id)}
            className="w-full rounded-xl bg-gradient-to-r from-[#0066FF] to-[#3B82F6] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,102,255,0.3)]"
          >
            <ShoppingCart className="h-4 w-4" />
            장바구니
          </Button>
        )}
      </div>
    </div>
  );
}

export default WishlistCard;
