'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Eye, Box, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DotArtBadgeType = 'hot' | 'new' | 'music' | '3d' | null;

export interface DotArtGalleryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  badge?: DotArtBadgeType;
  has3D?: boolean;
  isLiked?: boolean;
}

export function DotArtGalleryCard({
  id,
  title,
  imageUrl,
  authorName,
  likeCount,
  commentCount,
  viewCount,
  badge,
  has3D = false,
  isLiked = false,
}: DotArtGalleryCardProps) {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  const getBadgeStyle = (badgeType: DotArtBadgeType) => {
    switch (badgeType) {
      case 'hot':
        return 'bg-[#FFD93D] text-[#1E293B]';
      case 'new':
        return 'bg-[#6BCB77] text-white';
      case 'music':
        return 'bg-[#F15BB5] text-white';
      default:
        return 'bg-[#FFD93D] text-[#1E293B]';
    }
  };

  const getBadgeLabel = (badgeType: DotArtBadgeType) => {
    switch (badgeType) {
      case 'hot':
        return 'HOT';
      case 'new':
        return 'NEW';
      case 'music':
        return 'MUSIC';
      default:
        return '';
    }
  };

  return (
    <div className="group overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,102,255,0.1)] transition-all hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,102,255,0.15)]">
      {/* Thumbnail */}
      <Link href={`/dotarts/${id}/viewer`} className="relative block aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        {badge && (
          <span
            className={cn(
              'absolute left-3 top-3 rounded-xl px-3 py-1.5 text-[11px] font-bold',
              getBadgeStyle(badge)
            )}
          >
            {getBadgeLabel(badge)}
          </span>
        )}
        {has3D && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] px-3 py-1.5 text-[11px] font-bold text-white">
            <Box className="h-3 w-3" />
            3D
          </span>
        )}
      </Link>

      {/* Body */}
      <Link href={`/dotarts/${id}`} className="block p-4">
        {/* Author */}
        <div className="mb-2.5 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5]">
            <User className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-xs text-[#64748B]">{authorName}</span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-base font-bold text-[#1E293B] transition-colors group-hover:text-[#9B5DE5]">
          {title}
        </h3>

        {/* Stats */}
        <div className="flex gap-4">
          <span
            className={cn(
              'flex items-center gap-1 text-[13px] text-[#64748B]',
              isLiked && '[&>svg]:fill-[#FF6B6B] [&>svg]:text-[#FF6B6B]'
            )}
          >
            <Heart className="h-4 w-4" />
            {formatCount(likeCount)}
          </span>
          <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
            <MessageCircle className="h-4 w-4" />
            {commentCount}
          </span>
          <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
            <Eye className="h-4 w-4" />
            {formatCount(viewCount)}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default DotArtGalleryCard;
