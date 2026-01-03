'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Price } from '@/components/ui/price';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badges?: Array<'new' | 'hot' | 'sale' | 'best' | 'rental'>;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating = 0,
  reviewCount = 0,
  badges = [],
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-200/50',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge key={badge} variant={badge} size="sm">
                  {badge.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle?.(id);
          }}
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors',
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-500 hover:text-red-500'
          )}
        >
          <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pixar-blue transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="mb-2">
            <Rating value={rating} size="sm" reviewCount={reviewCount} />
          </div>
        )}

        {/* Price */}
        <Price value={price} originalValue={originalPrice} size="md" />

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart?.(id)}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-pixar-blue text-white font-semibold rounded-xl hover:bg-pixar-blue-light transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>장바구니</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
