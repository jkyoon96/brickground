'use client';

import { useState } from 'react';
import { Mail, Lock, User, AtSign, Smartphone, UserPlus, Info } from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';
import { SocialLoginButtons } from './SocialLoginButtons';
import { AgreementCheckbox, type Agreement } from './AgreementCheckbox';

const defaultAgreements: Agreement[] = [
  {
    id: 'terms',
    label: '이용약관 동의',
    required: true,
    linkUrl: '/policy/terms',
    linkText: '이용약관',
  },
  {
    id: 'privacy',
    label: '개인정보처리방침 동의',
    required: true,
    linkUrl: '/policy/privacy',
    linkText: '개인정보처리방침',
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신 동의 (선택)',
    required: false,
  },
];

interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  phone: string;
}

interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData, agreements: string[]) => void;
  onKakaoLogin?: () => void;
  onNaverLogin?: () => void;
  onGoogleLogin?: () => void;
  loading?: boolean;
}

export function RegisterForm({
  onSubmit,
  onKakaoLogin,
  onNaverLogin,
  onGoogleLogin,
  loading = false,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    phone: '',
  });
  const [checkedAgreements, setCheckedAgreements] = useState<string[]>([]);

  const allChecked = checkedAgreements.length === defaultAgreements.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleAgreement = (id: string) => {
    setCheckedAgreements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAllAgreements = () => {
    if (allChecked) {
      setCheckedAgreements([]);
    } else {
      setCheckedAgreements(defaultAgreements.map((a) => a.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData, checkedAgreements);
  };

  const requiredAgreementsChecked = defaultAgreements
    .filter((a) => a.required)
    .every((a) => checkedAgreements.includes(a.id));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Social Login */}
      <SocialLoginButtons
        onKakaoClick={onKakaoLogin}
        onNaverClick={onNaverLogin}
        onGoogleClick={onGoogleLogin}
      />

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">또는 이메일로 가입</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">이메일</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          icon={<Mail className="h-5 w-5" />}
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">비밀번호</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="8자 이상, 영문+숫자+특수문자"
          icon={<Lock className="h-5 w-5" />}
          required
        />
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <Info className="h-3.5 w-3.5" />
          영문, 숫자, 특수문자를 조합하여 8자 이상
        </p>
      </div>

      {/* Password Confirm */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">비밀번호 확인</label>
        <Input
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력해주세요"
          icon={<Lock className="h-5 w-5" />}
          required
        />
      </div>

      {/* Name & Nickname */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-semibold text-gray-900">이름</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            icon={<User className="h-5 w-5" />}
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-semibold text-gray-900">닉네임</label>
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="사용할 닉네임"
            icon={<AtSign className="h-5 w-5" />}
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">휴대폰 번호</label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
          icon={<Smartphone className="h-5 w-5" />}
          required
        />
      </div>

      {/* Agreements */}
      <AgreementCheckbox
        agreements={defaultAgreements}
        checkedIds={checkedAgreements}
        onToggle={handleToggleAgreement}
        onToggleAll={handleToggleAllAgreements}
        allChecked={allChecked}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className="h-12 w-full"
        size="lg"
        loading={loading}
        disabled={!requiredAgreementsChecked}
      >
        <UserPlus className="h-5 w-5" />
        회원가입
      </Button>
    </form>
  );
}
