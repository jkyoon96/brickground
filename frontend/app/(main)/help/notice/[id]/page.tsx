'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Megaphone, ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import { Layout } from '@/components/user';
import { cn } from '@/lib/utils';

type NoticeBadgeType = 'important' | 'update' | 'event' | 'normal';

interface NoticeDetail {
  id: string;
  title: string;
  date: string;
  badge: NoticeBadgeType;
  views: number;
  content: string;
}

// Mock data
const mockNoticeDetail: NoticeDetail = {
  id: '1',
  title: '[안내] 설 연휴 배송 및 고객센터 운영 안내',
  date: '2025.01.15',
  badge: 'important',
  views: 1234,
  content: `
    <p>안녕하세요, 브릭그라운드입니다.</p>
    <p>설 연휴 기간 배송 및 고객센터 운영에 대해 안내드립니다.</p>

    <h3>배송 안내</h3>
    <ul>
      <li><strong>연휴 전 마지막 출고일:</strong> 2025년 1월 24일(금)</li>
      <li><strong>연휴 기간:</strong> 2025년 1월 25일(토) ~ 1월 30일(목)</li>
      <li><strong>배송 재개일:</strong> 2025년 1월 31일(금)</li>
    </ul>
    <p>※ 1월 24일 오후 2시 이전 주문건까지 연휴 전 출고됩니다.</p>

    <h3>고객센터 운영 안내</h3>
    <ul>
      <li><strong>휴무 기간:</strong> 2025년 1월 27일(월) ~ 1월 30일(목)</li>
      <li><strong>운영 재개일:</strong> 2025년 1월 31일(금) 오전 9시</li>
    </ul>
    <p>휴무 기간 중 접수된 문의는 운영 재개 후 순차적으로 답변드리겠습니다.</p>

    <h3>이용에 참고해주세요</h3>
    <ul>
      <li>연휴 기간 중에도 주문은 정상적으로 가능합니다.</li>
      <li>BrickArt, DotArt 등 창작 서비스는 정상 이용 가능합니다.</li>
      <li>긴급 문의는 1:1 문의를 이용해주세요.</li>
    </ul>

    <p>설 연휴 기간 가족과 함께 행복한 시간 보내시길 바랍니다.</p>
    <p>감사합니다.</p>
  `,
};

const mockPrevNext = {
  prev: { id: '2', title: 'BrickArt 2.0 업데이트 안내' },
  next: null,
};

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

export default function NoticeDetailPage() {
  const params = useParams();

  // In real app, fetch notice by params.id
  const notice = mockNoticeDetail;
  const badge = badgeConfig[notice.badge];

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-6 md:py-8">
        <div className="mx-auto max-w-[1320px] px-4 md:px-10">
          <Link
            href="/help/notices"
            className="mb-4 inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#00CEC9]"
          >
            <ChevronLeft className="h-4 w-4" />
            공지사항 목록
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="h-6 w-6 text-[#00CEC9]" />
            <span
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-bold',
                badge.className
              )}
            >
              {badge.label}
            </span>
          </div>

          <h1 className="mb-4 text-xl font-bold text-[#1E293B] md:text-2xl">
            {notice.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {notice.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              조회 {notice.views.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-8 md:px-10 md:py-12">
        <article className="rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-10">
          <div
            className="prose prose-sm max-w-none md:prose-base
              prose-headings:mt-6 prose-headings:mb-3 prose-headings:font-bold prose-headings:text-[#1E293B]
              prose-h3:text-lg
              prose-p:text-[#475569] prose-p:leading-relaxed prose-p:my-3
              prose-ul:my-3 prose-ul:pl-5
              prose-li:text-[#475569] prose-li:my-1
              prose-strong:text-[#1E293B]"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        </article>

        {/* Prev / Next Navigation */}
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {mockPrevNext.prev ? (
            <Link
              href={`/help/notice/${mockPrevNext.prev.id}`}
              className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 transition-colors hover:border-[#00CEC9] hover:bg-[#F8FAFC]"
            >
              <ChevronLeft className="h-5 w-5 text-[#64748B]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748B]">이전 글</p>
                <p className="truncate text-sm font-semibold text-[#1E293B]">
                  {mockPrevNext.prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {mockPrevNext.next ? (
            <Link
              href={`/help/notice/${mockPrevNext.next.id}`}
              className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 text-right transition-colors hover:border-[#00CEC9] hover:bg-[#F8FAFC]"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748B]">다음 글</p>
                <p className="truncate text-sm font-semibold text-[#1E293B]">
                  {mockPrevNext.next.title}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#64748B]" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to List */}
        <div className="mt-8 text-center">
          <Link
            href="/help/notices"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#00CEC9] px-8 py-3 text-sm font-bold text-[#00CEC9] transition-colors hover:bg-[#00CEC9] hover:text-white"
          >
            목록으로
          </Link>
        </div>
      </main>
    </Layout>
  );
}
