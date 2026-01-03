'use client';

import { Coins } from 'lucide-react';

interface PointsHeroCardProps {
  totalPoints: number;
  monthlyEarned: number;
  monthlyUsed: number;
  expiringPoints: number;
  expiringDays?: number;
}

export function PointsHeroCard({
  totalPoints,
  monthlyEarned,
  monthlyUsed,
  expiringPoints,
  expiringDays = 30,
}: PointsHeroCardProps) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3B82F6] p-5 text-white md:rounded-3xl md:p-8">
      {/* Decorative circle */}
      <div className="absolute -right-[20%] -top-1/2 h-[300px] w-[300px] rounded-full bg-white/10" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 md:h-14 md:w-14">
            <Coins className="h-6 w-6 md:h-7 md:w-7" />
          </div>
          <div>
            <p className="text-sm opacity-80">보유 포인트</p>
            <h2 className="text-2xl font-bold md:text-4xl">
              {totalPoints.toLocaleString()} P
            </h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-center md:px-6 md:py-4">
            <p className="mb-1 text-xs opacity-80 md:text-sm">이번 달 적립</p>
            <p className="text-base font-bold md:text-xl">
              +{monthlyEarned.toLocaleString()} P
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-center md:px-6 md:py-4">
            <p className="mb-1 text-xs opacity-80 md:text-sm">이번 달 사용</p>
            <p className="text-base font-bold md:text-xl">
              -{monthlyUsed.toLocaleString()} P
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-4 py-3 text-center md:px-6 md:py-4">
            <p className="mb-1 text-xs opacity-80 md:text-sm">
              {expiringDays}일 내 소멸 예정
            </p>
            <p className="text-base font-bold md:text-xl">
              {expiringPoints.toLocaleString()} P
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsHeroCard;
