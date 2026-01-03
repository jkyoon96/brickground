'use client';

import { MapPin, Map } from 'lucide-react';

interface ClassLocationCardProps {
  locationName: string;
  address: string;
  directions?: string;
  mapUrl?: string;
}

export function ClassLocationCard({
  locationName,
  address,
  directions,
  mapUrl,
}: ClassLocationCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-7">
      {/* Title */}
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-[#1E293B] md:text-lg">
        <MapPin className="h-5 w-5 text-[#10B981]" />
        수업 장소
      </h3>

      {/* Map Placeholder */}
      <div className="mb-4 flex h-[120px] items-center justify-center rounded-xl bg-[#F8FAFC] md:h-40">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            className="h-full w-full rounded-xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <Map className="h-10 w-10 text-[#94A3B8] md:h-12 md:w-12" />
        )}
      </div>

      {/* Address */}
      <div className="text-xs leading-relaxed text-[#64748B] md:text-sm md:leading-[1.6]">
        <strong className="text-[#1E293B]">{locationName}</strong>
        <br />
        {address}
        {directions && (
          <>
            <br />
            {directions}
          </>
        )}
      </div>
    </div>
  );
}

export default ClassLocationCard;
