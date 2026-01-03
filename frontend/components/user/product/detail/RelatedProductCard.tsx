'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';

interface RelatedProductCardProps {
  id: string;
  title: string;
  price: number;
  image?: string;
  href?: string;
}

export function RelatedProductCard({
  id,
  title,
  price,
  image,
  href,
}: RelatedProductCardProps) {
  const content = (
    <div className="group cursor-pointer overflow-hidden rounded-[20px] bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-float">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-white/80" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 md:p-4">
        <p className="mb-2 line-clamp-2 text-xs font-semibold text-gray-900 md:text-sm">
          {title}
        </p>
        <p className="text-sm font-extrabold text-pixar-blue md:text-base">
          {price.toLocaleString()}원
        </p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
