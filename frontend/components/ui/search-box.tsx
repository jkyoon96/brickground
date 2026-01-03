'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  className?: string;
  autoFocus?: boolean;
}

const sizeClasses = {
  sm: 'h-9 text-sm px-3',
  md: 'h-11 text-base px-4',
  lg: 'h-13 text-lg px-5',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const variantClasses = {
  default: 'bg-gray-50 border-2 border-transparent focus-within:border-pixar-blue focus-within:bg-white',
  filled: 'bg-white border border-gray-200 focus-within:border-pixar-blue focus-within:ring-2 focus-within:ring-pixar-blue/20',
  outline: 'bg-transparent border-2 border-gray-200 focus-within:border-pixar-blue',
};

export function SearchBox({
  placeholder = '검색어를 입력하세요',
  value: controlledValue,
  onChange,
  onSearch,
  onClear,
  size = 'md',
  variant = 'default',
  className,
  autoFocus = false,
}: SearchBoxProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  const handleClear = useCallback(() => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
    onClear?.();
  }, [controlledValue, onChange, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(value);
      }
    },
    [onSearch, value]
  );

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full transition-all duration-200',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Search className={cn('text-gray-400 flex-shrink-0', iconSizeClasses[size])} />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent border-none outline-none placeholder:text-gray-400"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors h-auto w-auto"
        >
          <X className={iconSizeClasses[size]} />
        </Button>
      )}
    </div>
  );
}

export default SearchBox;
