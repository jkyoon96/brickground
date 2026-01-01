---
name: brickground-frontend
description: BrickGround 프론트엔드 개발 표준. React 컴포넌트, Next.js 페이지, Pixar 스타일 UI 개발 시 자동 적용. "컴포넌트 만들어", "페이지 개발", "UI 구현", "프론트엔드" 요청 시 활성화.
---

# BrickGround Frontend 개발 표준

## 1. 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 15.x | React 프레임워크 (App Router) |
| React | 19.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 4.x | 스타일링 |
| shadcn/ui | latest | UI 컴포넌트 |
| Three.js | 0.170+ | 3D 렌더링 |
| React Three Fiber | 9.x | React용 Three.js |
| Zustand | 5.x | 상태 관리 |
| TanStack Query | 5.x | 서버 상태 |
| Framer Motion | 11.x | 애니메이션 |

## 2. 디자인 시스템

### 2.1 User Frontend (Pixar Style)

```css
/* 테마 */
--theme: playful, friendly, vibrant

/* Border Radius */
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 24px;

/* 컬러 */
--pixar-blue: #0066FF;
--toy-yellow: #FFD93D;
--bg-primary: #F8FAFC;
--bg-secondary: #FFFFFF;
--text-primary: #1E293B;
--text-secondary: #64748B;

/* 폰트 */
--font-primary: 'Nunito', sans-serif;
--font-korean: '나눔스퀘어라운드', sans-serif;
```

### 2.2 Admin Frontend (shadcn/ui)

```css
/* 테마 */
--theme: clean, minimal, neutral

/* Border Radius */
--radius: 6px;

/* 다크 모드 지원 */
```

### 2.3 애니메이션 (Framer Motion)

```typescript
// Bounce 효과
const bounceVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

// Float 효과
const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 2, repeat: Infinity }
  }
};
```

## 3. 프로젝트 구조

```
frontend/
├── app/                      # App Router
│   ├── (auth)/              # 인증 페이지
│   ├── (main)/              # 사용자 페이지 (Pixar Style)
│   ├── (mypage)/            # 마이페이지
│   ├── (seller)/            # 판매자 대시보드
│   ├── (policy)/            # 정책 페이지
│   └── admin/               # 관리자 대시보드 (shadcn/ui)
├── components/
│   ├── ui/                  # shadcn/ui 컴포넌트
│   ├── user/                # 사용자용 컴포넌트 (Pixar)
│   └── admin/               # 관리자용 컴포넌트
├── lib/                     # 유틸리티 및 API 클라이언트
├── hooks/                   # 커스텀 React 훅
├── types/                   # TypeScript 타입
└── styles/                  # 글로벌 스타일
```

## 4. 파일 명명 규칙

| 타입 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `ProductCard.tsx` |
| 훅 | camelCase + use 접두사 | `useCart.ts` |
| 유틸리티 | camelCase | `formatPrice.ts` |
| 타입 | PascalCase | `Product.ts` |
| 페이지 | 폴더/page.tsx | `products/page.tsx` |

## 5. 컴포넌트 작성 규칙

### 5.1 기본 구조

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, title, price, imageUrl }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* 컴포넌트 내용 */}
    </motion.div>
  );
}
```

### 5.2 스타일 규칙

```typescript
// Tailwind 클래스 순서
// 1. 레이아웃 (flex, grid, position)
// 2. 박스 모델 (width, height, padding, margin)
// 3. 타이포그래피 (font, text)
// 4. 비주얼 (background, border, shadow)
// 5. 인터랙션 (hover, focus, cursor)
// 6. 반응형 (sm:, md:, lg:)

className="flex items-center gap-4 p-6 text-lg font-semibold bg-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer md:p-8"
```

## 6. 와이어프레임 참조

개발 시 반드시 와이어프레임을 참조하세요:
- 위치: `wireframes/pc/*.html`
- 반응형 CSS: `wireframes/pc/common/responsive.css`
- 브레이크포인트: 1024px (태블릿), 768px (모바일), 480px (소형 모바일)

## 7. API 연동 패턴

```typescript
// lib/api/products.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import type { Product, ProductListResponse } from '@/types/product';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function useProducts(page: number = 1) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: async (): Promise<ProductListResponse> => {
      const res = await fetch(`${API_BASE}/api/v1/products?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });
}
```

## 8. 참조 문서

- 아키텍처: `docs/03_ARCHITECTURE.md`
- UI/UX 가이드: `docs/05_UI_UX.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
