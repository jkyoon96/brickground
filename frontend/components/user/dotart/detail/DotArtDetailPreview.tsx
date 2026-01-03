'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Flame, Box, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DotArtDetailPreviewProps {
  imageUrl?: string;
  title: string;
  isHot?: boolean;
  has3D?: boolean;
  onView3D: () => void;
}

export function DotArtDetailPreview({
  imageUrl,
  title,
  isHot = false,
  has3D = false,
  onView3D,
}: DotArtDetailPreviewProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      {/* Image or Placeholder */}
      {imageUrl && !imageError ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFD93D] to-[#FF6B6B]">
          <Palette className="h-28 w-28 text-white/60" />
        </div>
      )}

      {/* Badges */}
      <div className="absolute left-4 top-4 flex gap-2">
        {isHot && (
          <span className="flex items-center gap-1 rounded-2xl bg-[#FF6B6B] px-3.5 py-2 text-xs font-bold text-white">
            <Flame className="h-3.5 w-3.5" />
            HOT
          </span>
        )}
        {has3D && (
          <span className="flex items-center gap-1 rounded-2xl bg-[#9B5DE5] px-3.5 py-2 text-xs font-bold text-white">
            <Box className="h-3.5 w-3.5" />
            3D
          </span>
        )}
      </div>

      {/* 3D View Button */}
      {has3D && (
        <Button
          onClick={onView3D}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-3xl bg-[#9B5DE5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(155,93,229,0.4)] transition-transform hover:scale-105"
        >
          <Box className="h-5 w-5" />
          3D로 보기
        </Button>
      )}
    </div>
  );
}

export default DotArtDetailPreview;
