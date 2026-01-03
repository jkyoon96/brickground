'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Priority = 'high' | 'medium' | 'low';

interface TodoItemProps {
  id: string;
  text: string;
  done?: boolean;
  priority?: Priority;
  onToggle?: (id: string) => void;
}

const priorityStyles: Record<Priority, { label: string; className: string }> = {
  high: {
    label: '긴급',
    className: 'bg-red-100 text-red-500',
  },
  medium: {
    label: '보통',
    className: 'bg-orange-100 text-orange-500',
  },
  low: {
    label: '낮음',
    className: 'bg-gray-100 text-gray-500',
  },
};

export function TodoItem({
  id,
  text,
  done = false,
  priority = 'medium',
  onToggle,
}: TodoItemProps) {
  const priorityStyle = priorityStyles[priority];

  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
      <button
        onClick={() => onToggle?.(id)}
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          done
            ? 'border-pixar-green bg-pixar-green'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        {done && <Check className="h-3 w-3 text-white" />}
      </button>

      <span
        className={cn(
          'flex-1 text-sm text-gray-900',
          done && 'text-gray-400 line-through'
        )}
      >
        {text}
      </span>

      <span
        className={cn(
          'shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold',
          priorityStyle.className
        )}
      >
        {priorityStyle.label}
      </span>
    </div>
  );
}
