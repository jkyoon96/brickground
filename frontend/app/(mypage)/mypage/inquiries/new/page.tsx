'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, ChevronLeft, Upload, X, Send } from 'lucide-react';
import { Layout, MypageSidebar } from '@/components/user';
import { Button } from '@/components/ui/Button';

const categories = [
  { value: '', label: '카테고리 선택' },
  { value: 'delivery', label: '배송' },
  { value: 'payment', label: '결제/환불' },
  { value: 'service', label: '서비스 이용' },
  { value: 'points', label: '포인트/쿠폰' },
  { value: 'account', label: '계정/회원' },
  { value: 'etc', label: '기타' },
];

interface FormData {
  category: string;
  title: string;
  content: string;
  files: File[];
}

export default function NewInquiryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    category: '',
    title: '',
    content: '',
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)].slice(0, 5),
      }));
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.content) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    // TODO: API call to submit inquiry
    console.log('Submit inquiry:', formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    router.push('/mypage/inquiries');
  }, [formData, router]);

  const isValid = formData.category && formData.title && formData.content;

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
            <h1 className="flex items-center gap-2 text-2xl font-bold text-[#1E293B]">
              <MessageSquare className="h-7 w-7 text-[#0066FF]" />
              새 문의하기
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              궁금한 점이나 불편사항을 남겨주세요. 빠르게 답변드리겠습니다.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
              <label className="mb-3 block text-sm font-bold text-[#1E293B]">
                문의 유형 <span className="text-[#EF4444]">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition-all focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
              <label className="mb-3 block text-sm font-bold text-[#1E293B]">
                제목 <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="문의 제목을 입력해주세요"
                maxLength={100}
                className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
              />
              <p className="mt-2 text-right text-xs text-[#94A3B8]">
                {formData.title.length}/100
              </p>
            </div>

            {/* Content */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
              <label className="mb-3 block text-sm font-bold text-[#1E293B]">
                문의 내용 <span className="text-[#EF4444]">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="문의하실 내용을 자세히 입력해주세요"
                rows={8}
                maxLength={2000}
                className="w-full resize-none rounded-xl border-2 border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
              />
              <p className="mt-2 text-right text-xs text-[#94A3B8]">
                {formData.content.length}/2000
              </p>
            </div>

            {/* File Upload */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6">
              <label className="mb-3 block text-sm font-bold text-[#1E293B]">
                첨부 파일
              </label>
              <p className="mb-4 text-xs text-[#64748B]">
                최대 5개, 파일당 10MB 이하 (jpg, png, gif, pdf)
              </p>

              {/* File Input */}
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] py-8 transition-all hover:border-[#0066FF] hover:bg-[#F0F7FF]">
                <Upload className="mb-2 h-8 w-8 text-[#94A3B8]" />
                <span className="text-sm font-medium text-[#64748B]">
                  클릭하여 파일 선택
                </span>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={formData.files.length >= 5}
                />
              </label>

              {/* File List */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-[#F1F5F9] px-4 py-2.5"
                    >
                      <span className="truncate text-sm text-[#1E293B]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="ml-2 rounded-full p-1 text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#EF4444]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col justify-center gap-3 pt-4 md:flex-row md:gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-8 py-3.5 text-sm font-bold text-[#64748B] hover:border-[#64748B] md:w-auto"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#3B82F6] px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,102,255,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none md:w-auto"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? '제출 중...' : '문의 등록'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
}
