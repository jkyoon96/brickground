'use client';

import { cn } from '@/lib/utils';
import { Shield, Store, User } from 'lucide-react';

export type UserRole = 'admin' | 'seller' | 'user';

interface UserRoleBadgeProps {
  role: UserRole;
  className?: string;
}

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType; className: string }> = {
  admin: {
    label: '관리자',
    icon: Shield,
    className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  seller: {
    label: '판매자',
    icon: Store,
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  user: {
    label: '일반',
    icon: User,
    className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  },
};

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
