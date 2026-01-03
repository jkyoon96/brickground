'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BannerProps {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: 'default' | 'gradient' | 'image' | 'minimal';
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function Banner({
  id = 'banner',
  title,
  description,
  image,
  href,
  variant = 'gradient',
  dismissible = false,
  onDismiss,
  className,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.(id);
  };

  const content = (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        variant === 'gradient' &&
          'bg-gradient-to-r from-pixar-blue via-toy-purple to-toy-cyan text-white',
        variant === 'default' && 'bg-gray-100',
        variant === 'minimal' && 'bg-blue-50 border border-blue-100',
        className
      )}
    >
      {/* Background Image */}
      {variant === 'image' && image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative flex items-center justify-between p-6 lg:p-8">
        <div className="flex-1">
          <h3
            className={cn(
              'text-lg lg:text-xl font-bold mb-1',
              variant === 'image' || variant === 'gradient'
                ? 'text-white'
                : 'text-gray-900'
            )}
          >
            {title}
          </h3>
          {description && (
            <p
              className={cn(
                'text-sm lg:text-base',
                variant === 'image' || variant === 'gradient'
                  ? 'text-white/80'
                  : 'text-gray-600'
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Action Arrow */}
        {href && (
          <motion.div
            whileHover={{ x: 5 }}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full',
              variant === 'image' || variant === 'gradient'
                ? 'bg-white/20'
                : 'bg-pixar-blue text-white'
            )}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDismiss();
          }}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            variant === 'image' || variant === 'gradient'
              ? 'text-white/60 hover:text-white hover:bg-white/20'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
          )}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          {content}
        </motion.div>
      </Link>
    );
  }

  return content;
}

export default Banner;
