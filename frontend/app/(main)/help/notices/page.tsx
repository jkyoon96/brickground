'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Megaphone, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Layout } from '@/components/user';
import { cn } from '@/lib/utils';

type NoticeBadgeType = 'important' | 'update' | 'event' | 'normal';

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  badge: NoticeBadgeType;
  views: number;
}

const mockNotices: NoticeItem[] = [
  {
    id: '1',
    title: '[안내] 설 연휴 배송 및 고객센터 운영 안내',
    date: '2025.01.15',
    badge: 'important',
    views: 1234,
  },
  {
    id: '2',
    title: 'BrickArt 2.0 업데이트 안내',
    date: '2025.01.10',
    badge: 'update',
    views: 892,
  },
  {
    id: '3',
    title: '신규 회원 가입 혜택 안내',
    date: '2025.01.05',
    badge: 'event',
    views: 756,
  },
  {
    id: '4',
    title: 'DotArt 뮤직 모드 기능 추가',
    date: '2025.01.02',
    badge: 'update',
    views: 643,
  },
  {
    id: '5',
    title: '2025년 새해 인사 및 서비스 업데이트 예정 안내',
    date: '2025.01.01',
    badge: 'normal',
    views: 521,
  },
  {
    id: '6',
    title: '개인정보 처리방침 개정 안내',
    date: '2024.12.28',
    badge: 'important',
    views: 432,
  },
  {
    id: '7',
    title: '크리스마스 이벤트 당첨자 발표',
    date: '2024.12.26',
    badge: 'event',
    views: 987,
  },
  {
    id: '8',
    title: '연말 배송 마감 안내',
    date: '2024.12.20',
    badge: 'important',
    views: 654,
  },
];

const badgeConfig: Record<NoticeBadgeType, { label: string; className: string }> = {
  important: {
    label: '중요',
    className: 'bg-[#FF6B6B] text-white',
  },
  update: {
    label: '업데이트',
    className: 'bg-[#00CEC9] text-white',
  },
  event: {
    label: '이벤트',
    className: 'bg-[#FFD93D] text-[#1E293B]',
  },
  normal: {
    label: '일반',
    className: 'bg-[#E2E8F0] text-[#64748B]',
  },
};

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  }, [searchQuery]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E0F7FA] via-[#E8F5E9] to-[#FFF8E1] py-10 md:py-16">
        <div className="mx-auto max-w-[1320px] px-4 text-center md:px-10">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/80 p-4 shadow-lg backdrop-blur-sm">
            <Megaphone className="h-10 w-10 text-[#00CEC9]" />
          </div>
          <h1 className="mb-3 text-2xl font-extrabold text-[#1E293B] md:text-4xl">
            공지사항
          </h1>
          <p className="text-sm text-[#64748B] md:text-base">
            브릭그라운드의 새로운 소식과 업데이트를 확인하세요
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-8 md:px-10 md:py-12">
        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#64748B]">
            총 <strong className="text-[#00CEC9]">{mockNotices.length}</strong>개의 공지사항
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex items-center gap-2 rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-2.5">
              <Search className="h-4 w-4 text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="공지사항 검색..."
                className="w-48 border-none bg-transparent text-sm outline-none placeholder:text-[#94A3B8]"
              />
            </div>
          </form>
        </div>

        {/* Notice List */}
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
          {mockNotices.map((notice, index) => {
            const badge = badgeConfig[notice.badge];
            return (
              <Link
                key={notice.id}
                href={`/help/notice/${notice.id}`}
                className={cn(
                  'flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-[#F8FAFC] md:flex-nowrap md:gap-4 md:p-5',
                  index !== mockNotices.length - 1 && 'border-b border-[#E2E8F0]'
                )}
              >
                {/* Badge */}
                <span
                  className={cn(
                    'flex-shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold',
                    badge.className
                  )}
                >
                  {badge.label}
                </span>

                {/* Title */}
                <span className="order-3 min-w-full flex-1 text-sm font-semibold text-[#1E293B] md:order-none md:min-w-0 md:text-[15px]">
                  {notice.title}
                </span>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span>{notice.date}</span>
                  <span className="hidden md:inline">조회 {notice.views.toLocaleString()}</span>
                </div>

                <ChevronRight className="hidden h-4 w-4 text-[#CBD5E1] md:block" />
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] transition-colors hover:border-[#00CEC9] hover:text-[#00CEC9] disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
                currentPage === page
                  ? 'bg-[#00CEC9] text-white'
                  : 'border border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#00CEC9] hover:text-[#00CEC9]'
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] transition-colors hover:border-[#00CEC9] hover:text-[#00CEC9] disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Back to Help */}
        <div className="mt-8 text-center">
          <Link
            href="/help"
            className="inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#00CEC9]"
          >
            <ChevronLeft className="h-4 w-4" />
            도움말 센터로 돌아가기
          </Link>
        </div>
      </main>
    </Layout>
  );
}
