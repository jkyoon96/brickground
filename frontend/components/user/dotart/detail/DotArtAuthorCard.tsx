'use client';

import { User, UserPlus, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface AuthorStats {
  artworks: number;
  followers: number | string;
  likes: number | string;
}

interface DotArtAuthorCardProps {
  name: string;
  username: string;
  avatarUrl?: string;
  stats: AuthorStats;
  isFollowing: boolean;
  onFollow: () => void;
  onProfileClick: () => void;
}

export function DotArtAuthorCard({
  name,
  username,
  avatarUrl,
  stats,
  isFollowing,
  onFollow,
  onProfileClick,
}: DotArtAuthorCardProps) {
  const formatStat = (value: number | string): string => {
    if (typeof value === 'string') return value;
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
      {/* Author Header */}
      <div
        className="mb-5 flex cursor-pointer items-center gap-4"
        onClick={onProfileClick}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9B5DE5]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 text-white" />
          )}
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-[#1E293B]">{name}</h3>
          <span className="text-[13px] text-[#64748B]">@{username}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 flex justify-around border-y border-[#E2E8F0] py-4">
        <div className="text-center">
          <div className="text-xl font-extrabold text-[#9B5DE5]">
            {formatStat(stats.artworks)}
          </div>
          <div className="text-xs text-[#64748B]">작품</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-extrabold text-[#9B5DE5]">
            {formatStat(stats.followers)}
          </div>
          <div className="text-xs text-[#64748B]">팔로워</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-extrabold text-[#9B5DE5]">
            {formatStat(stats.likes)}
          </div>
          <div className="text-xs text-[#64748B]">좋아요</div>
        </div>
      </div>

      {/* Follow Button */}
      <Button
        onClick={onFollow}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-colors',
          isFollowing
            ? 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
            : 'bg-[#9B5DE5] text-white hover:bg-[#8B4DD5]'
        )}
      >
        {isFollowing ? (
          <>
            <UserCheck className="h-[18px] w-[18px]" />
            팔로잉
          </>
        ) : (
          <>
            <UserPlus className="h-[18px] w-[18px]" />
            팔로우
          </>
        )}
      </Button>
    </div>
  );
}

export default DotArtAuthorCard;
