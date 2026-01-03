'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type BadgeType = 'hot' | 'new' | 'sale';

interface ProductListCardProps {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  tags?: string[];
  badge?: BadgeType;
  badgeText?: string;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
}

export function ProductListCard({
  id,
  name,
  category,
  imageUrl,
  rating,
  reviewCount,
  currentPrice,
  originalPrice,
  discountPercent,
  tags = [],
  badge,
  badgeText,
  isWishlisted = false,
  onWishlistToggle,
}: ProductListCardProps) {
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  const getBadgeStyle = (type: BadgeType) => {
    switch (type) {
      case 'hot':
        return 'bg-[#FF6B6B] text-white';
      case 'new':
        return 'bg-[#6BCB77] text-white';
      case 'sale':
        return 'bg-[#FFD93D] text-[#1E293B]';
      default:
        return 'bg-[#FF6B6B] text-white';
    }
  };

  return (
    <div className="group overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-transform hover:-translate-y-1.5">
      <Link href={`/products/${id}`} className="block">
        {/* Thumbnail */}
        <div className="relative flex aspect-square items-center justify-center bg-[#f8f8f8] md:aspect-[4/3] lg:aspect-square">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-cover" />
          ) : (
            <Package className="h-16 w-16 text-[#E2E8F0]" />
          )}

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                'absolute left-3 top-3 rounded-xl px-3 py-1.5 text-[11px] font-bold',
                getBadgeStyle(badge)
              )}
            >
              {badgeText || badge.toUpperCase()}
            </span>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistToggle?.(id);
            }}
            className={cn(
              'absolute right-3 top-3 h-10 w-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-white',
              isWishlisted && 'text-[#FF6B6B]'
            )}
          >
            <Heart
              className={cn('h-5 w-5', isWishlisted ? 'fill-current' : 'text-[#64748B]')}
            />
          </Button>
        </div>

        {/* Body */}
        <div className="p-3.5 md:p-5">
          {/* Category */}
          <span className="mb-1.5 block text-[11px] text-[#64748B] md:text-xs">{category}</span>

          {/* Name */}
          <h3 className="mb-2.5 line-clamp-2 text-sm font-bold leading-snug text-[#1E293B] transition-colors group-hover:text-[#FF6B35] md:text-base">
            {name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3 md:h-3.5 md:w-3.5',
                  i < Math.floor(rating) ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-[#E2E8F0]'
                )}
              />
            ))}
            <span className="ml-1 text-[11px] text-[#64748B] md:text-[13px]">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mb-3 flex flex-wrap items-baseline gap-2">
            <span className="text-base font-extrabold text-[#1E293B] md:text-xl">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-xs text-[#64748B] line-through md:text-sm">
                {formatPrice(originalPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="text-xs font-bold text-[#FF6B6B] md:text-sm">{discountPercent}%</span>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-[#F8FAFC] px-2 py-1 text-[10px] text-[#64748B] md:px-2.5 md:text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductListCard;
