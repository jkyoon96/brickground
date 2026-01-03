'use client';

import Link from 'next/link';
import { HelpCircle, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FaqPageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: '홈', href: '/' },
  { label: '고객센터', href: '/help' },
  { label: 'FAQ' },
];

export function FaqPageHeader({
  breadcrumbs = defaultBreadcrumbs,
  title = '자주 묻는 질문',
  subtitle = '궁금하신 점을 빠르게 찾아보세요',
}: FaqPageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] px-4 py-6 text-white md:px-10 md:py-12">
      <div className="mx-auto max-w-[1320px]">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-2 text-xs opacity-80 md:mb-4 md:text-sm">
          {breadcrumbs.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-extrabold md:mb-3 md:gap-3 md:text-4xl">
          <HelpCircle className="h-8 w-8 md:h-10 md:w-10" />
          {title}
        </h1>
        <p className="text-sm opacity-90 md:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

export default FaqPageHeader;
