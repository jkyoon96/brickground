'use client';

import Image from 'next/image';
import { Box, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BrickArtDetailPreviewProps {
  imageUrl: string;
  title: string;
  badge?: string | null;
  onEnterViewer: () => void;
}

export function BrickArtDetailPreview({
  imageUrl,
  title,
  badge,
  onEnterViewer,
}: BrickArtDetailPreviewProps) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F8FAFC]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#0066FF] px-3 py-1 text-xs font-bold text-white">
            {badge}
          </span>
        )}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
          <Box className="h-4 w-4" />
          3D VR
        </div>
      </div>

      {/* Enter Viewer Button */}
      <Button
        onClick={onEnterViewer}
        variant="gradient"
        size="lg"
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00CEC9] py-4 text-lg shadow-lg shadow-[#0066FF]/30 hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Play className="h-5 w-5" />
        VR 갤러리 입장하기
      </Button>
    </div>
  );
}

export default BrickArtDetailPreview;
