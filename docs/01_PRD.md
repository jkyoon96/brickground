# BrickGround PRD (Product Requirements Document)

> 제품 요구사항 문서

## 1. 제품 개요

### 1.1 제품명
BrickGround - VR 쇼핑몰 및 창작 플랫폼

### 1.2 제품 설명
BrickGround는 3D/VR 기반 쇼핑 경험과 픽셀아트 창작 기능을 결합한 통합 플랫폼입니다. 사용자는 3D 가상 공간에서 상품을 탐색하고 구매할 수 있으며, 도트아트(픽셀아트) 창작 및 커뮤니티 기능을 통해 창의적인 활동에 참여할 수 있습니다.

### 1.3 목표 사용자
- 레고/브릭 제품 구매자
- 3D VR 쇼핑 경험을 원하는 소비자
- 픽셀아트/도트아트 창작자
- 교육 기관 (학교 도트아트 프로그램)
- 판매자/상점 관리자

### 1.4 기술 스택

#### 1.4.1 Frontend
| 기술 | 버전 | 설명 |
|------|------|------|
| **Next.js** | 16.x | React 프레임워크 (App Router) |
| **React** | 19.x | UI 라이브러리 |
| **TypeScript** | 5.x | 정적 타입 언어 |
| **Three.js** | 0.170+ | 3D 렌더링 엔진 |
| **React Three Fiber** | 9.x | React용 Three.js 렌더러 |
| **Tailwind CSS** | 4.x | 유틸리티 CSS 프레임워크 |
| **shadcn/ui** | latest | UI 컴포넌트 라이브러리 |
| **Zustand** | 5.x | 상태 관리 |
| **TanStack Query** | 5.x | 서버 상태 관리 |
| **Tone.js** | 15.x | 오디오 라이브러리 |

#### 1.4.2 Backend
| 기술 | 버전 | 설명 |
|------|------|------|
| **Spring Boot** | 3.0.x | Java 애플리케이션 프레임워크 |
| **Java** | 17 (LTS) | 프로그래밍 언어 |
| **Spring Data JPA** | 3.x | ORM 프레임워크 |
| **Spring Security** | 6.x | 보안 프레임워크 |
| **Spring WebFlux** | 6.x | 리액티브 웹 프레임워크 (선택) |
| **MySQL** | 8.x | 관계형 데이터베이스 |
| **Redis** | 7.x | 캐시 및 세션 저장소 |

#### 1.4.3 Infrastructure
| 기술 | 설명 |
|------|------|
| **Docker** | 컨테이너화 |
| **Vercel** | Frontend 배포 (Next.js) |
| **AWS / GCP** | Backend 배포 |
| **GitHub Actions** | CI/CD |

#### 1.4.4 주요 기술 특징

**Next.js 16 주요 기능:**
- App Router 기반 파일 시스템 라우팅
- React Server Components (RSC)
- Server Actions (서버 측 폼 처리)
- Streaming & Suspense
- `cacheLife()` / `cacheTag()` 선언적 캐시 관리
- Image/Font 최적화
- Middleware 지원

**Spring Boot 3.0 주요 기능:**
- Jakarta EE 9+ 마이그레이션 (javax → jakarta 네임스페이스)
- Java 17 기반 (Records, Pattern Matching, Sealed Classes)
- GraalVM Native Image 지원
- 향상된 Observability (Micrometer, OpenTelemetry)
- 개선된 Docker 지원
- Spring Security 6.x 통합

### 1.5 디자인 시스템

> **사용자 UI/UX**는 Pixar 스타일의 친근하고 생동감 있는 디자인을,
> **관리자 UI/UX**는 표준 shadcn/ui의 깔끔하고 효율적인 디자인을 적용합니다.

#### 1.5.1 사용자 프론트엔드 (Pixar Style)

##### 디자인 원칙
| 원칙 | 설명 |
|------|------|
| **Playful & Friendly** | 장난스럽고 친근한 느낌, 딱딱한 UI 지양 |
| **Depth & Dimension** | 3D 느낌의 깊이감, 레이어드 디자인 |
| **Soft & Rounded** | 부드러운 곡선, 둥근 모서리 (16px+ radius) |
| **Vibrant Colors** | 생동감 있는 컬러, 높은 채도의 조화로운 팔레트 |
| **Delightful Motion** | 즐거운 마이크로 인터랙션, 바운스/스프링 애니메이션 |
| **Storytelling** | 캐릭터/일러스트로 스토리텔링 경험 제공 |

##### 컬러 팔레트
| 용도 | 컬러명 | HEX | 설명 |
|------|--------|-----|------|
| **Primary** | Pixar Blue | `#0066FF` | 메인 액션, CTA 버튼 |
| **Secondary** | Toy Yellow | `#FFD93D` | 강조, 하이라이트 |
| **Accent 1** | Buzz Green | `#6BCB77` | 성공, 긍정 상태 |
| **Accent 2** | Nemo Orange | `#FF6B35` | 주목, 알림 |
| **Accent 3** | Sulley Purple | `#9B59B6` | 크리에이티브 영역 |
| **Background** | Cloud White | `#F8FAFC` | 배경 기본 |
| **Surface** | Soft White | `#FFFFFF` | 카드, 패널 |
| **Text Primary** | Charcoal | `#2D3748` | 본문 텍스트 |
| **Text Secondary** | Warm Gray | `#718096` | 보조 텍스트 |

##### 타이포그래피
| 용도 | 폰트 | 굵기 | 크기 | 특징 |
|------|------|------|------|------|
| **Display** | Nunito / 나눔스퀘어라운드 | 800 | 48-72px | 둥근 느낌의 헤드라인 |
| **Heading** | Nunito / 나눔스퀘어라운드 | 700 | 24-36px | 섹션 타이틀 |
| **Body** | Pretendard | 400-500 | 14-16px | 가독성 높은 본문 |
| **Caption** | Pretendard | 400 | 12px | 보조 텍스트 |

##### 컴포넌트 스타일링
| 속성 | 값 | 설명 |
|------|-----|------|
| **Border Radius** | `16px - 24px` | 둥근 모서리 (카드, 버튼) |
| **Shadow (Soft)** | `0 8px 32px rgba(0,0,0,0.08)` | 부드러운 그림자 |
| **Shadow (Elevated)** | `0 16px 48px rgba(0,0,0,0.12)` | 떠있는 느낌 |
| **Gradient** | `linear-gradient(135deg, ...)` | 다채로운 그라데이션 |
| **Glassmorphism** | `backdrop-filter: blur(12px)` | 유리 효과 (선택) |
| **Border** | `2px solid` | 두꺼운 테두리 강조 |

##### 애니메이션 & 모션
| 효과 | 속성 | 설명 |
|------|------|------|
| **Bounce** | `spring(1, 80, 10)` | 버튼 클릭, 카드 호버 |
| **Float** | `ease-in-out, 3s` | 배경 요소 부유 효과 |
| **Scale Up** | `1.0 → 1.05` | 호버 시 살짝 확대 |
| **Wiggle** | `rotate(-3deg, 3deg)` | 관심 끌기 애니메이션 |
| **Page Transition** | `fade + slide` | 페이지 전환 (Framer Motion) |
| **Skeleton Pulse** | `shimmer` | 로딩 스켈레톤 |

##### 일러스트레이션 & 아이콘
| 요소 | 스타일 | 설명 |
|------|--------|------|
| **캐릭터** | 3D 렌더 스타일 | 브릭/레고 캐릭터 마스코트 |
| **일러스트** | Soft 3D, Isometric | 빈 상태, 온보딩 화면 |
| **아이콘** | Rounded, Filled | Lucide Icons (둥근 버전) |
| **이모지** | 3D Emoji | 상태 표시, 피드백 |
| **배경** | Blob, Wave shapes | 부드러운 유기적 형태 |

