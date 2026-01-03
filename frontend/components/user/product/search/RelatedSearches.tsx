'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RelatedSearchesProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
}

export function RelatedSearches({ keywords, onKeywordClick }: RelatedSearchesProps) {
  if (keywords.length === 0) return null;

  return (
    <section className="mt-10 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:mt-12 md:p-8">
      <h2 className="mb-5 text-lg font-extrabold text-[#1E293B] md:text-xl">관련 검색어</h2>
      <div className="flex flex-wrap gap-2 md:gap-2.5">
        {keywords.map((keyword) => (
          <Button
            key={keyword}
            onClick={() => onKeywordClick(keyword)}
            variant="ghost"
            className="h-auto rounded-3xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#1E293B] transition-all hover:border-[#FF6B35] hover:bg-[#F8FAFC] hover:text-[#FF6B35] md:px-5 md:py-3 md:text-[14px]"
          >
            <Search className="h-4 w-4" />
            {keyword}
          </Button>
        ))}
      </div>
    </section>
  );
}

export default RelatedSearches;
