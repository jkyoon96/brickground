'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface ScheduleItem {
  id: string;
  month: string;
  day: number;
  dayOfWeek: string;
  time: string;
  spotsLeft: number;
}

interface ClassScheduleCardProps {
  schedules: ScheduleItem[];
  onScheduleSelect?: (id: string) => void;
}

export function ClassScheduleCard({ schedules, onScheduleSelect }: ClassScheduleCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-7">
      {/* Title */}
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-[#1E293B] md:mb-5 md:text-lg">
        <Calendar className="h-5 w-5 text-[#10B981]" />
        수업 일정
      </h3>

      {/* Schedule List */}
      <div className="flex flex-col gap-3">
        {schedules.map((schedule) => {
          const isFewSpots = schedule.spotsLeft <= 3;

          return (
            <Button
              key={schedule.id}
              variant="ghost"
              onClick={() => onScheduleSelect?.(schedule.id)}
              className="flex gap-3 rounded-xl bg-[#F8FAFC] p-3 text-left transition-all hover:bg-[#f0fdf4] md:gap-4 md:p-4 h-auto"
            >
              {/* Date Box */}
              <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white md:h-14 md:w-14">
                <span className="text-[10px] font-semibold uppercase md:text-[11px]">
                  {schedule.month}
                </span>
                <span className="text-base font-extrabold leading-none md:text-xl">
                  {schedule.day}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-1 text-sm font-bold text-[#1E293B] md:text-base">
                  {schedule.dayOfWeek} {schedule.time}
                </div>
                <div
                  className={cn(
                    'text-[11px] md:text-xs',
                    isFewSpots ? 'text-[#F97316]' : 'text-[#64748B]'
                  )}
                >
                  {schedule.spotsLeft}자리 남음
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default ClassScheduleCard;
