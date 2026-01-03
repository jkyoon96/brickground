'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Download, Clock, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ManualCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: string;
  steps?: number;
  views?: number;
  downloads?: number;
  badges?: Array<'new' | 'hot' | 'premium'>;
  className?: string;
}

const difficultyConfig = {
  easy: { label: '초급', color: 'bg-green-100 text-green-700' },
  medium: { label: '중급', color: 'bg-yellow-100 text-yellow-700' },
  hard: { label: '고급', color: 'bg-red-100 text-red-700' },
};

export function ManualCard({
  id,
  title,
  description,
  image,
  difficulty = 'easy',
  estimatedTime,
  steps = 0,
  views = 0,
  downloads = 0,
  badges = [],
  className,
}: ManualCardProps) {
  const diffConfig = difficultyConfig[difficulty];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-green-100/50',
        className
      )}
    >
      {/* Image Container */}
      <Link href={`/manual/${id}`} className="block">
        <div className="relative aspect-video bg-gradient-to-br from-green-50 to-teal-50 overflow-hidden">
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

          {/* Difficulty Badge */}
          <div
            className={cn(
              'absolute bottom-3 left-3 px-2 py-1 rounded-lg text-xs font-medium',
              diffConfig.color
            )}
          >
            {diffConfig.label}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl"
            >
              <BookOpen className="w-7 h-7 text-green-600" />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/manual/${id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          {estimatedTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {estimatedTime}
            </span>
          )}
          {steps > 0 && (
            <span className="flex items-center gap-1">
              <Layers className="w-4 h-4" />
              {steps}단계
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {downloads.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ManualCard;
