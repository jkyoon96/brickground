'use client';

import { Eye, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface FaqListItemProps {
  id: string;
  category: string;
  question: string;
  answer: string;
  views: string;
  helpfulYes?: number;
  helpfulNo?: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onHelpful?: (id: string, helpful: boolean) => void;
}

export function FaqListItem({
  id,
  category,
  question,
  answer,
  views,
  helpfulYes = 0,
  helpfulNo = 0,
  isOpen,
  onToggle,
  onHelpful,
}: FaqListItemProps) {
  return (
    <div
      id={`faq-${id}`}
      className={cn(
        'overflow-hidden rounded-[20px] border-2 bg-white shadow-[0_4px_20px_rgba(0,206,201,0.15)] transition-all',
        isOpen ? 'border-[#00CEC9]' : 'border-transparent hover:border-[#00CEC9]'
      )}
    >
      {/* Question */}
      <Button
        variant="ghost"
        onClick={() => onToggle(id)}
        className="flex h-auto w-full items-center gap-3 p-4 text-left md:gap-4 md:p-5"
      >
        {/* Q Icon */}
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] text-lg font-extrabold text-white md:h-10 md:w-10">
          Q
        </span>

        {/* Text */}
        <div className="flex-1">
          <span className="mb-1 inline-flex rounded-md bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-semibold text-[#64748B]">
            {category}
          </span>
          <div className="text-sm font-bold text-[#1E293B] md:text-base">
            {question}
          </div>
        </div>

        {/* Meta */}
        <div className="hidden items-center gap-1 text-xs text-[#64748B] md:flex">
          <Eye className="h-3.5 w-3.5" />
          {views}
        </div>

        {/* Toggle */}
        <div
          className={cn(
            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all md:h-9 md:w-9',
            isOpen ? 'bg-[#00CEC9]' : 'bg-[#F8FAFC]'
          )}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform',
              isOpen ? 'rotate-180 text-white' : 'text-[#64748B]'
            )}
          />
        </div>
      </Button>

      {/* Answer */}
      {isOpen && (
        <div className="px-4 pb-4 pl-14 md:px-5 md:pb-5 md:pl-[72px]">
          <div className="rounded-xl bg-[#F8FAFC] p-4 md:p-5">
            {/* Answer Header */}
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00CEC9] text-sm font-extrabold text-white">
                A
              </span>
              <span className="text-sm font-bold text-[#00CEC9]">답변</span>
            </div>

            {/* Answer Text */}
            <div
              className="text-sm leading-[1.8] text-[#1E293B] md:text-[15px]"
              dangerouslySetInnerHTML={{ __html: answer }}
            />

            {/* Helpful */}
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E2E8F0] pt-4 md:mt-5 md:gap-4 md:pt-4">
              <span className="text-[13px] text-[#64748B]">
                이 답변이 도움이 되었나요?
              </span>
              <Button
                variant="outline"
                onClick={() => onHelpful?.(id, true)}
                className="flex items-center gap-1.5 rounded-[20px] border border-[#E2E8F0] bg-white px-3.5 py-2 text-[13px] transition-colors hover:border-[#00CEC9] hover:text-[#00CEC9]"
              >
                <ThumbsUp className="h-4 w-4" />
                예 ({helpfulYes})
              </Button>
              <Button
                variant="outline"
                onClick={() => onHelpful?.(id, false)}
                className="flex items-center gap-1.5 rounded-[20px] border border-[#E2E8F0] bg-white px-3.5 py-2 text-[13px] transition-colors hover:border-[#00CEC9] hover:text-[#00CEC9]"
              >
                <ThumbsDown className="h-4 w-4" />
                아니오 ({helpfulNo})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FaqListItem;
