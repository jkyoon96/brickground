'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Layout,
  ApplyPageHeader,
  ScheduleSelection,
  ParticipantForm,
  GuardianForm,
  PaymentMethodSelect,
  ApplyAgreements,
  ClassSummaryCard,
  ApplyPaymentSummary,
  ApplyNotesCard,
} from '@/components/user';
import type {
  ApplyScheduleOption,
  ParticipantData,
  GuardianData,
  PaymentMethod,
  AgreementItem,
  PaymentRow,
} from '@/components/user';

// Mock data
const mockSchedules: ApplyScheduleOption[] = [
  {
    id: 'jan15',
    month: 'Jan',
    day: 15,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 3,
  },
  {
    id: 'jan22',
    month: 'Jan',
    day: 22,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 8,
  },
  {
    id: 'jan29',
    month: 'Jan',
    day: 29,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 12,
  },
];

const mockAgreements: AgreementItem[] = [
  {
    id: 'terms',
    label: '클래스 이용약관',
    required: true,
    linkHref: '/policy/terms',
    linkText: '클래스 이용약관',
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용',
    required: true,
    linkHref: '/policy/privacy',
    linkText: '개인정보 수집 및 이용',
  },
  {
    id: 'refund',
    label: '환불 정책',
    required: true,
    linkHref: '/policy/refund',
    linkText: '환불 정책',
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신에 동의합니다.',
    required: false,
  },
];

const mockNotes = [
  '수업 시작 3일 전까지 무료 취소 가능',
  '수업 시작 1일 전: 50% 환불',
  '당일 취소 및 노쇼: 환불 불가',
  '수업 10분 전까지 도착해주세요',
];

const PRICE_PER_PERSON = 35000;
const DISCOUNT_AMOUNT = 3500;

export default function ClassApplyPage() {
  // Schedule selection
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>('jan15');

  // Participants
  const [participants, setParticipants] = useState<ParticipantData[]>([
    {
      id: '1',
      name: '',
      birthDate: '',
      school: '',
      gender: '',
      notes: '',
    },
  ]);

  // Guardian
  const [guardian, setGuardian] = useState<GuardianData>({
    name: '홍길동',
    relation: 'parent',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    emergencyPhone: '',
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');

  // Agreements
  const [checkedAgreements, setCheckedAgreements] = useState<string[]>([]);

  // Handlers
  const handleScheduleSelect = useCallback((id: string) => {
    setSelectedSchedule(id);
  }, []);

  const handleParticipantChange = useCallback(
    (id: string, field: keyof ParticipantData, value: string) => {
      setParticipants((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      );
    },
    []
  );

  const handleAddParticipant = useCallback(() => {
    const newId = String(Date.now());
    setParticipants((prev) => [
      ...prev,
      {
        id: newId,
        name: '',
        birthDate: '',
        school: '',
        gender: '',
        notes: '',
      },
    ]);
  }, []);

  const handleRemoveParticipant = useCallback((id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleGuardianChange = useCallback(
    (field: keyof GuardianData, value: string) => {
      setGuardian((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAgreementToggle = useCallback((id: string) => {
    setCheckedAgreements((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }, []);

  const handleAgreementToggleAll = useCallback(() => {
    const allIds = mockAgreements.map((a) => a.id);
    const allChecked = allIds.every((id) => checkedAgreements.includes(id));
    setCheckedAgreements(allChecked ? [] : allIds);
  }, [checkedAgreements]);

  const handleSubmit = useCallback(() => {
    console.log('Submit application', {
      schedule: selectedSchedule,
      participants,
      guardian,
      paymentMethod,
      agreements: checkedAgreements,
    });
  }, [selectedSchedule, participants, guardian, paymentMethod, checkedAgreements]);

  // Calculate payment
  const paymentRows: PaymentRow[] = [
    { label: `수업료 (${participants.length}명)`, amount: PRICE_PER_PERSON * participants.length },
    { label: '신규 가입 할인', amount: DISCOUNT_AMOUNT, isDiscount: true },
  ];
  const totalAmount = PRICE_PER_PERSON * participants.length - DISCOUNT_AMOUNT;

  // Check if form is valid
  const requiredAgreements = mockAgreements.filter((a) => a.required);
  const isValid =
    selectedSchedule &&
    participants.every((p) => p.name && p.birthDate) &&
    guardian.name &&
    guardian.relation &&
    guardian.phone &&
    guardian.email &&
    paymentMethod &&
    requiredAgreements.every((a) => checkedAgreements.includes(a.id));

  // Get selected schedule info
  const selectedScheduleData = mockSchedules.find((s) => s.id === selectedSchedule);
  const scheduleString = selectedScheduleData
    ? `${selectedScheduleData.month === 'Jan' ? '1월' : selectedScheduleData.month} ${selectedScheduleData.day}일 (${selectedScheduleData.dayOfWeek}) ${selectedScheduleData.time}`
    : '';

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="mx-auto flex max-w-[1320px] items-center gap-1 overflow-x-auto whitespace-nowrap px-3 py-3 text-[11px] text-[#64748B] md:gap-2 md:px-10 md:py-5 md:text-sm">
        <Link href="/" className="hover:text-[#10B981]">
          홈
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <Link href="/classes" className="hover:text-[#10B981]">
          클래스
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <Link href="/classes/1" className="hover:text-[#10B981]">
          레고 테크닉 자동차 조립 체험
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <span className="font-semibold text-[#1E293B]">신청</span>
      </nav>

      {/* Main Content */}
      <main className="mx-auto grid max-w-[1320px] gap-6 px-3 pb-8 md:grid-cols-2 md:gap-10 md:px-10 md:pb-[60px]">
        {/* Left Column - Form */}
        <div>
          <ApplyPageHeader />

          <ScheduleSelection
            schedules={mockSchedules}
            selectedId={selectedSchedule}
            onSelect={handleScheduleSelect}
          />

          <ParticipantForm
            participants={participants}
            onParticipantChange={handleParticipantChange}
            onAddParticipant={handleAddParticipant}
            onRemoveParticipant={handleRemoveParticipant}
          />

          <GuardianForm data={guardian} onChange={handleGuardianChange} />

          <PaymentMethodSelect value={paymentMethod} onChange={setPaymentMethod} />

          <ApplyAgreements
            agreements={mockAgreements}
            checkedIds={checkedAgreements}
            onToggle={handleAgreementToggle}
            onToggleAll={handleAgreementToggleAll}
          />
        </div>

        {/* Right Column - Summary */}
        <aside>
          <div className="md:sticky md:top-[100px]">
            <div className="flex flex-col gap-4 md:gap-6">
              <ClassSummaryCard
                classType="체험수업"
                title="레고 테크닉 자동차 조립 체험"
                iconType="puzzle"
                schedule={scheduleString}
                location="서울 강남구 삼성동"
                participantCount={participants.length}
              />

              <ApplyPaymentSummary
                rows={paymentRows}
                totalAmount={totalAmount}
                onSubmit={handleSubmit}
                disabled={!isValid}
              />

              <ApplyNotesCard notes={mockNotes} />
            </div>
          </div>
        </aside>
      </main>
    </Layout>
  );
}
