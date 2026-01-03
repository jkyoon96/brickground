'use client';

import Link from 'next/link';
import { TrendingUp, Eye, LucideIcon } from 'lucide-react';

interface PopularFaqItem {
  id: string;
  category: string;
  categoryIcon: LucideIcon;
  question: string;
  views: string;
  href: string;
}

interface HelpPopularFaqProps {
  faqs: PopularFaqItem[];
}

export function HelpPopularFaq({ faqs }: HelpPopularFaqProps) {
  return (
    <section className="mt-10 md:mt-12">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-2xl">
        <TrendingUp className="h-6 w-6 text-[#00CEC9] md:h-7 md:w-7" />
        인기 FAQ
      </h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        {faqs.map((faq) => {
          const Icon = faq.categoryIcon;
          return (
            <Link
              key={faq.id}
              href={faq.href}
              className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,206,201,0.15)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,206,201,0.2)] md:p-6"
            >
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#00CEC9]">
                <Icon className="h-3.5 w-3.5" />
                {faq.category}
              </div>
              <h4 className="mb-2 text-sm font-bold leading-snug text-[#1E293B] md:mb-2.5 md:text-[15px]">
                {faq.question}
              </h4>
              <div className="flex items-center gap-1 text-xs text-[#64748B]">
                <Eye className="h-3.5 w-3.5" />
                {faq.views}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default HelpPopularFaq;
