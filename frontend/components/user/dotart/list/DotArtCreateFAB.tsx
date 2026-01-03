'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface DotArtCreateFABProps {
  href?: string;
}

export function DotArtCreateFAB({ href = '/dotarts/new/editor' }: DotArtCreateFABProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 rounded-[32px] bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] px-7 py-[18px] text-base font-bold text-white shadow-[0_4px_20px_rgba(155,93,229,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(155,93,229,0.5)]"
    >
      <Plus className="h-[22px] w-[22px]" />
      새 작품 만들기
    </Link>
  );
}

export default DotArtCreateFAB;
