'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function UserAvatar({ name, avatar, size = 'md', className }: UserAvatarProps) {
  const initial = name.charAt(0);

  if (avatar) {
    return (
      <div className={cn('relative overflow-hidden rounded-full', sizeStyles[size], className)}>
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-muted font-semibold text-foreground',
        sizeStyles[size],
        className
      )}
    >
      {initial}
    </div>
  );
}
