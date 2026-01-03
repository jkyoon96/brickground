'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface HelpFaqCardProps {
  faqs: FaqItem[];
  viewAllHref?: string;
  defaultOpenId?: string;
}

export function HelpFaqCard({
  faqs,
  viewAllHref = '/help/faq',
  defaultOpenId,
}: HelpFaqCardProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between md:mb-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-[#1E293B] md:gap-2.5 md:text-lg">
          <HelpCircle className="h-5 w-5 text-[#00CEC9] md:h-[22px] md:w-[22px]" />
          자주 묻는 질문
        </h3>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-semibold text-[#0066FF] hover:underline"
        >
          전체보기
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl bg-[#F8FAFC]"
            >
              <Button
                variant="ghost"
                onClick={() => toggleFaq(faq.id)}
                className="flex h-auto w-full items-center justify-start gap-3 p-3 text-left hover:bg-[rgba(0,206,201,0.1)] md:p-3.5"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#00CEC9] text-sm font-extrabold text-white">
                  Q
                </span>
                <span className="flex-1 text-[13px] font-semibold text-[#1E293B] md:text-sm">
                  {faq.question}
                </span>
                <span className="flex h-7 w-7 items-center justify-center">
                  <ChevronDown
                    className={cn(
                      'h-[18px] w-[18px] text-[#64748B] transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </span>
              </Button>

              {isOpen && (
                <div className="px-3 pb-3 pl-11 text-[13px] leading-relaxed text-[#64748B] md:px-4 md:pb-3.5 md:pl-14 md:text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HelpFaqCard;
