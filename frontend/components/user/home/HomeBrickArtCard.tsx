'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BrickArtBadgeType = 'hot' | 'new' | 'best' | null;

export interface HomeBrickArtItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  likeCount: number;
  viewCount: number;
  badge?: BrickArtBadgeType;
}

interface HomeBrickArtCardProps {
  item: HomeBrickArtItem;
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
  hot: { bg: '#0066FF', text: 'white' },
  new: { bg: '#FF6B9D', text: 'white' },
  best: { bg: '#FF9F43', text: 'white' },
};

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

export function HomeBrickArtCard({ item }: HomeBrickArtCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1.5 hover:border-[#0066FF] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] md:rounded-[20px]">
      {/* Image */}
      <Link
        href={`/brickarts/${item.id}`}
        className="relative block h-[140px] overflow-hidden bg-[#f8f8f8] md:h-[200px]"
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
            {item.badge}
          </span>
        )}
        {/* 3D Badge */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm md:bottom-3 md:right-3 md:px-3 md:py-1.5 md:text-xs">
          <Box className="h-3 w-3" />
          3D
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4">
        <p className="mb-1 text-[10px] text-[#0066FF] md:text-xs">{item.category}</p>
        <Link href={`/brickarts/${item.id}`}>
          <h3 className="mb-2 line-clamp-2 cursor-pointer text-sm font-bold hover:text-[#0066FF] md:text-base">
            {item.title}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-[#FF6B9D] md:h-4 md:w-4" />
            <span className="text-xs text-[#64748B] md:text-sm">{formatCount(item.likeCount)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-[#94A3B8] md:h-4 md:w-4" />
            <span className="text-xs text-[#64748B] md:text-sm">{formatCount(item.viewCount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBrickArtCard;
