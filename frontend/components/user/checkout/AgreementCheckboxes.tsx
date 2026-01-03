'use client';

import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
  detailUrl?: string;
}

interface AgreementCheckboxesProps {
  agreements: AgreementItem[];
  onAgreementChange: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export function AgreementCheckboxes({
  agreements,
  onAgreementChange,
  onSelectAll,
}: AgreementCheckboxesProps) {
  const isAllChecked = agreements.every((a) => a.checked);
  const requiredChecked = agreements.filter((a) => a.required).every((a) => a.checked);

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      {/* Select All */}
      <Button
        variant="ghost"
        onClick={() => onSelectAll(!isAllChecked)}
        className="mb-4 flex h-auto w-full items-center justify-start gap-3 rounded-xl bg-[#F8FAFC] p-4 transition-colors hover:bg-[#F1F5F9]"
      >
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
            isAllChecked
              ? 'border-[#FF6B35] bg-[#FF6B35]'
              : 'border-[#CBD5E1] bg-white'
          )}
        >
          {isAllChecked && <Check className="h-4 w-4 text-white" />}
        </div>
        <span className="text-base font-bold text-[#1E293B]">전체 동의</span>
      </Button>

      {/* Individual Agreements */}
      <div className="space-y-3">
        {agreements.map((agreement) => (
          <div key={agreement.id} className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onAgreementChange(agreement.id, !agreement.checked)}
              className="flex h-auto items-center justify-start gap-3 p-0"
            >
              <div
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                  agreement.checked
                    ? 'border-[#FF6B35] bg-[#FF6B35]'
                    : 'border-[#CBD5E1] bg-white'
                )}
              >
                {agreement.checked && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-[#1E293B]">
                {agreement.required && (
                  <span className="mr-1 text-[#FF6B35]">[필수]</span>
                )}
                {!agreement.required && (
                  <span className="mr-1 text-[#64748B]">[선택]</span>
                )}
                {agreement.label}
              </span>
            </Button>
            {agreement.detailUrl && (
              <a
                href={agreement.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A3B8] hover:text-[#64748B]"
              >
                <ChevronRight className="h-5 w-5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Warning if required not checked */}
      {!requiredChecked && (
        <p className="mt-4 text-center text-xs text-[#FF6B35]">
          필수 약관에 동의해주세요
        </p>
      )}
    </div>
  );
}

export default AgreementCheckboxes;
