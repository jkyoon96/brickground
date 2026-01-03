# BrickGround System Architecture

> 시스템 아키텍처 설계서

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [전체 아키텍처](#2-전체-아키텍처)
3. [Frontend 아키텍처](#3-frontend-아키텍처)
4. [Backend 아키텍처](#4-backend-아키텍처)
5. [데이터베이스 설계](#5-데이터베이스-설계)
6. [인프라 아키텍처](#6-인프라-아키텍처)
7. [보안 아키텍처](#7-보안-아키텍처)
8. [외부 서비스 통합](#8-외부-서비스-통합)
9. [성능 및 확장성](#9-성능-및-확장성)
10. [모니터링 및 로깅](#10-모니터링-및-로깅)

---

## 1. 시스템 개요

### 1.1 시스템 목적

BrickGround는 3D/VR 기반 쇼핑 경험과 픽셀아트 창작 기능을 결합한 통합 플랫폼입니다.

### 1.2 핵심 기능 영역

| 영역 | 설명 |
|------|------|
| **VR Mall** | 3D 가상 쇼핑몰 환경에서 상품 탐색 및 구매 |
| **DotArt** | 2D 픽셀아트 창작 및 3D 복셀 변환 |
| **Creation** | 3D 창작 콘텐츠 제작 및 공유 |
| **Class** | 체험/교육 클래스 예약 및 수강 관리 |
| **E-Commerce** | 장바구니, 결제, 주문 관리 |
| **Admin** | 통합 관리자 시스템 |

### 1.3 기술 스택 요약

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                                │
│  Next.js 16 + React 19 + TypeScript + Three.js + Tailwind   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│              (Vercel Edge / API Routes)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                            │
│         Spring Boot 3.0 + Java 17 + Spring Security         │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │  MySQL   │   │  Redis   │   │   S3     │
        │   8.x    │   │   7.x    │   │  (CDN)   │
        └──────────┘   └──────────┘   └──────────┘
```

---

## 2. 전체 아키텍처

### 2.1 시스템 아키텍처 다이어그램

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                       │
└────────────────────────────────────────────────────────────────────────────┘
                    │                                    │
                    ▼                                    ▼
┌─────────────────────────────────┐    ┌─────────────────────────────────────┐
│         CDN (CloudFront)        │    │      DNS (Route 53 / Cloudflare)    │
│   - Static Assets               │    │   - brickground.com                 │
│   - 3D Models (GLTF/GLB)        │    │   - api.brickground.com             │
│   - Images                      │    │   - admin.brickground.com           │
└─────────────────────────────────┘    └─────────────────────────────────────┘
                    │                                    │
                    └────────────────┬───────────────────┘
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                          LOAD BALANCER (ALB)                                │
│                    - SSL Termination (TLS 1.3)                              │
│                    - Health Check                                           │
└────────────────────────────────────────────────────────────────────────────┘
                    │                                    │
          ┌─────────┘                                    └─────────┐
          ▼                                                        ▼
┌──────────────────────────┐                    ┌──────────────────────────────┐
│   FRONTEND (Vercel)      │                    │   BACKEND (AWS ECS/EC2)      │
│ ┌──────────────────────┐ │                    │ ┌──────────────────────────┐ │
│ │    Next.js 16        │ │                    │ │   Spring Boot 3.0        │ │
│ │  ┌────────────────┐  │ │                    │ │ ┌──────────────────────┐ │ │
│ │  │ App Router     │  │ │   REST API         │ │ │  API Controller      │ │ │
│ │  │ - RSC          │  │ │ ◄──────────────►   │ │ │  - /api/v1/*         │ │ │
│ │  │ - Server Action│  │ │                    │ │ └──────────────────────┘ │ │
│ │  └────────────────┘  │ │                    │ │ ┌──────────────────────┐ │ │
│ │  ┌────────────────┐  │ │                    │ │ │  Service Layer       │ │ │
│ │  │ Three.js/R3F   │  │ │                    │ │ │  - Business Logic    │ │ │
│ │  │ - VR Mall      │  │ │                    │ │ └──────────────────────┘ │ │
│ │  │ - DotArt 3D    │  │ │                    │ │ ┌──────────────────────┐ │ │
│ │  └────────────────┘  │ │                    │ │ │  Repository Layer    │ │ │
│ └──────────────────────┘ │                    │ │ │  - Spring Data JPA   │ │ │
└──────────────────────────┘                    │ │ └──────────────────────┘ │ │
                                                │ └──────────────────────────┘ │
                                                └──────────────────────────────┘
                                                               │
                    ┌──────────────────────────────────────────┼────────────────┐
                    │                                          │                │
                    ▼                                          ▼                ▼
          ┌─────────────────┐                      ┌─────────────────┐  ┌──────────────┐
          │   MySQL 8.x     │                      │   Redis 7.x     │  │  AWS S3      │
          │   (Primary)     │                      │   (Cluster)     │  │              │
          │ ┌─────────────┐ │                      │ - Session       │  │ - Images     │
          │ │ Read Replica│ │                      │ - Cache         │  │ - 3D Models  │
          │ └─────────────┘ │                      │ - Rate Limit    │  │ - PDF Files  │
          └─────────────────┘                      └─────────────────┘  └──────────────┘
```

### 2.2 통신 흐름

```
┌──────────┐    HTTPS     ┌──────────┐    HTTP/2    ┌──────────┐
│  Client  │ ──────────►  │  Vercel  │ ──────────►  │ Backend  │
│ (Browser)│              │ (Next.js)│              │ (Spring) │
└──────────┘              └──────────┘              └──────────┘
     │                          │                        │
     │  1. Page Request         │                        │
     │ ─────────────────────►   │                        │
     │                          │  2. API Call           │
     │                          │ ───────────────────►   │
     │                          │                        │
     │                          │  3. JSON Response      │
     │                          │ ◄───────────────────   │
     │  4. HTML + Hydration     │                        │
     │ ◄─────────────────────   │                        │
     │                          │                        │
     │  5. Client Navigation    │                        │
     │  (RSC Streaming)         │                        │
     │ ◄────────────────────►   │                        │
```

### 2.3 마이크로서비스 고려사항

현재는 모놀리식 아키텍처로 시작하되, 추후 확장을 위한 도메인 분리:

```
┌─────────────────────────────────────────────────────────────┐
│                    MONOLITH (Phase 1)                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  User   │ │ Product │ │  Order  │ │ Content │           │
│  │ Domain  │ │ Domain  │ │ Domain  │ │ Domain  │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼ (Future)
┌─────────────────────────────────────────────────────────────┐
│                 MICROSERVICES (Phase 2+)                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  User   │ │ Product │ │  Order  │ │ Content │           │
│  │ Service │ │ Service │ │ Service │ │ Service │           │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘           │
│       │           │           │           │                 │
│       └───────────┴───────────┴───────────┘                 │
│                       │                                      │
│              ┌────────┴────────┐                            │
│              │  Message Queue  │                            │
│              │  (Kafka/RabbitMQ)                            │
│              └─────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend 아키텍처

### 3.1 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.x | React Framework (App Router) |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | latest | UI Components |
| Three.js | 0.170+ | 3D Rendering |
| React Three Fiber | 9.x | React + Three.js |
| Zustand | 5.x | Client State |
| TanStack Query | 5.x | Server State |
| Framer Motion | 11.x | Animation |
| Tone.js | 15.x | Audio (DotArt) |

### 3.2 디렉토리 구조

```
frontend/
├── app/                          # App Router
│   ├── (auth)/                   # Auth Route Group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (main)/                   # Main Route Group (Pixar Style)
│   │   ├── page.tsx              # Home
│   │   ├── products/
│   │   ├── vrmalls/
│   │   ├── dotarts/
│   │   ├── creations/
│   │   ├── classes/              # 클래스 (체험/교육)
│   │   │   ├── page.tsx          # 클래스 목록
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx      # 클래스 상세
│   │   │   │   └── apply/        # 클래스 신청
│   │   │   └── layout.tsx
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── layout.tsx
│   ├── (mypage)/                 # MyPage Route Group
│   │   ├── mypage/
│   │   ├── orders/
│   │   └── layout.tsx
│   ├── (seller)/                 # Seller Route Group
│   │   ├── dashboard/
│   │   ├── products/
│   │   └── layout.tsx
│   ├── admin/                    # Admin (shadcn/ui Style)
│   │   ├── page.tsx              # Dashboard
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── classes/              # 클래스 관리
│   │   │   ├── page.tsx          # 클래스 목록
│   │   │   ├── [id]/             # 클래스 상세/수정
│   │   │   ├── schedules/        # 일정 관리
│   │   │   └── enrollments/      # 수강 관리
│   │   └── layout.tsx
│   ├── api/                      # API Routes (if needed)
│   ├── layout.tsx                # Root Layout
│   ├── error.tsx                 # Error Boundary
│   ├── loading.tsx               # Loading UI
│   └── not-found.tsx             # 404 Page
│
├── components/
│   ├── ui/                       # shadcn/ui Components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── data-table.tsx
│   │   └── ...
│   ├── user/                     # User Frontend (Pixar Style)
│   │   ├── index.ts              # Barrel exports
│   │   ├── layout/               # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── cards/                # 공통 카드 컴포넌트
│   │   ├── sections/             # 공통 섹션 컴포넌트
│   │   ├── auth/                 # 인증 관련
│   │   ├── home/                 # 홈 페이지
│   │   ├── brickart/             # BrickArt (중첩 구조)
│   │   │   ├── list/             # 목록 페이지 컴포넌트
│   │   │   ├── detail/           # 상세 페이지 컴포넌트
│   │   │   ├── editor/           # 에디터 컴포넌트
│   │   │   └── viewer/           # 3D 뷰어 컴포넌트
│   │   ├── dotart/               # DotArt (중첩 구조)
│   │   │   ├── list/
│   │   │   ├── detail/
│   │   │   ├── editor/
│   │   │   └── viewer/
│   │   ├── creation/             # Creation (중첩 구조)
│   │   │   ├── list/
│   │   │   ├── detail/
│   │   │   ├── editor/
│   │   │   └── viewer/
│   │   ├── product/              # 상품 (중첩 구조)
│   │   │   ├── list/
│   │   │   ├── detail/
│   │   │   └── search/
│   │   ├── class/                # 클래스 (중첩 구조)
│   │   │   ├── list/
│   │   │   ├── detail/
│   │   │   └── apply/
│   │   ├── mypage/               # 마이페이지 (중첩 구조)
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   ├── wishlist/
│   │   │   ├── points/
│   │   │   ├── coupons/
│   │   │   └── profile/
│   │   ├── order/                # 주문 (중첩 구조)
│   │   │   ├── complete/
│   │   │   └── detail/
│   │   ├── manual/               # 매뉴얼 (중첩 구조)
│   │   │   ├── list/
│   │   │   └── viewer/
│   │   ├── qna/                  # Q&A (중첩 구조)
│   │   │   ├── list/
│   │   │   └── write/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── help-center/
│   │   ├── faq/
│   │   └── seller/
│   ├── admin/                    # Admin Components
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminHeader.tsx
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   └── SalesChart.tsx
│   │   └── shared/
│   │       ├── DataTableAdvanced.tsx
│   │       └── ConfirmDialog.tsx
│   └── three/                    # 3D Components
│       ├── Canvas3D.tsx
│       ├── ModelViewer.tsx
│       ├── OrbitControls.tsx
│       └── Environment.tsx
│
├── lib/                          # Utilities
│   ├── api/
│   │   ├── client.ts             # API Client
│   │   ├── auth.ts               # Auth API
│   │   ├── products.ts           # Product API
│   │   ├── orders.ts             # Order API
│   │   └── classes.ts            # Class API
│   ├── utils/
│   │   ├── cn.ts                 # classnames utility
│   │   ├── format.ts             # Formatters
│   │   └── validation.ts         # Zod Schemas
│   └── constants/
│       └── config.ts             # App Config
│
├── hooks/                        # Custom Hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useClasses.ts
│   └── use3DViewer.ts
│
├── stores/                       # Zustand Stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── uiStore.ts
│
├── types/                        # TypeScript Types
│   ├── user.ts
│   ├── product.ts
│   ├── order.ts
│   ├── class.ts
│   └── api.ts
│
├── styles/                       # Global Styles
│   ├── globals.css               # Tailwind + Global
│   ├── user.css                  # Pixar Style Variables
│   └── admin.css                 # Admin Style Variables
│
├── public/                       # Static Assets
│   ├── images/
│   ├── models/                   # Default 3D Models
│   └── fonts/
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.3 상태 관리 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────┐      ┌─────────────────────┐           │
│  │   Server State      │      │   Client State      │           │
│  │   (TanStack Query)  │      │   (Zustand)         │           │
│  │                     │      │                     │           │
│  │  - Products         │      │  - UI State         │           │
│  │  - Orders           │      │  - Cart (optimistic)│           │
│  │  - User Data        │      │  - Theme            │           │
│  │  - VR Malls         │      │  - 3D Viewer State  │           │
│  │                     │      │                     │           │
│  │  Features:          │      │  Features:          │           │
│  │  - Caching          │      │  - Persist          │           │
│  │  - Background Fetch │      │  - DevTools         │           │
│  │  - Optimistic Update│      │  - Subscriptions    │           │
│  └─────────────────────┘      └─────────────────────┘           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    URL State                             │    │
│  │                  (nuqs / useSearchParams)                │    │
│  │                                                          │    │
│  │  - Filters, Sorting, Pagination                          │    │
│  │  - Shareable URLs                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 렌더링 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                    RENDERING STRATEGY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Page Type              │ Strategy           │ Reason            │
│  ───────────────────────┼────────────────────┼─────────────────  │
│  Home Page              │ SSG + ISR (60s)    │ SEO + Fresh Data  │
│  Product List           │ SSR + Streaming    │ SEO + Filters     │
│  Product Detail         │ SSG + ISR          │ SEO + Performance │
│  VR Mall Viewer         │ CSR (Dynamic)      │ WebGL Required    │
│  DotArt Editor          │ CSR (Dynamic)      │ Canvas Interactiv │
│  Class List             │ SSR + Streaming    │ SEO + Filters     │
│  Class Detail           │ SSG + ISR          │ SEO + Performance │
│  Class Apply            │ CSR + Server Action│ Auth Required     │
│  Cart                   │ CSR                │ User Specific     │
│  Checkout               │ CSR + Server Action│ Secure Transaction│
│  Admin Dashboard        │ CSR + SWR          │ Real-time Data    │
│  Admin Tables           │ SSR + Streaming    │ Large Data        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.5 3D 렌더링 파이프라인

```
┌─────────────────────────────────────────────────────────────────┐
│                    3D RENDERING PIPELINE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  GLTF    │───►│  Loader  │───►│  Scene   │───►│ Renderer │  │
│  │  Model   │    │ (Draco)  │    │  Graph   │    │ (WebGL2) │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │                                               │         │
│       │         ┌─────────────────────────────────────┘         │
│       │         │                                               │
│       ▼         ▼                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  React Three Fiber                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │   │
│  │  │   Canvas    │  │  useFrame   │  │  useLoader  │      │   │
│  │  │   (WebGL)   │  │  (60 FPS)   │  │  (Suspense) │      │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Drei Helpers                          │   │
│  │  - OrbitControls    - Environment    - useGLTF           │   │
│  │  - Html             - useTexture     - Preload           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Backend 아키텍처

### 4.1 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Spring Boot | 3.0.x | Application Framework |
| Java | 17 (LTS) | Programming Language |
| Spring Security | 6.x | Authentication/Authorization |
| Spring Data JPA | 3.x | ORM |
| Spring Validation | 3.x | Input Validation |
| MySQL | 8.x | Primary Database |
| Redis | 7.x | Cache / Session |
| Flyway | 9.x | Database Migration |

### 4.2 디렉토리 구조 (Domain-Driven)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/brickground/
│   │   │   ├── BrickgroundApplication.java
│   │   │   │
│   │   │   ├── domain/                    # Domain Layer
│   │   │   │   ├── user/
│   │   │   │   │   ├── controller/
│   │   │   │   │   │   └── UserController.java
│   │   │   │   │   ├── service/
│   │   │   │   │   │   ├── UserService.java
│   │   │   │   │   │   └── UserServiceImpl.java
│   │   │   │   │   ├── repository/
│   │   │   │   │   │   └── UserRepository.java
│   │   │   │   │   ├── entity/
│   │   │   │   │   │   └── User.java
│   │   │   │   │   └── dto/
│   │   │   │   │       ├── UserRequest.java
│   │   │   │   │       └── UserResponse.java
│   │   │   │   │
│   │   │   │   ├── product/
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   ├── repository/
│   │   │   │   │   ├── entity/
│   │   │   │   │   └── dto/
│   │   │   │   │
│   │   │   │   ├── order/
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   ├── repository/
│   │   │   │   │   ├── entity/
│   │   │   │   │   └── dto/
│   │   │   │   │
│   │   │   │   ├── vrmall/
│   │   │   │   ├── dotart/
│   │   │   │   ├── creation/
│   │   │   │   ├── class/                # 클래스 (체험/교육)
│   │   │   │   │   ├── controller/
│   │   │   │   │   │   └── ClassController.java
│   │   │   │   │   ├── service/
│   │   │   │   │   │   ├── ClassService.java
│   │   │   │   │   │   └── ClassServiceImpl.java
│   │   │   │   │   ├── repository/
│   │   │   │   │   │   ├── ClassRepository.java
│   │   │   │   │   │   ├── ClassScheduleRepository.java
│   │   │   │   │   │   └── ClassEnrollmentRepository.java
│   │   │   │   │   ├── entity/
│   │   │   │   │   │   ├── Class.java
│   │   │   │   │   │   ├── ClassSchedule.java
│   │   │   │   │   │   ├── ClassEnrollment.java
│   │   │   │   │   │   ├── Instructor.java
│   │   │   │   │   │   └── Venue.java
│   │   │   │   │   └── dto/
│   │   │   │   │       ├── ClassRequest.java
│   │   │   │   │       ├── ClassResponse.java
│   │   │   │   │       ├── EnrollmentRequest.java
│   │   │   │   │       └── EnrollmentResponse.java
│   │   │   │   ├── manual/
│   │   │   │   ├── help/
│   │   │   │   ├── coupon/
│   │   │   │   ├── banner/
│   │   │   │   ├── auth/
│   │   │   │   └── admin/
│   │   │   │
│   │   │   ├── common/                    # Common Layer
│   │   │   │   ├── entity/
│   │   │   │   │   └── BaseEntity.java    # Auditing
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ApiResponse.java
│   │   │   │   │   └── PageResponse.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   ├── BusinessException.java
│   │   │   │   │   └── ErrorCode.java
│   │   │   │   └── util/
│   │   │   │       └── SecurityUtil.java
│   │   │   │
│   │   │   └── config/                    # Configuration
│   │   │       ├── SecurityConfig.java
│   │   │       ├── JpaConfig.java
│   │   │       ├── RedisConfig.java
│   │   │       ├── WebConfig.java
│   │   │       ├── SwaggerConfig.java
│   │   │       └── S3Config.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/              # Flyway
│   │           ├── V1__init_schema.sql
│   │           └── V2__add_indexes.sql
│   │
│   └── test/
│       └── java/com/brickground/
│           ├── domain/
│           │   └── user/
│           │       ├── controller/
│           │       └── service/
│           └── integration/
│
├── build.gradle
└── settings.gradle
```

### 4.3 레이어드 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                     LAYERED ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Controller Layer                        │    │
│  │  - REST API Endpoints (@RestController)                  │    │
│  │  - Request Validation (@Valid)                           │    │
│  │  - Response Mapping                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Service Layer                          │    │
│  │  - Business Logic                                        │    │
│  │  - Transaction Management (@Transactional)               │    │
│  │  - Domain Event Publishing                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Repository Layer                        │    │
│  │  - Data Access (Spring Data JPA)                         │    │
│  │  - Custom Queries (@Query)                               │    │
│  │  - Specification (Dynamic Query)                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Entity Layer                          │    │
│  │  - JPA Entities                                          │    │
│  │  - Value Objects                                         │    │
│  │  - Enums                                                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 API 설계 원칙

```
┌─────────────────────────────────────────────────────────────────┐
│                      API DESIGN                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Base URL: /api/v1                                               │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Public APIs (인증 불필요)                               │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  GET    /products              상품 목록                 │    │
│  │  GET    /products/{id}         상품 상세                 │    │
│  │  GET    /vrmalls               VR Mall 목록              │    │
│  │  GET    /vrmalls/{id}          VR Mall 상세              │    │
│  │  GET    /classes               클래스 목록               │    │
│  │  GET    /classes/{id}          클래스 상세               │    │
│  │  GET    /classes/{id}/schedules  클래스 일정             │    │
│  │  POST   /auth/login            로그인                    │    │
│  │  POST   /auth/register         회원가입                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  User APIs (인증 필요)                                   │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  GET    /cart                  장바구니 조회             │    │
│  │  POST   /cart/items            장바구니 추가             │    │
│  │  GET    /orders                주문 목록                 │    │
│  │  POST   /orders                주문 생성                 │    │
│  │  GET    /users/me              내 정보                   │    │
│  │  POST   /classes/enrollments   클래스 수강 신청          │    │
│  │  GET    /classes/enrollments   수강 내역 조회            │    │
│  │  DELETE /classes/enrollments/{id}  수강 취소             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Admin APIs (관리자 권한)                                │    │
│  │  ─────────────────────────────────────────────────────  │    │
│  │  GET    /admin/dashboard       대시보드 통계             │    │
│  │  GET    /admin/users           회원 목록                 │    │
│  │  PUT    /admin/users/{id}      회원 수정                 │    │
│  │  GET    /admin/orders          주문 목록                 │    │
│  │  PUT    /admin/orders/{id}     주문 상태 변경            │    │
│  │  GET    /admin/classes         클래스 목록               │    │
│  │  POST   /admin/classes         클래스 생성               │    │
│  │  PUT    /admin/classes/{id}    클래스 수정               │    │
│  │  DELETE /admin/classes/{id}    클래스 삭제               │    │
│  │  GET    /admin/classes/schedules    일정 관리            │    │
│  │  GET    /admin/classes/enrollments  수강 관리            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Response Format:                                                │
│  {                                                               │
│    "success": true,                                              │
│    "data": { ... },                                              │
│    "message": "Success",                                         │
│    "timestamp": "2026-01-01T00:00:00Z"                           │
│  }                                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 인증/인가 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Login Request                                                │
│  ┌────────┐    POST /auth/login    ┌────────┐                   │
│  │ Client │ ──────────────────────►│ Server │                   │
│  └────────┘    {email, password}   └────────┘                   │
│                                         │                        │
│                                         ▼                        │
│                              ┌─────────────────┐                │
│                              │ Validate User   │                │
│                              │ Generate JWT    │                │
│                              └─────────────────┘                │
│                                         │                        │
│  ┌────────┐    {accessToken,       ┌────────┐                   │
│  │ Client │◄───refreshToken}───────│ Server │                   │
│  └────────┘                        └────────┘                   │
│                                                                  │
│  2. API Request with Token                                       │
│  ┌────────┐    Authorization:      ┌────────┐                   │
│  │ Client │───Bearer {token}──────►│ Server │                   │
│  └────────┘                        └────────┘                   │
│                                         │                        │
│                              ┌─────────────────┐                │
│                              │ JWT Filter      │                │
│                              │ - Validate Token│                │
│                              │ - Set Security  │                │
│                              │   Context       │                │
│                              └─────────────────┘                │
│                                                                  │
│  3. Token Refresh                                                │
│  ┌────────┐    POST /auth/refresh  ┌────────┐                   │
│  │ Client │───{refreshToken}──────►│ Server │                   │
│  └────────┘                        └────────┘                   │
│       ▲                                 │                        │
│       │         {new accessToken}       │                        │
│       └─────────────────────────────────┘                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   JWT TOKEN STRUCTURE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Access Token (15분):                                            │
│  {                                                               │
│    "sub": "user-uuid",                                           │
│    "email": "user@example.com",                                  │
│    "role": "USER",                                               │
│    "exp": 1704067200,                                            │
│    "iat": 1704066300                                             │
│  }                                                               │
│                                                                  │
│  Refresh Token (7일):                                            │
│  {                                                               │
│    "sub": "user-uuid",                                           │
│    "type": "refresh",                                            │
│    "exp": 1704672000                                             │
│  }                                                               │
│                                                                  │
│  Signing: RS256 (RSA + SHA-256)                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. 데이터베이스 설계

### 5.1 ERD (Entity Relationship Diagram)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │    users    │       │    shops    │       │  products   │               │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │       │ id (PK)     │       │ id (PK)     │               │
│  │ email       │       │ name        │◄──────│ shop_id(FK) │               │
│  │ password    │──────►│ manager_id  │       │ category_id │               │
│  │ name        │       │ status      │       │ name        │               │
│  │ role        │       │ created_at  │       │ price       │               │
│  │ shop_id(FK) │───────│             │       │ stock       │               │
│  │ point       │       └─────────────┘       │ vr_model    │               │
│  │ status      │                             │ created_at  │               │
│  │ created_at  │                             └─────────────┘               │
│  └─────────────┘                                    │                       │
│         │                                           │                       │
│         │  ┌────────────────────────────────────────┘                       │
│         │  │                                                                │
│         ▼  ▼                                                                │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │   orders    │       │ order_items │       │    carts    │               │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │◄──────│ order_id(FK)│       │ id (PK)     │               │
│  │ user_id(FK) │       │ product_id  │───────│ user_id(FK) │               │
│  │ total_amount│       │ quantity    │       │ product_id  │               │
│  │ status      │       │ price       │       │ quantity    │               │
│  │ address     │       └─────────────┘       │ created_at  │               │
│  │ created_at  │                             └─────────────┘               │
│  └─────────────┘                                                            │
│                                                                              │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │   vrmalls   │       │   dotarts   │       │  creations  │               │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │       │ id (PK)     │       │ id (PK)     │               │
│  │ user_id(FK) │       │ user_id(FK) │       │ user_id(FK) │               │
│  │ name        │       │ name        │       │ name        │               │
│  │ description │       │ pixel_data  │       │ model_data  │               │
│  │ cover_image │       │ cover_image │       │ cover_image │               │
│  │ like_count  │       │ like_count  │       │ like_count  │               │
│  │ camera_pos  │       │ is_public   │       │ is_public   │               │
│  │ created_at  │       │ created_at  │       │ created_at  │               │
│  └─────────────┘       └─────────────┘       └─────────────┘               │
│                                                                              │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │   classes   │       │class_schedules      │class_enrollments            │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │◄──────│ class_id(FK)│       │ id (PK)     │               │
│  │ category_id │       │ id (PK)     │◄──────│ schedule_id │               │
│  │ instructor_id       │ start_time  │       │ user_id(FK) │               │
│  │ venue_id    │       │ end_time    │       │ status      │               │
│  │ title       │       │ current_cnt │       │ paid_amount │               │
│  │ price       │       │ max_cnt     │       │ paid_at     │               │
│  │ target_age  │       │ status      │       │ created_at  │               │
│  │ duration    │       │ created_at  │       └─────────────┘               │
│  │ status      │       └─────────────┘                                      │
│  │ created_at  │                                                            │
│  └─────────────┘                                                            │
│                                                                              │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │ instructors │       │   venues    │       │class_reviews│               │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │       │ id (PK)     │       │ id (PK)     │               │
│  │ name        │       │ name        │       │ class_id(FK)│               │
│  │ bio         │       │ address     │       │ user_id(FK) │               │
│  │ profile_img │       │ capacity    │       │ rating      │               │
│  │ expertise   │       │ facilities  │       │ content     │               │
│  │ created_at  │       │ created_at  │       │ created_at  │               │
│  └─────────────┘       └─────────────┘       └─────────────┘               │
│                                                                              │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐               │
│  │   coupons   │       │  user_coupons│      │   banners   │               │
│  ├─────────────┤       ├─────────────┤       ├─────────────┤               │
│  │ id (PK)     │◄──────│ coupon_id   │       │ id (PK)     │               │
│  │ code        │       │ user_id(FK) │       │ title       │               │
│  │ discount_type       │ used_at     │       │ image_url   │               │
│  │ discount_value      │ created_at  │       │ link_url    │               │
│  │ min_order   │       └─────────────┘       │ order       │               │
│  │ expires_at  │                             │ is_active   │               │
│  └─────────────┘                             └─────────────┘               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 주요 테이블 상세

```sql
-- Users Table
CREATE TABLE users (
    id              VARCHAR(36) PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255),
    name            VARCHAR(100) NOT NULL,
    gender          ENUM('MALE', 'FEMALE', 'OTHER'),
    birth_date      DATE,
    phone           VARCHAR(20),
    address         VARCHAR(500),
    detail_address  VARCHAR(200),
    zip_code        VARCHAR(10),
    status          ENUM('ACTIVE', 'INACTIVE', 'LOCKED') DEFAULT 'ACTIVE',
    role            ENUM('USER', 'SELLER', 'ADMIN') DEFAULT 'USER',
    shop_id         VARCHAR(36),
    point           INT DEFAULT 0,
    login_attempts  INT DEFAULT 0,
    locked_until    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role)
);

-- Products Table
CREATE TABLE products (
    id              VARCHAR(36) PRIMARY KEY,
    shop_id         VARCHAR(36) NOT NULL,
    category_id     VARCHAR(36),
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    price           DECIMAL(10, 2) NOT NULL,
    stock           INT DEFAULT 0,
    vr_model_path   VARCHAR(500),
    cover_image     VARCHAR(500),
    status          ENUM('ACTIVE', 'INACTIVE', 'DELETED') DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_shop (shop_id),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    FULLTEXT idx_search (name, description)
);

-- Orders Table
CREATE TABLE orders (
    id              VARCHAR(36) PRIMARY KEY,
    user_id         VARCHAR(36) NOT NULL,
    order_number    VARCHAR(20) NOT NULL UNIQUE,
    total_amount    DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_fee    DECIMAL(10, 2) DEFAULT 0,
    final_amount    DECIMAL(10, 2) NOT NULL,
    status          ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    recipient_name  VARCHAR(100),
    recipient_phone VARCHAR(20),
    address         VARCHAR(500),
    detail_address  VARCHAR(200),
    zip_code        VARCHAR(10),
    memo            TEXT,
    paid_at         TIMESTAMP,
    shipped_at      TIMESTAMP,
    delivered_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);
```

### 5.3 인덱스 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                      INDEX STRATEGY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Table: products                                                 │
│  ────────────────────────────────────────────────────────────   │
│  PRIMARY KEY: id                                                 │
│  INDEX: shop_id           (상점별 상품 조회)                     │
│  INDEX: category_id       (카테고리별 상품 조회)                 │
│  INDEX: status            (활성 상품 필터)                       │
│  INDEX: (status, price)   (가격 정렬 조회)                       │
│  FULLTEXT: (name, desc)   (전문 검색)                            │
│                                                                  │
│  Table: orders                                                   │
│  ────────────────────────────────────────────────────────────   │
│  PRIMARY KEY: id                                                 │
│  UNIQUE: order_number                                            │
│  INDEX: user_id           (사용자별 주문 조회)                   │
│  INDEX: status            (상태별 주문 필터)                     │
│  INDEX: (status, created_at) (관리자 주문 목록)                  │
│  INDEX: created_at        (기간별 조회)                          │
│                                                                  │
│  Table: users                                                    │
│  ────────────────────────────────────────────────────────────   │
│  PRIMARY KEY: id                                                 │
│  UNIQUE: email                                                   │
│  INDEX: status            (상태별 필터)                          │
│  INDEX: role              (권한별 필터)                          │
│  INDEX: created_at        (가입일 정렬)                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Redis 캐시 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                      REDIS CACHE STRATEGY                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Key Pattern                │ TTL    │ Purpose                   │
│  ──────────────────────────────────────────────────────────────  │
│  session:{userId}           │ 7d     │ User Session              │
│  user:{userId}              │ 1h     │ User Profile Cache        │
│  product:{productId}        │ 10m    │ Product Detail Cache      │
│  product:list:{hash}        │ 5m     │ Product List Cache        │
│  cart:{userId}              │ 7d     │ Shopping Cart             │
│  class:{classId}            │ 10m    │ Class Detail Cache        │
│  class:list:{hash}          │ 5m     │ Class List Cache          │
│  class:schedule:{classId}   │ 5m     │ Schedule Cache            │
│  rate:{ip}:{endpoint}       │ 1m     │ Rate Limiting             │
│  token:blacklist:{token}    │ 7d     │ JWT Blacklist             │
│  dashboard:stats            │ 5m     │ Admin Dashboard           │
│                                                                  │
│  Cache Aside Pattern:                                            │
│  ┌────────┐    ┌────────┐    ┌────────┐                         │
│  │  App   │───►│ Redis  │    │ MySQL  │                         │
│  └────────┘    └────────┘    └────────┘                         │
│       │            │              │                              │
│       │  1. Check Cache          │                              │
│       │────────────►             │                              │
│       │  2. Cache Miss           │                              │
│       │◄────────────             │                              │
│       │  3. Query DB             │                              │
│       │──────────────────────────►                              │
│       │  4. Return Data          │                              │
│       │◄──────────────────────────                              │
│       │  5. Update Cache         │                              │
│       │────────────►             │                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. 인프라 아키텍처

### 6.1 배포 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ┌─────────────────┐                            │
│                              │   CloudFlare    │                            │
│                              │   (DNS + WAF)   │                            │
│                              └────────┬────────┘                            │
│                                       │                                      │
│                    ┌──────────────────┼──────────────────┐                  │
│                    │                  │                  │                  │
│                    ▼                  ▼                  ▼                  │
│         ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │
│         │     Vercel      │ │   CloudFront    │ │      ALB        │        │
│         │   (Frontend)    │ │     (CDN)       │ │   (Backend)     │        │
│         └────────┬────────┘ └────────┬────────┘ └────────┬────────┘        │
│                  │                   │                   │                  │
│                  │                   │                   │                  │
│  ┌───────────────┴───────┐          │          ┌────────┴────────┐        │
│  │                       │          │          │                 │        │
│  ▼                       ▼          ▼          ▼                 ▼        │
│  ┌───────────┐    ┌───────────┐   ┌────┐   ┌───────┐      ┌───────┐      │
│  │ Next.js   │    │ Next.js   │   │ S3 │   │ ECS   │      │ ECS   │      │
│  │ Instance 1│    │ Instance 2│   │    │   │Task 1 │      │Task 2 │      │
│  │ (Edge)    │    │ (Edge)    │   │    │   │       │      │       │      │
│  └───────────┘    └───────────┘   └────┘   └───┬───┘      └───┬───┘      │
│                                                 │              │          │
│                                                 └──────┬───────┘          │
│                                                        │                  │
│                    ┌───────────────────────────────────┼─────────┐        │
│                    │                                   │         │        │
│                    ▼                                   ▼         ▼        │
│             ┌───────────┐                       ┌───────────┐ ┌──────┐   │
│             │  RDS      │                       │ElastiCache│ │  S3  │   │
│             │ (MySQL)   │                       │ (Redis)   │ │Files │   │
│             │           │                       │           │ │      │   │
│             │ Primary   │                       │ Cluster   │ │      │   │
│             │    │      │                       └───────────┘ └──────┘   │
│             │    ▼      │                                                 │
│             │ Replica   │                                                 │
│             └───────────┘                                                 │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### 6.2 AWS 서비스 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                      AWS SERVICES                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Compute:                                                        │
│  ├── ECS Fargate          Backend Container Orchestration        │
│  ├── Lambda               Serverless Functions (Optional)        │
│  └── EC2 (Bastion)        SSH Jump Server                        │
│                                                                  │
│  Database:                                                       │
│  ├── RDS (MySQL 8.x)      Primary Database                       │
│  │   ├── Multi-AZ         High Availability                      │
│  │   └── Read Replica     Read Scaling                           │
│  └── ElastiCache (Redis)  Session / Cache                        │
│      └── Cluster Mode     High Availability                      │
│                                                                  │
│  Storage:                                                        │
│  ├── S3                   Static Files, 3D Models, Images        │
│  │   ├── Standard         Frequently Accessed                    │
│  │   └── IA               Infrequently Accessed                  │
│  └── EFS                  Shared File System (if needed)         │
│                                                                  │
│  Networking:                                                     │
│  ├── VPC                  Isolated Network                       │
│  │   ├── Public Subnet    ALB, NAT Gateway                       │
│  │   └── Private Subnet   ECS, RDS, ElastiCache                  │
│  ├── ALB                  Load Balancing + SSL                   │
│  ├── CloudFront           CDN                                    │
│  └── Route 53             DNS Management                         │
│                                                                  │
│  Security:                                                       │
│  ├── IAM                  Identity & Access                      │
│  ├── Secrets Manager      Credentials Storage                    │
│  ├── WAF                  Web Application Firewall               │
│  └── Certificate Manager  SSL/TLS Certificates                   │
│                                                                  │
│  Monitoring:                                                     │
│  ├── CloudWatch           Logs, Metrics, Alarms                  │
│  ├── X-Ray                Distributed Tracing                    │
│  └── CloudTrail           API Audit Logs                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 환경 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                     ENVIRONMENT SETUP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Environment   │ Frontend URL           │ Backend URL            │
│  ─────────────────────────────────────────────────────────────  │
│  Development   │ localhost:3000         │ localhost:8080         │
│  Staging       │ staging.brickground.com│ api-stg.brickground.com│
│  Production    │ www.brickground.com    │ api.brickground.com    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Development (Local)                                     │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │    │
│  │  │ Next.js │  │ Spring  │  │  MySQL  │  │  Redis  │    │    │
│  │  │  :3000  │  │  :8080  │  │  :3306  │  │  :6379  │    │    │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │    │
│  │       └── Docker Compose ──────────────────┘            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Staging                                                 │    │
│  │  - Vercel Preview Deployments                            │    │
│  │  - ECS (1 Task)                                          │    │
│  │  - RDS (db.t3.micro)                                     │    │
│  │  - ElastiCache (cache.t3.micro)                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Production                                              │    │
│  │  - Vercel Production                                     │    │
│  │  - ECS (2+ Tasks, Auto Scaling)                          │    │
│  │  - RDS (db.r6g.large, Multi-AZ)                          │    │
│  │  - ElastiCache (cache.r6g.large, Cluster)                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 CI/CD 파이프라인

```
┌─────────────────────────────────────────────────────────────────┐
│                      CI/CD PIPELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                    GitHub Repository                    │     │
│  └────────────────────────────────────────────────────────┘     │
│                              │                                   │
│                    ┌─────────┴─────────┐                        │
│                    ▼                   ▼                        │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │   Frontend CI/CD    │    │   Backend CI/CD     │            │
│  │   (GitHub Actions)  │    │   (GitHub Actions)  │            │
│  └──────────┬──────────┘    └──────────┬──────────┘            │
│             │                          │                        │
│             ▼                          ▼                        │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │  1. Install deps    │    │  1. Build JAR       │            │
│  │  2. Lint & Type     │    │  2. Run Tests       │            │
│  │  3. Run Tests       │    │  3. Build Docker    │            │
│  │  4. Build           │    │  4. Push to ECR     │            │
│  └──────────┬──────────┘    └──────────┬──────────┘            │
│             │                          │                        │
│             ▼                          ▼                        │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │   Vercel Deploy     │    │   ECS Deploy        │            │
│  │   (Automatic)       │    │   (Blue/Green)      │            │
│  └─────────────────────┘    └─────────────────────┘            │
│                                                                  │
│  Branch Strategy:                                                │
│  ─────────────────────────────────────────────────────────────  │
│  main       → Production Deploy                                  │
│  develop    → Staging Deploy                                     │
│  feature/*  → Preview Deploy (Vercel)                            │
│  hotfix/*   → Production Hotfix                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. 보안 아키텍처

### 7.1 보안 레이어

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Layer 1: Network Security                               │    │
│  │  ├── CloudFlare WAF (DDoS Protection, Bot Management)    │    │
│  │  ├── AWS WAF (SQL Injection, XSS Protection)             │    │
│  │  ├── VPC (Private Subnets, Security Groups)              │    │
│  │  └── TLS 1.3 (All Communications)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Layer 2: Application Security                           │    │
│  │  ├── JWT Authentication (RS256)                          │    │
│  │  ├── RBAC (Role-Based Access Control)                    │    │
│  │  ├── Rate Limiting (Redis)                               │    │
│  │  ├── Input Validation (Zod, Spring Validation)           │    │
│  │  ├── CORS Configuration                                  │    │
│  │  └── CSP Headers                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Layer 3: Data Security                                  │    │
│  │  ├── Password Hashing (Argon2id)                         │    │
│  │  ├── Encryption at Rest (RDS, S3)                        │    │
│  │  ├── Encryption in Transit (TLS)                         │    │
│  │  ├── Secrets Management (AWS Secrets Manager)            │    │
│  │  └── PII Data Masking (Logs)                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 인증/인가 매트릭스

```
┌─────────────────────────────────────────────────────────────────┐
│                 AUTHORIZATION MATRIX (RBAC)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Role        │ USER │ SELLER │ ADMIN │ SUPER_ADMIN              │
│  ────────────┼──────┼────────┼───────┼────────────              │
│  View Products      │  ✓   │   ✓    │   ✓   │     ✓             │
│  Purchase           │  ✓   │   ✓    │   ✓   │     ✓             │
│  Manage Own Profile │  ✓   │   ✓    │   ✓   │     ✓             │
│  Create VR Mall     │  ✓   │   ✓    │   ✓   │     ✓             │
│  Create DotArt      │  ✓   │   ✓    │   ✓   │     ✓             │
│  ────────────┼──────┼────────┼───────┼────────────              │
│  Manage Own Shop    │  ✗   │   ✓    │   ✓   │     ✓             │
│  Manage Products    │  ✗   │   ✓    │   ✓   │     ✓             │
│  View Own Orders    │  ✓   │   ✓    │   ✓   │     ✓             │
│  ────────────┼──────┼────────┼───────┼────────────              │
│  Admin Dashboard    │  ✗   │   ✗    │   ✓   │     ✓             │
│  Manage All Users   │  ✗   │   ✗    │   ✓   │     ✓             │
│  Manage All Orders  │  ✗   │   ✗    │   ✓   │     ✓             │
│  Manage Content     │  ✗   │   ✗    │   ✓   │     ✓             │
│  ────────────┼──────┼────────┼───────┼────────────              │
│  System Settings    │  ✗   │   ✗    │   ✗   │     ✓             │
│  Manage Admins      │  ✗   │   ✗    │   ✗   │     ✓             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 보안 체크리스트

```
┌─────────────────────────────────────────────────────────────────┐
│                   SECURITY CHECKLIST                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Authentication:                                                 │
│  ☐ JWT with RS256 signing                                        │
│  ☐ Access Token (15 min) + Refresh Token (7 days)                │
│  ☐ Token blacklist on logout                                     │
│  ☐ Password strength requirements                                │
│  ☐ Account lockout after 5 failed attempts                       │
│  ☐ OAuth 2.0 for social login                                    │
│                                                                  │
│  Authorization:                                                  │
│  ☐ RBAC implementation                                           │
│  ☐ Resource-level permissions                                    │
│  ☐ API endpoint protection                                       │
│                                                                  │
│  Input Validation:                                               │
│  ☐ Server-side validation (Spring Validation)                    │
│  ☐ Client-side validation (Zod)                                  │
│  ☐ SQL injection prevention (Prepared Statements)                │
│  ☐ XSS prevention (Content Security Policy)                      │
│  ☐ File upload validation (type, size)                           │
│                                                                  │
│  Data Protection:                                                │
│  ☐ HTTPS everywhere (TLS 1.3)                                    │
│  ☐ Encryption at rest (RDS, S3)                                  │
│  ☐ Password hashing (Argon2id)                                   │
│  ☐ Sensitive data masking in logs                                │
│  ☐ PCI DSS compliance for payments                               │
│                                                                  │
│  Infrastructure:                                                 │
│  ☐ WAF rules configured                                          │
│  ☐ DDoS protection enabled                                       │
│  ☐ Security groups properly configured                           │
│  ☐ Secrets in AWS Secrets Manager                                │
│  ☐ Regular security audits                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. 외부 서비스 통합

### 8.1 통합 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICE INTEGRATION                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                    ┌─────────────────────┐                      │
│                    │   BrickGround API   │                      │
│                    └──────────┬──────────┘                      │
│                               │                                  │
│     ┌─────────────┬───────────┼───────────┬─────────────┐       │
│     │             │           │           │             │       │
│     ▼             ▼           ▼           ▼             ▼       │
│  ┌──────┐   ┌──────────┐ ┌─────────┐ ┌────────┐  ┌──────────┐  │
│  │Payment│   │  OAuth   │ │ Address │ │Storage │  │Analytics │  │
│  └──┬───┘   └────┬─────┘ └────┬────┘ └───┬────┘  └────┬─────┘  │
│     │            │            │          │            │         │
│     ▼            ▼            ▼          ▼            ▼         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │  │
│  │  │ Toss    │  │ Kakao   │  │ Kakao   │  │ AWS S3 +    │ │  │
│  │  │Payments │  │ OAuth   │  │ Address │  │ CloudFront  │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────┘ │  │
│  │                                                          │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │  │
│  │  │ PortOne │  │ Naver   │  │ JUSO    │  │ Google      │ │  │
│  │  │ (Backup)│  │ OAuth   │  │  API    │  │ Analytics   │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────┘ │  │
│  │                                                          │  │
│  │  ┌─────────┐  ┌─────────┐               ┌─────────────┐ │  │
│  │  │         │  │ Google  │               │ Sentry      │ │  │
│  │  │         │  │ OAuth   │               │ (Error)     │ │  │
│  │  └─────────┘  └─────────┘               └─────────────┘ │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 결제 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                      PAYMENT FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌────────────────┐  │
│  │ Client │    │Frontend│    │Backend │    │ TossPayments   │  │
│  └───┬────┘    └───┬────┘    └───┬────┘    └───────┬────────┘  │
│      │             │             │                  │           │
│      │ 1. 결제 요청│             │                  │           │
│      │────────────►│             │                  │           │
│      │             │ 2. 주문 생성│                  │           │
│      │             │────────────►│                  │           │
│      │             │   orderId   │                  │           │
│      │             │◄────────────│                  │           │
│      │             │             │                  │           │
│      │  3. 결제 SDK 호출         │                  │           │
│      │◄────────────│             │                  │           │
│      │             │             │                  │           │
│      │ 4. 결제 진행│             │                  │           │
│      │─────────────────────────────────────────────►│           │
│      │             │             │                  │           │
│      │ 5. 결제 성공 (paymentKey) │                  │           │
│      │◄─────────────────────────────────────────────│           │
│      │             │             │                  │           │
│      │ 6. 결제 승인 요청         │                  │           │
│      │────────────►│────────────►│                  │           │
│      │             │             │ 7. 결제 승인 API │           │
│      │             │             │─────────────────►│           │
│      │             │             │   승인 결과      │           │
│      │             │             │◄─────────────────│           │
│      │             │             │                  │           │
│      │             │ 8. 주문 완료│                  │           │
│      │             │◄────────────│                  │           │
│      │ 9. 완료 페이지            │                  │           │
│      │◄────────────│             │                  │           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 파일 업로드 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Presigned URL 방식 (권장):                                      │
│                                                                  │
│  ┌────────┐    ┌────────┐    ┌────────┐    ┌──────┐            │
│  │ Client │    │Backend │    │  S3    │    │ CDN  │            │
│  └───┬────┘    └───┬────┘    └───┬────┘    └──┬───┘            │
│      │             │             │            │                 │
│      │ 1. Request  │             │            │                 │
│      │  Upload URL │             │            │                 │
│      │────────────►│             │            │                 │
│      │             │ 2. Generate │            │                 │
│      │             │ Presigned URL            │                 │
│      │  3. Return  │─────────────►            │                 │
│      │  Upload URL │             │            │                 │
│      │◄────────────│             │            │                 │
│      │             │             │            │                 │
│      │ 4. Direct Upload to S3   │            │                 │
│      │──────────────────────────►│            │                 │
│      │             │             │            │                 │
│      │ 5. Notify   │             │            │                 │
│      │  Backend    │             │            │                 │
│      │────────────►│             │            │                 │
│      │             │ 6. Update   │            │                 │
│      │             │    DB       │            │                 │
│      │             │             │            │                 │
│      │ 7. Access via CDN        │            │                 │
│      │─────────────────────────────────────►│                 │
│      │◄─────────────────────────────────────│                 │
│                                                                  │
│  Supported File Types:                                           │
│  ├── Images: jpg, jpeg, png, webp, gif (max 10MB)               │
│  ├── 3D Models: gltf, glb (max 50MB)                            │
│  └── Documents: pdf (max 20MB)                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. 성능 및 확장성

### 9.1 성능 목표

```
┌─────────────────────────────────────────────────────────────────┐
│                   PERFORMANCE TARGETS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Web Vitals:                                                     │
│  ├── LCP (Largest Contentful Paint)    < 2.5s                   │
│  ├── FID (First Input Delay)           < 100ms                  │
│  ├── CLS (Cumulative Layout Shift)     < 0.1                    │
│  └── TTFB (Time To First Byte)         < 200ms                  │
│                                                                  │
│  API Performance:                                                │
│  ├── Response Time (p50)               < 100ms                  │
│  ├── Response Time (p95)               < 200ms                  │
│  ├── Response Time (p99)               < 500ms                  │
│  └── Error Rate                        < 0.1%                   │
│                                                                  │
│  3D Performance:                                                 │
│  ├── Model Load Time                   < 3s (avg)               │
│  ├── Rendering FPS                     >= 60 FPS                │
│  └── Memory Usage                      < 500MB                  │
│                                                                  │
│  Capacity:                                                       │
│  ├── Concurrent Users                  >= 1,000                 │
│  ├── Daily Active Users                >= 10,000                │
│  └── Peak RPS (Requests Per Second)    >= 500                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 최적화 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                  OPTIMIZATION STRATEGIES                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Frontend Optimization:                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ├── Code Splitting (Dynamic Imports)                    │    │
│  │  ├── Image Optimization (Next/Image, WebP)               │    │
│  │  ├── 3D Model Optimization (Draco Compression)           │    │
│  │  ├── Bundle Analysis & Tree Shaking                      │    │
│  │  ├── Service Worker (Offline Support)                    │    │
│  │  └── Prefetching (Link Prefetch, Preload)                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Backend Optimization:                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ├── Database Query Optimization (Indexes, N+1 해결)     │    │
│  │  ├── Connection Pooling (HikariCP)                       │    │
│  │  ├── Redis Caching (Cache-Aside Pattern)                 │    │
│  │  ├── Async Processing (CompletableFuture)                │    │
│  │  ├── Response Compression (Gzip)                         │    │
│  │  └── JVM Tuning (G1GC, Heap Size)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Infrastructure Optimization:                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ├── CDN for Static Assets                               │    │
│  │  ├── Edge Caching (Vercel Edge)                          │    │
│  │  ├── Database Read Replicas                              │    │
│  │  ├── Auto Scaling (ECS)                                  │    │
│  │  └── Load Balancing                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 확장성 설계

```
┌─────────────────────────────────────────────────────────────────┐
│                   SCALABILITY DESIGN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Horizontal Scaling:                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Load Balancer                         │    │
│  │                         │                                │    │
│  │         ┌───────────────┼───────────────┐               │    │
│  │         ▼               ▼               ▼               │    │
│  │    ┌─────────┐    ┌─────────┐    ┌─────────┐           │    │
│  │    │ Server 1│    │ Server 2│    │ Server N│           │    │
│  │    └─────────┘    └─────────┘    └─────────┘           │    │
│  │         │               │               │               │    │
│  │         └───────────────┼───────────────┘               │    │
│  │                         ▼                                │    │
│  │    ┌─────────────────────────────────────────────┐      │    │
│  │    │              Shared State                    │      │    │
│  │    │  ┌────────┐  ┌────────┐  ┌────────┐        │      │    │
│  │    │  │  Redis │  │  MySQL │  │   S3   │        │      │    │
│  │    │  │(Session)  │  (Data) │  │(Files) │        │      │    │
│  │    │  └────────┘  └────────┘  └────────┘        │      │    │
│  │    └─────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Auto Scaling Policy (ECS):                                      │
│  ├── Scale Out: CPU > 70% for 2 minutes                         │
│  ├── Scale In: CPU < 30% for 10 minutes                         │
│  ├── Min Tasks: 2                                                │
│  ├── Max Tasks: 10                                               │
│  └── Cooldown: 300 seconds                                       │
│                                                                  │
│  Database Scaling:                                               │
│  ├── Read Replica (Read-Heavy Operations)                        │
│  ├── Connection Pooling (HikariCP, max 20)                      │
│  └── Query Optimization (Slow Query Log)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. 모니터링 및 로깅

### 10.1 모니터링 스택

```
┌─────────────────────────────────────────────────────────────────┐
│                   MONITORING STACK                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Observability                         │    │
│  │                                                          │    │
│  │   Metrics          Logs           Traces                 │    │
│  │   ┌──────┐        ┌──────┐       ┌──────┐              │    │
│  │   │Vercel│        │Cloud │       │ AWS  │              │    │
│  │   │Analytics      │Watch │       │X-Ray │              │    │
│  │   └──────┘        │Logs  │       └──────┘              │    │
│  │                   └──────┘                              │    │
│  │   ┌──────┐        ┌──────┐       ┌──────┐              │    │
│  │   │Cloud │        │      │       │Sentry│              │    │
│  │   │Watch │        │      │       │(Error)              │    │
│  │   │Metrics        │      │       └──────┘              │    │
│  │   └──────┘        │      │                              │    │
│  │                   │      │                              │    │
│  │   ┌──────┐        │      │                              │    │
│  │   │Google│        │      │                              │    │
│  │   │Analytics      │      │                              │    │
│  │   └──────┘        │      │                              │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Key Metrics:                                                    │
│  ├── Application: Response Time, Error Rate, Throughput         │
│  ├── Infrastructure: CPU, Memory, Disk, Network                 │
│  ├── Database: Connection Pool, Query Time, Slow Queries        │
│  ├── Cache: Hit Rate, Memory Usage, Evictions                   │
│  └── Business: Orders, Revenue, Active Users                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 로깅 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOGGING STRATEGY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Log Levels:                                                     │
│  ├── ERROR: System errors, exceptions                           │
│  ├── WARN: Potential issues, deprecated usage                   │
│  ├── INFO: Business events, request/response                    │
│  └── DEBUG: Detailed debugging (dev only)                       │
│                                                                  │
│  Log Format (JSON):                                              │
│  {                                                               │
│    "timestamp": "2026-01-01T00:00:00.000Z",                     │
│    "level": "INFO",                                              │
│    "service": "brickground-api",                                │
│    "traceId": "abc123",                                         │
│    "spanId": "def456",                                          │
│    "userId": "user-uuid",                                       │
│    "message": "Order created",                                  │
│    "context": {                                                  │
│      "orderId": "order-uuid",                                   │
│      "amount": 50000                                             │
│    }                                                             │
│  }                                                               │
│                                                                  │
│  Log Retention:                                                  │
│  ├── Application Logs: 30 days                                  │
│  ├── Access Logs: 90 days                                       │
│  ├── Audit Logs: 1 year                                         │
│  └── Error Logs: 90 days                                        │
│                                                                  │
│  Sensitive Data:                                                 │
│  ├── Mask: Password, Credit Card, Personal Info                 │
│  ├── Exclude: JWT Tokens, API Keys                              │
│  └── Hash: User Identifiers (optional)                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 알림 설정

```
┌─────────────────────────────────────────────────────────────────┐
│                     ALERTING SETUP                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Critical Alerts (Immediate - PagerDuty/Slack):                 │
│  ├── Service Down (Health Check Fail)                           │
│  ├── Error Rate > 5%                                            │
│  ├── Response Time p99 > 2s                                     │
│  ├── Database Connection Exhausted                              │
│  └── Payment Processing Failure                                 │
│                                                                  │
│  Warning Alerts (Slack):                                         │
│  ├── CPU > 80% for 5 minutes                                    │
│  ├── Memory > 85%                                               │
│  ├── Disk > 80%                                                 │
│  ├── Error Rate > 1%                                            │
│  └── Slow Query > 1s                                            │
│                                                                  │
│  Info Alerts (Daily Digest):                                     │
│  ├── Daily Order Summary                                        │
│  ├── New User Registrations                                     │
│  ├── Resource Usage Report                                      │
│  └── Security Events                                            │
│                                                                  │
│  Alert Channels:                                                 │
│  ├── Slack: #alerts-critical, #alerts-warning                   │
│  ├── Email: dev-team@brickground.com                            │
│  └── PagerDuty: On-call rotation                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 부록

### A. 기술 결정 기록 (ADR)

| ID | 결정 | 이유 |
|----|------|------|
| ADR-001 | Next.js 16 App Router | RSC, Server Actions, 최신 React 기능 |
| ADR-002 | Spring Boot 3.0 | Jakarta EE, Java 17, 성숙한 생태계 |
| ADR-003 | MySQL 8.x | 안정성, 풍부한 도구, 팀 숙련도 |
| ADR-004 | Redis | 고성능 캐시, 세션 관리, Rate Limiting |
| ADR-005 | React Three Fiber | React 친화적 3D 렌더링 |
| ADR-006 | Vercel | Next.js 최적화, Edge Network |
| ADR-007 | AWS ECS Fargate | 서버리스 컨테이너, 운영 부담 감소 |
| ADR-008 | TossPayments | 국내 결제 최적화, 개발자 친화적 |

### B. 용어 정의

| 용어 | 설명 |
|------|------|
| RSC | React Server Components |
| R3F | React Three Fiber |
| GLTF | GL Transmission Format (3D 모델) |
| ISR | Incremental Static Regeneration |
| RBAC | Role-Based Access Control |
| CDN | Content Delivery Network |
| ALB | Application Load Balancer |

### C. 참고 문서

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Spring Boot 3.0 Reference](https://docs.spring.io/spring-boot/docs/3.0.x/reference)
- [React Three Fiber](https://r3f.docs.pmnd.rs)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected)

---

**문서 버전**: 1.0
**작성일**: 2026-01-01
**기반 문서**: 01_PRD.md v2.3
