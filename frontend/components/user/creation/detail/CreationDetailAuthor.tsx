'use client';

import Link from 'next/link';
import { User, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface AuthorStats {
  worksCount: number;
  followers: number;
  totalLikes: number;
}

interface CreationDetailAuthorProps {
  id: string;
  name: string;
  bio: string;
  stats: AuthorStats;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

export function CreationDetailAuthor({
  id,
  name,
  bio,
  stats,
  isFollowing,
  onFollowToggle,
}: CreationDetailAuthorProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  };

  const statItems = [
    { label: '작품', value: stats.worksCount },
    { label: '팔로워', value: stats.followers },
    { label: '좋아요', value: stats.totalLikes },
  ];

  return (
    <div className="mb-6 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Author Header */}
      <div className="mb-5 flex items-center gap-4">
        <Link
          href={`/user/${id}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] md:h-16 md:w-16"
        >
          <User className="h-6 w-6 text-white md:h-8 md:w-8" />
        </Link>
        <div className="flex-1">
          <Link
            href={`/user/${id}`}
            className="mb-1 block text-base font-bold text-[#1E293B] hover:text-[#00CEC9] md:text-lg"
          >
            {name}
          </Link>
          <p className="text-[13px] text-[#64748B]">{bio}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-3 gap-4 border-b border-t border-[#E2E8F0] py-4 text-center">
        {statItems.map(({ label, value }) => (
          <div key={label}>
            <div className="text-base font-extrabold text-[#00CEC9] md:text-lg">
              {formatNumber(value)}
            </div>
            <div className="text-[11px] text-[#64748B]">{label}</div>
          </div>
        ))}
      </div>

      {/* Follow Button */}
      <Button
        variant={isFollowing ? 'outline' : 'default'}
        onClick={onFollowToggle}
        className={cn(
          'w-full rounded-3xl py-3 text-[14px] font-bold md:py-3.5 md:text-[15px]',
          isFollowing
            ? 'border-2 border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-white'
            : 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
        )}
      >
        <UserPlus className="h-[18px] w-[18px]" />
        {isFollowing ? '팔로잉' : '팔로우'}
      </Button>
    </div>
  );
}

export default CreationDetailAuthor;
