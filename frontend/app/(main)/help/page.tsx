'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, CreditCard, RefreshCcw } from 'lucide-react';
import {
  Layout,
  HelpCenterHero,
  HelpCategoryGrid,
  HelpNoticeCard,
  HelpFaqCard,
  HelpContactSection,
  HelpPopularFaq,
} from '@/components/user';

// Mock data
const mockNotices = [
  {
    id: '1',
    title: '[안내] 설 연휴 배송 및 고객센터 운영 안내',
    date: '01.15',
    badge: 'important' as const,
  },
  {
    id: '2',
    title: 'BrickArt 2.0 업데이트 안내',
    date: '01.10',
    badge: 'update' as const,
  },
  {
    id: '3',
    title: '신규 회원 가입 혜택 안내',
    date: '01.05',
    badge: 'event' as const,
  },
  {
    id: '4',
    title: 'DotArt 뮤직 모드 기능 추가',
    date: '01.02',
    badge: 'update' as const,
  },
];

const mockFaqs = [
  {
    id: '1',
    question: '배송은 얼마나 걸리나요?',
    answer:
      '일반 배송은 결제 완료 후 2-3일 이내 도착합니다. 도서산간 지역은 1-2일 추가 소요될 수 있습니다.',
  },
  {
    id: '2',
    question: '교환/반품은 어떻게 하나요?',
    answer: '마이페이지 > 주문내역에서 교환/반품 신청이 가능합니다.',
  },
  {
    id: '3',
    question: '무료배송 조건이 어떻게 되나요?',
    answer: '5만원 이상 구매 시 무료배송입니다.',
  },
  {
    id: '4',
    question: 'BrickArt는 어떻게 이용하나요?',
    answer:
      'BrickArt 메뉴에서 원하는 공간을 선택하면 3D로 창작물을 감상할 수 있습니다.',
  },
];

const mockPopularFaqs = [
  {
    id: '1',
    category: '배송',
    categoryIcon: Truck,
    question: '배송 조회는 어디서 할 수 있나요?',
    views: '12,345회',
    href: '/help/faq?faq=1',
  },
  {
    id: '2',
    category: '결제',
    categoryIcon: CreditCard,
    question: '결제 수단은 어떤 것들이 있나요?',
    views: '9,876회',
    href: '/help/faq?faq=3',
  },
  {
    id: '3',
    category: '교환/반품',
    categoryIcon: RefreshCcw,
    question: '교환/반품 기간은 얼마인가요?',
    views: '8,543회',
    href: '/help/faq?faq=2',
  },
];

export default function HelpCenterPage() {
  const router = useRouter();

  // Handlers
  const handleSearch = useCallback(
    (query: string) => {
      router.push(`/help/search?q=${encodeURIComponent(query)}`);
    },
    [router]
  );

  const handleNoticeClick = useCallback(
    (id: string) => {
      router.push(`/help/notice/${id}`);
    },
    [router]
  );

  const handleInquiry = useCallback(() => {
    router.push('/mypage/inquiries/new');
  }, [router]);

  return (
    <Layout>
      {/* Hero Section */}
      <HelpCenterHero onSearch={handleSearch} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-3 py-6 md:px-10 md:py-10">
        {/* Category Grid */}
        <HelpCategoryGrid />

        {/* Notices & FAQ Grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:mb-12 md:grid-cols-2 md:gap-8">
          <HelpNoticeCard
            notices={mockNotices}
            onNoticeClick={handleNoticeClick}
          />
          <HelpFaqCard faqs={mockFaqs} defaultOpenId="1" />
        </div>

        {/* Contact Section */}
        <HelpContactSection onInquiry={handleInquiry} />

        {/* Popular FAQ */}
        <HelpPopularFaq faqs={mockPopularFaqs} />
      </main>
    </Layout>
  );
}
