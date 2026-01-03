'use client';

import { ShieldCheck } from 'lucide-react';

export type GuardianRelation = '' | 'parent' | 'grandparent' | 'other';

export interface GuardianData {
  name: string;
  relation: GuardianRelation;
  phone: string;
  email: string;
  emergencyPhone: string;
}

interface GuardianFormProps {
  data: GuardianData;
  onChange: (field: keyof GuardianData, value: string) => void;
}

export function GuardianForm({ data, onChange }: GuardianFormProps) {
  return (
    <section className="mb-5 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:mb-6 md:p-7">
      {/* Title */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-sm font-bold text-[#1E293B] md:mb-6 md:gap-2.5 md:pb-4 md:text-lg">
        <ShieldCheck className="h-5 w-5 text-[#10B981] md:h-[22px] md:w-[22px]" />
        보호자 정보
      </h2>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Row 1: Name + Relation */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
              보호자 성함 <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="보호자 성함"
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
              관계 <span className="text-[#FF6B6B]">*</span>
            </label>
            <select
              value={data.relation}
              onChange={(e) => onChange('relation', e.target.value)}
              className="w-full cursor-pointer rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
            >
              <option value="">선택해주세요</option>
              <option value="parent">부모</option>
              <option value="grandparent">조부모</option>
              <option value="other">기타</option>
            </select>
          </div>
        </div>

        {/* Row 2: Phone + Email */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
              연락처 <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="010-0000-0000"
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
              이메일 <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
            />
          </div>
        </div>

        {/* Emergency Phone */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
            비상 연락처
          </label>
          <input
            type="tel"
            value={data.emergencyPhone}
            onChange={(e) => onChange('emergencyPhone', e.target.value)}
            placeholder="비상시 연락 가능한 다른 번호"
            className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
          />
          <p className="mt-1.5 text-xs text-[#64748B] md:text-[13px]">
            수업 중 연락이 필요한 경우 사용됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GuardianForm;
