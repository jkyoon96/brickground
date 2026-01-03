'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Pencil,
  PlayCircle,
  Grid3x3,
  Flame,
  Clock,
  Box,
  Music,
  School,
  Search,
  Grid2X2,
  LayoutGrid,
  Plus,
} from 'lucide-react';
import { Layout, DotArtCard } from '@/components/user';
import { cn } from '@/lib/utils';

// Mock data
const mockDotArts = [
  {
    id: '1',
    title: '귀여운 고양이',
    image: '/images/dotart/dotart-1.jpg',
    author: { name: '픽셀마스터' },
    likes: 2847,
    comments: 156,
    views: 12500,
    has3D: true,
    badges: ['hot'] as const,
    isLiked: true,
  },
  {
    id: '2',
    title: '클래식 게임 캐릭터',
    image: '/images/dotart/dotart-2.jpg',
    author: { name: '레트로게이머' },
    likes: 1923,
    comments: 89,
    views: 8200,
    has3D: true,
    badges: [] as const,
    isLiked: true,
  },
  {
    id: '3',
    title: '봄꽃 피는 날',
    image: '/images/dotart/dotart-3.jpg',
    author: { name: '아트러버' },
    likes: 567,
    comments: 34,
    views: 2100,
    has3D: false,
    badges: ['new'] as const,
    isLiked: false,
  },
  {
    id: '4',
    title: '푸른 바다 위 요트',
    image: '/images/dotart/dotart-4.jpg',
    author: { name: '바다소년' },
    likes: 1456,
    comments: 72,
    views: 5800,
    has3D: true,
    badges: [] as const,
    isLiked: true,
  },
  {
    id: '5',
    title: '우주 탐험 로켓',
    image: '/images/dotart/dotart-5.jpg',
    author: { name: '스페이스덕' },
    likes: 892,
    comments: 45,
    views: 3400,
    has3D: false,
    badges: [] as const,
    isLiked: false,
  },
  {
    id: '6',
    title: '중세 성',
    image: '/images/dotart/dotart-6.jpg',
    author: { name: '판타지월드' },
    likes: 2134,
    comments: 98,
    views: 9700,
    has3D: true,
    badges: [] as const,
    isLiked: true,
  },
  {
    id: '7',
    title: '노을 지는 풍경',
    image: '/images/dotart/dotart-7.jpg',
    author: { name: '햇살가득' },
    likes: 678,
    comments: 28,
    views: 2800,
    has3D: false,
    badges: [] as const,
    isLiked: false,
  },
  {
    id: '8',
    title: '벚꽃 멜로디',
    image: '/images/dotart/dotart-8.jpg',
    author: { name: '멜로디메이커' },
    likes: 1234,
    comments: 56,
    views: 4500,
    has3D: false,
    hasMusic: true,
    badges: ['music'] as const,
    isLiked: true,
  },
];

const categories = [
  { id: 'all', name: '전체', icon: Grid3x3 },
  { id: 'hot', name: '인기', icon: Flame },
  { id: 'new', name: '최신', icon: Clock },
  { id: '3d', name: '3D', icon: Box },
  { id: 'music', name: '음악', icon: Music },
  { id: 'school', name: '학교', icon: School },
];

const sortOptions = [
  { value: 'likes', label: '좋아요순' },
  { value: 'latest', label: '최신순' },
  { value: 'views', label: '조회순' },
  { value: 'comments', label: '댓글순' },
];

export default function DotArtListPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('likes');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState<Set<string>>(
    new Set(mockDotArts.filter((art) => art.isLiked).map((art) => art.id))
  );

  const handleLikeToggle = (id: string) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#9B5DE5] to-[#F15BB5] px-4 py-12 text-center text-white md:px-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold">
            <Sparkles className="h-[18px] w-[18px]" />
            픽셀 아트 창작 플랫폼
          </div>
          <h1 className="mb-4 text-3xl font-extrabold md:text-5xl">DotArt 갤러리</h1>
          <p className="mb-8 text-base opacity-90 md:text-xl">
            나만의 픽셀 아트를 만들고, 3D로 변환하고, 전 세계와 공유하세요!
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row md:gap-4">
            <Link
              href="/dotarts/new/editor"
              className="flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#9B5DE5] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 md:px-8 md:py-4 md:text-base"
            >
              <Pencil className="h-5 w-5 md:h-[22px] md:w-[22px]" />
              새 작품 만들기
            </Link>
            <button
              className="flex items-center justify-center gap-2.5 rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-base"
            >
              <PlayCircle className="h-5 w-5 md:h-[22px] md:w-[22px]" />
              튜토리얼 보기
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-8 md:px-10 md:py-10">
        {/* Filter Section */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Categories & Search */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      'flex flex-shrink-0 items-center gap-1.5 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors',
                      selectedCategory === cat.id
                        ? 'border-[#9B5DE5] bg-[#9B5DE5]/5 text-[#9B5DE5]'
                        : 'border-transparent bg-white text-gray-500 hover:border-[#9B5DE5] hover:text-[#9B5DE5]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="작품 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none bg-transparent text-sm outline-none md:w-52"
              />
            </div>
          </div>

          {/* Right: Sort & View */}
          <div className="flex items-center justify-between gap-3 md:justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#9B5DE5]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="flex gap-1 rounded-xl bg-white p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                  viewMode === 'grid'
                    ? 'bg-gradient-to-br from-[#9B5DE5] to-[#F15BB5] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                )}
              >
                <Grid2X2 className="h-[18px] w-[18px]" />
              </button>
              <button
                onClick={() => setViewMode('large')}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                  viewMode === 'large'
                    ? 'bg-gradient-to-br from-[#9B5DE5] to-[#F15BB5] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                )}
              >
                <LayoutGrid className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Art Grid */}
        <div
          className={cn(
            'grid gap-4 md:gap-6',
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {mockDotArts.map((art) => (
            <DotArtCard
              key={art.id}
              id={art.id}
              title={art.title}
              image={art.image}
              author={art.author}
              likes={art.likes}
              comments={art.comments}
              views={art.views}
              has3D={art.has3D}
              hasMusic={art.hasMusic}
              badges={art.badges as any}
              isLiked={likedItems.has(art.id)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 rounded-[20px] border-2 border-gray-200 bg-white px-12 py-4 text-base font-bold text-gray-900 transition-all hover:border-[#9B5DE5] hover:bg-gradient-to-br hover:from-[#9B5DE5] hover:to-[#F15BB5] hover:text-white">
            <Plus className="h-5 w-5" />
            더 보기
          </button>
        </div>
      </main>

      {/* Create FAB */}
      <Link
        href="/dotarts/new/editor"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#9B5DE5] to-[#F15BB5] px-6 py-4 text-base font-bold text-white shadow-[0_4px_20px_rgba(155,93,229,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(155,93,229,0.5)] md:bottom-8 md:right-8"
      >
        <Plus className="h-[22px] w-[22px]" />
        <span className="hidden md:inline">새 작품 만들기</span>
      </Link>
    </Layout>
  );
}
