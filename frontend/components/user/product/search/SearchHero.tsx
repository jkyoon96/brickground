'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SearchHeroProps {
  initialQuery?: string;
  suggestions?: string[];
  onSearch: (query: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

export function SearchHero({
  initialQuery = '',
  suggestions = [],
  onSearch,
  onSuggestionClick,
}: SearchHeroProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
      }
    },
    [query, onSearch]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      onSuggestionClick?.(suggestion);
      onSearch(suggestion);
    },
    [onSearch, onSuggestionClick]
  );

  return (
    <section className="bg-[#FF6B35] px-4 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-[1320px]">
        {/* Search Box */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 rounded-[20px] bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:flex-row md:items-center md:rounded-[32px]">
            <div className="flex h-12 flex-1 items-center rounded-2xl px-4 md:rounded-3xl md:px-6">
              <Search className="mr-3 h-5 w-5 text-[#64748B]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="상품을 검색해보세요"
                className="flex-1 border-none bg-transparent text-[15px] outline-none placeholder:text-[#94A3B8] md:text-lg"
              />
            </div>
            <Button
              type="submit"
              className="h-12 w-full rounded-2xl bg-[#FF6B35] px-6 text-[15px] font-bold hover:bg-[#e55a2b] md:w-auto md:rounded-3xl md:px-8 md:text-base"
            >
              <Search className="h-5 w-5" />
              검색
            </Button>
          </div>
        </form>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="ghost"
                size="sm"
                className="h-auto rounded-[20px] bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/30 hover:text-white md:px-4 md:py-2 md:text-[13px]"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchHero;
