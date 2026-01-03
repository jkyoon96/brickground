import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
};

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const showFallback = !src || imageError;

  const getFallbackText = () => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    if (alt) return alt.charAt(0).toUpperCase();
    return '?';
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-pixar-blue to-toy-purple text-white font-bold',
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
      {...props}
    >
      {showFallback ? (
        <span>{getFallbackText()}</span>
      ) : (
        <img
          src={src}
          alt={alt || ''}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
}

export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  className,
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn('flex items-center -space-x-2', className)} {...props}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: max - index }}
        >
          {React.isValidElement<AvatarProps>(child)
            ? React.cloneElement(child, { size })
            : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center bg-gray-200 text-gray-600 font-semibold ring-2 ring-white rounded-full',
            sizeClasses[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default Avatar;
