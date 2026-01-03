'use client';

import { Eye, Heart, ShoppingBag } from 'lucide-react';

interface BrickArtAuthor {
  name: string;
  avatarUrl?: string;
}

interface BrickArtStats {
  views: number;
  likes: number;
  products: number;
}

interface BrickArtDetailInfoProps {
  category: string;
  title: string;
  description: string;
  author: BrickArtAuthor;
  stats: BrickArtStats;
  tags: string[];
}

export function BrickArtDetailInfo({
  category,
  title,
  description,
  author,
  stats,
  tags,
}: BrickArtDetailInfoProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div>
      {/* Category & Title */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-[#0066FF]">{category}</span>
        <h1 className="mt-1 text-2xl font-extrabold text-[#1E293B] md:text-3xl">{title}</h1>
      </div>

      {/* Author */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00CEC9]" />
        <div>
          <p className="font-semibold text-[#1E293B]">{author.name}</p>
          <p className="text-sm text-[#64748B]">BrickArt Creator</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex gap-6">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-[#94A3B8]" />
          <span className="font-semibold">{formatNumber(stats.views)}</span>
          <span className="text-sm text-[#64748B]">조회</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-[#FF6B9D]" />
          <span className="font-semibold">{formatNumber(stats.likes)}</span>
          <span className="text-sm text-[#64748B]">좋아요</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-[#6BCB77]" />
          <span className="font-semibold">{stats.products}</span>
          <span className="text-sm text-[#64748B]">상품</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="mb-2 font-bold text-[#1E293B]">소개</h3>
        <p className="leading-relaxed text-[#64748B]">{description}</p>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="mb-2 font-bold text-[#1E293B]">태그</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-sm font-medium text-[#64748B]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrickArtDetailInfo;
