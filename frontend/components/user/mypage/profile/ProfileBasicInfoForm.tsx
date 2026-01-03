'use client';

import { User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProfileBasicInfo {
  email: string;
  name: string;
  nickname: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  birthDate: string;
}

interface ProfileBasicInfoFormProps {
  data: ProfileBasicInfo;
  onChange: (data: ProfileBasicInfo) => void;
  onPhoneVerify?: () => void;
  onAddressSearch?: () => void;
}

export function ProfileBasicInfoForm({
  data,
  onChange,
  onPhoneVerify,
  onAddressSearch,
}: ProfileBasicInfoFormProps) {
  const handleChange = (field: keyof ProfileBasicInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      {/* Header */}
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1E293B]">
        <User className="h-5 w-5 text-[#0066FF]" />
        기본 정보
      </h3>

      {/* Email & Name */}
      <div className="mb-6 border-b border-[#E2E8F0] pb-6">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1E293B]">
              이메일
            </label>
            <input
              type="email"
              value={data.email}
              disabled
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#94A3B8] md:px-4 md:py-3.5 md:text-[15px]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1E293B]">
              이름 <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1E293B]">
              닉네임 <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="text"
              value={data.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1E293B]">
              연락처 <span className="text-[#FF6B6B]">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="min-w-0 flex-1 rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={onPhoneVerify}
                className="shrink-0 whitespace-nowrap rounded-xl border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-transparent"
              >
                인증하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6 border-b border-[#E2E8F0] pb-6">
        <label className="mb-2 block text-sm font-bold text-[#1E293B]">
          배송지 주소
        </label>
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            value={data.zipCode}
            readOnly
            placeholder="우편번호"
            className="min-w-0 flex-1 rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-sm md:px-4 md:py-3.5 md:text-[15px]"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onAddressSearch}
            className="shrink-0 whitespace-nowrap rounded-xl border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-transparent"
          >
            주소 검색
          </Button>
        </div>
        <input
          type="text"
          value={data.address}
          readOnly
          className="mb-2 w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-sm md:px-4 md:py-3.5 md:text-[15px]"
        />
        <input
          type="text"
          value={data.addressDetail}
          onChange={(e) => handleChange('addressDetail', e.target.value)}
          placeholder="상세 주소"
          className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
        />
      </div>

      {/* Birth Date */}
      <div>
        <label className="mb-2 block text-sm font-bold text-[#1E293B]">
          생년월일
        </label>
        <input
          type="date"
          value={data.birthDate}
          onChange={(e) => handleChange('birthDate', e.target.value)}
          className="w-full max-w-[300px] rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#FF6B9D] focus:shadow-[0_0_0_4px_rgba(255,107,157,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
        />
      </div>
    </div>
  );
}

export default ProfileBasicInfoForm;
