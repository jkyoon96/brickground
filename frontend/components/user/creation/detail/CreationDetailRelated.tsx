'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Download, Building2 } from 'lucide-react';

interface RelatedItem {
  id: string;
  title: string;
  authorName: string;
  imageUrl?: string;
  likes: number;
  downloads: number;
}

interface CreationDetailRelatedProps {
  items: RelatedItem[];
}

export function CreationDetailRelated({ items }: CreationDetailRelatedProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Header */}
      <h3 className="mb-5 flex items-center gap-2 text-[15px] font-bold text-[#1E293B] md:text-base">
        <Sparkles className="h-5 w-5 text-[#00CEC9]" />
        비슷한 작품
      </h3>

      {/* Related List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`/creations/${item.id}`} className="group flex gap-3.5">
            {/* Thumbnail */}
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl md:h-[72px] md:w-[72px]">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
                  <Building2 className="h-6 w-6 text-white/50 md:h-7 md:w-7" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h4 className="mb-1 text-xs font-bold text-[#1E293B] transition-colors group-hover:text-[#00CEC9] md:text-sm">
                {item.title}
              </h4>
              <p className="mb-1 text-[11px] text-[#64748B] md:text-xs">{item.authorName}</p>
              <div className="flex gap-3 text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {formatNumber(item.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {formatNumber(item.downloads)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CreationDetailRelated;