##### UI 패턴
| 패턴 | Pixar Style 적용 |
|------|------------------|
| **버튼** | 둥근 모서리, 그라데이션, 호버 시 bounce + glow |
| **카드** | 두꺼운 radius, 부드러운 그림자, 호버 시 살짝 떠오름 |
| **입력 필드** | 둥근 테두리, 포커스 시 색상 변화 + 확대 |
| **모달** | 큰 radius, 부드러운 오버레이, 바운스 등장 |
| **네비게이션** | pill 형태 탭, 선택 시 배경색 변화 |
| **빈 상태** | 귀여운 캐릭터 + 친근한 메시지 |
| **로딩** | 브릭 조립 애니메이션 / 캐릭터 애니메이션 |
| **토스트** | 둥근 pill 형태, 아이콘 + 컬러풀 배경 |

##### 디자인 레퍼런스
- Pixar 공식 웹사이트
- Nintendo Switch 온라인 스토어
- Duolingo 앱
- Notion AI 랜딩 페이지

---

#### 1.5.2 관리자 프론트엔드 (shadcn/ui Standard)

##### 디자인 원칙
| 원칙 | 설명 |
|------|------|
| **Clean & Minimal** | 깔끔하고 군더더기 없는 인터페이스 |
| **Efficiency First** | 업무 효율성 중심 UX, 빠른 작업 처리 |
| **Data Density** | 정보 밀도 높은 테이블, 대시보드 |
| **Consistent** | 일관된 컴포넌트, 예측 가능한 동작 |
| **Accessible** | 접근성 준수, 키보드 네비게이션 |

##### 컬러 팔레트 (Neutral Theme)
| 용도 | Light Mode | Dark Mode | 설명 |
|------|------------|-----------|------|
| **Background** | `#FFFFFF` | `#09090B` | 페이지 배경 |
| **Foreground** | `#09090B` | `#FAFAFA` | 기본 텍스트 |
| **Card** | `#FFFFFF` | `#09090B` | 카드 배경 |
| **Primary** | `#18181B` | `#FAFAFA` | 주요 액션 |
| **Secondary** | `#F4F4F5` | `#27272A` | 보조 요소 |
| **Muted** | `#F4F4F5` | `#27272A` | 비활성 영역 |
| **Accent** | `#F4F4F5` | `#27272A` | 강조 |
| **Destructive** | `#EF4444` | `#7F1D1D` | 삭제, 경고 |
| **Border** | `#E4E4E7` | `#27272A` | 테두리 |

##### 타이포그래피
| 용도 | 폰트 | 굵기 | 크기 |
|------|------|------|------|
| **Heading** | Inter / Pretendard | 600 | 18-24px |
| **Body** | Inter / Pretendard | 400 | 14px |
| **Small** | Inter / Pretendard | 400 | 12px |
| **Mono** | JetBrains Mono | 400 | 13px |

##### 컴포넌트 스타일링
| 속성 | 값 | 설명 |
|------|-----|------|
| **Border Radius** | `6px - 8px` | 표준 모서리 |
| **Shadow** | `0 1px 2px rgba(0,0,0,0.05)` | 미니멀 그림자 |
| **Border** | `1px solid hsl(var(--border))` | 얇은 테두리 |
| **Focus Ring** | `ring-2 ring-offset-2` | 포커스 표시 |

##### 애니메이션 & 모션
| 효과 | 속성 | 설명 |
|------|------|------|
| **Fade** | `150ms ease` | 기본 전환 |
| **Slide** | `200ms ease-out` | 드롭다운, 모달 |
| **Collapse** | `300ms ease` | 아코디언 |

##### 핵심 컴포넌트 (shadcn/ui)
| 컴포넌트 | 용도 |
|----------|------|
| **DataTable** | 회원/상품/주문 목록 (정렬, 필터, 페이지네이션) |
| **Form** | 상품 등록, 설정 폼 (React Hook Form + Zod) |
| **Dialog** | 확인, 삭제 경고, 상세 보기 |
| **Sheet** | 사이드 패널 (필터, 상세 정보) |
| **Tabs** | 섹션 구분 |
| **Command** | 빠른 검색, 명령 팔레트 |
| **Calendar** | 날짜 선택, 기간 필터 |
| **Chart** | Recharts 기반 통계 차트 |

##### 레이아웃 패턴
| 패턴 | 설명 |
|------|------|
| **Sidebar Navigation** | 왼쪽 고정 사이드바 (축소 가능) |
| **Header** | 검색, 알림, 프로필 드롭다운 |
| **Breadcrumb** | 현재 위치 표시 |
| **Page Header** | 타이틀 + 액션 버튼 |
| **Card Grid** | 대시보드 통계 카드 |

