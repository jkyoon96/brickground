'use client';

import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ContactMethod {
  type: 'phone' | 'email';
  value: string;
  label: string;
}

interface HelpContactSectionProps {
  contacts?: ContactMethod[];
  onInquiry?: () => void;
}

const defaultContacts: ContactMethod[] = [
  { type: 'phone', value: '1588-1234', label: '평일 09:00-18:00' },
  { type: 'email', value: 'help@brickground.com', label: '24시간 접수' },
];

export function HelpContactSection({
  contacts = defaultContacts,
  onInquiry,
}: HelpContactSectionProps) {
  return (
    <section className="flex flex-col items-center gap-5 rounded-[20px] bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] p-6 text-center text-white md:flex-row md:justify-between md:gap-0 md:p-10 md:text-left">
      {/* Info */}
      <div>
        <h3 className="mb-2 text-lg font-extrabold md:text-2xl">
          아직 궁금한 점이 있으신가요?
        </h3>
        <p className="text-sm opacity-90 md:text-base">
          고객센터에 문의해 주세요. 빠르게 답변드리겠습니다.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-4">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white/15 px-5 py-4 text-center md:px-7 md:py-5"
          >
            {contact.type === 'phone' ? (
              <Phone className="mx-auto mb-2 h-6 w-6 md:h-7 md:w-7" />
            ) : (
              <Mail className="mx-auto mb-2 h-6 w-6 md:h-7 md:w-7" />
            )}
            <div className="mb-1 text-[15px] font-bold md:text-lg">
              {contact.value}
            </div>
            <div className="text-xs opacity-80">{contact.label}</div>
          </div>
        ))}
      </div>

      {/* Inquiry Button */}
      <Button
        variant="secondary"
        onClick={onInquiry}
        className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-white px-6 py-3.5 text-base font-bold text-[#00CEC9] hover:bg-[#f0fffe] md:w-auto md:px-8 md:py-4"
      >
        <MessageCircle className="h-5 w-5" />
        1:1 문의하기
      </Button>
    </section>
  );
}

export default HelpContactSection;
