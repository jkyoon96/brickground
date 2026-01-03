'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface BrickArtCreateFABProps {
  href?: string;
}

export function BrickArtCreateFAB({ href = '/brickarts/new/editor' }: BrickArtCreateFABProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-10 right-10 z-50 flex items-center gap-2.5 rounded-[32px] bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-8 py-[18px] text-base font-bold text-white shadow-[0_6px_25px_rgba(0,102,255,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,102,255,0.5)]"
    >
      <Plus className="h-[22px] w-[22px]" />
      BrickArt 생성
    </Link>
  );
}

export default BrickArtCreateFAB;
