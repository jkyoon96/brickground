'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Building2,
  Heart,
  Bookmark,
  Share2,
  Download,
  MessageCircle,
  Eye,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CreationStats {
  likes: number;
  comments: number;
  downloads: number;
  views: number;
  remixes: number;
}

interface CreationDetailHeroProps {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  stats: CreationStats;
  imageUrl?: string;
  badge?: string;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function CreationDetailHero({
  id,
  title,
  category,
  description,
  tags,
  stats,
  imageUrl,
  badge,
  isLiked,
  isBookmarked,
  onLikeToggle,
  onBookmarkToggle,
  onShare,
  onDownload,
}: CreationDetailHeroProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toLocaleString();
  };

  const statItems = [
    { icon: Heart, label: '좋아요', value: stats.likes },
    { icon: MessageCircle, label: '댓글', value: stats.comments },
    { icon: Download, label: '다운로드', value: stats.downloads },
    { icon: Eye, label: '조회', value: stats.views },
    { icon: GitBranch, label: '리믹스', value: stats.remixes },
  ];

  return (
    <div className="mb-6 overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:mb-8">
      {/* Preview Image */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] md:aspect-video">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : (
          <Building2 className="h-24 w-24 text-white/50 md:h-[120px] md:w-[120px]" />
        )}

        {/* Badge */}
        {badge && (
          <span className="absolute left-3 top-3 rounded-2xl bg-[#FFD93D] px-3 py-1.5 text-[11px] font-bold text-[#1E293B] md:left-5 md:top-5 md:px-4 md:py-2 md:text-xs">
            {badge}
          </span>
        )}

        {/* 3D View Button */}
        <Link
          href={`/creations/${id}`}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-3xl bg-white px-4 py-2.5 text-[13px] font-bold text-[#00CEC9] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 md:bottom-5 md:right-5 md:px-7 md:py-3.5 md:text-[15px]"
        >
          <Box className="h-5 w-5" />
          3D로 보기
        </Link>
      </div>

      {/* Body */}
      <div className="p-4 md:p-7">
        {/* Title Row */}
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-2 text-xl font-extrabold text-[#1E293B] md:text-[28px]">{title}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-2xl bg-[#00CEC9]/10 px-3 py-1.5 text-xs font-semibold text-[#00CEC9] md:px-3.5 md:text-[13px]">
              <Building2 className="h-3.5 w-3.5" />
              {category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onLikeToggle}
              className={cn(
                'h-10 w-10 rounded-full border-2 md:h-12 md:w-12',
                isLiked
                  ? 'border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-[#F8FAFC]'
              )}
            >
              <Heart className={cn('h-5 w-5 md:h-[22px] md:w-[22px]', isLiked && 'fill-current')} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onBookmarkToggle}
              className={cn(
                'h-10 w-10 rounded-full border-2 md:h-12 md:w-12',
                isBookmarked
                  ? 'border-[#FFD93D] bg-[#FFD93D]/10 text-[#FFD93D] hover:bg-[#FFD93D]/20'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-[#F8FAFC]'
              )}
            >
              <Bookmark
                className={cn('h-5 w-5 md:h-[22px] md:w-[22px]', isBookmarked && 'fill-current')}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="h-10 w-10 rounded-full border-2 border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-[#F8FAFC] md:h-12 md:w-12"
            >
              <Share2 className="h-5 w-5 md:h-[22px] md:w-[22px]" />
            </Button>

            <Button
              variant="gradient"
              onClick={onDownload}
              className="flex-1 rounded-3xl bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-5 py-2.5 text-[13px] font-bold md:flex-none md:px-7 md:py-3.5 md:text-[15px]"
            >
              <Download className="h-5 w-5" />
              다운로드
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-5 flex flex-wrap gap-3 border-b border-t border-[#E2E8F0] py-4 md:gap-8 md:py-5">
          {statItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs text-[#64748B] md:text-sm"
            >
              <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              {label}
              <strong className="ml-1 font-bold text-[#1E293B]">{formatNumber(value)}</strong>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mb-5 text-[13px] leading-relaxed text-[#64748B] md:text-[15px] md:leading-[1.7]">
          {description}
        </p>

        {/* Tags */}
        <div>
          <div className="mb-2.5 text-[13px] font-bold text-[#1E293B]">태그</div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/creations?tag=${encodeURIComponent(tag)}`}
                className="rounded-[20px] bg-[#F8FAFC] px-3 py-1.5 text-xs text-[#1E293B] transition-colors hover:bg-[#00CEC9]/10 hover:text-[#00CEC9] md:px-4 md:py-2 md:text-[13px]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreationDetailHero;
