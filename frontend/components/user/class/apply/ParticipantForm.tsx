'use client';

import { Users, User, Plus, X } from 'lucide-react';

export interface ParticipantData {
  id: string;
  name: string;
  birthDate: string;
  school: string;
  gender: '' | 'male' | 'female';
  notes: string;
}

interface ParticipantFormProps {
  participants: ParticipantData[];
  onParticipantChange: (id: string, field: keyof ParticipantData, value: string) => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (id: string) => void;
  maxParticipants?: number;
}

export function ParticipantForm({
  participants,
  onParticipantChange,
  onAddParticipant,
  onRemoveParticipant,
  maxParticipants = 5,
}: ParticipantFormProps) {
  const canAddMore = participants.length < maxParticipants;

  return (
    <section className="mb-5 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:mb-6 md:p-7">
      {/* Title */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-sm font-bold text-[#1E293B] md:mb-6 md:gap-2.5 md:pb-4 md:text-lg">
        <Users className="h-5 w-5 text-[#10B981] md:h-[22px] md:w-[22px]" />
        참여자 정보
      </h2>

      {/* Participants List */}
      <div className="flex flex-col gap-4">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="rounded-xl bg-[#F8FAFC] p-4 md:p-5"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-[#1E293B] md:text-base">
                <User className="h-4 w-4 text-[#10B981] md:h-[18px] md:w-[18px]" />
                참여자 {index + 1}
              </span>
              {participants.length > 1 && (
                <button
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="p-1.5 text-[#94A3B8] transition-colors hover:text-[#FF6B6B]"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Row 1: Name + Birth Date */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
                    이름 <span className="text-[#FF6B6B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => onParticipantChange(participant.id, 'name', e.target.value)}
                    placeholder="참여자 이름"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
                    생년월일 <span className="text-[#FF6B6B]">*</span>
                  </label>
                  <input
                    type="date"
                    value={participant.birthDate}
                    onChange={(e) => onParticipantChange(participant.id, 'birthDate', e.target.value)}
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
                  />
                </div>
              </div>

              {/* Row 2: School + Gender */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
                    학교/학년
                  </label>
                  <input
                    type="text"
                    value={participant.school}
                    onChange={(e) => onParticipantChange(participant.id, 'school', e.target.value)}
                    placeholder="예: 서울초등학교 2학년"
                    className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
                    성별
                  </label>
                  <select
                    value={participant.gender}
                    onChange={(e) => onParticipantChange(participant.id, 'gender', e.target.value)}
                    className="w-full cursor-pointer rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
                  >
                    <option value="">선택해주세요</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#1E293B] md:text-sm">
                  특이사항
                </label>
                <textarea
                  value={participant.notes}
                  onChange={(e) => onParticipantChange(participant.id, 'notes', e.target.value)}
                  placeholder="알레르기, 주의사항 등이 있다면 알려주세요."
                  className="min-h-[80px] w-full resize-y rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors placeholder:text-[#94A3B8] focus:border-[#10B981] focus:outline-none md:min-h-[100px] md:px-4 md:text-[15px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Participant Button */}
      {canAddMore && (
        <button
          onClick={onAddParticipant}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#64748B] transition-all hover:border-[#10B981] hover:text-[#10B981] md:py-3.5 md:text-[15px]"
        >
          <Plus className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          참여자 추가
        </button>
      )}
    </section>
  );
}

export default ParticipantForm;
