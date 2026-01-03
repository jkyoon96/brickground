'use client';

import Link from 'next/link';

export interface Agreement {
  id: string;
  label: string;
  required: boolean;
  linkUrl?: string;
  linkText?: string;
}

interface AgreementCheckboxProps {
  agreements: Agreement[];
  checkedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  allChecked: boolean;
}

export function AgreementCheckbox({
  agreements,
  checkedIds,
  onToggle,
  onToggleAll,
  allChecked,
}: AgreementCheckboxProps) {
  return (
    <div className="space-y-3 rounded-xl bg-gray-50 p-4">
      {/* All checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="agree-all"
          checked={allChecked}
          onChange={onToggleAll}
          className="h-5 w-5 cursor-pointer accent-pixar-blue"
        />
        <label htmlFor="agree-all" className="cursor-pointer text-sm font-bold text-gray-900">
          전체 동의
        </label>
      </div>

      {/* Individual checkboxes */}
      {agreements.map((agreement) => (
        <div key={agreement.id} className="flex items-center gap-3">
          <input
            type="checkbox"
            id={agreement.id}
            checked={checkedIds.includes(agreement.id)}
            onChange={() => onToggle(agreement.id)}
            className="h-5 w-5 cursor-pointer accent-pixar-blue"
          />
          <label htmlFor={agreement.id} className="cursor-pointer text-sm text-gray-900">
            {agreement.linkUrl ? (
              <>
                <Link
                  href={agreement.linkUrl}
                  className="text-pixar-blue hover:underline"
                  target="_blank"
                >
                  {agreement.linkText || agreement.label}
                </Link>
                {agreement.linkText && ` ${agreement.label.replace(agreement.linkText, '')}`}
              </>
            ) : (
              agreement.label
            )}
            {agreement.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        </div>
      ))}
    </div>
  );
}
