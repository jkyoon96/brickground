import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-xl border-2 bg-white px-4 py-3 text-sm transition-all duration-200',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-0',
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-pixar-blue',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
