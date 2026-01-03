'use client';

import { Coins } from 'lucide-react';

export function PointsPageHeader() {
  return (
    <h1 className="mb-6 flex items-center gap-3 text-2xl font-extrabold text-[#1E293B] md:text-[28px]">
      <Coins className="h-6 w-6 text-[#0066FF] md:h-8 md:w-8" />
      포인트
    </h1>
  );
}

export default PointsPageHeader;
