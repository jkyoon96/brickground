'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ApplyScheduleOption {
  id: string;
  month: string;
  day: number;
  dayOfWeek: string;
  time: string;
  spotsLeft: number;
}

interface ScheduleSelectionProps {
  schedules: ApplyScheduleOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ScheduleSelection({ schedules, selectedId, onSelect }: ScheduleSelectionProps) {
  return (
    <section className="mb-5 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:mb-6 md:p-7">
      {/* Title */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-sm font-bold text-[#1E293B] md:mb-6 md:gap-2.5 md:pb-4 md:text-lg">
        <Calendar className="h-5 w-5 text-[#10B981] md:h-[22px] md:w-[22px]" />
        수업 일정 선택
      </h2>

      {/* Schedule Options */}
      <div className="flex flex-col gap-3">
        {schedules.map((schedule) => {
          const isSelected = selectedId === schedule.id;
          const isFewSpots = schedule.spotsLeft <= 3;

          return (
            <label
              key={schedule.id}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-[#F8FAFC] p-3 transition-all md:gap-4 md:p-4',
                isSelected
                  ? 'border-[#10B981] bg-[rgba(16,185,129,0.05)]'
                  : 'border-[#E2E8F0] hover:border-[#10B981]'
              )}
            >
              <input
                type="radio"
                name="schedule"
                value={schedule.id}
                checked={isSelected}
                onChange={() => onSelect(schedule.id)}
                className="sr-only"
              />

              {/* Radio Circle */}
              <div
                className={cn(
                  'flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 md:h-[22px] md:w-[22px]',
                  isSelected ? 'border-[#10B981]' : 'border-[#E2E8F0]'
                )}
              >
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-[#10B981] md:h-3 md:w-3" />
                )}
              </div>

              {/* Date Box */}
              <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white md:h-12 md:w-12">
                <span className="text-[9px] font-semibold uppercase md:text-[10px]">
                  {schedule.month}
                </span>
                <span className="text-sm font-extrabold leading-none md:text-lg">
                  {schedule.day}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-0.5 text-sm font-bold text-[#1E293B] md:text-base">
                  {schedule.dayOfWeek} {schedule.time}
                </div>
                <div
                  className={cn(
                    'text-[11px] md:text-[13px]',
                    isFewSpots ? 'text-[#F97316]' : 'text-[#64748B]'
                  )}
                >
                  {schedule.spotsLeft}자리 남음
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default ScheduleSelection;
