'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Layout, MypageSidebar } from '@/components/user';
import { Button } from '@/components/ui/Button';

interface InquiryItem {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'answered' | 'closed';
  createdAt: string;
  answeredAt?: string;
}

const mockInquiries: InquiryItem[] = [
  {
    id: '1',
    title: '주문한 상품 배송 관련 문의드립니다',
    category: '배송',
    status: 'answered',
    createdAt: '2025.01.15',
    answeredAt: '2025.01.16',
  },
  {
    id: '2',
    title: '결제 취소 요청합니다',
    category: '결제/환불',
    status: 'pending',
    createdAt: '2025.01.17',
  },
  {
    id: '3',
    title: '브릭아트 에디터 사용 방법 문의',
    category: '서비스 이용',
    status: 'answered',
    createdAt: '2025.01.10',
    answeredAt: '2025.01.11',
  },
  {
    id: '4',
    title: '포인트 적립이 안되었습니다',
    category: '포인트/쿠폰',
    status: 'closed',
    createdAt: '2025.01.05',
    answeredAt: '2025.01.06',
  },
];

const statusConfig = {
  pending: {
    label: '답변 대기',
    className: 'bg-[#F59E0B] text-white',
    icon: Clock,
  },
  answered: {
    label: '답변 완료',
    className: 'bg-[#10B981] text-white',
    icon: CheckCircle,
  },
  closed: {
    label: '처리 완료',
    className: 'bg-[#64748B] text-white',
    icon: AlertCircle,
  },
};

export default function MypageInquiriesPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered' | 'closed'>('all');

  const filteredItems = filter === 'all'
    ? mockInquiries
    : mockInquiries.filter(item => item.status === filter);

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
                <MessageSquare className="h-7 w-7 text-[#0066FF]" />
                1:1 문의
              </h1>
              <p className="mt-1 text-sm text-[#64748B]">
                총 {mockInquiries.length}건의 문의
              </p>
            </div>
            <Button
              asChild
              className="rounded-xl bg-[#0066FF] hover:bg-[#0052CC]"
            >
              <Link href="/mypage/inquiries/new">
                <Plus className="h-5 w-5" />
                새 문의하기
              </Link>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex gap-2">
            {[
              { value: 'all', label: '전체' },
              { value: 'pending', label: '답변 대기' },
              { value: 'answered', label: '답변 완료' },
              { value: 'closed', label: '처리 완료' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as typeof filter)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  filter === tab.value
                    ? 'bg-[#0066FF] text-white'
                    : 'bg-white text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Inquiry List */}
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const StatusIcon = statusConfig[item.status].icon;
              return (
                <Link
                  key={item.id}
                  href={`/mypage/inquiries/${item.id}`}
                  className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-5"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
                        {item.category}
                      </span>
                      <span
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${statusConfig[item.status].className}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[item.status].label}
                      </span>
                    </div>
                    <h3 className="mb-2 font-bold text-[#1E293B]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span>문의일: {item.createdAt}</span>
                      {item.answeredAt && (
                        <span>답변일: {item.answeredAt}</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#CBD5E1]" />
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E2E8F0] py-16">
              <MessageSquare className="mb-4 h-16 w-16 text-[#CBD5E1]" />
              <p className="mb-2 font-semibold text-[#64748B]">문의 내역이 없습니다</p>
              <p className="mb-4 text-sm text-[#94A3B8]">궁금한 점이 있으시면 문의해주세요!</p>
              <Button asChild className="rounded-xl bg-[#0066FF] hover:bg-[#0052CC]">
                <Link href="/mypage/inquiries/new">
                  <Plus className="h-5 w-5" />
                  새 문의하기
                </Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
