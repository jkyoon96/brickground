import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

const footerLinks = {
  experience: {
    title: '체험',
    links: [
      { label: '브릭아트 갤러리', href: '/brickarts' },
      { label: '도트아트 갤러리', href: '/dotarts' },
      { label: '창작물', href: '/creations' },
      { label: '설명서', href: '/manuals' },
      { label: '체험 & 방과후 수업', href: '/classes' },
    ],
  },
  shop: {
    title: '쇼핑몰',
    links: [
      { label: '전체 상품', href: '/products' },
      { label: '신상품', href: '/products?sort=newest' },
      { label: '베스트셀러', href: '/products?sort=bestseller' },
      { label: '번들 세트', href: '/products?type=set' },
    ],
  },
  account: {
    title: '계정',
    links: [
      { label: '마이페이지', href: '/mypage' },
      { label: '주문 내역', href: '/mypage/orders' },
      { label: '위시리스트', href: '/mypage/wishlist' },
      { label: '쿠폰', href: '/mypage/coupons' },
    ],
  },
  support: {
    title: '고객지원',
    links: [
      { label: '도움말 센터', href: '/help' },
      { label: '자주 묻는 질문', href: '/help/faq' },
      { label: '1:1 문의', href: '/mypage/inquiries' },
      { label: '판매자 등록', href: '/seller' },
    ],
  },
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-[#1E293B] text-[#E2E8F0] mt-[60px]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 pt-[60px] pb-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-[#334155]">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/brickground_logo.png"
                alt="BrickGround"
                width={140}
                height={35}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
              DotArt와 Creation으로 창작의 즐거움을 경험하세요. 픽셀 아트와 3D 창작의 새로운 세계가 열립니다.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#334155] rounded-full flex items-center justify-center text-[#E2E8F0] hover:bg-[#0066FF] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-[13px] text-[#64748B]">
            &copy; {new Date().getFullYear()} BrickGround. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/policy/terms"
              className="text-[13px] text-[#64748B] hover:text-white transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/policy/privacy"
              className="text-[13px] text-[#64748B] hover:text-white transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/policy/cookies"
              className="text-[13px] text-[#64748B] hover:text-white transition-colors"
            >
              쿠키 정책
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
