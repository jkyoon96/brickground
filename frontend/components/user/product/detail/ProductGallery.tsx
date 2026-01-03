'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, RotateCcw, Maximize2, Move, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ProductGalleryProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  has3DPreview?: boolean;
  onView3D?: () => void;
}

export function ProductGallery({ images, has3DPreview = false, onView3D }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeControl, setActiveControl] = useState<string>('rotate');

  const selectedImage = images[selectedIndex];

  const controls = [
    { id: 'rotate', icon: RotateCcw, label: '회전' },
    { id: 'fullscreen', icon: Maximize2, label: '전체화면' },
    { id: 'move', icon: Move, label: '이동' },
    { id: 'zoom', icon: ZoomIn, label: '확대' },
  ];

  return (
    <div className="rounded-[20px] bg-white p-4 shadow-soft md:p-6">
      {/* Main Image */}
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        {selectedImage ? (
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Box className="mb-4 h-20 w-20 text-white/80" />
            <span className="text-lg font-semibold text-white">상품 이미지</span>
          </div>
        )}

        {/* 3D Preview Badge */}
        {has3DPreview && (
          <Button
            onClick={onView3D}
            size="sm"
            className="absolute left-4 top-4 transition-transform hover:scale-105"
          >
            <Box className="h-4 w-4" />
            3D 미리보기
          </Button>
        )}

        {/* View Controls */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/60 p-2 backdrop-blur-sm">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <Button
                key={control.id}
                onClick={() => setActiveControl(control.id)}
                variant={activeControl === control.id ? 'default' : 'ghost'}
                size="icon"
                className={cn(
                  'h-9 w-9',
                  activeControl === control.id
                    ? ''
                    : 'text-white hover:bg-white/20 hover:text-white'
                )}
                title={control.label}
              >
                <Icon className="h-[18px] w-[18px]" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 md:gap-3">
        {images.map((image, index) => (
          <Button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            variant="ghost"
            className={cn(
              'h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-xl border-[3px] p-0 transition-all md:h-20 md:w-20',
              index === selectedIndex
                ? 'border-pixar-blue'
                : 'border-transparent hover:scale-105 hover:border-pixar-blue/50 hover:bg-transparent'
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
