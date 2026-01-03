'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RelatedWork {
  id: string;
  imageUrl?: string;
  title: string;
}

interface DotArtRelatedWorksProps {
  works: RelatedWork[];
  onWorkClick: (workId: string) => void;
}

export function DotArtRelatedWorks({ works, onWorkClick }: DotArtRelatedWorksProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (workId: string) => {
    setImageErrors((prev) => new Set(prev).add(workId));
  };

  // Gradient colors for fallback
  const gradients = [
    'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
    'linear-gradient(135deg, #4D96FF 0%, #6BCB77 100%)',
    'linear-gradient(135deg, #F15BB5 0%, #9B5DE5 100%)',
    'linear-gradient(135deg, #00BBF9 0%, #00F5D4 100%)',
  ];

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
      {/* Title */}
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-[#1E293B]">
        <Sparkles className="h-5 w-5 text-[#9B5DE5]" />
        관련 작품
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {works.map((work, index) => (
          <Button
            key={work.id}
            variant="ghost"
            onClick={() => onWorkClick(work.id)}
            className="group relative aspect-square h-auto w-full overflow-hidden rounded-xl p-0 transition-transform hover:scale-105"
          >
            {work.imageUrl && !imageErrors.has(work.id) ? (
              <Image
                src={work.imageUrl}
                alt={work.title}
                fill
                className="object-cover"
                onError={() => handleImageError(work.id)}
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: gradients[index % gradients.length] }}
              >
                <Palette className="h-8 w-8 text-white/60" />
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20" />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DotArtRelatedWorks;
