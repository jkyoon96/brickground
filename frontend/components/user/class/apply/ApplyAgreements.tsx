'use client';

import Link from 'next/link';
import { FileCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  linkHref?: string;
  linkText?: string;
}

interface ApplyAgreementsProps {
  agreements: AgreementItem[];
  checkedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}

export function ApplyAgreements({
  agreements,
  checkedIds,
  onToggle,
  onToggleAll,
}: ApplyAgreementsProps) {
  const allChecked = agreements.every((a) => checkedIds.includes(a.id));

  return (
    <section className="mb-5 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:mb-6 md:p-7">
      {/* Title */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-sm font-bold text-[#1E293B] md:mb-6 md:gap-2.5 md:pb-4 md:text-lg">
        <FileCheck className="h-5 w-5 text-[#10B981] md:h-[22px] md:w-[22px]" />
        약관 동의
      </h2>

      {/* Checkbox List */}
      <div className="flex flex-col gap-3">
        {/* All Check */}
        <label className="flex cursor-pointer items-start gap-2.5 md:gap-3">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={onToggleAll}
            className="sr-only"
          />
          <div
            className={cn(
              'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors md:h-[22px] md:w-[22px]',
              allChecked
                ? 'border-[#10B981] bg-[#10B981]'
                : 'border-[#E2E8F0]'
            )}
          >
            {allChecked && <Check className="h-3 w-3 text-white md:h-3.5 md:w-3.5" />}
          </div>
          <span className="text-xs text-[#64748B] md:text-sm">전체 동의</span>
        </label>

        {/* Individual Items */}
        {agreements.map((agreement) => {
          const isChecked = checkedIds.includes(agreement.id);
          return (
            <label
              key={agreement.id}
              className="flex cursor-pointer items-start gap-2.5 md:gap-3"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(agreement.id)}
                className="sr-only"
              />
              <div
                className={cn(
                  'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors md:h-[22px] md:w-[22px]',
                  isChecked
                    ? 'border-[#10B981] bg-[#10B981]'
                    : 'border-[#E2E8F0]'
                )}
              >
                {isChecked && <Check className="h-3 w-3 text-white md:h-3.5 md:w-3.5" />}
              </div>
              <span className="text-xs leading-relaxed text-[#64748B] md:text-sm">
                ({agreement.required ? '필수' : '선택'}){' '}
                {agreement.linkHref ? (
                  <>
                    <Link
                      href={agreement.linkHref}
                      className="text-[#10B981] underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {agreement.linkText || agreement.label}
                    </Link>
                    에 동의합니다.
                  </>
                ) : (
                  agreement.label
                )}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default ApplyAgreements;
