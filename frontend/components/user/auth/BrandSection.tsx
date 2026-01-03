'use client';

import Image from 'next/image';
import { Blocks, Grid3X3, Sparkles, ShoppingBag } from 'lucide-react';

interface BrandFeature {
  icon: React.ReactNode;
  text: string;
}

const defaultFeatures: BrandFeature[] = [
  { icon: <Blocks className="w-6 h-6" />, text: '나만의 브릭아트 창작' },
  { icon: <Grid3X3 className="w-6 h-6" />, text: '픽셀 도트아트 디자인' },
  { icon: <Sparkles className="w-6 h-6" />, text: '3D 창작물 전시 및 공유' },
  { icon: <ShoppingBag className="w-6 h-6" />, text: '브릭 쇼핑몰' },
];

interface BrandSectionProps {
  tagline?: string;
  features?: BrandFeature[];
}

export function BrandSection({
  tagline = '브릭 창작의 새로운 세계',
  features = defaultFeatures,
}: BrandSectionProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-pixar-blue p-8 text-white md:p-16">
      {/* Decorative circles */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pixar-yellow/20" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10" />

      {/* Logo */}
      <div className="z-10 mb-4 flex items-center gap-3">
        <Image
          src="/images/brickground_logo.png"
          alt="BrickGround"
          width={280}
          height={70}
          className="h-12 w-auto brightness-0 invert md:h-16"
          priority
        />
      </div>

      {/* Tagline */}
      <p className="z-10 text-center text-base opacity-90 md:text-lg">{tagline}</p>

      {/* Features - Hidden on mobile */}
      <div className="z-10 mt-10 hidden space-y-4 md:block">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-sm md:text-base">
            <span className="text-pixar-yellow">{feature.icon}</span>
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
