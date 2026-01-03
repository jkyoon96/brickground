'use client';

import Link from 'next/link';
import { ChevronRight, Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#64748B]">
        <Link href="/" className="hover:text-[#FF6B35]">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-[#1E293B]">쿠키 정책</span>
      </nav>

      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD93D]">
          <Cookie className="h-7 w-7 text-[#1E293B]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] md:text-3xl">
            쿠키 정책
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
              BrickGround(이하 "회사")는 이용자에게 더 나은 서비스를 제공하기 위해 쿠키를 사용합니다.
              이 쿠키 정책은 쿠키가 무엇인지, 어떻게 사용되는지, 그리고 이용자가 쿠키를 어떻게 관리할 수 있는지 설명합니다.
            </p>
          </section>

          {/* 제1조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제1조 (쿠키란?)
            </h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              쿠키(Cookie)는 이용자가 웹사이트를 방문할 때 이용자의 컴퓨터 또는 모바일 기기에 저장되는
              작은 텍스트 파일입니다. 쿠키는 웹사이트가 이용자의 기기를 인식하고, 이용자의 환경설정을 기억하며,
              전반적인 이용자 경험을 개선하는 데 도움을 줍니다.
            </p>
          </section>

          {/* 제2조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제2조 (쿠키의 종류)
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 다음과 같은 종류의 쿠키를 사용합니다.
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E2E8F0] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">필수 쿠키 (Essential Cookies)</h3>
                <p className="text-sm text-[#475569]">
                  웹사이트의 기본 기능을 위해 필수적인 쿠키입니다. 이 쿠키 없이는 로그인, 장바구니 기능 등
                  핵심 서비스를 이용할 수 없습니다. 필수 쿠키는 비활성화할 수 없습니다.
                </p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">기능 쿠키 (Functional Cookies)</h3>
                <p className="text-sm text-[#475569]">
                  이용자의 환경설정(언어, 지역 등)을 기억하여 개인화된 기능을 제공합니다.
                  이 쿠키를 비활성화하면 일부 기능이 정상적으로 작동하지 않을 수 있습니다.
                </p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">분석 쿠키 (Analytics Cookies)</h3>
                <p className="text-sm text-[#475569]">
                  이용자가 웹사이트를 어떻게 이용하는지 이해하는 데 도움을 줍니다.
                  방문자 수, 인기 페이지, 트래픽 소스 등의 정보를 수집하여 서비스 개선에 활용합니다.
                </p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">마케팅 쿠키 (Marketing Cookies)</h3>
                <p className="text-sm text-[#475569]">
                  이용자의 관심사에 맞는 광고를 제공하기 위해 사용됩니다.
                  제3자 광고 네트워크와 공유될 수 있으며, 관련성 높은 광고 경험을 제공합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 제3조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제3조 (쿠키 사용 목적)
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 다음의 목적으로 쿠키를 사용합니다.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] md:text-base">
              <li>로그인 상태 유지 및 인증</li>
              <li>장바구니 정보 저장</li>
              <li>이용자 환경설정 기억 (다크 모드, 언어 등)</li>
              <li>서비스 이용 통계 분석</li>
              <li>맞춤형 콘텐츠 및 광고 제공</li>
              <li>보안 강화 및 부정 이용 방지</li>
            </ul>
          </section>

          {/* 제4조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제4조 (사용하는 쿠키 목록)
            </h2>
            <div className="overflow-x-auto">
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">쿠키명</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">종류</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">유효기간</th>
                      <th className="border-b border-[#E2E8F0] px-4 py-3 text-left font-semibold text-[#1E293B]">목적</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#475569]">
                    <tr>
                      <td className="border-b border-[#E2E8F0] px-4 py-3 font-mono text-xs">session_id</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">필수</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">세션 종료 시</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">로그인 세션 관리</td>
                    </tr>
                    <tr>
                      <td className="border-b border-[#E2E8F0] px-4 py-3 font-mono text-xs">cart_items</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">필수</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">7일</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">장바구니 정보 저장</td>
                    </tr>
                    <tr>
                      <td className="border-b border-[#E2E8F0] px-4 py-3 font-mono text-xs">user_prefs</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">기능</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">1년</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">사용자 환경설정</td>
                    </tr>
                    <tr>
                      <td className="border-b border-[#E2E8F0] px-4 py-3 font-mono text-xs">_ga</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">분석</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">2년</td>
                      <td className="border-b border-[#E2E8F0] px-4 py-3">Google Analytics 방문자 식별</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">_fbp</td>
                      <td className="px-4 py-3">마케팅</td>
                      <td className="px-4 py-3">3개월</td>
                      <td className="px-4 py-3">Facebook 광고 추적</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 제5조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제5조 (쿠키 관리 방법)
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[#475569] md:text-base">
              이용자는 브라우저 설정을 통해 쿠키를 관리할 수 있습니다.
              다만, 쿠키를 비활성화하면 일부 서비스 기능이 정상적으로 작동하지 않을 수 있습니다.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl bg-[#F8FAFC] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">Chrome</h3>
                <p className="text-sm text-[#475569]">
                  설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
                </p>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">Firefox</h3>
                <p className="text-sm text-[#475569]">
                  설정 → 개인 정보 및 보안 → 쿠키 및 사이트 데이터
                </p>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">Safari</h3>
                <p className="text-sm text-[#475569]">
                  환경설정 → 개인 정보 보호 → 쿠키 및 웹 사이트 데이터 관리
                </p>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] p-4">
                <h3 className="mb-2 font-semibold text-[#1E293B]">Edge</h3>
                <p className="text-sm text-[#475569]">
                  설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리 및 삭제
                </p>
              </div>
            </div>
          </section>

          {/* 제6조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제6조 (제3자 쿠키)
            </h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 서비스 분석 및 광고를 위해 제3자 서비스를 이용하며, 이들 서비스는 자체 쿠키를 설정할 수 있습니다.
              제3자 쿠키에 대한 자세한 내용은 해당 서비스의 개인정보처리방침을 참고하시기 바랍니다.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#475569]">
              <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">개인정보처리방침</a></li>
              <li>Facebook Pixel: <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">개인정보처리방침</a></li>
              <li>Kakao: <a href="https://www.kakao.com/policy/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">개인정보처리방침</a></li>
            </ul>
          </section>

          {/* 제7조 */}
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1E293B] md:text-xl">
              제7조 (쿠키 정책의 변경)
            </h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              회사는 쿠키 사용에 대한 정책을 변경할 수 있으며, 변경 시 웹사이트 공지사항을 통해 안내합니다.
              변경된 정책은 공지한 날로부터 효력이 발생합니다.
            </p>
          </section>

          {/* 부칙 */}
          <section className="rounded-xl bg-[#F8FAFC] p-5">
            <h2 className="mb-3 text-lg font-bold text-[#1E293B]">부칙</h2>
            <p className="text-sm leading-relaxed text-[#475569] md:text-base">
              이 쿠키 정책은 2024년 1월 1일부터 시행합니다.
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
          href="/policy/privacy"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-colors hover:bg-[#FF6B35] hover:text-white"
        >
          개인정보처리방침
        </Link>
      </div>
    </div>
  );
}
