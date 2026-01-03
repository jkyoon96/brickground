'use client';

import Link from 'next/link';
import { Store } from 'lucide-react';

interface SellerInfoProps {
  name: string;
  description: string;
  href: string;
  stats: {
    rating: number;
    responseRate: string;
    responseTime: string;
  };
}

export function SellerInfo({ name, description, href, stats }: SellerInfoProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-soft md:p-6">
      {/* Seller Header */}
      <Link href={href} className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-toy-yellow to-amber-400">
          <Store className="h-7 w-7 text-white" />
        </div>
        <div>
          <h4 className="text-base font-bold text-gray-900 hover:text-pixar-blue">{name}</h4>
          <span className="text-[13px] text-gray-500">{description}</span>
        </div>
      </Link>

      {/* Seller Stats */}
      <div className="flex gap-2 border-t border-gray-100 pt-4 md:gap-4">
        <div className="flex-1 text-center">
          <div className="text-lg font-extrabold text-pixar-blue">{stats.rating}</div>
          <div className="text-xs text-gray-500">판매자 평점</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-lg font-extrabold text-pixar-blue">{stats.responseRate}</div>
          <div className="text-xs text-gray-500">응답률</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-lg font-extrabold text-pixar-blue">{stats.responseTime}</div>
          <div className="text-xs text-gray-500">평균 응답</div>
        </div>
      </div>
    </div>
  );
}
