'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  Layout,
  ManualListHero,
  ManualStatsSection,
  ManualFilterBar,
  ManualListCard,
  RecentManuals,
} from '@/components/user';

// Mock data
const mockManuals = [
  {
    id: '1',
    title: '레고 테크닉 람보르기니 시안 FKP 37 조립 설명서',
    productName: '레고 테크닉',
    productThumbGradient: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
    pageCount: 368,
    downloadCount: '12.4K',
    format: 'PDF',
    badge: 'popular' as const,
  },
  {
    id: '2',
    title: '건담 RG 1/144 사자비 스페셜 에디션 조립 가이드',
    productName: '건담 RG',
    productThumbGradient: 'linear-gradient(135deg, #0066FF, #4ECDC4)',
    pageCount: 48,
    downloadCount: '3.2K',
    format: 'PDF',
    badge: 'new' as const,
  },
  {
    id: '3',
    title: '카탄 기본판 + 확장판 게임 규칙서',
    productName: '보드게임',
    productThumbGradient: 'linear-gradient(135deg, #6BCB77, #9B59B6)',
    pageCount: 24,
    downloadCount: '8.7K',
    format: 'PDF',
    badge: null,
  },
  {
    id: '4',
    title: 'BrickGround BrickArt 이용 가이드',
    productName: 'BrickGround',
    productThumbGradient: 'linear-gradient(135deg, #9B59B6, #5C6BC0)',
    pageCount: 32,
    downloadCount: '5.1K',
    format: 'PDF',
    badge: 'programbook' as const,
  },
  {
    id: '5',
    title: '레고 디즈니 캐슬 71040 조립 설명서',
    productName: '레고 디즈니',
    productThumbGradient: 'linear-gradient(135deg, #9B59B6, #FF6B6B)',
    pageCount: 480,
    downloadCount: '9.3K',
    format: 'PDF',
    badge: null,
  },
  {
    id: '6',
    title: '레고 아이디어스 NASA 스페이스 셔틀 조립 설명서',
    productName: '레고 아이디어스',
    productThumbGradient: 'linear-gradient(135deg, #FF6B6B, #FF6B35)',
    pageCount: 212,
    downloadCount: '6.8K',
    format: 'PDF',
    badge: null,
  },
  {
    id: '7',
    title: '스마트 코딩 로봇 큐브로이드 사용 설명서',
    productName: '교육완구',
    productThumbGradient: 'linear-gradient(135deg, #FF6B9D, #FFD93D)',
    pageCount: 56,
    downloadCount: '2.4K',
    format: 'PDF',
    badge: null,
  },
  {
    id: '8',
    title: '레고 시티 경찰서 세트 조립 설명서',
    productName: '레고 시티',
    productThumbGradient: 'linear-gradient(135deg, #4ECDC4, #0066FF)',
    pageCount: 156,
    downloadCount: '4.2K',
    format: 'PDF',
    badge: null,
  },
];

const mockRecentManuals = [
  { id: '1', title: '레고 테크닉 람보르기니', viewedAt: '오늘 14:30' },
  { id: '2', title: '건담 RG 사자비', viewedAt: '오늘 11:20' },
  { id: '3', title: '카탄 게임 규칙서', viewedAt: '어제' },
  { id: '4', title: '레고 디즈니 캐슬', viewedAt: '2일 전' },
];

export default function ManualListPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Handlers
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        router.push(`/manual/search?q=${encodeURIComponent(query)}`);
      }
    },
    [router]
  );

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSelectedSort(sort);
  }, []);

  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  const handleFilterClick = useCallback(() => {
    console.log('Open filter modal');
  }, []);

  const handleView = useCallback((id: string) => {
    console.log('View manual:', id);
  }, []);

  const handleDownload = useCallback((id: string) => {
    console.log('Download manual:', id);
  }, []);

  const handleLoadMore = useCallback(() => {
    console.log('Load more manuals');
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <ManualListHero onSearch={handleSearch} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-3 py-6 md:px-10 md:py-10">
        {/* Stats Section */}
        <ManualStatsSection />

        {/* Filter Bar */}
        <ManualFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedSort={selectedSort}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onFilterClick={handleFilterClick}
        />

        {/* Manual Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {mockManuals.map((manual) => (
            <ManualListCard
              key={manual.id}
              {...manual}
              onView={handleView}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 rounded-[20px] border-2 border-[#E2E8F0] bg-white px-8 py-3 text-sm font-bold text-[#1E293B] transition-all hover:-translate-y-0.5 hover:border-[#9B59B6] hover:bg-[#9B59B6] hover:text-white md:px-12 md:py-4 md:text-base"
          >
            <Plus className="h-5 w-5" />
            더 보기
          </button>
        </div>

        {/* Recent Manuals */}
        <RecentManuals manuals={mockRecentManuals} />
      </main>
    </Layout>
  );
}
