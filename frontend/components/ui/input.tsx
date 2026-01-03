import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border-2 bg-white px-4 py-2 text-sm transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-0',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-200 focus:border-pixar-blue',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            icon && 'pl-11',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
