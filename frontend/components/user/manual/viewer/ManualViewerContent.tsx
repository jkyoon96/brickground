'use client';

import { Box, Image } from 'lucide-react';

interface Part {
  name: string;
  quantity: number;
}

interface Step {
  number: number;
  title: string;
  parts: Part[];
}

interface ManualViewerContentProps {
  stepLabel?: string;
  steps?: Step[];
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  zoom?: number;
}

export function ManualViewerContent({
  stepLabel = 'STEP 1',
  steps = [],
  currentPage,
  totalPages,
  progressPercent,
  zoom = 100,
}: ManualViewerContentProps) {
  return (
    <div className="flex flex-1 items-center justify-center overflow-auto bg-[#1E1E2E] p-4 md:p-6">
      {/* PDF Page */}
      <div
        className="flex w-full max-w-[680px] flex-col rounded-[20px] bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)] md:p-12"
        style={{
          aspectRatio: '0.707',
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Page Header */}
        <div className="mb-6 flex items-center gap-3 md:mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] md:h-12 md:w-12">
            <Box className="h-5 w-5 text-white md:h-6 md:w-6" />
          </div>
          <span className="text-xl font-extrabold text-[#1E293B] md:text-2xl">
            {stepLabel}
          </span>
        </div>

        {/* Steps */}
        <div className="flex flex-1 flex-col gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl bg-[#F8FAFC] p-4 md:p-6"
            >
              {/* Step Header */}
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9B59B6] text-sm font-extrabold text-white md:h-9 md:w-9 md:text-base">
                  {step.number}
                </div>
                <span className="text-base font-bold text-[#1E293B] md:text-lg">
                  {step.title}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex gap-4 md:gap-6">
                {/* Step Image Placeholder */}
                <div className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5]" style={{ aspectRatio: '4/3' }}>
                  <Image className="h-10 w-10 text-[#64748B] md:h-12 md:w-12" />
                </div>

                {/* Parts List */}
                <div className="flex w-[120px] flex-col gap-2 md:w-[140px]">
                  {step.parts.map((part, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg bg-white p-2"
                    >
                      <div className="h-6 w-6 flex-shrink-0 rounded-md bg-[#FFD93D] md:h-7 md:w-7" />
                      <div className="text-[10px] text-[#64748B] md:text-[11px]">
                        <strong className="block text-[11px] text-[#1E293B] md:text-xs">
                          {part.quantity}x
                        </strong>
                        {part.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-[#E2E8F0] pt-4 md:pt-6">
          <span className="text-xs text-[#64748B] md:text-sm">
            {currentPage} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-sm bg-[#E2E8F0] md:w-[120px]">
              <div
                className="h-full rounded-sm bg-[#9B59B6]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#64748B] md:text-xs">
              {progressPercent}% 완료
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualViewerContent;
