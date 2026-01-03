'use client';

import { Grid3X3, Calendar, Eye, Palette } from 'lucide-react';

interface DotArtInfoCardProps {
  title: string;
  description: string;
  tags: string[];
  canvasSize: number;
  createdAt: string;
  viewCount: number;
  colorCount: number;
}

export function DotArtInfoCard({
  title,
  description,
  tags,
  canvasSize,
  createdAt,
  viewCount,
  colorCount,
}: DotArtInfoCardProps) {
  const formatViewCount = (count: number): string => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1).replace(/\.0$/, '')}만`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
      {/* Title */}
      <h2 className="mb-3 text-[22px] font-extrabold text-[#1E293B]">{title}</h2>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-[#64748B]">{description}</p>

      {/* Tags */}
      <div className="mb-5 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-2xl bg-[#9B5DE5]/10 px-3 py-1.5 text-xs font-semibold text-[#9B5DE5]"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-4">
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
          <Grid3X3 className="h-[18px] w-[18px]" />
          <span>
            {canvasSize} x {canvasSize} 픽셀
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
          <Calendar className="h-[18px] w-[18px]" />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
          <Eye className="h-[18px] w-[18px]" />
          <span>조회 {formatViewCount(viewCount)}회</span>
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
          <Palette className="h-[18px] w-[18px]" />
          <span>{colorCount}가지 색상 사용</span>
        </div>
      </div>
    </div>
  );
}

export default DotArtInfoCard;
