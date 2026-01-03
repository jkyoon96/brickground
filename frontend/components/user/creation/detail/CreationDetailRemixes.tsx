'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitBranch, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RemixItem {
  id: string;
  imageUrl?: string;
  authorName: string;
}

interface CreationDetailRemixesProps {
  remixes: RemixItem[];
  totalCount: number;
  originalCreationId: string;
  onRemix: () => void;
}

export function CreationDetailRemixes({
  remixes,
  totalCount,
  originalCreationId,
  onRemix,
}: CreationDetailRemixesProps) {
  return (
    <div className="mb-6 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] md:text-base">
          <GitBranch className="h-5 w-5 text-[#00CEC9]" />
          리믹스 작품
        </h3>
        <span className="text-[13px] text-[#64748B]">{totalCount}개</span>
      </div>

      {/* Remix Grid */}
      <div className="mb-4 grid grid-cols-2 gap-2.5 md:gap-3">
        {remixes.slice(0, 4).map((remix) => (
          <Link
            key={remix.id}
            href={`/creations/${remix.id}`}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            {remix.imageUrl ? (
              <Image
                src={remix.imageUrl}
                alt={`${remix.authorName}의 리믹스`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
                <Building2 className="h-8 w-8 text-white/50" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
              <span className="text-[11px] font-semibold text-white">@{remix.authorName}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Remix Button */}
      <Button
        variant="ghost"
        onClick={onRemix}
        className="w-full rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] py-3.5 text-sm font-semibold text-[#1E293B] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-[#F8FAFC]"
      >
        <GitBranch className="h-[18px] w-[18px]" />
        나도 리믹스하기
      </Button>
    </div>
  );
}

export default CreationDetailRemixes;
