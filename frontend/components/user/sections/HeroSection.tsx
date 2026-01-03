'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  variant?: 'default' | 'gradient' | 'image';
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-24',
  lg: 'py-24 lg:py-32',
};

const alignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  variant = 'gradient',
  align = 'center',
  size = 'md',
  className,
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        sizeClasses[size],
        variant === 'gradient' &&
          'bg-gradient-to-br from-pixar-blue via-toy-purple to-toy-cyan',
        variant === 'default' && 'bg-gray-50',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && variant === 'image' && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Decorative Elements */}
      {variant === 'gradient' && (
        <>
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-toy-yellow/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full" />
        </>
      )}

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('flex flex-col', alignClasses[align])}>
          {/* Subtitle Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>{subtitle}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6',
              variant === 'gradient' || variant === 'image'
                ? 'text-white'
                : 'text-gray-900',
              align === 'center' && 'max-w-4xl'
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                'text-lg md:text-xl mb-8 max-w-2xl',
                variant === 'gradient' || variant === 'image'
                  ? 'text-white/80'
                  : 'text-gray-600'
              )}
            >
              {description}
            </motion.p>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {primaryAction && (
                <Link href={primaryAction.href}>
                  <Button
                    size="lg"
                    variant={variant === 'gradient' ? 'toy' : 'default'}
                    className="group"
                  >
                    {primaryAction.label}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <Button
                    size="lg"
                    variant={
                      variant === 'gradient' || variant === 'image'
                        ? 'outline'
                        : 'secondary'
                    }
                    className={cn(
                      variant === 'gradient' &&
                        'border-white text-white hover:bg-white hover:text-pixar-blue'
                    )}
                  >
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Custom Children */}
          {children}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
