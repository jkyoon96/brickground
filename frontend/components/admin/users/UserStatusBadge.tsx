'use client';

import { cn } from '@/lib/utils';

export type UserStatus = 'active' | 'inactive' | 'banned';

interface UserStatusBadgeProps {
  status: UserStatus;
  className?: string;
}

const statusConfig: Record<UserStatus, { label: string; dotClassName: string }> = {
  active: {
    label: '활성',
    dotClassName: 'bg-green-500',
  },
  inactive: {
    label: '비활성',
    dotClassName: 'bg-gray-400',
  },
  banned: {
    label: '정지',
    dotClassName: 'bg-red-500',
  },
};

export function UserStatusBadge({ status, className }: UserStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm', className)}>
      <span className={cn('h-2 w-2 rounded-full', config.dotClassName)} />
      {config.label}
    </span>
  );
}
