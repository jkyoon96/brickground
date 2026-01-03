'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type ProductBadgeType = 'best' | 'new' | 'sale' | null;

export interface HomeProductItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: ProductBadgeType;
  badgeText?: string;
  isLiked?: boolean;
}

interface HomeProductCardProps {
  item: HomeProductItem;
  onLikeToggle?: (id: string) => void;
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
  best: { bg: '#FF6B9D', text: 'white' },
  new: { bg: '#6BCB77', text: 'white' },
  sale: { bg: '#FF9F43', text: 'white' },
};

function formatPrice(price: number): string {
  return price.toLocaleString() + '원';
}

export function HomeProductCard({ item, onLikeToggle }: HomeProductCardProps) {
  const badgeLabel = item.badgeText || item.badge?.toUpperCase();

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1.5 hover:border-[#0066FF] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] md:rounded-[20px]">
      {/* Image */}
      <Link
        href={`/products/${item.id}`}
        className="relative block h-[120px] overflow-hidden bg-[#f8f8f8] md:h-[200px]"
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {item.badge && (
          <span
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase md:left-3 md:top-3 md:px-3 md:text-[11px]"
            style={{
              backgroundColor: badgeStyles[item.badge]?.bg,
              color: badgeStyles[item.badge]?.text,
            }}
          >
            {badgeLabel}
          </span>
        )}
        {/* Heart Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onLikeToggle?.(item.id);
          }}
          className="absolute right-2.5 top-2.5 h-8 w-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:scale-110 hover:bg-white md:right-3 md:top-3 md:h-9 md:w-9"
        >
          <Heart
            className={cn(
              'h-4 w-4 md:h-5 md:w-5',
              item.isLiked ? 'fill-[#FF6B9D] text-[#FF6B9D]' : 'text-[#94A3B8]'
            )}
          />
        </Button>
      </Link>

      {/* Info */}
      <div className="p-2.5 md:p-4">
        <p className="mb-0.5 text-[10px] text-[#0066FF] md:mb-1 md:text-xs">{item.category}</p>
        <Link href={`/products/${item.id}`}>
          <h3 className="mb-1.5 line-clamp-2 cursor-pointer text-[13px] font-bold hover:text-[#0066FF] md:mb-2 md:text-base">
            {item.title}
          </h3>
        </Link>
        {/* Rating */}
        <div className="mb-1.5 flex items-center gap-1 md:mb-2">
          <Star className="h-3.5 w-3.5 fill-[#FFD93D] text-[#FFD93D] md:h-4 md:w-4" />
          <span className="text-xs font-semibold md:text-sm">{item.rating}</span>
          <span className="text-[10px] text-[#94A3B8] md:text-xs">({item.reviewCount})</span>
        </div>
        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 md:gap-2">
          {item.originalPrice && (
            <span className="text-[10px] text-[#94A3B8] line-through md:text-xs">
              {formatPrice(item.originalPrice)}
            </span>
          )}
          <span
            className={cn(
              'font-bold',
              item.originalPrice ? 'text-[#FF6B9D]' : 'text-[#1E293B]',
              'text-sm md:text-base'
            )}
          >
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeProductCard;