##### 디자인 레퍼런스
- shadcn/ui 공식 예제 (https://ui.shadcn.com)
- Vercel Dashboard
- Linear App
- Stripe Dashboard

---

#### 1.5.3 디자인 시스템 비교 요약

| 항목 | 사용자 UI (Pixar) | 관리자 UI (shadcn) |
|------|-------------------|-------------------|
| **테마** | 밝고 컬러풀 | 뉴트럴, 다크모드 지원 |
| **Border Radius** | 16-24px | 6-8px |
| **그림자** | 크고 부드러움 | 작고 미니멀 |
| **애니메이션** | 바운스, 스프링 | 페이드, 슬라이드 |
| **폰트** | Nunito (둥근) | Inter (깔끔) |
| **아이콘** | Filled, 컬러풀 | Outlined, 모노톤 |
| **일러스트** | 3D 캐릭터 | 없음 (아이콘만) |
| **목적** | 즐거운 쇼핑 경험 | 효율적 업무 처리 |

---

## 2. 기능 요구사항

### 2.1 VR Mall (3D 쇼핑몰)

#### 2.1.1 3D 뷰어 기능
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| VR-001 | 3D 모델 렌더링 | React Three Fiber 기반 GLTF/GLB 모델 렌더링 | P0 |
| VR-002 | 카메라 컨트롤 | OrbitControls를 통한 회전, 확대/축소, 이동 | P0 |
| VR-003 | 자동 회전 | 3D 모델 자동 회전 토글 기능 | P1 |
| VR-004 | 줌 인/아웃 | 상품 확대/축소 컨트롤 | P0 |
| VR-005 | 전체화면 모드 | Fullscreen API를 활용한 전체화면 뷰 | P1 |
| VR-006 | 이미지 저장 | 현재 3D 뷰를 이미지로 저장 (PNG/JPEG) | P2 |
| VR-007 | 배경/바닥 커스터마이징 | Environment Map 및 바닥 텍스처 설정 | P1 |

#### 2.1.2 상품 인터랙션
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| VR-008 | 상품 선택 | 클릭/터치로 3D 상품 선택 및 포커스 이동 | P0 |
| VR-009 | 상품 하이라이트 | 선택된 상품 Outline/Glow 효과 | P1 |
| VR-010 | 조립 단계 보기 | 상품 조립 과정을 단계별로 시각화 | P1 |
| VR-011 | 상품 목록 패널 | Sheet 컴포넌트로 상품 정보 표시 | P0 |
| VR-012 | 유튜브 연동 | 상품 관련 유튜브 영상 임베드 | P2 |
| VR-013 | 매뉴얼 뷰어 | 제품 매뉴얼/프로그램 북 뷰어 | P1 |

#### 2.1.3 반응형 지원
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| VR-014 | 모바일 대응 | 터치 이벤트 및 orientation 변경 대응 | P0 |
| VR-015 | 뷰포트 조정 | 화면 크기에 따른 캔버스 자동 조정 | P0 |

---

### 2.2 DotArt (도트아트 창작)

#### 2.2.1 2D 에디터
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| DA-001 | 픽셀 에디터 | Canvas API 기반 픽셀 아트 편집 | P0 |
| DA-002 | 컬러 팔레트 | 다양한 색상 선택 (36+ 색상) | P0 |
| DA-003 | 음악 모드 | 색상별 음계 연동 (Tone.js) | P2 |
| DA-004 | 이미지 가져오기 | 외부 이미지를 픽셀아트로 변환 | P1 |
| DA-005 | 스냅샷 저장 | 작업물 스냅샷 이미지 저장 | P1 |
| DA-006 | 썸네일 편집 | 커버 이미지 편집 기능 | P1 |

#### 2.2.2 3D 뷰어
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| DA-007 | 3D 도트아트 렌더링 | 2D 픽셀아트를 3D 복셀로 변환 표시 | P0 |
| DA-008 | 블록 이미지 다이얼로그 | 블록 조립 가이드 이미지 표시 | P1 |
| DA-009 | GLTF 내보내기 | 3D 모델 파일 내보내기 | P2 |

#### 2.2.3 저장 마법사 (Save Wizard)
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| DA-013 | 저장 마법사 UI | 단계별 저장 워크플로우 (작품 정보 → 공개 설정 → 검토 → 완료) | P0 |
| DA-014 | 작품 정보 입력 | 제목, 설명, 카테고리 선택, 태그 입력 | P0 |
| DA-015 | 썸네일 자동 생성 | Canvas에서 현재 작품 이미지 캡처 | P0 |
| DA-016 | 공개 설정 | 공개 범위 선택 (전체 공개/링크 공유/비공개) | P0 |
| DA-017 | 라이선스 설정 | 허용 권한 선택 (보기/다운로드/수정·리믹스/상업적 이용) | P1 |
| DA-018 | 저장 검토 | 입력 정보 최종 확인 및 수정 | P0 |

#### 2.2.4 커뮤니티
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| DA-019 | 리믹스 카드 | 다른 사용자 작품 리믹스 | P1 |
| DA-020 | 블랙리스트 관리 | 부적절한 사용자 차단 | P2 |
| DA-021 | 학교 도트아트 | 학교별 도트아트 목록 및 관리 | P1 |

---

### 2.3 Creation (창작)

#### 2.3.1 창작 에디터
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CR-001 | 창작물 에디터 | 3D 창작물 편집 기능 | P0 |
| CR-002 | 창작물 속성 패널 | 창작물 메타데이터 편집 | P0 |
| CR-003 | 창작물 목록 패널 | 창작물 요소 목록 관리 | P1 |
| CR-004 | 세트명 설정 | 창작물 세트명 지정 다이얼로그 | P1 |
| CR-005 | 창작물 정보 | 창작물 상세 정보 표시 | P1 |

#### 2.3.2 창작 뷰어
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CR-006 | 3D 창작물 뷰어 | 완성된 창작물 3D 렌더링 | P0 |
| CR-007 | 창작물 속성 패널 | 뷰어용 속성 표시 패널 | P1 |
| CR-008 | 영상 다이얼로그 | 창작물 관련 영상 표시 | P2 |

#### 2.3.3 저장 마법사 (Save Wizard)
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CR-009 | 저장 마법사 UI | 단계별 저장 워크플로우 (작품 정보 → 공개 설정 → 검토 → 완료) | P0 |
| CR-010 | 작품 정보 입력 | 제목, 설명, 카테고리 선택, 태그 입력 | P0 |
| CR-011 | 썸네일 자동 생성 | 3D 렌더러에서 현재 작품 이미지 캡처 | P0 |
| CR-012 | 공개 설정 | 공개 범위 선택 (전체 공개/링크 공유/비공개) | P0 |
| CR-013 | 라이선스 설정 | 허용 권한 선택 (보기/다운로드/수정·리믹스/상업적 이용) | P1 |
| CR-014 | 저장 검토 | 입력 정보 최종 확인 및 수정 | P0 |

#### 2.3.4 창작 커뮤니티
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CR-015 | 창작물 목록 | 커뮤니티 창작물 목록 표시 | P0 |
| CR-016 | 창작물 카드 | 창작물 미리보기 카드 | P0 |
| CR-017 | 리믹스 기능 | 다른 사용자 창작물 리믹스 | P1 |
| CR-018 | 블랙리스트 | 부적절한 사용자 관리 | P2 |

---

### 2.4 상품 관리 (Products)

#### 2.4.1 상품 목록
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| PD-001 | 상품 목록 조회 | 무한 스크롤/페이지네이션 상품 목록 | P0 |
| PD-002 | 상품 상세 | 개별 상품 상세 정보 페이지 | P0 |
| PD-003 | 상품 세트 목록 | 상품 세트 목록 및 정보 | P1 |
| PD-004 | 상품 패키지 목록 | 패키지 상품 목록 및 정보 | P1 |
| PD-005 | 상품 대여 목록 | 대여 가능 상품 목록 및 정보 | P2 |
| PD-006 | 상품 검색 | 상품명, 카테고리 검색 | P0 |

#### 2.4.2 상품 카드
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| PD-007 | 상품 카드 | 상품 미리보기 카드 컴포넌트 | P0 |
| PD-008 | 상품 카드 그리드 | 그리드 레이아웃 상품 표시 | P0 |
| PD-009 | 상품 카드 다이얼로그 | 상품 빠른 보기 Sheet | P1 |
| PD-010 | 도트 상품 뷰 | 도트아트 기반 상품 표시 | P2 |

---

### 2.5 장바구니 및 결제 (Cart & Payment)

#### 2.5.1 장바구니
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CT-001 | 장바구니 조회 | 사용자별 장바구니 목록 | P0 |
| CT-002 | 장바구니 추가/삭제 | Server Action으로 장바구니 조작 | P0 |
| CT-003 | 수량 변경 | Optimistic Update로 수량 수정 | P0 |
| CT-004 | 장바구니 제한 | 최대 상품 수 제한 | P1 |
| CT-005 | 장바구니 유지 | 서버 세션 기반 장바구니 유지 | P0 |
| CT-006 | 최종 금액 계산 | 장바구니 총 금액 계산 | P0 |
| CT-007 | 배송비 계산 | 수량/금액 기반 배송비 계산 | P1 |

#### 2.5.2 결제
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| PM-001 | 결제 페이지 | 결제 정보 입력 및 확인 | P0 |
| PM-002 | PG 연동 | 토스페이먼츠/포트원 결제 연동 | P0 |
| PM-003 | 포인트 사용 | 적립 포인트 결제 시 사용 | P1 |
| PM-004 | 배송지 관리 | 배송지 주소 입력 및 관리 | P0 |
| PM-005 | 주소 검색 | 도로명 주소 API 연동 | P0 |
| PM-006 | 결제 결과 | 결제 완료/실패 결과 페이지 | P0 |
| PM-007 | 최종 결제 금액 | 할인, 포인트 적용 후 최종 금액 | P0 |

#### 2.5.3 쿠폰 시스템
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CP-001 | 쿠폰 적용 | 정액/정률 쿠폰 적용 | P1 |
| CP-002 | 쿠폰 적용 불가 상품 | 쿠폰 적용 불가 상품 구분 | P1 |
| CP-003 | 자동 쿠폰 적용 | 최적 쿠폰 자동 적용 | P2 |
| CP-004 | 쿠폰 태그 | 쿠폰 적용 가능 여부 Badge 표시 | P1 |

---

### 2.6 사용자 관리 (User Management)

#### 2.6.1 인증
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| US-001 | 이메일 로그인 | Credentials Provider 로그인 | P0 |
| US-002 | 카카오 로그인 | OAuth 2.0 소셜 로그인 | P0 |
| US-003 | JWT 토큰 | Access/Refresh Token 관리 | P0 |
| US-004 | 회원가입 | Server Action 기반 회원 등록 | P0 |
| US-005 | 비밀번호 재설정 | 이메일 기반 비밀번호 초기화 | P0 |
| US-006 | 비밀번호 변경 | 로그인 후 비밀번호 변경 | P1 |
| US-007 | 로그아웃 | 토큰 무효화 및 로그아웃 | P0 |
| US-008 | IP 접근 제한 | 허용된 IP에서만 로그인 | P2 |
| US-009 | 동시 접속 제한 | 세션 수 제한 | P2 |

#### 2.6.2 마이페이지
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| US-010 | 주문 내역 | 주문 내역 조회 및 관리 | P0 |
| US-011 | 주문 결과 | 주문 상세 결과 페이지 | P0 |
| US-012 | 내 VR Mall | 사용자 생성 VR Mall 목록 | P1 |
| US-013 | 계정 정보 | 사용자 계정 정보 관리 | P0 |

#### 2.6.3 판매자 기능
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| US-014 | 상품 관리 | 상품 등록/수정/삭제 (RBAC) | P0 |
| US-015 | 상품 추가 다이얼로그 | 신규 상품 등록 Dialog | P0 |
| US-016 | 주문 관리 | 수신 주문 관리 DataTable | P0 |
| US-017 | 배송 정책 관리 | 배송비 정책 설정 | P1 |

---

### 2.7 매뉴얼 (Manuals)

#### 2.7.1 매뉴얼 목록
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| MN-001 | 매뉴얼 목록 | 제품 매뉴얼 목록 조회 | P1 |
| MN-002 | 매뉴얼 카드 | 매뉴얼 미리보기 카드 | P1 |
| MN-003 | 매뉴얼 카드 리스트 | 매뉴얼 카드 목록 표시 | P1 |

#### 2.7.2 매뉴얼 뷰어
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| MN-004 | 매뉴얼 상세 | 매뉴얼 상세 페이지 | P1 |
| MN-005 | PDF 뷰어 | react-pdf 기반 매뉴얼 뷰어 | P1 |
| MN-006 | 매뉴얼 다이얼로그 | 모달 형태 매뉴얼 뷰어 | P2 |
| MN-007 | 프로그램 북 | 프로그램 관련 매뉴얼 뷰어 | P2 |

---

### 2.8 고객센터 (Help Center)

#### 2.8.1 공지사항
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| HP-001 | 공지사항 목록 | 공지사항 DataTable 조회 | P0 |
| HP-002 | 공지사항 작성 | 관리자 공지사항 작성 (MDX) | P1 |
| HP-003 | 공지사항 상세 | 공지사항 상세 내용 | P0 |

#### 2.8.2 FAQ
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| HP-004 | FAQ 목록 | Accordion 형태 FAQ 목록 | P0 |
| HP-005 | FAQ 작성 | 관리자 FAQ 작성 | P1 |

#### 2.8.3 QnA
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| HP-006 | QnA 목록 | 고객 문의 목록 | P0 |
| HP-007 | QnA 작성 | 고객 문의 등록 (Form) | P0 |
| HP-008 | QnA 답변 | 관리자 문의 답변 | P1 |

---

### 2.9 정책 페이지 (Policy)

| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| PL-001 | 이용약관 | 서비스 이용약관 페이지 (MDX) | P0 |
| PL-002 | 개인정보처리방침 | 개인정보 처리방침 페이지 (MDX) | P0 |

---

### 2.10 클래스 (Class)

> 체험수업, 방과후수업, 원데이클래스, 정기클래스 등 오프라인 교육 프로그램 관리

#### 2.10.1 클래스 목록
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CL-001 | 클래스 목록 조회 | 카테고리별 클래스 목록 (무한 스크롤) | P0 |
| CL-002 | 클래스 카드 | 클래스 미리보기 카드 (썸네일, 정보, 상태) | P0 |
| CL-003 | 클래스 필터 | 카테고리, 지역, 대상연령, 일정 필터 | P1 |
| CL-004 | 클래스 검색 | 클래스명, 강사명, 지역 검색 | P0 |
| CL-005 | 다가오는 클래스 | 예정된 클래스 일정 표시 | P1 |

#### 2.10.2 클래스 상세
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CL-006 | 클래스 상세 정보 | 클래스 소개, 커리큘럼, 일정, 장소 | P0 |
| CL-007 | 강사 정보 | 강사 프로필 및 소개 | P0 |
| CL-008 | 수강 후기 | 수강생 리뷰 및 평점 | P1 |
| CL-009 | 일정 선택 | 수업 일정 선택 (잔여석 표시) | P0 |
| CL-010 | 위치 정보 | 수업 장소 지도 및 주소 | P1 |

#### 2.10.3 클래스 신청
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| CL-011 | 일정 선택 | 원하는 수업 일정 선택 | P0 |
| CL-012 | 참여자 정보 입력 | 참여 학생 정보 입력 (이름, 생년월일, 특이사항) | P0 |
| CL-013 | 보호자 정보 입력 | 보호자 연락처 및 비상연락처 | P0 |
| CL-014 | 결제 진행 | 수업료 결제 (PG 연동) | P0 |
| CL-015 | 신청 확인 | 신청 완료 및 확인 정보 | P0 |

#### 2.10.4 클래스 카테고리
| 카테고리 | 설명 |
|----------|------|
| 체험수업 | 일회성 체험 프로그램 |
| 방과후수업 | 학교 연계 정기 수업 |
| 원데이클래스 | 단일 일정 특별 수업 |
| 정기클래스 | 월 단위 정기 수업 |

---

### 2.11 메인 페이지 (Main)

#### 2.11.1 메인 뷰
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| MA-001 | 메인 캐러셀 | Embla Carousel 배너 슬라이드 | P0 |
| MA-002 | VR Mall 카드 리스트 | 추천 VR Mall 목록 | P0 |
| MA-003 | 상품 카드 리스트 | 추천 상품 목록 | P0 |
| MA-004 | 매뉴얼 카드 리스트 | 추천 매뉴얼 목록 | P1 |
| MA-005 | 상품 세트 카드 리스트 | 추천 상품 세트 목록 | P1 |

#### 2.11.2 검색
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| MA-006 | 통합 검색 | 상품/VR Mall/매뉴얼 통합 검색 | P0 |
| MA-007 | 검색 자동완성 | Command 컴포넌트 기반 자동완성 | P2 |
| MA-008 | 검색 결과 | 검색 결과 페이지 | P0 |

#### 2.11.3 상점
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| MA-009 | 상점 뷰 | 상점 정보 페이지 | P1 |
| MA-010 | 상점 카드 | 상점 미리보기 카드 | P1 |
| MA-011 | 상점 검색 | 상점 검색 기능 | P2 |

---

### 2.12 관리자 (Admin)

#### 2.12.1 대시보드
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-001 | 대시보드 메인 | 핵심 지표 요약 (매출, 주문, 회원, 방문자) | P0 |
| AD-002 | 매출 차트 | 일별/주별/월별 매출 추이 차트 (Recharts) | P0 |
| AD-003 | 주문 현황 | 최근 주문 목록 및 상태별 통계 | P0 |
| AD-004 | 실시간 알림 | 신규 주문/문의 실시간 알림 (WebSocket) | P1 |
| AD-005 | 퀵 액션 | 빠른 작업 바로가기 (상품 등록, 주문 확인 등) | P1 |

#### 2.12.2 회원 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-006 | 회원 목록 | 회원 목록 DataTable (검색, 필터, 정렬) | P0 |
| AD-007 | 회원 상세 | 회원 상세 정보 조회/수정 | P0 |
| AD-008 | 회원 등급 관리 | 회원 등급 설정 및 혜택 관리 | P1 |
| AD-009 | 회원 포인트 관리 | 포인트 지급/차감/이력 조회 | P1 |
| AD-010 | 회원 상태 관리 | 회원 활성화/비활성화/잠금 처리 | P0 |
| AD-011 | 회원 통계 | 가입 추이, 활성 사용자 통계 | P2 |

#### 2.12.3 상품 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-012 | 상품 목록 | 상품 목록 DataTable (검색, 카테고리 필터) | P0 |
| AD-013 | 상품 등록 | 상품 등록 폼 (이미지, 3D 모델 업로드) | P0 |
| AD-014 | 상품 수정 | 상품 정보 수정 (가격, 재고, 설명) | P0 |
| AD-015 | 상품 삭제 | 상품 삭제 (소프트 삭제) | P0 |
| AD-016 | 상품 세트 관리 | 상품 세트 CRUD | P1 |
| AD-017 | 상품 패키지 관리 | 패키지 상품 CRUD | P1 |
| AD-018 | 대여 상품 관리 | 대여 상품 CRUD 및 대여 현황 | P2 |
| AD-019 | 카테고리 관리 | 상품 카테고리 CRUD | P0 |
| AD-020 | 재고 관리 | 재고 현황 및 알림 설정 | P1 |
| AD-021 | 상품 일괄 등록 | 엑셀/CSV 일괄 업로드 | P2 |

#### 2.12.4 주문 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-022 | 주문 목록 | 주문 목록 DataTable (상태별 필터) | P0 |
| AD-023 | 주문 상세 | 주문 상세 정보 (상품, 배송, 결제) | P0 |
| AD-024 | 주문 상태 변경 | 주문 상태 업데이트 (확인/배송/완료/취소) | P0 |
| AD-025 | 송장 번호 입력 | 배송 송장 번호 등록 | P0 |
| AD-026 | 주문 취소/환불 | 주문 취소 및 환불 처리 | P0 |
| AD-027 | 주문 메모 | 관리자 메모 기능 | P1 |
| AD-028 | 주문 내보내기 | 주문 데이터 엑셀 내보내기 | P1 |
| AD-029 | 배송 정책 설정 | 배송비 정책 및 무료 배송 조건 설정 | P1 |

#### 2.12.5 VR Mall 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-030 | VR Mall 목록 | VR Mall 목록 DataTable | P0 |
| AD-031 | VR Mall 상세 | VR Mall 상세 정보 조회 | P0 |
| AD-032 | VR Mall 승인 | 사용자 VR Mall 승인/반려 | P1 |
| AD-033 | VR Mall 삭제 | 부적절한 VR Mall 삭제 | P1 |
| AD-034 | 추천 VR Mall 설정 | 메인 페이지 추천 VR Mall 설정 | P1 |

#### 2.12.6 콘텐츠 관리 (DotArt / Creation)
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-035 | DotArt 목록 | DotArt 콘텐츠 목록 DataTable | P1 |
| AD-036 | DotArt 검토 | DotArt 콘텐츠 검토/승인/삭제 | P1 |
| AD-037 | Creation 목록 | Creation 콘텐츠 목록 DataTable | P1 |
| AD-038 | Creation 검토 | Creation 콘텐츠 검토/승인/삭제 | P1 |
| AD-039 | 신고 관리 | 신고된 콘텐츠 검토 및 처리 | P1 |
| AD-040 | 추천 콘텐츠 설정 | 메인 페이지 추천 콘텐츠 설정 | P2 |

#### 2.12.7 클래스 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-068 | 클래스 목록 | 클래스 목록 DataTable (카테고리, 상태별 필터) | P0 |
| AD-069 | 클래스 등록 | 클래스 등록 폼 (정보, 일정, 장소) | P0 |
| AD-070 | 클래스 수정 | 클래스 정보 수정 | P0 |
| AD-071 | 클래스 삭제 | 클래스 삭제 (소프트 삭제) | P0 |
| AD-072 | 일정 관리 | 클래스 일정 CRUD (정원, 상태) | P0 |
| AD-073 | 신청자 목록 | 일정별 신청자 목록 조회 | P0 |
| AD-074 | 신청 상태 관리 | 신청 승인/취소/환불 처리 | P0 |
| AD-075 | 강사 관리 | 강사 정보 CRUD | P1 |
| AD-076 | 장소 관리 | 수업 장소 CRUD | P1 |
| AD-077 | 출석 관리 | 수강생 출석 체크 | P1 |
| AD-078 | 클래스 통계 | 클래스별 신청/출석/매출 통계 | P1 |

#### 2.12.8 매뉴얼 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-041 | 매뉴얼 목록 | 매뉴얼 목록 DataTable | P1 |
| AD-042 | 매뉴얼 등록 | 매뉴얼 등록 (PDF 업로드) | P1 |
| AD-043 | 매뉴얼 수정 | 매뉴얼 정보 수정 | P1 |
| AD-044 | 매뉴얼 삭제 | 매뉴얼 삭제 | P1 |
| AD-045 | 프로그램 북 관리 | 프로그램 북 CRUD | P2 |

#### 2.12.9 고객센터 관리
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-046 | 공지사항 관리 | 공지사항 CRUD (MDX 에디터) | P0 |
| AD-047 | FAQ 관리 | FAQ CRUD | P0 |
| AD-048 | QnA 목록 | 고객 문의 목록 (상태별 필터) | P0 |
| AD-049 | QnA 답변 | 고객 문의 답변 작성 | P0 |
| AD-050 | 답변 템플릿 | 자주 쓰는 답변 템플릿 관리 | P2 |

#### 2.12.10 프로모션/마케팅
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-051 | 쿠폰 관리 | 쿠폰 CRUD (정액/정률, 유효기간) | P1 |
| AD-052 | 쿠폰 발급 | 회원 대상 쿠폰 발급 | P1 |
| AD-053 | 배너 관리 | 메인 배너 CRUD (순서, 링크) | P0 |
| AD-054 | 팝업 관리 | 팝업 공지 CRUD | P1 |
| AD-055 | 이벤트 관리 | 이벤트 페이지 CRUD | P2 |

#### 2.12.11 통계/리포트
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-056 | 매출 리포트 | 일별/월별/연별 매출 리포트 | P0 |
| AD-057 | 상품 통계 | 상품별 판매량, 인기 상품 분석 | P1 |
| AD-058 | 회원 통계 | 회원 가입/탈퇴 추이, 활성 사용자 | P1 |
| AD-059 | 방문자 통계 | 페이지 뷰, 방문자 수, 유입 경로 | P2 |
| AD-060 | 리포트 내보내기 | 리포트 PDF/엑셀 내보내기 | P2 |

#### 2.12.12 시스템 설정
| ID | 기능명 | 설명 | 우선순위 |
|----|--------|------|----------|
| AD-061 | 사이트 설정 | 사이트명, 로고, 연락처 설정 | P0 |
| AD-062 | 약관 관리 | 이용약관, 개인정보처리방침 수정 | P0 |
| AD-063 | 관리자 계정 관리 | 관리자 계정 CRUD 및 권한 설정 | P0 |
| AD-064 | 권한 관리 | 역할(Role) 기반 권한 설정 (RBAC) | P1 |
| AD-065 | 접근 로그 | 관리자 활동 로그 조회 | P1 |
| AD-066 | 시스템 로그 | 시스템 에러/이벤트 로그 조회 | P2 |
| AD-067 | 백업 관리 | 데이터 백업 설정 및 복원 | P2 |

---

## 3. 공통 컴포넌트

### 3.1 레이아웃
| ID | 컴포넌트명 | 설명 |
|----|-----------|------|
| CM-001 | RootLayout | App Router 루트 레이아웃 |
| CM-002 | Header | 메인 헤더 (Navigation, Search, Auth) |
| CM-003 | Footer | 메인 푸터 (링크, 저작권) |
| CM-004 | Sidebar | 사이드바 네비게이션 |

### 3.2 UI 컴포넌트 (shadcn/ui)
| ID | 컴포넌트명 | 설명 |
|----|-----------|------|
| CM-005 | Button | 버튼 컴포넌트 |
| CM-006 | Card | 카드 컴포넌트 |
| CM-007 | Dialog | 모달 다이얼로그 |
| CM-008 | Sheet | 사이드 패널 |
| CM-009 | Form | React Hook Form 통합 폼 |
| CM-010 | Input | 입력 필드 |
| CM-011 | Select | 선택 드롭다운 |
| CM-012 | DataTable | TanStack Table 데이터 테이블 |
| CM-013 | Badge | 뱃지/태그 |
| CM-014 | Toast | 토스트 알림 (Sonner) |
| CM-015 | Skeleton | 로딩 스켈레톤 |
| CM-016 | Command | 명령 팔레트 (검색) |
| CM-017 | Accordion | 아코디언 (FAQ) |
| CM-018 | Carousel | 캐러셀 (Embla) |

### 3.3 3D 컴포넌트
| ID | 컴포넌트명 | 설명 |
|----|-----------|------|
| CM-019 | Canvas3D | React Three Fiber 캔버스 |
| CM-020 | ModelViewer | GLTF 모델 뷰어 |
| CM-021 | OrbitControls | 카메라 컨트롤 |
| CM-022 | Environment | 환경 맵/조명 |

### 3.4 관리자 컴포넌트
| ID | 컴포넌트명 | 설명 |
|----|-----------|------|
| CM-023 | AdminLayout | 관리자 레이아웃 (Sidebar + Header) |
| CM-024 | AdminSidebar | 관리자 사이드바 네비게이션 |
| CM-025 | AdminHeader | 관리자 헤더 (알림, 프로필) |
| CM-026 | StatCard | 통계 카드 (숫자, 추이) |
| CM-027 | ChartCard | 차트 카드 (Recharts) |
| CM-028 | DataTableAdvanced | 고급 DataTable (필터, 정렬, 페이지네이션) |
| CM-029 | ImageUploader | 이미지 업로드 (드래그앤드롭, 미리보기) |
| CM-030 | FileUploader | 파일 업로드 (3D 모델, PDF) |
| CM-031 | RichTextEditor | 리치 텍스트 에디터 (MDX) |
| CM-032 | DateRangePicker | 날짜 범위 선택 |
| CM-033 | StatusBadge | 상태 뱃지 (주문, 회원, 콘텐츠) |
| CM-034 | ConfirmDialog | 확인 다이얼로그 (삭제, 변경) |
| CM-035 | ExportButton | 데이터 내보내기 버튼 (엑셀, PDF) |
| CM-036 | BulkActionBar | 일괄 작업 액션 바 |
| CM-037 | ActivityLog | 활동 로그 컴포넌트 |
| CM-038 | NotificationBell | 알림 벨 (실시간 알림) |

---

## 4. 데이터 모델

### 4.1 VrMall
```typescript
interface VrMall {
  id: string;
  userId: string;
  categoryId?: string;
  name: string;
  description?: string;
  coverImage?: string;
  likeCount: number;
  commentCount: number;
  backgroundPath?: string;
  groundPath?: string;
  cameraPosition?: { x: number; y: number; z: number };
  cameraTarget?: { x: number; y: number; z: number };
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Shop
```typescript
interface Shop {
  id: string;
  name: string;
  alias?: string;
  coverImage?: string;
  description?: string;
  managerId: string;
  address?: string;
  detailAddress?: string;
  zipCode?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.3 Product
```typescript
interface Product {
  id: string;
  shopId: string;
  categoryId?: string;
  name: string;
  price: number;
  stock: number;
  vrModelPath?: string;
  coverImage?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.4 User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate?: Date;
  address?: string;
  detailAddress?: string;
  zipCode?: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  role: 'USER' | 'SELLER' | 'ADMIN';
  shopId?: string;
  point: number;
  loginAttempts: number;
  lockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.5 Class (클래스)
```typescript
interface Class {
  id: string;
  categoryId: string;           // 체험수업, 방과후수업, 원데이클래스, 정기클래스
  instructorId: string;
  venueId: string;
  title: string;
  description?: string;
  coverImage?: string;
  targetAge: string;            // 대상 연령 (예: "초등 1-3학년")
  duration: number;             // 수업 시간 (분)
  maxParticipants: number;      // 최대 정원
  price: number;                // 수업료
  priceUnit: 'PER_SESSION' | 'PER_MONTH';  // 회당 or 월
  curriculum?: CurriculumItem[];
  status: 'DRAFT' | 'ACTIVE' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

interface ClassSchedule {
  id: string;
  classId: string;
  startDate: Date;
  endDate: Date;
  dayOfWeek?: number[];         // 정기 클래스용 요일 (0=일, 1=월, ...)
  startTime: string;            // "10:00"
  endTime: string;              // "12:00"
  currentParticipants: number;
  maxParticipants: number;
  status: 'OPEN' | 'CLOSED' | 'FULL' | 'CANCELLED';
  createdAt: Date;
}

interface ClassEnrollment {
  id: string;
  scheduleId: string;
  userId: string;               // 신청자 (보호자)
  participantName: string;
  participantBirthDate: Date;
  participantGender?: 'MALE' | 'FEMALE';
  school?: string;
  notes?: string;               // 특이사항
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  emergencyPhone?: string;
  paymentId?: string;
  amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';
  attendanceStatus?: 'ATTENDED' | 'ABSENT' | 'LATE';
  createdAt: Date;
  updatedAt: Date;
}

interface Instructor {
  id: string;
  name: string;
  title?: string;               // 직함 (예: "레고 공인 강사")
  profileImage?: string;
  bio?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
}

interface ClassReview {
  id: string;
  classId: string;
  enrollmentId: string;
  userId: string;
  rating: number;               // 1-5
  content?: string;
  createdAt: Date;
}

interface CurriculumItem {
  order: number;
  title: string;
  description?: string;
  duration?: number;            // 분
}
```

---

## 5. API 설계

### 5.1 REST API (Spring Boot)

#### VR Mall API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/vrmalls` | VR Mall 목록 조회 |
| GET | `/api/v1/vrmalls/{id}` | VR Mall 상세 조회 |
| POST | `/api/v1/vrmalls` | VR Mall 생성 |
| PUT | `/api/v1/vrmalls/{id}` | VR Mall 수정 |
| DELETE | `/api/v1/vrmalls/{id}` | VR Mall 삭제 |

#### Product API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/products` | 상품 목록 조회 |
| GET | `/api/v1/products/{id}` | 상품 상세 조회 |
| POST | `/api/v1/products` | 상품 생성 |
| PUT | `/api/v1/products/{id}` | 상품 수정 |
| DELETE | `/api/v1/products/{id}` | 상품 삭제 |

#### Cart API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/cart` | 장바구니 조회 |
| POST | `/api/v1/cart/items` | 장바구니 추가 |
| PUT | `/api/v1/cart/items/{id}` | 장바구니 수량 변경 |
| DELETE | `/api/v1/cart/items/{id}` | 장바구니 삭제 |

#### Order API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/orders` | 주문 목록 조회 |
| GET | `/api/v1/orders/{id}` | 주문 상세 조회 |
| POST | `/api/v1/orders` | 주문 생성 |

#### Auth API
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/v1/auth/login` | 로그인 |
| POST | `/api/v1/auth/register` | 회원가입 |
| POST | `/api/v1/auth/refresh` | 토큰 갱신 |
| POST | `/api/v1/auth/logout` | 로그아웃 |

#### Class API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/classes` | 클래스 목록 조회 |
| GET | `/api/v1/classes/{id}` | 클래스 상세 조회 |
| GET | `/api/v1/classes/{id}/schedules` | 클래스 일정 목록 |
| GET | `/api/v1/classes/{id}/reviews` | 클래스 리뷰 목록 |
| POST | `/api/v1/classes/{id}/reviews` | 클래스 리뷰 작성 |
| GET | `/api/v1/classes/upcoming` | 다가오는 클래스 목록 |
| GET | `/api/v1/instructors/{id}` | 강사 정보 조회 |
| GET | `/api/v1/venues/{id}` | 장소 정보 조회 |

#### Class Enrollment API
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/v1/enrollments` | 클래스 신청 |
| GET | `/api/v1/enrollments` | 내 신청 목록 |
| GET | `/api/v1/enrollments/{id}` | 신청 상세 조회 |
| POST | `/api/v1/enrollments/{id}/cancel` | 신청 취소 |

#### Admin Dashboard API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/dashboard` | 대시보드 통계 |
| GET | `/api/v1/admin/dashboard/sales` | 매출 차트 데이터 |
| GET | `/api/v1/admin/dashboard/orders` | 최근 주문 현황 |

#### Admin User API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/users` | 회원 목록 조회 |
| GET | `/api/v1/admin/users/{id}` | 회원 상세 조회 |
| PUT | `/api/v1/admin/users/{id}` | 회원 정보 수정 |
| PUT | `/api/v1/admin/users/{id}/status` | 회원 상태 변경 |
| POST | `/api/v1/admin/users/{id}/points` | 포인트 지급/차감 |

#### Admin Product API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/products` | 상품 목록 (관리자) |
| POST | `/api/v1/admin/products` | 상품 등록 |
| PUT | `/api/v1/admin/products/{id}` | 상품 수정 |
| DELETE | `/api/v1/admin/products/{id}` | 상품 삭제 |
| POST | `/api/v1/admin/products/bulk` | 상품 일괄 등록 |
| GET | `/api/v1/admin/categories` | 카테고리 목록 |
| POST | `/api/v1/admin/categories` | 카테고리 등록 |

#### Admin Order API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/orders` | 주문 목록 (관리자) |
| GET | `/api/v1/admin/orders/{id}` | 주문 상세 (관리자) |
| PUT | `/api/v1/admin/orders/{id}/status` | 주문 상태 변경 |
| PUT | `/api/v1/admin/orders/{id}/tracking` | 송장 번호 등록 |
| POST | `/api/v1/admin/orders/{id}/refund` | 환불 처리 |

#### Admin Content API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/vrmalls` | VR Mall 목록 (관리자) |
| PUT | `/api/v1/admin/vrmalls/{id}/status` | VR Mall 상태 변경 |
| GET | `/api/v1/admin/dotarts` | DotArt 목록 (관리자) |
| PUT | `/api/v1/admin/dotarts/{id}/status` | DotArt 상태 변경 |
| GET | `/api/v1/admin/creations` | Creation 목록 (관리자) |
| GET | `/api/v1/admin/reports` | 신고 목록 |
| PUT | `/api/v1/admin/reports/{id}` | 신고 처리 |

#### Admin Support API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/notices` | 공지사항 목록 |
| POST | `/api/v1/admin/notices` | 공지사항 등록 |
| PUT | `/api/v1/admin/notices/{id}` | 공지사항 수정 |
| DELETE | `/api/v1/admin/notices/{id}` | 공지사항 삭제 |
| GET | `/api/v1/admin/faqs` | FAQ 목록 |
| POST | `/api/v1/admin/faqs` | FAQ 등록 |
| GET | `/api/v1/admin/qnas` | QnA 목록 (관리자) |
| POST | `/api/v1/admin/qnas/{id}/answer` | QnA 답변 등록 |

#### Admin Class API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/classes` | 클래스 목록 (관리자) |
| POST | `/api/v1/admin/classes` | 클래스 등록 |
| GET | `/api/v1/admin/classes/{id}` | 클래스 상세 (관리자) |
| PUT | `/api/v1/admin/classes/{id}` | 클래스 수정 |
| DELETE | `/api/v1/admin/classes/{id}` | 클래스 삭제 |
| GET | `/api/v1/admin/classes/{id}/schedules` | 일정 목록 (관리자) |
| POST | `/api/v1/admin/classes/{id}/schedules` | 일정 등록 |
| PUT | `/api/v1/admin/schedules/{id}` | 일정 수정 |
| DELETE | `/api/v1/admin/schedules/{id}` | 일정 삭제 |
| GET | `/api/v1/admin/schedules/{id}/enrollments` | 신청자 목록 |
| PUT | `/api/v1/admin/enrollments/{id}/status` | 신청 상태 변경 |
| PUT | `/api/v1/admin/enrollments/{id}/attendance` | 출석 체크 |
| GET | `/api/v1/admin/instructors` | 강사 목록 |
| POST | `/api/v1/admin/instructors` | 강사 등록 |
| PUT | `/api/v1/admin/instructors/{id}` | 강사 수정 |
| GET | `/api/v1/admin/venues` | 장소 목록 |
| POST | `/api/v1/admin/venues` | 장소 등록 |
| PUT | `/api/v1/admin/venues/{id}` | 장소 수정 |

#### Admin Marketing API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/coupons` | 쿠폰 목록 |
| POST | `/api/v1/admin/coupons` | 쿠폰 생성 |
| POST | `/api/v1/admin/coupons/{id}/issue` | 쿠폰 발급 |
| GET | `/api/v1/admin/banners` | 배너 목록 |
| POST | `/api/v1/admin/banners` | 배너 등록 |
| PUT | `/api/v1/admin/banners/{id}` | 배너 수정 |

#### Admin Reports API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/reports/sales` | 매출 리포트 |
| GET | `/api/v1/admin/reports/products` | 상품 통계 |
| GET | `/api/v1/admin/reports/users` | 회원 통계 |
| GET | `/api/v1/admin/reports/visitors` | 방문자 통계 |
| GET | `/api/v1/admin/reports/export` | 리포트 내보내기 |

#### Admin Settings API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/v1/admin/settings` | 사이트 설정 조회 |
| PUT | `/api/v1/admin/settings` | 사이트 설정 수정 |
| GET | `/api/v1/admin/admins` | 관리자 목록 |
| POST | `/api/v1/admin/admins` | 관리자 등록 |
| GET | `/api/v1/admin/roles` | 권한 목록 |
| POST | `/api/v1/admin/roles` | 권한 생성 |
| GET | `/api/v1/admin/logs` | 활동 로그 조회 |

### 5.2 Server Actions (Next.js)

```typescript
// app/actions/cart.ts
'use server'

export async function addToCart(productId: string, quantity: number) {
  // 서버 측 장바구니 추가 로직
}

export async function updateCartItem(itemId: string, quantity: number) {
  // 서버 측 수량 변경 로직
}

export async function removeFromCart(itemId: string) {
  // 서버 측 장바구니 삭제 로직
}
```

```typescript
// app/actions/order.ts
'use server'

export async function createOrder(formData: FormData) {
  // 서버 측 주문 생성 로직
  revalidatePath('/orders')
  redirect('/orders/complete')
}
```

---

## 6. 라우팅 구조 (App Router)

### 6.1 디렉토리 구조
```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── password-reset/page.tsx
├── (main)/
│   ├── page.tsx                    # 메인
│   ├── search/page.tsx             # 검색
│   ├── products/
│   │   ├── page.tsx                # 상품 목록
│   │   └── [id]/page.tsx           # 상품 상세
│   ├── vrmalls/
│   │   ├── page.tsx                # VR Mall 목록
│   │   └── [id]/page.tsx           # VR Mall 뷰어
│   ├── dotarts/
│   │   ├── page.tsx                # 도트아트 목록
│   │   ├── editor/[id]/page.tsx    # 에디터
│   │   └── view/[id]/page.tsx      # 뷰어
│   ├── creations/
│   │   ├── page.tsx                # 창작물 목록
│   │   ├── editor/[id]/page.tsx    # 에디터
│   │   └── view/[id]/page.tsx      # 뷰어
│   ├── manuals/
│   │   ├── page.tsx                # 매뉴얼 목록
│   │   └── [id]/page.tsx           # 매뉴얼 상세
│   ├── classes/
│   │   ├── page.tsx                # 클래스 목록
│   │   ├── [id]/page.tsx           # 클래스 상세
│   │   └── [id]/apply/page.tsx     # 클래스 신청
│   ├── cart/page.tsx               # 장바구니
│   ├── checkout/page.tsx           # 결제
│   └── help/
│       ├── page.tsx                # 고객센터
│       └── [type]/page.tsx         # notice/faq/qna
├── (mypage)/
│   ├── mypage/page.tsx             # 마이페이지
│   ├── orders/
│   │   ├── page.tsx                # 주문 내역
│   │   └── [id]/page.tsx           # 주문 상세
│   └── settings/page.tsx           # 설정
├── (seller)/
│   ├── dashboard/page.tsx          # 대시보드
│   ├── products/page.tsx           # 상품 관리
│   └── orders/page.tsx             # 주문 관리
├── (policy)/
│   ├── terms/page.tsx              # 이용약관
│   └── privacy/page.tsx            # 개인정보처리방침
├── admin/                          # 관리자 영역 (별도 레이아웃)
│   ├── layout.tsx                  # 관리자 레이아웃 (Sidebar)
│   ├── page.tsx                    # 대시보드
│   ├── users/
│   │   ├── page.tsx                # 회원 목록
│   │   └── [id]/page.tsx           # 회원 상세
│   ├── products/
│   │   ├── page.tsx                # 상품 목록
│   │   ├── new/page.tsx            # 상품 등록
│   │   ├── [id]/page.tsx           # 상품 수정
│   │   ├── sets/page.tsx           # 상품 세트
│   │   ├── packages/page.tsx       # 패키지 상품
│   │   ├── rentals/page.tsx        # 대여 상품
│   │   └── categories/page.tsx     # 카테고리 관리
│   ├── orders/
│   │   ├── page.tsx                # 주문 목록
│   │   └── [id]/page.tsx           # 주문 상세
│   ├── vrmalls/
│   │   ├── page.tsx                # VR Mall 목록
│   │   └── [id]/page.tsx           # VR Mall 상세
│   ├── contents/
│   │   ├── dotarts/page.tsx        # DotArt 관리
│   │   ├── creations/page.tsx      # Creation 관리
│   │   └── reports/page.tsx        # 신고 관리
│   ├── classes/
│   │   ├── page.tsx                # 클래스 목록
│   │   ├── new/page.tsx            # 클래스 등록
│   │   ├── [id]/page.tsx           # 클래스 상세/수정
│   │   ├── [id]/schedules/page.tsx # 일정 관리
│   │   └── [id]/enrollments/page.tsx # 신청자 관리
│   ├── instructors/
│   │   ├── page.tsx                # 강사 목록
│   │   └── [id]/page.tsx           # 강사 상세
│   ├── venues/
│   │   ├── page.tsx                # 장소 목록
│   │   └── [id]/page.tsx           # 장소 상세
│   ├── manuals/
│   │   ├── page.tsx                # 매뉴얼 목록
│   │   └── new/page.tsx            # 매뉴얼 등록
│   ├── support/
│   │   ├── notices/page.tsx        # 공지사항 관리
│   │   ├── faq/page.tsx            # FAQ 관리
│   │   └── qna/page.tsx            # QnA 관리
│   ├── marketing/
│   │   ├── coupons/page.tsx        # 쿠폰 관리
│   │   ├── banners/page.tsx        # 배너 관리
│   │   ├── popups/page.tsx         # 팝업 관리
│   │   └── events/page.tsx         # 이벤트 관리
│   ├── reports/
│   │   ├── sales/page.tsx          # 매출 리포트
│   │   ├── products/page.tsx       # 상품 통계
│   │   ├── users/page.tsx          # 회원 통계
│   │   └── visitors/page.tsx       # 방문자 통계
│   └── settings/
│       ├── page.tsx                # 사이트 설정
│       ├── terms/page.tsx          # 약관 관리
│       ├── admins/page.tsx         # 관리자 계정
│       ├── roles/page.tsx          # 권한 관리
│       └── logs/page.tsx           # 로그 조회
├── api/                            # API Routes (필요시)
├── layout.tsx                      # Root Layout
└── error.tsx                       # Error Boundary
```

---

## 7. 비기능 요구사항

### 7.1 성능
| ID | 요구사항 | 목표값 |
|----|----------|--------|
| NF-001 | LCP (Largest Contentful Paint) | < 2.5초 |
| NF-002 | FID (First Input Delay) | < 100ms |
| NF-003 | CLS (Cumulative Layout Shift) | < 0.1 |
| NF-004 | 3D 모델 렌더링 FPS | >= 60 FPS |
| NF-005 | API 응답 시간 | < 200ms (p95) |
| NF-006 | 동시 접속자 수 | >= 1,000명 |

### 7.2 호환성
| ID | 요구사항 | 지원 범위 |
|----|----------|-----------|
| NF-007 | 브라우저 | Chrome, Safari, Edge, Firefox (최신 2개 버전) |
| NF-008 | 모바일 | iOS Safari 15+, Android Chrome 100+ |
| NF-009 | 화면 크기 | 반응형 (320px ~ 2560px) |
| NF-010 | WebGL | WebGL 2.0 지원 필수 |

### 7.3 보안
| ID | 요구사항 | 설명 |
|----|----------|------|
| NF-011 | 비밀번호 암호화 | Argon2id 해싱 |
| NF-012 | JWT 토큰 | RS256 서명, 만료 시간 관리 |
| NF-013 | HTTPS | TLS 1.3 암호화 통신 |
| NF-014 | CORS | 허용된 Origin만 접근 |
| NF-015 | Rate Limiting | API 요청 제한 |
| NF-016 | SQL Injection | Prepared Statement 사용 |
| NF-017 | XSS | Content Security Policy |

### 7.4 모니터링/분석
| ID | 요구사항 | 설명 |
|----|----------|------|
| NF-018 | APM | Datadog / New Relic |
| NF-019 | 로그 수집 | ELK Stack / Loki |
| NF-020 | 사용자 분석 | Google Analytics 4 / Mixpanel |
| NF-021 | 에러 추적 | Sentry |

---

## 8. 외부 연동

### 8.1 결제
- **토스페이먼츠**: 온라인 결제 (카드, 계좌이체, 가상계좌)
- **포트원 (구 아임포트)**: 결제 통합 게이트웨이

### 8.2 주소 검색
- **카카오 주소 API**: 도로명/지번 주소 검색
- **JUSO API**: 도로명 주소 검색 (백업)

### 8.3 소셜 로그인
- **카카오**: OAuth 2.0
- **네이버**: OAuth 2.0
- **Google**: OAuth 2.0

### 8.4 분석/모니터링
- **Google Analytics 4**: 사용자 행동 분석
- **Vercel Analytics**: Web Vitals 모니터링
- **Sentry**: 에러 추적

### 8.5 파일 저장
- **AWS S3**: 이미지, 3D 모델 파일 저장
- **CloudFront**: CDN

---

## 9. 부록

### 9.1 용어 정의
| 용어 | 설명 |
|------|------|
| VR Mall | 3D 가상 쇼핑몰 공간 |
| DotArt | 픽셀/도트 아트 창작물 |
| Creation | 사용자가 만든 3D 창작물 |
| GLTF/GLB | 3D 모델 파일 형식 (GL Transmission Format) |
| RSC | React Server Components |
| Server Actions | Next.js 서버 측 함수 실행 |
| Jakarta EE | Java EE의 후속 버전 (javax → jakarta 네임스페이스) |

### 9.2 참고 문서
- Next.js 16 문서: https://nextjs.org/docs
- React 19 문서: https://react.dev
- Three.js 문서: https://threejs.org/docs
- React Three Fiber: https://r3f.docs.pmnd.rs
- Spring Boot 3.0 문서: https://docs.spring.io/spring-boot/docs/3.0.x/reference
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com/docs

---

**문서 버전**: 2.3
**작성일**: 2026-01-01
**기술 스택 기준**: Next.js 16.x, Spring Boot 3.0.x, Java 17
**변경 이력**:
- v2.3: 디자인 시스템 추가 (사용자: Pixar Style, 관리자: shadcn/ui)
- v2.2: 관리자 기능 추가 (2.11 관리자, 라우팅, API, 컴포넌트)
- v2.1: Spring Boot 3.0 + Java 17로 변경
- v2.0: Next.js 16 + Spring Boot 기술 스택 업데이트
- v1.0: 초기 PRD 작성
