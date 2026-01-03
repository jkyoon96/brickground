'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Headphones,
  Search,
  Truck,
  RefreshCcw,
  CreditCard,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface QuickLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface HelpCenterHeroProps {
  onSearch?: (query: string) => void;
  quickLinks?: QuickLink[];
}

const defaultQuickLinks: QuickLink[] = [
  { id: '1', label: '배송 조회', href: '/help/faq?category=delivery', icon: <Truck className="h-4 w-4" /> },
  { id: '2', label: '교환/반품', href: '/help/faq?category=exchange', icon: <RefreshCcw className="h-4 w-4" /> },
  { id: '3', label: '결제/환불', href: '/help/faq?category=order', icon: <CreditCard className="h-4 w-4" /> },
  { id: '4', label: '회원정보', href: '/help/faq?category=member', icon: <User className="h-4 w-4" /> },
];

export function HelpCenterHero({
  onSearch,
  quickLinks = defaultQuickLinks,
}: HelpCenterHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] px-4 py-10 text-center text-white md:px-10 md:py-[60px]">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-4 py-2.5 text-sm font-semibold md:mb-5 md:px-5">
        <Headphones className="h-[18px] w-[18px]" />
        Help Center
      </div>

      {/* Title */}
      <h1 className="mb-3 text-[26px] font-extrabold md:mb-4 md:text-[42px]">
        무엇을 도와드릴까요?
      </h1>
      <p className="mb-6 text-sm opacity-90 md:mb-8 md:text-lg">
        궁금하신 점을 검색하거나 카테고리에서 찾아보세요
      </p>

      {/* Search */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[500px] flex-col gap-2.5 md:max-w-[600px] md:flex-row md:items-center md:gap-3"
      >
        <div className="flex h-12 flex-1 items-center gap-3 rounded-[20px] bg-white px-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:rounded-[28px] md:px-6">
          <Search className="h-5 w-5 text-[#64748B] md:h-[22px] md:w-[22px]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="궁금한 점을 검색해보세요..."
            className="flex-1 border-none text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] md:text-base"
          />
        </div>
        <Button
          type="submit"
          variant="toy"
          className="h-12 w-full rounded-[20px] px-6 text-sm font-bold md:w-auto md:rounded-[28px] md:px-8 md:text-base"
        >
          검색
        </Button>
      </form>

      {/* Quick Links */}
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 md:mt-8 md:gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="flex items-center gap-1.5 rounded-[20px] bg-white/20 px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/30 md:px-5 md:py-2.5 md:text-sm"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HelpCenterHero;
