'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Layout,
  FaqPageHeader,
  FaqSidebar,
  FaqListItem,
  FaqPagination,
} from '@/components/user';

// Mock data
const mockFaqs = [
  {
    id: '1',
    category: '배송',
    question: '배송은 얼마나 걸리나요?',
    answer: `일반 배송은 결제 완료 후 <strong>영업일 기준 2-3일</strong> 이내에 도착합니다.<br><br>
      - 오늘출발 상품: 오후 2시 이전 주문 시 당일 출고<br>
      - 일반 배송: 영업일 기준 2-3일 소요<br>
      - 도서산간 지역: 1-2일 추가 소요<br><br>
      배송 현황은 마이페이지 > 주문내역에서 실시간으로 확인하실 수 있습니다.`,
    views: '12,345',
    helpfulYes: 234,
    helpfulNo: 12,
  },
  {
    id: '2',
    category: '교환/반품',
    question: '교환/반품은 어떻게 하나요?',
    answer: '마이페이지 > 주문내역에서 교환/반품 신청이 가능합니다.',
    views: '9,876',
    helpfulYes: 189,
    helpfulNo: 8,
  },
  {
    id: '3',
    category: '주문/결제',
    question: '무료배송 조건이 어떻게 되나요?',
    answer: '5만원 이상 구매 시 무료배송입니다.',
    views: '8,543',
    helpfulYes: 156,
    helpfulNo: 5,
  },
  {
    id: '4',
    category: 'BrickArt',
    question: 'BrickArt는 어떻게 이용하나요?',
    answer:
      'BrickArt 메뉴에서 원하는 공간을 선택하면 3D로 창작물을 감상할 수 있습니다.',
    views: '7,234',
    helpfulYes: 142,
    helpfulNo: 7,
  },
  {
    id: '5',
    category: '회원/계정',
    question: '비밀번호를 잊어버렸어요. 어떻게 하나요?',
    answer:
      '로그인 페이지에서 "비밀번호 찾기"를 클릭하여 재설정할 수 있습니다.',
    views: '6,892',
    helpfulYes: 128,
    helpfulNo: 4,
  },
  {
    id: '6',
    category: '주문/결제',
    question: '쿠폰은 어떻게 사용하나요?',
    answer:
      '결제 페이지에서 쿠폰 적용 영역에 쿠폰 코드를 입력하거나 보유 쿠폰을 선택하세요.',
    views: '5,678',
    helpfulYes: 98,
    helpfulNo: 3,
  },
];

export default function FaqPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const faqFromUrl = searchParams.get('faq');

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedSort, setSelectedSort] = useState<'latest' | 'popular'>(
    'latest'
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqFromUrl || '1');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category and faq from URL
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    if (faqFromUrl) {
      setOpenFaqId(faqFromUrl);
      // Scroll to FAQ section
      setTimeout(() => {
        const element = document.getElementById(`faq-${faqFromUrl}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [faqFromUrl]);

  const totalCount = 128;
  const totalPages = 5;

  // Handlers
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    // Update URL
    if (categoryId === 'all') {
      router.push('/help/faq');
    } else {
      router.push(`/help/faq?category=${categoryId}`);
    }
  }, [router]);

  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/help/faq/search?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  const handleInquiry = useCallback(() => {
    router.push('/mypage/inquiries/new');
  }, [router]);

  const handleToggleFaq = useCallback((id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  }, []);

  const handleHelpful = useCallback((id: string, helpful: boolean) => {
    console.log('Helpful feedback:', id, helpful);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <FaqPageHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] md:gap-8">
          {/* Sidebar */}
          <FaqSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
            onInquiry={handleInquiry}
          />

          {/* FAQ Content */}
          <div className="flex flex-col gap-5 md:gap-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-[#64748B]">
                총 <strong className="text-[#00CEC9]">{totalCount}</strong>개의
                FAQ
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSort('latest')}
                  className={cn(
                    'rounded-[20px] border-2 px-4 py-2 text-[13px] font-semibold transition-colors',
                    selectedSort === 'latest'
                      ? 'border-[#00CEC9] text-[#00CEC9]'
                      : 'border-[#E2E8F0] bg-white'
                  )}
                >
                  최신순
                </button>
                <button
                  onClick={() => setSelectedSort('popular')}
                  className={cn(
                    'rounded-[20px] border-2 px-4 py-2 text-[13px] font-semibold transition-colors',
                    selectedSort === 'popular'
                      ? 'border-[#00CEC9] text-[#00CEC9]'
                      : 'border-[#E2E8F0] bg-white'
                  )}
                >
                  인기순
                </button>
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex flex-col gap-3">
              {mockFaqs.map((faq) => (
                <FaqListItem
                  key={faq.id}
                  {...faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={handleToggleFaq}
                  onHelpful={handleHelpful}
                />
              ))}
            </div>

            {/* Pagination */}
            <FaqPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
