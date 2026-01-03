'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, Sparkles, Download, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Price } from '@/components/ui/price';
import { cn } from '@/lib/utils';

interface CreationCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  price?: number;
  isFree?: boolean;
  likes?: number;
  views?: number;
  downloads?: number;
  category?: string;
  badges?: Array<'new' | 'hot' | 'premium'>;
  isLiked?: boolean;
  onLikeToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  className?: string;
}

export function CreationCard({
  id,
  title,
  description,
  image,
  author,
  price = 0,
  isFree = false,
  likes = 0,
  views = 0,
  downloads = 0,
  category,
  badges = [],
  isLiked = false,
  onLikeToggle,
  onAddToCart,
  className,
}: CreationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-100/50',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/creations/${id}`} className="block">
        <div className="relative aspect-video bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {isFree && (
              <Badge variant="success" size="sm">
                FREE
              </Badge>
            )}
            {badges.map((badge) => (
              <Badge key={badge} variant={badge} size="sm">
                {badge.toUpperCase()}
              </Badge>
            ))}
          </div>

          {/* Category Tag */}
          {category && (
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{category}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
            >
              <Eye className="w-7 h-7 text-orange-500" />
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
        <Link href={`/creations/${id}`}>
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        )}

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
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {downloads.toLocaleString()}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          {isFree ? (
            <span className="font-bold text-green-600">무료</span>
          ) : (
            <Price value={price} size="md" />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart?.(id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            {isFree ? (
              <>
                <Download className="w-4 h-4" />
                <span>받기</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>구매</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CreationCard;
