# BrickGround 개발 워크플로우 구성

## 1. 개요

BrickGround 프로젝트의 일관된 Frontend/Backend 개발을 위한 Claude Code Skills 및 Custom Commands 구성 가이드입니다.

### 1.1 목적
- 설계 문서 기반 일관된 개발
- Frontend-Backend 코드 스타일 통일
- 반복 작업 자동화
- API 동기화 보장

### 1.2 구성 요소
| 구성 요소 | 설명 | 호출 방식 |
|-----------|------|-----------|
| Skills | 자동 적용되는 전문 지식 | Claude가 맥락에 따라 자동 활성화 |
| Commands | 수동 실행 커맨드 | `/command-name` 으로 직접 호출 |

---

## 2. 디렉토리 구조

```
.claude/
├── skills/                          # 자동 적용되는 전문 지식
│   ├── brickground-frontend/        # Frontend 개발 표준
│   │   └── SKILL.md
│   ├── brickground-backend/         # Backend 개발 표준
│   │   └── SKILL.md
│   └── brickground-api/             # API 설계 표준
│       └── SKILL.md
│
└── commands/                        # 수동 실행 커맨드
    ├── gen-component.md             # 컴포넌트 생성
    ├── gen-endpoint.md              # API 엔드포인트 생성
    ├── gen-domain.md                # 백엔드 도메인 생성
    ├── wireframe-to-component.md    # 와이어프레임 → 컴포넌트 변환
    └── sync-api.md                  # Frontend-Backend API 동기화
```

---

## 3. Skills (자동 적용 전문 지식)

### 3.1 brickground-frontend

**활성화 조건**: React 컴포넌트, Next.js 페이지, Pixar 스타일 UI 개발 요청 시

