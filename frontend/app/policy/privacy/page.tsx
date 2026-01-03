'use client';

import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#64748B]">
        <Link href="/" className="hover:text-[#FF6B35]">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-[#1E293B]">개인정보처리방침</span>
      </nav>

      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6BCB77]">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] md:text-3xl">
            개인정보처리방침
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-10">
        <div className="prose prose-gray max-w-none">
          {/* 개요 */}
          <section className="mb-8">
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              BrickGround(이하 "회사")는 이용자의 개인정보를 중요시하며,
              「개인정보 보호법」을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여
              이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
              개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
            </p>
          </section>

          {/* 제1조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제1조 (개인정보의 수집 항목 및 수집 방법)
            </h2>
            <h3 className="mb-3 text-base font-semibold text-[#1E293B]">1. 수집하는 개인정보 항목</h3>
            <div className="mb-4 overflow-hidden rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">구분</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">수집 항목</th>
                  </tr>
                </thead>
                <tbody className="text-[#475569]">
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3 font-medium">필수 항목</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">
                      이메일, 비밀번호, 이름, 닉네임, 휴대폰 번호
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3 font-medium">선택 항목</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">
                      프로필 이미지, 생년월일, 성별, 주소
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">자동 수집</td>
                    <td className="px-4 py-3">
                      IP 주소, 쿠키, 접속 로그, 서비스 이용 기록, 기기 정보
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="mb-3 text-base font-semibold text-[#1E293B]">2. 개인정보 수집 방법</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
              <li>고객센터를 통한 상담 과정에서 수집</li>
              <li>소셜 로그인(카카오, 네이버, 구글) 연동 시 동의 하에 수집</li>
              <li>서비스 이용 과정에서 자동으로 생성되어 수집</li>
            </ul>
          </section>

          {/* 제2조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제2조 (개인정보의 수집 및 이용 목적)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                <strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정이용 방지,
                가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
              </li>
              <li>
                <strong>서비스 제공:</strong> 콘텐츠 제공, 창작물 저장 및 공유, 상품 주문 및 배송, 결제 처리
              </li>
              <li>
                <strong>마케팅 및 광고:</strong> 이벤트 및 광고성 정보 제공, 서비스 이용 통계 분석
              </li>
              <li>
                <strong>서비스 개선:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 분석
              </li>
            </ul>
          </section>

          {/* 제3조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제3조 (개인정보의 보유 및 이용 기간)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관련 법령에 의해 보존할 필요가 있는 경우 아래와 같이 보관합니다.
            </p>
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">보존 항목</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">보존 기간</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">근거 법령</th>
                  </tr>
                </thead>
                <tbody className="text-[#475569]">
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">계약 또는 청약철회 기록</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">5년</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">대금결제 및 재화공급 기록</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">5년</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">소비자 불만 또는 분쟁처리 기록</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">3년</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">로그인 기록</td>
                    <td className="px-4 py-3">3개월</td>
                    <td className="px-4 py-3">통신비밀보호법</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제4조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 이용자의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며,
              이용자의 사전 동의 없이 제3자에게 제공하지 않습니다. 단, 다음의 경우는 예외로 합니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          {/* 제5조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제5조 (개인정보 처리의 위탁)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 외부에 위탁하고 있습니다.
            </p>
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC]">
                  <tr>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">수탁업체</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">위탁 업무</th>
                  </tr>
                </thead>
                <tbody className="text-[#475569]">
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">결제대행사(PG사)</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">결제 처리</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">배송업체</td>
                    <td className="border-b border-[#E2E8F0] px-4 py-3">상품 배송</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">클라우드 서비스 제공업체</td>
                    <td className="px-4 py-3">데이터 저장 및 관리</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제6조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제6조 (이용자의 권리와 행사 방법)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              이용자는 언제든지 다음의 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-[#475569] md:text-base">
              위 권리 행사는 회사에 대해 서면, 전화, 이메일 등을 통하여 하실 수 있으며,
              회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </section>

          {/* 제7조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제7조 (개인정보의 파기)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체 없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>
                <strong>전자적 파일:</strong> 복구 및 재생이 불가능한 기술적 방법을 사용하여 삭제
              </li>
              <li>
                <strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기
              </li>
            </ul>
          </section>

          {/* 제8조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제8조 (개인정보 보호책임자)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="rounded-xl bg-[#F8FAFC] p-5">
              <p className="text-sm text-[#475569]">
                <strong className="text-[#1E293B]">개인정보 보호책임자</strong><br />
                이름: 홍길동<br />
                직책: 개인정보보호팀장<br />
                이메일: privacy@brickground.com<br />
                전화: 02-1234-5678
              </p>
            </div>
          </section>

          {/* 제9조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제9조 (개인정보 처리방침의 변경)
            </h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              이 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는
              변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          {/* 부칙 */}
          <section className="rounded-xl bg-[#F8FAFC] p-5">
            <h2 className="mb-3 text-lg font-bold text-[#1E293B]">부칙</h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              이 개인정보처리방침은 2024년 1월 1일부터 시행합니다.
            </p>
          </section>
        </div>
      </div>

      {/* Related Links */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/policy/terms"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-colors hover:bg-[#FF6B35] hover:text-white"
        >
          이용약관
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
