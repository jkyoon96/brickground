'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Download, User, Award, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CreationGalleryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  likeCount: number;
  commentCount: number;
  downloadCount: number;
  isLiked?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  onLikeToggle?: (id: string) => void;
}

export function CreationGalleryCard({
  id,
  title,
  description,
  imageUrl,
  author,
  likeCount,
  commentCount,
  downloadCount,
  isLiked = false,
  isHot = false,
  isNew = false,
  isFeatured = false,
  onLikeToggle,
}: CreationGalleryCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="group overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,206,201,0.15)] transition-transform duration-300 hover:-translate-y-1.5">
      {/* Thumbnail */}
      <Link href={`/creations/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Box className="h-16 w-16 text-white/50" />
            </div>
          )}

          {/* Badges */}
          {(isHot || isNew) && (
            <span className="absolute left-3 top-3 rounded-xl bg-[#FFD93D] px-3 py-1.5 text-[11px] font-bold text-[#1E293B]">
              {isHot ? 'HOT' : 'NEW'}
            </span>
          )}

          {isFeatured && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-xl bg-[#00CEC9] px-3 py-1.5 text-[11px] font-bold text-white">
              <Award className="h-3 w-3" />
              추천
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <Link href={`/creations/${id}`} className="block">
        <div className="p-5">
          {/* Author */}
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
              {author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="text-[13px] text-[#64748B]">{author.name}</span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-[17px] font-bold text-[#1E293B] transition-colors group-hover:text-[#00CEC9]">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-3 line-clamp-2 text-[13px] leading-snug text-[#64748B]">
            {description}
          </p>

          {/* Stats */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onLikeToggle?.(id);
              }}
              className={cn(
                'h-auto p-0 text-[13px]',
                isLiked ? 'text-[#FF6B6B] hover:text-[#FF6B6B]' : 'text-[#64748B] hover:text-[#FF6B6B] hover:bg-transparent'
              )}
            >
              <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
              {formatCount(likeCount)}
            </Button>
            <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
              <MessageCircle className="h-4 w-4" />
              {formatCount(commentCount)}
            </span>
            <span className="flex items-center gap-1 text-[13px] text-[#64748B]">
              <Download className="h-4 w-4" />
              {formatCount(downloadCount)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CreationGalleryCard;