**주요 내용**:
- 기술 스택: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4
- 디자인 시스템: Pixar Style (Border Radius 16-24px, Bounce/Spring 애니메이션)
- 컬러: Pixar Blue (#0066FF), Toy Yellow (#FFD93D)
- 파일 명명 규칙: PascalCase (컴포넌트), camelCase (훅/유틸)

### 3.2 brickground-backend

**활성화 조건**: Spring Boot API, 도메인 로직, JPA 엔티티 개발 요청 시

**주요 내용**:
- 기술 스택: Spring Boot 3.0, Java 17, Spring Security 6.x
- 도메인 구조: DDD 패턴 (Controller/Service/Repository/Entity/DTO)
- 도메인 목록: user, product, order, vrmall, dotart, creation, manual, help, coupon, banner, auth, admin
- API 규칙: REST 표준, /api/v1/{domain} 경로

### 3.3 brickground-api

**활성화 조건**: Frontend-Backend API 연동, 타입 동기화 요청 시

**주요 내용**:
- API 응답 형식: ApiResponse<T> 래퍼
- Frontend API 클라이언트: TanStack Query + fetch
- Type 동기화: Backend DTO ↔ Frontend Types 일치 필수

---

## 4. Custom Commands (수동 실행)

### 4.1 /gen-component

**용도**: Pixar 스타일 React 컴포넌트 생성

**사용법**:
```bash
/gen-component [ComponentName] [user|admin]
```

**예시**:
```bash
/gen-component ProductCard user      # Pixar 스타일 컴포넌트
/gen-component DataTable admin       # shadcn/ui 스타일 컴포넌트
```

### 4.2 /gen-endpoint

**용도**: Backend API 엔드포인트 + Frontend 연동 코드 생성

**사용법**:
```bash
/gen-endpoint [domain] [action]
```

**예시**:
```bash
/gen-endpoint product list           # 상품 목록 API
/gen-endpoint order create           # 주문 생성 API
/gen-endpoint user profile           # 사용자 프로필 API
```

**생성 파일**:
- Backend: Controller, Service, DTO
- Frontend: API 함수, TypeScript 타입, React Query 훅

### 4.3 /gen-domain

**용도**: 새 도메인 전체 구조 생성 (Backend + Frontend)

**사용법**:
```bash
/gen-domain [domainName]
```

**예시**:
```bash
/gen-domain review                   # review 도메인 전체 생성
/gen-domain notification             # notification 도메인 전체 생성
```

**생성 구조**:
```
Backend:
  domain/{name}/controller/
  domain/{name}/service/
  domain/{name}/repository/
  domain/{name}/entity/
  domain/{name}/dto/

Frontend:
  app/(main)/{name}/page.tsx
  components/user/{name}/
  lib/api/{name}.ts
  hooks/use{Name}.ts
  types/{name}.ts
```

### 4.4 /wireframe-to-component

**용도**: HTML 와이어프레임을 React 컴포넌트로 변환

**사용법**:
```bash
/wireframe-to-component [wireframe-file]
```

**예시**:
```bash
/wireframe-to-component 19_product_list.html
/wireframe-to-component 07_vrmall_list.html
/wireframe-to-component 04_mypage.html
```

**작업 내용**:
1. 와이어프레임 HTML 분석
2. 컴포넌트 구조 설계
3. React + TypeScript 변환
4. Tailwind CSS 스타일 적용
5. 반응형 처리

### 4.5 /sync-api

**용도**: Frontend-Backend API 타입 동기화 검증

**사용법**:
```bash
/sync-api [domain]                   # 특정 도메인 검증
/sync-api                            # 전체 검증
```

**검증 항목**:
- Backend DTO ↔ Frontend Types 일치
- API 경로 일치
- 요청/응답 필드 매핑
- 누락된 엔드포인트 탐지

---

## 5. 권장 개발 워크플로우

### 5.1 신규 기능 개발 순서

```
Step 1: 설계 문서 확인
├── docs/01_PRD.md (요구사항)
├── docs/03_ARCHITECTURE.md (아키텍처)
└── docs/04_DATABASE.md (데이터베이스)

Step 2: 와이어프레임 확인
└── wireframes/pc/*.html

Step 3: 도메인 생성 (최초 1회)
└── /gen-domain [domain]

Step 4: API 개발
└── /gen-endpoint [domain] [action]

Step 5: 컴포넌트 개발
├── /wireframe-to-component [file]
└── /gen-component [name] user

Step 6: 동기화 검증
└── /sync-api [domain]
```

### 5.2 기존 기능 수정 순서

```
Step 1: 관련 코드 파악
├── Backend: domain/{domain}/
└── Frontend: components/, lib/api/

Step 2: 수정 작업
└── Skills가 자동으로 코딩 표준 적용

Step 3: 동기화 검증
└── /sync-api [domain]
```

---

## 6. 참조 문서

| 문서 | 설명 |
|------|------|
| docs/01_PRD.md | 제품 요구사항 정의서 |
| docs/02_BACKLOG.md | 개발 백로그 |
| docs/03_ARCHITECTURE.md | 시스템 아키텍처 |
| docs/04_DATABASE.md | 데이터베이스 설계 |
| docs/05_UI_UX.md | UI/UX 디자인 가이드 |
| wireframes/pc/ | HTML 와이어프레임 (38+ 페이지) |
| wireframes/pc/common/responsive.css | 반응형 CSS 표준 |

---

## 7. 와이어프레임 매핑

### 7.1 메인/공통
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 00_main_home.html | 메인 홈 | / |
| 01_login.html | 로그인 | /login |
| 02_register.html | 회원가입 | /register |
| 03_forgot_password.html | 비밀번호 찾기 | /forgot-password |

### 7.2 VR Mall
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 07_vrmall_list.html | VR Mall 목록 | /vrmall |
| 08_vrmall_viewer.html | VR Mall 뷰어 | /vrmall/[id] |
| 09_vrmall_editor.html | VR Mall 에디터 | /vrmall/editor |

### 7.3 DotArt
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 11_dotart_list.html | DotArt 목록 | /dotart |
| 12_dotart_editor.html | DotArt 에디터 | /dotart/editor |
| 13_dotart_viewer.html | DotArt 뷰어 | /dotart/[id] |

### 7.4 Creation
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 15_creation_list.html | Creation 목록 | /creation |
| 16_creation_editor.html | Creation 에디터 | /creation/editor |
| 17_creation_viewer.html | Creation 뷰어 | /creation/[id] |

### 7.5 Product/Shop
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 19_product_list.html | 상품 목록 | /products |
| 20_product_detail.html | 상품 상세 | /products/[id] |
| 21_cart.html | 장바구니 | /cart |
| 22_checkout.html | 결제 | /checkout |

### 7.6 MyPage
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 04_mypage.html | 마이페이지 대시보드 | /mypage |
| 34_mypage_orders.html | 주문 내역 | /mypage/orders |
| 35_mypage_wishlist.html | 위시리스트 | /mypage/wishlist |
| 36_mypage_points.html | 포인트 | /mypage/points |
| 37_mypage_coupons.html | 쿠폰함 | /mypage/coupons |
| 38_mypage_profile.html | 회원정보 | /mypage/profile |

### 7.7 기타
| 파일 | 페이지 | Frontend Route |
|------|--------|----------------|
| 27_manual_list.html | 매뉴얼 목록 | /manual |
| 28_manual_viewer.html | 매뉴얼 뷰어 | /manual/[id] |
| 29_help_center.html | 고객센터 | /help |
| 31_qna_list.html | Q&A 목록 | /qna |
