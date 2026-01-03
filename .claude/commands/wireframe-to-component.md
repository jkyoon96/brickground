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

### 2. 공통 컴포넌트 활용

#### 2.1 사용 가능한 공통 컴포넌트

##### UI 컴포넌트 (`@/components/ui`)
| 컴포넌트 | 용도 | Import |
|----------|------|--------|
| `Button` | 버튼 (default, outline, ghost, gradient, toy) | `import { Button } from '@/components/ui'` |
| `Badge` | 상태 표시 (new, hot, sale, best, rental, premium) | `import { Badge } from '@/components/ui'` |
| `Card` | 카드 컨테이너 | `import { Card, CardHeader, CardContent } from '@/components/ui'` |
| `Input` | 입력 필드 | `import { Input } from '@/components/ui'` |
| `Select` | 선택 드롭다운 | `import { Select } from '@/components/ui'` |
| `Avatar` | 사용자 아바타 | `import { Avatar, AvatarGroup } from '@/components/ui'` |
| `Rating` | 별점 표시 | `import { Rating } from '@/components/ui'` |
| `Price` | 가격 표시 (할인 포함) | `import { Price } from '@/components/ui'` |
| `SearchBox` | 검색 입력창 | `import { SearchBox } from '@/components/ui'` |
| `CategoryPills` | 카테고리 필터 | `import { CategoryPills } from '@/components/ui'` |
| `LoadMoreButton` | 더보기 버튼 | `import { LoadMoreButton } from '@/components/ui'` |
| `Skeleton` | 로딩 스켈레톤 | `import { Skeleton, SkeletonCard } from '@/components/ui'` |
| `EmptyState` | 빈 상태 표시 | `import { EmptyState } from '@/components/ui'` |

##### User 컴포넌트 (`@/components/user`)

**Layout 컴포넌트:**
| 컴포넌트 | 용도 | Import |
|----------|------|--------|
| `Layout` | 전체 레이아웃 (Header + Footer 포함) | `import { Layout } from '@/components/user'` |
| `Header` | 메인 헤더 | `import { Header } from '@/components/user'` |
| `Footer` | 메인 푸터 | `import { Footer } from '@/components/user'` |
| `MypageSidebar` | 마이페이지 사이드바 | `import { MypageSidebar } from '@/components/user'` |
| `SellerSidebar` | 판매자 사이드바 | `import { SellerSidebar } from '@/components/user'` |

**Card 컴포넌트 (공통):**
| 컴포넌트 | 용도 | Import |
|----------|------|--------|
| `ProductCard` | 상품 카드 | `import { ProductCard } from '@/components/user'` |
| `BrickArtCard` | 브릭아트 카드 | `import { BrickArtCard } from '@/components/user'` |
| `DotArtCard` | 도트아트 카드 | `import { DotArtCard } from '@/components/user'` |
| `CreationCard` | 창작물 카드 | `import { CreationCard } from '@/components/user'` |
| `ManualCard` | 매뉴얼 카드 | `import { ManualCard } from '@/components/user'` |
| `QnaCard` | Q&A 카드 | `import { QnaCard } from '@/components/user'` |

**Section 컴포넌트 (공통):**
| 컴포넌트 | 용도 | Import |
|----------|------|--------|
| `HeroSection` | 히어로 배너 | `import { HeroSection } from '@/components/user'` |
| `FilterBar` | 필터 + 정렬 바 | `import { FilterBar } from '@/components/user'` |
| `SectionTitle` | 섹션 제목 | `import { SectionTitle } from '@/components/user'` |
| `GridLayout` | 반응형 그리드 | `import { GridLayout } from '@/components/user'` |
| `Banner` | 프로모션 배너 | `import { Banner } from '@/components/user'` |

**도메인별 컴포넌트 (중첩 구조):**
| 도메인 | 컴포넌트 | Import |
|--------|----------|--------|
| BrickArt List | `BrickArtHeroSection`, `BrickArtFilterBar`, `BrickArtCard` | `import { ... } from '@/components/user'` |
| BrickArt Detail | `BrickArtDetailPreview`, `BrickArtDetailInfo`, `BrickArtDetailActions` | `import { ... } from '@/components/user'` |
| DotArt List | `DotArtHeroSection`, `DotArtFilterBar`, `DotArtGalleryCard` | `import { ... } from '@/components/user'` |
| DotArt Detail | `DotArtDetailPreview`, `DotArtDetailActions`, `DotArtComments` | `import { ... } from '@/components/user'` |
| Creation List | `CreationHeroSection`, `CreationFilterBar`, `CreationGalleryCard` | `import { ... } from '@/components/user'` |
| Creation Detail | `CreationDetailHero`, `CreationDetailComments`, `CreationDetailAuthor` | `import { ... } from '@/components/user'` |

#### 2.2 컴포넌트 사용 예시

```typescript
// 상품 목록 페이지 예시
import { Layout, ProductCard, FilterBar, SectionTitle, GridLayout } from '@/components/user';
import { LoadMoreButton } from '@/components/ui';

export default function ProductListPage() {
  return (
    <Layout user={user} cartCount={cartCount}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SectionTitle
          title="전체 상품"
          subtitle="Shop"
          description="브릭그라운드의 모든 상품을 만나보세요"
        />

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          totalCount={products.length}
        />

        <GridLayout columns={4} gap="md">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
            />
          ))}
        </GridLayout>

        <LoadMoreButton
          onClick={loadMore}
          loading={isLoading}
          hasMore={hasMore}
          loadedCount={products.length}
          totalCount={totalCount}
        />
      </div>
    </Layout>
  );
}
```

