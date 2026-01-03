'use client';

interface ApplyPageHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ApplyPageHeader({
  title = '클래스 신청',
  subtitle = '수업에 참여할 학생 정보를 입력해 주세요.',
}: ApplyPageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="mb-2 text-xl font-extrabold text-[#1E293B] md:text-[28px]">{title}</h1>
      <p className="text-sm text-[#64748B] md:text-[15px]">{subtitle}</p>
    </div>
  );
}

export default ApplyPageHeader;
