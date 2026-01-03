'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

export type ManualCategoryType = 'technic' | 'architecture' | 'art' | 'creator' | 'starwars';

export interface HomeManualItem {
  id: string;
  title: string;
  category: string;
  categoryType: ManualCategoryType;
  pageCount: number;
  format: string;
  detailUrl: string;
}

interface HomeManualCardProps {
  item: HomeManualItem;
}

const categoryStyles: Record<ManualCategoryType, { bgFrom: string; bgTo: string; iconColor: string; textColor: string; textBg: string }> = {
  technic: {
    bgFrom: '#E8E4FF',
    bgTo: '#F3F0FF',
    iconColor: '#A29BFE',
    textColor: '#A29BFE',
    textBg: 'rgba(162,155,254,0.1)',
  },
  architecture: {
    bgFrom: '#E0F7FA',
    bgTo: '#E8F5E9',
    iconColor: '#00CEC9',
    textColor: '#00CEC9',
    textBg: 'rgba(0,206,201,0.1)',
  },
  art: {
    bgFrom: '#FFF8E1',
    bgTo: '#FFFDE7',
    iconColor: '#FF9F43',
    textColor: '#FF9F43',
    textBg: 'rgba(255,159,67,0.1)',
  },
  creator: {
    bgFrom: '#E8F5E9',
    bgTo: '#F1F8E9',
    iconColor: '#6BCB77',
    textColor: '#6BCB77',
    textBg: 'rgba(107,203,119,0.1)',
  },
  starwars: {
    bgFrom: '#E3F2FD',
    bgTo: '#E8EAF6',
    iconColor: '#0066FF',
    textColor: '#0066FF',
    textBg: 'rgba(0,102,255,0.1)',
  },
};

export function HomeManualCard({ item }: HomeManualCardProps) {
  const styles = categoryStyles[item.categoryType] || categoryStyles.technic;

  return (
    <Link
      href={item.detailUrl}
      className="group flex flex-col gap-3 rounded-[16px] border border-[#E2E8F0] bg-white p-4 transition-all hover:-translate-y-1 hover:border-[#A29BFE] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:flex-row md:gap-4 md:rounded-[20px] md:p-5"
    >
      {/* Thumbnail */}
      <div
        className="flex h-20 w-full flex-shrink-0 items-center justify-center rounded-xl md:h-[100px] md:w-20"
        style={{
          background: `linear-gradient(135deg, ${styles.bgFrom} 0%, ${styles.bgTo} 100%)`,
        }}
      >
        <FileText className="h-8 w-8 md:h-10 md:w-10" style={{ color: styles.iconColor }} />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-center text-center md:text-left">
        <span
          className="mb-1.5 inline-block self-center rounded-lg px-2 py-0.5 text-[10px] font-semibold md:mb-2 md:self-start md:text-xs"
          style={{
            background: styles.textBg,
            color: styles.textColor,
          }}
        >
          {item.category}
        </span>
        <h3 className="mb-1 text-sm font-bold text-[#1E293B] group-hover:text-[#A29BFE] md:text-base">
          {item.title}
        </h3>
        <p className="text-xs text-[#94A3B8] md:text-sm">
          {item.pageCount}페이지 - {item.format}
        </p>
      </div>
    </Link>
  );
}

export default HomeManualCard;
