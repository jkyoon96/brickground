'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Heart,
  Bookmark,
  Share2,
  Eye,
  ShoppingBag,
  Box,
  Play,
  Edit,
} from 'lucide-react';
import { Layout } from '@/components/user';
import { cn } from '@/lib/utils';

// Mock data
const mockBrickArt = {
  id: '1',
  title: '테크닉 갤러리',
  description:
    '정교한 테크닉 세트들을 전시하는 3D 가상 갤러리입니다. 포르쉐, 람보르기니, 페라리 등 다양한 슈퍼카 모델들과 건축 작품들을 VR 공간에서 감상하고 구매하실 수 있습니다.',
  imageUrl: '/images/brickart/sopoong-1.jpg',
  category: '테크닉',
  badge: 'HOT',
  stats: {
    views: 12500,
    likes: 2300,
    products: 24,
  },
  author: {
    name: '홍길동의 공방',
    avatarUrl: '/images/avatars/author1.jpg',
  },
  tags: ['테크닉', '자동차', '갤러리', 'VR'],
};

export default function BrickArtDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleEnterViewer = useCallback(() => {
    router.push(`/brickarts/${id}/viewer`);
  }, [router, id]);

  const handleEdit = useCallback(() => {
    router.push(`/brickarts/${id}/editor`);
  }, [router, id]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: mockBrickArt.title,
        text: `${mockBrickArt.author.name}의 BrickArt를 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  }, []);

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="mx-auto flex max-w-[1320px] items-center gap-2 px-4 py-4 text-sm text-[#64748B] md:px-6">
        <Link href="/" className="hover:text-[#0066FF]">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/brickarts" className="hover:text-[#0066FF]">
          BrickArt
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-[#1E293B]">{mockBrickArt.title}</span>
      </nav>

      <main className="mx-auto max-w-[1320px] px-4 pb-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left - Image Preview */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F8FAFC]">
              <Image
                src={mockBrickArt.imageUrl}
                alt={mockBrickArt.title}
                fill
                className="object-cover"
              />
              {mockBrickArt.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-[#0066FF] px-3 py-1 text-xs font-bold text-white">
                  {mockBrickArt.badge}
                </span>
              )}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                <Box className="h-4 w-4" />
                3D VR
              </div>
            </div>

            {/* Enter Viewer Button */}
            <button
              onClick={handleEnterViewer}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00CEC9] py-4 text-lg font-bold text-white shadow-lg shadow-[#0066FF]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Play className="h-5 w-5" />
              VR 갤러리 입장하기
            </button>
          </div>

          {/* Right - Info */}
          <div>
            {/* Category & Title */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-[#0066FF]">
                {mockBrickArt.category}
              </span>
              <h1 className="mt-1 text-2xl font-extrabold text-[#1E293B] md:text-3xl">
                {mockBrickArt.title}
              </h1>
            </div>

            {/* Author */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00CEC9]" />
              <div>
                <p className="font-semibold text-[#1E293B]">{mockBrickArt.author.name}</p>
                <p className="text-sm text-[#64748B]">BrickArt Creator</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 flex gap-6">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#94A3B8]" />
                <span className="font-semibold">{mockBrickArt.stats.views.toLocaleString()}</span>
                <span className="text-sm text-[#64748B]">조회</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#FF6B9D]" />
                <span className="font-semibold">{mockBrickArt.stats.likes.toLocaleString()}</span>
                <span className="text-sm text-[#64748B]">좋아요</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#6BCB77]" />
                <span className="font-semibold">{mockBrickArt.stats.products}</span>
                <span className="text-sm text-[#64748B]">상품</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-2 font-bold text-[#1E293B]">소개</h3>
              <p className="leading-relaxed text-[#64748B]">{mockBrickArt.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="mb-2 font-bold text-[#1E293B]">태그</h3>
              <div className="flex flex-wrap gap-2">
                {mockBrickArt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F1F5F9] px-3 py-1.5 text-sm font-medium text-[#64748B]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 font-semibold transition-all',
                  isLiked
                    ? 'border-[#FF6B9D] bg-[#FF6B9D]/10 text-[#FF6B9D]'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FF6B9D] hover:text-[#FF6B9D]'
                )}
              >
                <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
                좋아요
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 font-semibold transition-all',
                  isBookmarked
                    ? 'border-[#FFD93D] bg-[#FFD93D]/10 text-[#FF9F43]'
                    : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FFD93D] hover:text-[#FF9F43]'
                )}
              >
                <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
                저장
              </button>
              <button
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#E2E8F0] py-3 font-semibold text-[#64748B] transition-all hover:border-[#0066FF] hover:text-[#0066FF]"
              >
                <Share2 className="h-5 w-5" />
                공유
              </button>
            </div>

            {/* Edit Button (for owner) */}
            <button
              onClick={handleEdit}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#E2E8F0] py-3 font-semibold text-[#64748B] transition-all hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
            >
              <Edit className="h-5 w-5" />
              BrickArt 편집하기
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
