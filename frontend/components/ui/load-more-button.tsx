'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  hasMore?: boolean;
  loadedCount?: number;
  totalCount?: number;
  className?: string;
}

export function LoadMoreButton({
  onClick,
  loading = false,
  hasMore = true,
  loadedCount,
  totalCount,
  className,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500 text-sm">모든 항목을 불러왔습니다</p>
        {loadedCount !== undefined && totalCount !== undefined && (
          <p className="text-gray-400 text-xs mt-1">
            {loadedCount} / {totalCount}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <motion.button
        onClick={onClick}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-200',
          'bg-white border-2 border-gray-200 text-gray-700',
          'hover:border-pixar-blue hover:text-pixar-blue hover:shadow-lg',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>불러오는 중...</span>
          </>
        ) : (
          <>
            <span>더보기</span>
            <ChevronDown className="w-5 h-5" />
          </>
        )}
      </motion.button>
      {loadedCount !== undefined && totalCount !== undefined && (
        <p className="text-gray-500 text-sm">
          {loadedCount} / {totalCount}
        </p>
      )}
    </div>
  );
}

export default LoadMoreButton;
