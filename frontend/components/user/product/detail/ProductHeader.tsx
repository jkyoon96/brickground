'use client';

import Link from 'next/link';
import { Store, Star, Eye, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductHeaderProps {
  title: string;
  tags: Array<{
    label: string;
    variant?: 'default' | 'hot';
  }>;
  mall: {
    name: string;
    href: string;
  };
  stats: {
    rating: number;
    reviewCount: number;
    views: number;
    purchases: number;
  };
}

export function ProductHeader({ title, tags, mall, stats }: ProductHeaderProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-soft md:p-7">
      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-semibold',
              tag.variant === 'hot'
                ? 'bg-pixar-error/10 text-pixar-error'
                : 'bg-pixar-blue/10 text-pixar-blue'
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="mb-3 text-xl font-extrabold leading-tight text-gray-900 md:text-[28px]">
        {title}
      </h1>

      {/* Mall Link */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Store className="h-4 w-4" />
        <Link
          href={mall.href}
          className="font-semibold text-pixar-blue hover:underline"
        >
          {mall.name}
        </Link>
        <span>에서 판매</span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-4 md:gap-5">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Star className="h-[18px] w-[18px] fill-toy-yellow text-toy-yellow" />
          <span>
            {stats.rating} ({stats.reviewCount.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Eye className="h-[18px] w-[18px]" />
          <span>{stats.views.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <ShoppingBag className="h-[18px] w-[18px]" />
          <span>{stats.purchases.toLocaleString()} 구매</span>
        </div>
      </div>
    </div>
  );
}
