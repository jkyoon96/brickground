'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  moreLink?: {
    label?: string;
    href: string;
  };
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    title: 'text-xl',
    subtitle: 'text-sm',
    description: 'text-sm',
    icon: 'w-5 h-5',
  },
  md: {
    title: 'text-2xl',
    subtitle: 'text-base',
    description: 'text-base',
    icon: 'w-6 h-6',
  },
  lg: {
    title: 'text-3xl md:text-4xl',
    subtitle: 'text-lg',
    description: 'text-lg',
    icon: 'w-8 h-8',
  },
};

export function SectionTitle({
  title,
  subtitle,
  description,
  icon: Icon,
  moreLink,
  align = 'left',
  size = 'md',
  className,
}: SectionTitleProps) {
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        'mb-6 lg:mb-8',
        align === 'center' && 'text-center',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-4',
          align === 'center' && 'justify-center',
          moreLink && align === 'left' && 'justify-between'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3',
            align === 'center' && 'flex-col'
          )}
        >
          {/* Icon */}
          {Icon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pixar-blue to-toy-cyan flex items-center justify-center text-white"
            >
              <Icon className={sizes.icon} />
            </motion.div>
          )}

          <div>
            {/* Subtitle */}
            {subtitle && (
              <p
                className={cn(
                  'text-pixar-blue font-semibold mb-1',
                  sizes.subtitle
                )}
              >
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h2 className={cn('font-extrabold text-gray-900', sizes.title)}>
              {title}
            </h2>
          </div>
        </div>

        {/* More Link - Desktop */}
        {moreLink && align === 'left' && (
          <Link
            href={moreLink.href}
            className="hidden sm:flex items-center gap-1 text-pixar-blue font-medium hover:underline group"
          >
            <span>{moreLink.label || '더보기'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-gray-500 mt-2 max-w-2xl',
            sizes.description,
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}

      {/* More Link - Mobile */}
      {moreLink && align === 'left' && (
        <Link
          href={moreLink.href}
          className="sm:hidden flex items-center gap-1 text-pixar-blue font-medium mt-3"
        >
          <span>{moreLink.label || '더보기'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {/* More Link - Center aligned */}
      {moreLink && align === 'center' && (
        <Link
          href={moreLink.href}
          className="inline-flex items-center gap-1 text-pixar-blue font-medium mt-4 hover:underline group"
        >
          <span>{moreLink.label || '더보기'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

export default SectionTitle;
