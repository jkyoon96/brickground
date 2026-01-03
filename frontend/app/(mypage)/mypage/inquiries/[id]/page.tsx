'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MessageSquare,
  ChevronLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Send,
  User,
  Headphones,
} from 'lucide-react';
import { Layout, MypageSidebar } from '@/components/user';
import { Button } from '@/components/ui/Button';

interface InquiryDetail {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'answered' | 'closed';
  content: string;
  files: { name: string; url: string }[];
  createdAt: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  type: 'admin' | 'user';
  content: string;
  createdAt: string;
  authorName: string;
}

// Mock data
const mockInquiry: InquiryDetail = {
  id: '1',
  title: '주문한 상품 배송 관련 문의드립니다',
  category: '배송',
  status: 'answered',
  content: `안녕하세요.

1월 10일에 주문한 레고 테크닉 세트(주문번호: ORD-2025-0110-001)가 아직 도착하지 않았습니다.

배송 조회를 해보니 "배송 준비중"으로 나오는데, 언제쯤 발송될 예정인지 알려주시면 감사하겠습니다.

빠른 확인 부탁드립니다.`,
  files: [
    { name: '주문내역_스크린샷.png', url: '/files/order-screenshot.png' },
  ],
  createdAt: '2025.01.15 14:30',
  replies: [
    {
      id: 'r1',
      type: 'admin',
      content: `안녕하세요, 브릭그라운드 고객센터입니다.

문의해 주신 주문 건(ORD-2025-0110-001) 확인해 보았습니다.

해당 상품은 현재 입고 지연으로 인해 발송이 늦어지고 있습니다. 1월 17일(금) 오후 중으로 발송될 예정이며, 발송 완료 시 SMS로 안내드리겠습니다.

불편을 드려 죄송합니다.
추가 문의사항이 있으시면 언제든지 말씀해 주세요.

감사합니다.`,
      createdAt: '2025.01.16 09:15',
      authorName: '고객센터',
    },
    {
      id: 'r2',
      type: 'user',
      content: '네, 확인했습니다. 감사합니다!',
      createdAt: '2025.01.16 10:30',
      authorName: '김브릭',
    },
  ],
};

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

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In real app, fetch inquiry by params.id
  const inquiry = mockInquiry;
  const StatusIcon = statusConfig[inquiry.status].icon;

  const handleSubmitReply = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    // TODO: API call to submit reply
    console.log('Submit reply:', replyContent);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setReplyContent('');
    setIsSubmitting(false);
  }, [replyContent]);

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
          <div className="mb-6">
            <Link
              href="/mypage/inquiries"
              className="mb-4 inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#0066FF]"
            >
              <ChevronLeft className="h-4 w-4" />
              문의 목록으로
            </Link>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-7 w-7 text-[#0066FF]" />
              <h1 className="text-2xl font-bold text-[#1E293B]">문의 상세</h1>
            </div>
          </div>

          {/* Inquiry Content */}
          <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white">
            {/* Header */}
            <div className="border-b border-[#E2E8F0] p-5 md:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
                  {inquiry.category}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${statusConfig[inquiry.status].className}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig[inquiry.status].label}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-bold text-[#1E293B] md:text-xl">
                {inquiry.title}
              </h2>
              <p className="text-sm text-[#64748B]">{inquiry.createdAt}</p>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#3B82F6]">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1E293B]">김브릭</p>
                  <p className="text-xs text-[#64748B]">작성자</p>
                </div>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#475569]">
                {inquiry.content}
              </div>

              {/* Attachments */}
              {inquiry.files.length > 0 && (
                <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4">
                  <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#64748B]">
                    <Paperclip className="h-4 w-4" />
                    첨부 파일
                  </p>
                  <div className="space-y-2">
                    {inquiry.files.map((file, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg bg-white px-4 py-2.5 text-sm text-[#0066FF] hover:bg-[#F0F7FF]"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Replies */}
          {inquiry.replies.length > 0 && (
            <div className="mb-6 space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E293B]">
                <MessageSquare className="h-5 w-5 text-[#64748B]" />
                답변 및 추가 문의
              </h3>

              {inquiry.replies.map((reply) => (
                <div
                  key={reply.id}
                  className={`rounded-2xl border p-5 md:p-6 ${
                    reply.type === 'admin'
                      ? 'border-[#0066FF]/20 bg-[#F0F7FF]'
                      : 'border-[#E2E8F0] bg-white'
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        reply.type === 'admin'
                          ? 'bg-gradient-to-br from-[#0066FF] to-[#3B82F6]'
                          : 'bg-gradient-to-br from-[#64748B] to-[#94A3B8]'
                      }`}
                    >
                      {reply.type === 'admin' ? (
                        <Headphones className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#1E293B]">
                        {reply.authorName}
                      </p>
                      <p className="text-xs text-[#64748B]">{reply.createdAt}</p>
                    </div>
                    {reply.type === 'admin' && (
                      <span className="ml-auto rounded-lg bg-[#0066FF] px-2.5 py-1 text-xs font-bold text-white">
                        관리자
                      </span>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#475569]">
                    {reply.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          {inquiry.status !== 'closed' && (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
              <h3 className="mb-4 font-bold text-[#1E293B]">추가 문의하기</h3>
              <form onSubmit={handleSubmitReply}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="추가로 문의하실 내용을 입력해주세요"
                  rows={4}
                  className="w-full resize-none rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={!replyContent.trim() || isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-[#0066FF] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0052CC] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? '전송 중...' : '전송'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Closed Notice */}
          {inquiry.status === 'closed' && (
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 text-center md:p-6">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 text-[#64748B]" />
              <p className="font-semibold text-[#64748B]">
                처리 완료된 문의입니다
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                추가 문의가 필요하시면 새로운 문의를 등록해주세요
              </p>
              <Button
                asChild
                className="mt-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC]"
              >
                <Link href="/mypage/inquiries/new">새 문의하기</Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
