'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, Grid3X3, Music, Box, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface DotArtCardProps {
  id: string;
  title: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  likes?: number;
  views?: number;
  comments?: number;
  size?: string;
  hasMusic?: boolean;
  has3D?: boolean;
  badges?: Array<'new' | 'hot' | 'premium' | 'music'>;
  isLiked?: boolean;
  onLikeToggle?: (id: string) => void;
  className?: string;
}

export function DotArtCard({
  id,
  title,
  image,
  author,
  likes = 0,
  views = 0,
  comments = 0,
  size = '32x32',
  hasMusic = false,
  has3D = false,
  badges = [],
  isLiked = false,
  onLikeToggle,
  className,
}: DotArtCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-purple-100/50',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/dotarts/${id}`} className="block">
        <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
          {/* Pixel Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #000 1px, transparent 1px),
                  linear-gradient(to bottom, #000 1px, transparent 1px)
                `,
                backgroundSize: '8px 8px',
              }}
            />
          </div>

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ imageRendering: 'pixelated' }}
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

          {/* Size & Music Indicator */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-medium flex items-center gap-1">
              <Grid3X3 className="w-3 h-3" />
              <span>{size}</span>
            </div>
            {hasMusic && (
              <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-xs font-medium flex items-center gap-1">
                <Music className="w-3 h-3" />
                <span>Music</span>
              </div>
            )}
          </div>

          {/* 3D Badge */}
          {has3D && (
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-[11px] font-bold flex items-center gap-1">
              <Box className="w-3 h-3" />
              3D
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
            >
              <Eye className="w-7 h-7 text-purple-600" />
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
        <Link href={`/dotarts/${id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
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
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className={cn('flex items-center gap-1', isLiked && 'text-red-500')}>
            <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
            {likes.toLocaleString()}
          </span>
          {comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {comments.toLocaleString()}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default DotArtCard;
