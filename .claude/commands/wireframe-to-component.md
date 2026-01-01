---
description: HTML 와이어프레임을 React 컴포넌트로 변환
argument-hint: [wireframe-file] (예: 19_product_list.html)
allowed-tools: Read, Write, Glob, Grep
---

# 와이어프레임 변환: $ARGUMENTS

## 작업 순서

### 1. 와이어프레임 분석

#### 1.1 파일 읽기
- 위치: `wireframes/pc/$ARGUMENTS`
- 반응형 CSS: `wireframes/pc/common/responsive.css`

#### 1.2 분석 항목
- 페이지 구조 (헤더, 메인, 사이드바, 푸터)
- 섹션 구분
- 컴포넌트 식별 (카드, 리스트, 폼 등)
- 반응형 브레이크포인트

### 2. 컴포넌트 구조 설계

#### 2.1 페이지 컴포넌트
```
app/(main)/{route}/
├── page.tsx           # 페이지 진입점
├── loading.tsx        # 로딩 상태
└── error.tsx          # 에러 상태
```

#### 2.2 재사용 컴포넌트
```
components/user/{feature}/
├── {Feature}List.tsx
├── {Feature}Card.tsx
├── {Feature}Filter.tsx
└── index.ts
```

### 3. React 컴포넌트 변환

#### 3.1 HTML → JSX 변환 규칙

| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `<img>` | `<Image />` (Next.js) |
| `<a href>` | `<Link href>` (Next.js) |

#### 3.2 Pixar 스타일 적용

```typescript
// 카드 컴포넌트 예시
<motion.div
  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <div className="relative aspect-square">
    <Image
      src={imageUrl}
      alt={title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="p-4">
    <h3 className="font-bold text-lg text-gray-900">{title}</h3>
    <p className="text-pixar-blue font-bold text-xl">{formatPrice(price)}원</p>
  </div>
</motion.div>
```

#### 3.3 Tailwind CSS 매핑

| 와이어프레임 CSS | Tailwind |
|-----------------|----------|
| `border-radius: 16px` | `rounded-2xl` |
| `border-radius: 24px` | `rounded-3xl` |
| `box-shadow: ...` | `shadow-lg`, `shadow-xl` |
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `gap: 24px` | `gap-6` |
| `padding: 24px` | `p-6` |

### 4. 반응형 처리

#### 4.1 브레이크포인트
- 태블릿: `md:` (768px)
- 데스크톱: `lg:` (1024px)
- 대형: `xl:` (1280px)

#### 4.2 반응형 그리드
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

#### 4.3 모바일 우선 접근
```typescript
// 모바일 기본 → 데스크톱 확장
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
className="hidden md:block"  // 모바일에서 숨김
className="md:hidden"        // 데스크톱에서 숨김
```

### 5. 상태 관리 연결

#### 5.1 서버 상태 (TanStack Query)
```typescript
const { data, isLoading, error } = useProducts();
```

#### 5.2 클라이언트 상태 (Zustand)
```typescript
const { items, addItem } = useCartStore();
```

### 6. 출력 파일

#### 6.1 페이지
- `frontend/app/(main)/{route}/page.tsx`

#### 6.2 컴포넌트
- `frontend/components/user/{feature}/`

#### 6.3 훅 (필요시)
- `frontend/hooks/use{Feature}.ts`

## 참조 문서
- 디자인 가이드: `docs/05_UI_UX.md`
- Frontend Skill: `.claude/skills/brickground-frontend/SKILL.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
