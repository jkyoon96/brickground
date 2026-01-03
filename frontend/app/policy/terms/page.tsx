'use client';

import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#64748B]">
        <Link href="/" className="hover:text-[#FF6B35]">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-[#1E293B]">이용약관</span>
      </nav>

      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6B35]">
          <FileText className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] md:text-3xl">
            이용약관
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-10">
        <div className="prose prose-gray max-w-none">
          {/* 제1조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제1조 (목적)
            </h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              이 약관은 BrickGround(이하 "회사")가 제공하는 브릭 창작 및 쇼핑 플랫폼 서비스(이하 "서비스")의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제2조 (정의)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                "서비스"란 회사가 제공하는 브릭아트, 도트아트, 창작물 제작 및 공유,
                온라인 쇼핑몰, VR 체험 등의 모든 서비스를 의미합니다.
              </li>
              <li>
                "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.
              </li>
              <li>
                "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서,
                회사의 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </li>
              <li>
                "콘텐츠"란 이용자가 서비스를 통해 제작하거나 업로드하는 브릭아트, 도트아트,
                창작물, 설명서, 리뷰, 댓글 등 모든 형태의 저작물을 말합니다.
              </li>
            </ol>
          </section>

          {/* 제3조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
              </li>
              <li>
                회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 내에서
                이 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지합니다.
              </li>
              <li>
                이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고
                탈퇴할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우
                약관 변경에 동의한 것으로 간주합니다.
              </li>
            </ol>
          </section>

          {/* 제4조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제4조 (회원가입)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후
                이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </li>
              <li>
                회사는 다음 각 호에 해당하는 경우 회원가입을 거절하거나
                사후에 회원자격을 제한 또는 상실시킬 수 있습니다.
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>타인의 정보를 도용한 경우</li>
                  <li>허위 정보를 기재한 경우</li>
                  <li>서비스 운영을 고의로 방해한 경우</li>
                  <li>기타 회사가 정한 이용신청 요건이 충족되지 않은 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 제5조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제5조 (서비스의 제공 및 변경)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                회사는 다음과 같은 서비스를 제공합니다.
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>브릭아트 및 도트아트 창작 도구 제공</li>
                  <li>3D 창작물 제작 및 공유 플랫폼</li>
                  <li>VR 쇼핑몰 체험</li>
                  <li>브릭 관련 상품 판매</li>
                  <li>체험 및 방과후 수업 예약</li>
                  <li>설명서 열람 및 다운로드</li>
                </ul>
              </li>
              <li>
                회사는 서비스의 내용을 변경하는 경우 변경 사유와 변경 내용을
                서비스 내 공지사항을 통해 사전에 공지합니다.
              </li>
            </ol>
          </section>

          {/* 제6조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제6조 (이용자의 의무)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              이용자는 다음 행위를 하여서는 안 됩니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>타인의 정보 도용 또는 허위 정보 등록</li>
              <li>회사 또는 제3자의 저작권 등 지적재산권 침해</li>
              <li>회사 또는 제3자의 명예 훼손 또는 업무 방해</li>
              <li>음란물, 폭력적 콘텐츠 등 공서양속에 반하는 내용 게시</li>
              <li>서비스의 안정적 운영을 방해하는 행위</li>
              <li>기타 관련 법령에 위배되는 행위</li>
            </ul>
          </section>

          {/* 제7조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제7조 (저작권의 귀속 및 이용)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                서비스 내 회사가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 회사에 귀속됩니다.
              </li>
              <li>
                이용자가 서비스를 통해 작성한 창작물에 대한 저작권은 해당 이용자에게 귀속됩니다.
              </li>
              <li>
                이용자가 서비스 내에 게시한 콘텐츠는 서비스 운영, 홍보 등의 목적으로
                회사가 이용할 수 있으며, 이에 대해 이용자는 동의한 것으로 간주합니다.
              </li>
            </ol>
          </section>

          {/* 제8조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제8조 (면책조항)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로
                서비스를 제공할 수 없는 경우 책임이 면제됩니다.
              </li>
              <li>
                회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.
              </li>
              <li>
                회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나
                상실한 것에 대해 책임을 지지 않습니다.
              </li>
            </ol>
          </section>

          {/* 제9조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제9조 (분쟁해결)
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                회사와 이용자 간 발생한 분쟁에 관한 소송은 회사의 본사 소재지를
                관할하는 법원을 합의관할로 합니다.
              </li>
              <li>
                회사와 이용자 간 발생한 분쟁에는 대한민국 법을 적용합니다.
              </li>
            </ol>
          </section>

          {/* 부칙 */}
          <section className="rounded-xl bg-[#F8FAFC] p-5">
            <h2 className="mb-3 text-lg font-bold text-[#1E293B]">부칙</h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              이 약관은 2024년 1월 1일부터 시행합니다.
            </p>
          </section>
        </div>
      </div>

      {/* Related Links */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/policy/privacy"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-colors hover:bg-[#FF6B35] hover:text-white"
        >
          개인정보처리방침
        </Link>
        <Link
          href="/policy/cookies"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-colors hover:bg-[#FF6B35] hover:text-white"
        >
          쿠키 정책
        </Link>
      </div>
    </div>
  );
}
