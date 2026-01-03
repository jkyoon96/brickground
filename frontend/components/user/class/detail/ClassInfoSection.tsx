'use client';

import { Info, Calendar, MapPin, Users, UserCheck, Clock, Package, LucideIcon } from 'lucide-react';

export interface ClassInfoItem {
  label: string;
  value: string;
  icon: 'calendar' | 'mapPin' | 'users' | 'userCheck' | 'clock' | 'package';
}

interface ClassInfoSectionProps {
  items: ClassInfoItem[];
}

const iconMap: Record<ClassInfoItem['icon'], LucideIcon> = {
  calendar: Calendar,
  mapPin: MapPin,
  users: Users,
  userCheck: UserCheck,
  clock: Clock,
  package: Package,
};

export function ClassInfoSection({ items }: ClassInfoSectionProps) {
  return (
    <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-8">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-xl">
        <Info className="h-5 w-5 text-[#10B981] md:h-6 md:w-6" />
        수업 정보
      </h2>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={index} className="flex flex-col gap-1.5">
              <span className="text-xs text-[#64748B] md:text-[13px]">{item.label}</span>
              <span className="flex items-center gap-2 text-sm font-bold text-[#1E293B] md:text-base">
                <Icon className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ClassInfoSection;
