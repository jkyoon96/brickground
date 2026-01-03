'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, Blocks, User, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface BrickArtCardProps {
  id: string;
  title: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  likes?: number;
  views?: number;
  pieces?: number;
  productCount?: number;
  badges?: Array<'new' | 'hot' | 'premium'>;
  isLiked?: boolean;
  onLikeToggle?: (id: string) => void;
  className?: string;
}

export function BrickArtCard({
  id,
  title,
  image,
  author,
  likes = 0,
  views = 0,
  pieces = 0,
  productCount,
  badges = [],
  isLiked = false,
  onLikeToggle,
  className,
}: BrickArtCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-100/50',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/brickarts/${id}`} className="block">
        <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge key={badge} variant={badge} size="sm">
                  {badge.toUpperCase()}
                </Badge>
              ))}
            </div>
          )}

          {/* 3D Indicator */}
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-medium flex items-center gap-1">
            <Blocks className="w-3 h-3" />
            <span>3D</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
            >
              <Eye className="w-7 h-7 text-pixar-blue" />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          onLikeToggle?.(id);
        }}
        className={cn(
          'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors',
          isLiked
            ? 'bg-red-500 text-white'
            : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500'
        )}
      >
        <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
      </motion.button>

      {/* Content */}
      <div className="p-4">
        <Link href={`/brickarts/${id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-pixar-blue transition-colors">
            {title}
          </h3>
        </Link>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar
            src={author.avatar}
            alt={author.name}
            fallback={author.name}
            size="xs"
          />
          <span className="text-sm text-gray-600">{author.name}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes.toLocaleString()}
            </span>
          </div>
          {pieces > 0 && (
            <span className="flex items-center gap-1 text-pixar-blue font-medium">
              <Blocks className="w-4 h-4" />
              {pieces.toLocaleString()}
            </span>
          )}
        </div>

        {/* Product Count */}
        {productCount !== undefined && productCount > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-sm font-semibold text-gray-900">
            <Package className="w-4 h-4 text-pixar-blue" />
            <span>상품 {productCount}개</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default BrickArtCard;
