'use client';

import { User, Crown } from 'lucide-react';

interface MypageProfileCardProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userGrade?: string;
  pointsToNextGrade?: number;
  progressPercent?: number;
}

export function MypageProfileCard({
  userName = '김브릭',
  userEmail = 'brick@email.com',
  userAvatar,
  userGrade = 'GOLD',
  pointsToNextGrade = 32000,
  progressPercent = 68,
}: MypageProfileCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0066FF] to-[#3B82F6] p-6 text-white md:p-8">
      {/* Decorative Circle */}
      <div className="absolute -right-[20%] -top-[50%] h-[300px] w-[300px] rounded-full bg-white/10" />

      {/* Profile Section */}
      <div className="relative z-10 mb-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white/50 bg-white/20 md:h-20 md:w-20">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 md:h-10 md:w-10" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold md:text-xl">{userName}</h2>
          <p className="text-sm opacity-80">{userEmail}</p>
        </div>
      </div>

      {/* Grade Section */}
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[20px] bg-white/20 px-3 py-1.5 text-[13px] font-bold">
          <Crown className="h-4 w-4" />
          {userGrade} 등급
        </span>
        <span className="text-sm opacity-80">
          다음 등급까지 {pointsToNextGrade.toLocaleString()}P
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default MypageProfileCard;