### 3. 컴포넌트 구조 설계

#### 3.1 페이지 컴포넌트
```
app/(main)/{route}/
├── page.tsx           # 페이지 진입점
├── loading.tsx        # 로딩 상태 (SkeletonList 사용)
└── error.tsx          # 에러 상태 (EmptyState 사용)
```

#### 3.2 컴포넌트 구조 규칙 (중첩 구조)

도메인 컴포넌트는 `{domain}/{feature}` 중첩 구조를 따릅니다:

```
components/user/{domain}/
├── list/                 # 목록 페이지 컴포넌트
│   ├── {Domain}HeroSection.tsx
│   ├── {Domain}FilterBar.tsx
│   ├── {Domain}Card.tsx
│   ├── {Domain}CreateFAB.tsx
│   └── index.ts
├── detail/               # 상세 페이지 컴포넌트
│   ├── {Domain}DetailPreview.tsx
│   ├── {Domain}DetailInfo.tsx
│   ├── {Domain}DetailActions.tsx
│   └── index.ts
├── editor/               # 에디터 컴포넌트
│   ├── {Domain}EditorToolbar.tsx
│   ├── {Domain}Canvas.tsx
│   └── index.ts
├── viewer/               # 뷰어 컴포넌트
│   ├── {Domain}ViewerHeader.tsx
│   ├── {Domain}3DScene.tsx
│   └── index.ts
└── index.ts              # 도메인 barrel export (선택)
```

**주요 도메인:**
- `brickart/` - list, detail, editor, viewer
- `dotart/` - list, detail, editor, viewer
- `creation/` - list, detail, editor, viewer
- `product/` - list, detail, search
- `class/` - list, detail, apply
- `mypage/` - common, dashboard, orders, wishlist, points, coupons, profile
- `order/` - complete, detail
- `manual/` - list, viewer
- `qna/` - list, write

### 4. HTML → JSX 변환

#### 4.1 변환 규칙
| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `<img>` | `<Image />` (Next.js) |
| `<a href>` | `<Link href>` (Next.js) |

#### 4.2 와이어프레임 요소 → 공통 컴포넌트 매핑

| 와이어프레임 요소 | 공통 컴포넌트 |
|-----------------|--------------|
| `.product-card` | `<ProductCard />` |
| `.brickart-card` | `<BrickArtCard />` |
| `.dotart-card` | `<DotArtCard />` |
| `.creation-card` | `<CreationCard />` |
| `.manual-card` | `<ManualCard />` |
| `.qna-item` | `<QnaCard />` |
| `.hero-section` | `<HeroSection />` |
| `.filter-bar` | `<FilterBar />` |
| `.section-title` | `<SectionTitle />` |
| `.card-grid` | `<GridLayout />` |
| `.banner` | `<Banner />` |
| `.btn-primary` | `<Button variant="default" />` |
| `.btn-secondary` | `<Button variant="outline" />` |
| `.badge-new` | `<Badge variant="new" />` |
| `.badge-hot` | `<Badge variant="hot" />` |
| `.badge-sale` | `<Badge variant="sale" />` |
| `.rating-stars` | `<Rating />` |
| `.price-display` | `<Price />` |
| `.search-box` | `<SearchBox />` |
| `.load-more` | `<LoadMoreButton />` |
| `.empty-state` | `<EmptyState />` |
| 로딩 상태 | `<SkeletonCard />`, `<SkeletonList />` |

#### 4.3 Tailwind CSS 매핑
| 와이어프레임 CSS | Tailwind |
|-----------------|----------|
| `border-radius: 16px` | `rounded-2xl` |
| `border-radius: 24px` | `rounded-3xl` |
| `box-shadow: ...` | `shadow-lg`, `shadow-xl` |
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `gap: 24px` | `gap-6` |
| `padding: 24px` | `p-6` |

### 5. 반응형 처리

#### 5.1 브레이크포인트
- 태블릿: `md:` (768px)
- 데스크톱: `lg:` (1024px)
- 대형: `xl:` (1280px)

#### 5.2 GridLayout 사용
```typescript
// 공통 GridLayout 컴포넌트 사용
<GridLayout columns={4} gap="md">
  {items.map((item) => (
    <ProductCard key={item.id} {...item} />
  ))}
</GridLayout>
```

#### 5.3 모바일 우선 접근
```typescript
// 모바일 기본 → 데스크톱 확장
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
className="hidden md:block"  // 모바일에서 숨김
className="md:hidden"        // 데스크톱에서 숨김
```

### 6. 상태 관리 연결

#### 6.1 서버 상태 (TanStack Query)
```typescript
const { data, isLoading, error } = useProducts();
```

#### 6.2 클라이언트 상태 (Zustand)
```typescript
const { items, addItem } = useCartStore();
```

### 7. 출력 파일

#### 7.1 페이지
- `frontend/app/(main)/{route}/page.tsx`

#### 7.2 신규 컴포넌트 (기존 공통 컴포넌트로 커버 불가시에만)
- `frontend/components/user/{feature}/`

#### 7.3 훅 (필요시)
- `frontend/hooks/use{Feature}.ts`

## 참조 문서
- 공통 모듈 문서: `docs/08_COMMON_MODULES.md`
- 디자인 가이드: `docs/05_UI_UX.md`
- Frontend Skill: `.claude/skills/brickground-frontend/SKILL.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
