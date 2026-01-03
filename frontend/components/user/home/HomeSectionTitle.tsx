'use client';

import Link from 'next/link';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HomeSectionTitleProps {
  icon: ReactNode;
  iconBackground: string;
  title: string;
  moreLink?: string;
  moreLinkText?: string;
}

export function HomeSectionTitle({
  icon,
  iconBackground,
  title,
  moreLink,
  moreLinkText = '더보기',
}: HomeSectionTitleProps) {
  return (
    <div className="mb-4 flex flex-col items-start gap-2 md:mb-6 md:flex-row md:items-center md:justify-between">
      <h2 className="flex items-center gap-2 text-lg font-extrabold md:gap-3 md:text-[28px]">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl md:h-10 md:w-10"
          style={{ background: iconBackground }}
        >
          {icon}
        </span>
        {title}
      </h2>
      {moreLink && (
        <Link
          href={moreLink}
          className="flex items-center gap-1 text-sm font-semibold text-[#0066FF] hover:underline md:text-base"
        >
          {moreLinkText}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export default HomeSectionTitle;
