'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Sparkles, Eye, Heart, Calendar, MoreHorizontal } from 'lucide-react';
import { Layout, MypageSidebar } from '@/components/user';
import { Button } from '@/components/ui/Button';

interface CreationItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  status: 'published' | 'draft' | 'private';
  viewCount: number;
  likeCount: number;
  createdAt: string;
}

const mockCreations: CreationItem[] = [
  {
    id: '1',
    title: '미래 도시 모델',
    thumbnailUrl: '/images/creation/sample1.jpg',
    status: 'published',
    viewCount: 3450,
    likeCount: 234,
    createdAt: '2025.01.14',
  },
  {
    id: '2',
    title: '판타지 캐릭터',
    thumbnailUrl: '/images/creation/sample2.jpg',
    status: 'published',
    viewCount: 2100,
    likeCount: 178,
    createdAt: '2025.01.11',
  },
  {
    id: '3',
    title: '로봇 디자인 컨셉',
    thumbnailUrl: '/images/creation/sample3.jpg',
    status: 'draft',
    viewCount: 0,
    likeCount: 0,
    createdAt: '2025.01.17',
  },
];

const statusConfig = {
  published: { label: '공개', className: 'bg-[#00CEC9] text-white' },
  draft: { label: '임시저장', className: 'bg-[#F59E0B] text-white' },
  private: { label: '비공개', className: 'bg-[#64748B] text-white' },
};

export default function MypageCreationsPage() {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'private'>('all');

  const filteredItems = filter === 'all'
    ? mockCreations
    : mockCreations.filter(item => item.status === filter);

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        <MypageSidebar
          userName="김브릭"
          userEmail="brick@email.com"
          userLevel="GOLD"
          userPoints={12500}
        />

        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-[#1E293B]">
                <Sparkles className="h-7 w-7 text-[#00CEC9]" />
                내 창작물
              </h1>
              <p className="mt-1 text-sm text-[#64748B]">
                총 {mockCreations.length}개의 작품
              </p>
            </div>
            <Button
              asChild
              className="rounded-xl bg-[#00CEC9] hover:bg-[#00B5B0]"
            >
              <Link href="/creations/new/editor">
                <Plus className="h-5 w-5" />
                새 작품 만들기
              </Link>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex gap-2">
            {[
              { value: 'all', label: '전체' },
              { value: 'published', label: '공개' },
              { value: 'draft', label: '임시저장' },
              { value: 'private', label: '비공개' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as typeof filter)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  filter === tab.value
                    ? 'bg-[#00CEC9] text-white'
                    : 'bg-white text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all hover:-translate-y-1 hover:border-[#00CEC9] hover:shadow-[0_8px_30px_rgba(0,206,201,0.15)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#E0F7FA] to-[#E8F5E9]">
                  <div className="flex h-full items-center justify-center">
                    <Sparkles className="h-16 w-16 text-[#00CEC9]/30" />
                  </div>
                  <span
                    className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-bold ${statusConfig[item.status].className}`}
                  >
                    {statusConfig[item.status].label}
                  </span>
                  <button className="absolute right-3 top-3 rounded-lg bg-white/80 p-1.5 backdrop-blur-sm hover:bg-white">
                    <MoreHorizontal className="h-4 w-4 text-[#64748B]" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/creations/${item.id}`}>
                    <h3 className="mb-2 font-bold text-[#1E293B] hover:text-[#00CEC9]">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {item.viewCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {item.likeCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E2E8F0] py-16">
              <Sparkles className="mb-4 h-16 w-16 text-[#CBD5E1]" />
              <p className="mb-2 font-semibold text-[#64748B]">아직 작품이 없습니다</p>
              <p className="mb-4 text-sm text-[#94A3B8]">첫 번째 창작물을 만들어보세요!</p>
              <Button asChild className="rounded-xl bg-[#00CEC9] hover:bg-[#00B5B0]">
                <Link href="/creations/new/editor">
                  <Plus className="h-5 w-5" />
                  새 작품 만들기
                </Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
