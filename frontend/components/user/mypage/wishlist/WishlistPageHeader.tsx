'use client';

import { Heart } from 'lucide-react';

interface WishlistPageHeaderProps {
  title?: string;
}

export function WishlistPageHeader({ title = '위시리스트' }: WishlistPageHeaderProps) {
  return (
    <h1 className="mb-6 flex items-center gap-3 text-xl font-extrabold text-[#1E293B] md:mb-8 md:text-2xl lg:text-[28px]">
      <Heart className="h-6 w-6 text-[#0066FF] md:h-8 md:w-8" />
      {title}
    </h1>
  );
}

export default WishlistPageHeader;
