import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean;
    gradient?: boolean;
  }
>(({ className, hover = false, gradient = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl bg-white border border-gray-100 overflow-hidden',
      hover && 'transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1',
      gradient && 'bg-gradient-to-br from-white to-gray-50',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-bold text-lg leading-tight tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    aspectRatio?: 'square' | 'video' | 'wide';
  }
>(({ className, src, alt, aspectRatio = 'video', children, ...props }, ref) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      {src && (
        <img
          src={src}
          alt={alt || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {children}
    </div>
  );
});
CardImage.displayName = 'CardImage';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardImage };
