# BrickGround Database Design

> 데이터베이스 설계서

## 목차

1. [개요](#1-개요)
2. [데이터베이스 환경](#2-데이터베이스-환경)
3. [ERD (Entity Relationship Diagram)](#3-erd-entity-relationship-diagram)
4. [도메인별 테이블 설계](#4-도메인별-테이블-설계)
5. [인덱스 설계](#5-인덱스-설계)
6. [마이그레이션 전략](#6-마이그레이션-전략)
7. [데이터 무결성](#7-데이터-무결성)
8. [백업 및 복구](#8-백업-및-복구)

---

## 1. 개요

### 1.1 문서 목적

본 문서는 BrickGround 플랫폼의 데이터베이스 설계를 정의합니다. Legacy 시스템의 엔티티 구조를 분석하고, PRD 요구사항을 반영한 신규 테이블 설계를 포함합니다.

### 1.2 설계 원칙

| 원칙 | 설명 |
|------|------|
| **정규화** | 3NF(Third Normal Form) 기준 적용 |
| **확장성** | 향후 기능 추가를 고려한 유연한 스키마 |
| **성능** | 적절한 인덱스 및 파티셔닝 전략 |
| **무결성** | 외래키 제약조건 및 데이터 유효성 검사 |
| **감사** | 생성/수정 시간 추적 (Audit Trail) |

### 1.3 도메인 구분

| 도메인 | 테이블 수 | 설명 |
|--------|----------|------|
| User | 4 | 사용자, 인증, 소셜 로그인 |
| Shop | 2 | 상점, 배송 정책 |
| Product | 3 | 상품, 카테고리, 상품 이미지 |
| Order | 4 | 주문, 주문 요약, 장바구니, 배송지 |
| VrMall | 4 | VR 몰, VR 모델, 권한, 좋아요 |
| DotArt | 5 | 도트아트, 댓글, 좋아요, 블랙리스트 |
| Creation | 5 | 창작물, 댓글, 좋아요, 블랙리스트 |
| Class | 6 | 클래스, 일정, 수강, 강사, 장소, 후기 |
| Manual | 2 | 매뉴얼, 프로그램북 |
| Support | 3 | 공지사항, FAQ, QnA |
| Marketing | 4 | 쿠폰, 사용자 쿠폰, 배너, 팝업 |
| System | 3 | 설정, 로그, 시퀀스 |
| **Total** | **45** | |

---

## 2. 데이터베이스 환경

### 2.1 DBMS 사양

| 항목 | 값 |
|------|-----|
| DBMS | MySQL 8.x |
| Character Set | utf8mb4 |
| Collation | utf8mb4_unicode_ci |
| Storage Engine | InnoDB |
| Time Zone | Asia/Seoul (UTC+9) |

### 2.2 네이밍 규칙

| 구분 | 규칙 | 예시 |
|------|------|------|
| 테이블명 | snake_case, 복수형 | `users`, `products`, `order_items` |
| 컬럼명 | snake_case | `user_id`, `created_at`, `is_active` |
| PK | `id` 또는 `{table}_id` | `id`, `user_id` |
| FK | `{참조테이블}_id` | `shop_id`, `product_id` |
| 인덱스 | `idx_{table}_{columns}` | `idx_products_shop_id` |
| 유니크 | `uk_{table}_{columns}` | `uk_users_email` |

### 2.3 공통 컬럼

모든 테이블에 적용되는 공통 컬럼:

```sql
-- 기본 PK
id              VARCHAR(36) PRIMARY KEY,  -- UUID

-- 감사 컬럼 (Audit)
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_by      VARCHAR(36),
updated_by      VARCHAR(36)
```

---

## 3. ERD (Entity Relationship Diagram)

### 3.1 전체 ERD 개요

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                    BrickGround ERD                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                              USER DOMAIN                                     │   │
│  │  ┌────────┐    ┌────────────────┐    ┌───────────────┐                      │   │
│  │  │ users  │───►│ user_socials   │    │ refresh_tokens│                      │   │
│  │  └────┬───┘    └────────────────┘    └───────────────┘                      │   │
│  │       │                                                                       │   │
│  │       │        ┌────────────────┐                                            │   │
│  │       └───────►│ user_addresses │                                            │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│         │                                                                           │
│         ▼                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                              SHOP DOMAIN                                     │   │
│  │  ┌────────┐    ┌───────────────────┐                                        │   │
│  │  │ shops  │───►│ delivery_policies │                                        │   │
│  │  └────┬───┘    └───────────────────┘                                        │   │
│  └───────┼─────────────────────────────────────────────────────────────────────┘   │
│          │                                                                          │
│          ├──────────────────────────────────────────────────────────┐              │
│          ▼                                                          ▼              │
│  ┌────────────────────────────────┐    ┌────────────────────────────────────────┐ │
│  │        PRODUCT DOMAIN          │    │              VR MALL DOMAIN             │ │
│  │  ┌──────────┐  ┌────────────┐  │    │  ┌─────────┐  ┌──────────┐            │ │
│  │  │ products │  │ categories │  │    │  │ vr_malls│  │vr_models │            │ │
│  │  └────┬─────┘  └────────────┘  │    │  └────┬────┘  └──────────┘            │ │
│  │       │                        │    │       │                                │ │
│  │       ▼                        │    │       ├──►vr_mall_likes                │ │
│  │  ┌────────────────┐            │    │       └──►vr_mall_user_roles           │ │
│  │  │ product_images │            │    └────────────────────────────────────────┘ │
│  └────────────────────────────────┘                                               │
│          │                                                                          │
│          ▼                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                              ORDER DOMAIN                                    │   │
│  │  ┌───────┐    ┌───────────────┐    ┌────────────┐    ┌───────────┐          │   │
│  │  │ carts │    │order_summaries│───►│order_items │    │deliveries │          │   │
│  │  └───────┘    └───────────────┘    └────────────┘    └───────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                           CONTENT DOMAIN                                     │   │
│  │                                                                               │   │
│  │  ┌─────────────────────────┐    ┌─────────────────────────┐                  │   │
│  │  │       DOTART            │    │       CREATION          │                  │   │
│  │  │  ┌─────────┐            │    │  ┌───────────┐          │                  │   │
│  │  │  │ dotarts │            │    │  │ creations │          │                  │   │
│  │  │  └────┬────┘            │    │  └─────┬─────┘          │                  │   │
│  │  │       ├──►dotart_comments    │        ├──►creation_comments              │   │
│  │  │       ├──►dotart_likes  │    │        ├──►creation_likes                 │   │
│  │  │       └──►dotart_blacklist   │        └──►creation_blacklists            │   │
│  │  └─────────────────────────┘    └─────────────────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                            CLASS DOMAIN                                      │   │
│  │  ┌─────────────┐    ┌───────────────┐    ┌──────────────────┐               │   │
│  │  │   classes   │───►│class_schedules│───►│class_enrollments │               │   │
│  │  └──────┬──────┘    └───────────────┘    └──────────────────┘               │   │
│  │         │                                                                    │   │
│  │         ├──►instructors                                                      │   │
│  │         ├──►venues                                                           │   │
│  │         └──►class_reviews                                                    │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                           SUPPORT DOMAIN                                     │   │
│  │  ┌──────────┐    ┌──────┐    ┌──────┐    ┌──────────┐    ┌─────────────┐    │   │
│  │  │ notices  │    │ faqs │    │ qnas │    │ manuals  │    │program_books│    │   │
│  │  └──────────┘    └──────┘    └──────┘    └──────────┘    └─────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                          MARKETING DOMAIN                                    │   │
│  │  ┌─────────┐    ┌──────────────┐    ┌──────────┐    ┌────────┐              │   │
│  │  │ coupons │───►│ user_coupons │    │ banners  │    │ popups │              │   │
│  │  └─────────┘    └──────────────┘    └──────────┘    └────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 핵심 관계도

```
                                    ┌─────────┐
                                    │  users  │
                                    └────┬────┘
                                         │
            ┌────────────────────────────┼────────────────────────────┐
            │                            │                            │
            ▼                            ▼                            ▼
      ┌──────────┐                 ┌──────────┐                ┌──────────┐
      │  shops   │                 │  carts   │                │deliveries│
      └────┬─────┘                 └──────────┘                └──────────┘
           │                                                         │
           ├─────────────────┬─────────────────┐                    │
           │                 │                 │                    │
           ▼                 ▼                 ▼                    ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐       ┌──────────────┐
     │ products │      │ vr_malls │      │ creations│       │order_summaries│
     └──────────┘      └──────────┘      └──────────┘       └──────┬───────┘
           │                                                        │
           │                                                        ▼
           │                                                 ┌─────────────┐
           └────────────────────────────────────────────────►│ order_items │
                                                             └─────────────┘
```

---

## 4. 도메인별 테이블 설계

### 4.1 User Domain

#### 4.1.1 users (사용자)

```sql
CREATE TABLE users (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 인증 정보
    email               VARCHAR(255) NOT NULL,
    password_hash       VARCHAR(255),

    -- 개인 정보
    name                VARCHAR(100) NOT NULL,
    nickname            VARCHAR(50),
    gender              ENUM('MALE', 'FEMALE', 'OTHER'),
    birth_date          DATE,
    phone               VARCHAR(20),

    -- 주소 (기본)
    zip_code            VARCHAR(10),
    address             VARCHAR(500),
    detail_address      VARCHAR(200),

    -- 계정 상태
    status              ENUM('ACTIVE', 'INACTIVE', 'LOCKED', 'WITHDRAWN') DEFAULT 'ACTIVE',
    role                ENUM('USER', 'SELLER', 'ADMIN', 'SUPER_ADMIN') DEFAULT 'USER',

    -- 포인트 및 등급
    point               INT DEFAULT 0,
    grade               ENUM('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'VIP') DEFAULT 'BRONZE',

    -- 보안
    login_attempts      INT DEFAULT 0,
    locked_until        TIMESTAMP NULL,
    last_login_at       TIMESTAMP NULL,
    last_login_ip       VARCHAR(45),

    -- 설정
    firebase_token      VARCHAR(500),
    avatar_url          VARCHAR(500),

    -- 연결
    shop_id             VARCHAR(36),

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    withdrawn_at        TIMESTAMP NULL,

    -- 제약조건
    UNIQUE KEY uk_users_email (email),
    INDEX idx_users_status (status),
    INDEX idx_users_role (role),
    INDEX idx_users_shop (shop_id),
    INDEX idx_users_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.1.2 user_socials (소셜 로그인)

```sql
CREATE TABLE user_socials (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,

    -- 소셜 정보
    provider            ENUM('KAKAO', 'NAVER', 'GOOGLE', 'APPLE') NOT NULL,
    provider_id         VARCHAR(255) NOT NULL,
    provider_email      VARCHAR(255),

    -- 토큰
    access_token        TEXT,
    refresh_token       TEXT,
    token_expires_at    TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_user_socials_provider (user_id, provider),
    UNIQUE KEY uk_user_socials_provider_id (provider, provider_id),
    INDEX idx_user_socials_user (user_id),

    CONSTRAINT fk_user_socials_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.1.3 refresh_tokens (리프레시 토큰)

```sql
CREATE TABLE refresh_tokens (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,

    -- 토큰 정보
    token               VARCHAR(500) NOT NULL,
    expires_at          TIMESTAMP NOT NULL,

    -- 디바이스 정보
    device_info         VARCHAR(500),
    ip_address          VARCHAR(45),

    -- 상태
    is_revoked          BOOLEAN DEFAULT FALSE,
    revoked_at          TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_refresh_tokens_token (token),
    INDEX idx_refresh_tokens_user (user_id),
    INDEX idx_refresh_tokens_expires (expires_at),

    CONSTRAINT fk_refresh_tokens_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.1.4 user_addresses (배송지 주소록)

```sql
CREATE TABLE user_addresses (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,

    -- 주소 정보
    label               VARCHAR(50),             -- 집, 회사 등
    recipient_name      VARCHAR(100) NOT NULL,
    recipient_phone     VARCHAR(20) NOT NULL,
    zip_code            VARCHAR(10) NOT NULL,
    address             VARCHAR(500) NOT NULL,
    detail_address      VARCHAR(200),

    -- 설정
    is_default          BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_user_addresses_user (user_id),

    CONSTRAINT fk_user_addresses_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.2 Shop Domain

#### 4.2.1 shops (상점)

```sql
CREATE TABLE shops (
    id                  VARCHAR(36) PRIMARY KEY,

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    alias               VARCHAR(100),
    description         TEXT,
    cover_image         VARCHAR(500),
    logo_image          VARCHAR(500),

    -- 관리자
    manager_id          VARCHAR(36) NOT NULL,

    -- 연락처
    telephone           VARCHAR(20),
    fax                 VARCHAR(20),
    email               VARCHAR(255),

    -- 주소
    zip_code            VARCHAR(10),
    address             VARCHAR(500),
    detail_address      VARCHAR(200),

    -- 사업자 정보
    business_number     VARCHAR(20),
    business_name       VARCHAR(255),

    -- 상태
    status              ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED') DEFAULT 'ACTIVE',

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_shops_alias (alias),
    INDEX idx_shops_manager (manager_id),
    INDEX idx_shops_status (status),

    CONSTRAINT fk_shops_manager
        FOREIGN KEY (manager_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.2.2 delivery_policies (배송 정책)

```sql
CREATE TABLE delivery_policies (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,

    -- 정책 정보
    name                VARCHAR(100) NOT NULL,      -- 기본 배송, 무료 배송 등
    price_mode          ENUM('FREE', 'FIXED', 'BY_QUANTITY', 'BY_AMOUNT') DEFAULT 'FIXED',

    -- 금액 설정
    base_price          INT DEFAULT 0,              -- 기본 배송비
    free_threshold      INT DEFAULT 0,              -- 무료 배송 기준 금액
    additional_price    INT DEFAULT 0,              -- 추가 배송비

    -- 수량 기반
    base_quantity       INT DEFAULT 1,
    quantity_unit_price INT DEFAULT 0,

    -- 도서산간
    island_additional   INT DEFAULT 0,

    -- 상태
    is_active           BOOLEAN DEFAULT TRUE,
    is_default          BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_delivery_policies_shop (shop_id),

    CONSTRAINT fk_delivery_policies_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.3 Product Domain

#### 4.3.1 categories (카테고리)

```sql
CREATE TABLE categories (
    id                  VARCHAR(36) PRIMARY KEY,

    -- 계층 구조
    parent_id           VARCHAR(36),
    level               INT DEFAULT 1,              -- 1: 대분류, 2: 중분류, 3: 소분류
    path                VARCHAR(500),               -- /parent/child/grandchild

    -- 정보
    name                VARCHAR(100) NOT NULL,
    slug                VARCHAR(100) NOT NULL,
    description         TEXT,
    image_url           VARCHAR(500),

    -- 정렬 및 노출
    sort_order          INT DEFAULT 0,
    is_active           BOOLEAN DEFAULT TRUE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_categories_slug (slug),
    INDEX idx_categories_parent (parent_id),
    INDEX idx_categories_level (level),

    CONSTRAINT fk_categories_parent
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.3.2 products (상품)

```sql
CREATE TABLE products (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    category_id         VARCHAR(36),

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    full_name           VARCHAR(500),
    slug                VARCHAR(255),
    description         TEXT,

    -- 가격
    price               DECIMAL(12, 2) NOT NULL,
    compare_price       DECIMAL(12, 2),             -- 할인 전 가격
    cost_price          DECIMAL(12, 2),             -- 원가

    -- 재고
    stock               INT DEFAULT 0,
    stock_alert         INT DEFAULT 10,             -- 재고 알림 기준
    is_track_stock      BOOLEAN DEFAULT TRUE,

    -- 3D/VR
    vr_model_path       VARCHAR(500),
    cover_image         VARCHAR(500),

    -- 상품 세트
    set_name            VARCHAR(255),
    is_set              BOOLEAN DEFAULT FALSE,

    -- 분류
    subject_id          INT,                        -- 과목/주제
    level_id            INT,                        -- 레벨/난이도

    -- 상태
    status              ENUM('DRAFT', 'ACTIVE', 'INACTIVE', 'DELETED') DEFAULT 'DRAFT',
    is_visible          BOOLEAN DEFAULT TRUE,
    is_featured         BOOLEAN DEFAULT FALSE,

    -- SEO
    meta_title          VARCHAR(255),
    meta_description    TEXT,

    -- 통계
    view_count          INT DEFAULT 0,
    order_count         INT DEFAULT 0,
    review_count        INT DEFAULT 0,
    rating_avg          DECIMAL(3, 2) DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at        TIMESTAMP NULL,

    -- 제약조건
    INDEX idx_products_shop (shop_id),
    INDEX idx_products_category (category_id),
    INDEX idx_products_status (status),
    INDEX idx_products_visible (is_visible),
    INDEX idx_products_featured (is_featured),
    INDEX idx_products_price (price),
    FULLTEXT INDEX ft_products_search (name, description),

    CONSTRAINT fk_products_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id),
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.3.3 product_images (상품 이미지)

```sql
CREATE TABLE product_images (
    id                  VARCHAR(36) PRIMARY KEY,
    product_id          VARCHAR(36) NOT NULL,

    -- 이미지 정보
    image_url           VARCHAR(500) NOT NULL,
    thumbnail_url       VARCHAR(500),
    alt_text            VARCHAR(255),

    -- 정렬
    sort_order          INT DEFAULT 0,
    is_primary          BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_product_images_product (product_id),

    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.4 Order Domain

#### 4.4.1 carts (장바구니)

```sql
CREATE TABLE carts (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,

    -- 상품 정보
    shop_id             VARCHAR(36) NOT NULL,
    product_id          VARCHAR(36) NOT NULL,
    vr_mall_id          VARCHAR(36),

    -- 수량/가격
    quantity            INT NOT NULL DEFAULT 1,
    unit_price          DECIMAL(12, 2) NOT NULL,

    -- 스냅샷 (주문 시점 정보)
    product_name        VARCHAR(255) NOT NULL,
    cover_image         VARCHAR(500),

    -- 상태
    status              ENUM('ACTIVE', 'ORDERED', 'DELETED') DEFAULT 'ACTIVE',

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_carts_user (user_id),
    INDEX idx_carts_user_status (user_id, status),
    INDEX idx_carts_product (product_id),

    CONSTRAINT fk_carts_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_carts_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id),
    CONSTRAINT fk_carts_product
        FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.4.2 order_summaries (주문 요약)

```sql
CREATE TABLE order_summaries (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,
    shop_id             VARCHAR(36) NOT NULL,

    -- 주문 번호
    order_number        VARCHAR(30) NOT NULL,

    -- 주문자 정보
    orderer_name        VARCHAR(100),
    orderer_phone       VARCHAR(20),
    orderer_email       VARCHAR(255),

    -- 배송 정보
    delivery_id         VARCHAR(36),
    recipient_name      VARCHAR(100) NOT NULL,
    recipient_phone     VARCHAR(20) NOT NULL,
    zip_code            VARCHAR(10) NOT NULL,
    address             VARCHAR(500) NOT NULL,
    detail_address      VARCHAR(200),
    delivery_memo       TEXT,

    -- 금액
    item_count          INT NOT NULL DEFAULT 0,
    total_price         DECIMAL(12, 2) NOT NULL,
    discount_amount     DECIMAL(12, 2) DEFAULT 0,
    delivery_fee        DECIMAL(12, 2) DEFAULT 0,
    point_used          INT DEFAULT 0,
    point_earned        INT DEFAULT 0,
    final_amount        DECIMAL(12, 2) NOT NULL,

    -- 결제 정보
    payment_method      ENUM('CARD', 'BANK_TRANSFER', 'VIRTUAL_ACCOUNT', 'KAKAO_PAY', 'NAVER_PAY', 'TOSS_PAY') NULL,
    imp_uid             VARCHAR(100),               -- 아임포트 UID
    merchant_uid        VARCHAR(100),               -- 가맹점 UID
    pg_provider         VARCHAR(50),
    apply_number        VARCHAR(50),                -- 승인 번호

    -- 배송 정보
    invoice_number      VARCHAR(50),
    delivery_company    VARCHAR(50),

    -- 상태
    status              ENUM('PENDING', 'PAID', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CONFIRMED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',

    -- 쿠폰
    coupon_id           VARCHAR(36),
    coupon_discount     DECIMAL(12, 2) DEFAULT 0,

    -- 관리자 메모
    admin_memo          TEXT,

    -- 타임스탬프
    paid_at             TIMESTAMP NULL,
    shipped_at          TIMESTAMP NULL,
    delivered_at        TIMESTAMP NULL,
    confirmed_at        TIMESTAMP NULL,
    cancelled_at        TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_order_summaries_number (order_number),
    INDEX idx_order_summaries_user (user_id),
    INDEX idx_order_summaries_shop (shop_id),
    INDEX idx_order_summaries_status (status),
    INDEX idx_order_summaries_created (created_at),
    INDEX idx_order_summaries_paid (paid_at),

    CONSTRAINT fk_order_summaries_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_order_summaries_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.4.3 order_items (주문 상품)

```sql
CREATE TABLE order_items (
    id                  VARCHAR(36) PRIMARY KEY,
    order_summary_id    VARCHAR(36) NOT NULL,

    -- 상품 정보 (스냅샷)
    product_id          VARCHAR(36) NOT NULL,
    product_name        VARCHAR(255) NOT NULL,
    cover_image         VARCHAR(500),
    category_id         VARCHAR(36),
    vr_mall_id          VARCHAR(36),

    -- 수량/가격
    quantity            INT NOT NULL,
    unit_price          DECIMAL(12, 2) NOT NULL,
    total_price         DECIMAL(12, 2) NOT NULL,

    -- 개별 상품 상태
    status              ENUM('PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_order_items_summary (order_summary_id),
    INDEX idx_order_items_product (product_id),

    CONSTRAINT fk_order_items_summary
        FOREIGN KEY (order_summary_id) REFERENCES order_summaries(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.4.4 deliveries (배송지)

```sql
CREATE TABLE deliveries (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,
    shop_id             VARCHAR(36) NOT NULL,

    -- 배송지 정보
    recipient_name      VARCHAR(100),
    recipient_phone     VARCHAR(20),
    zip_code            VARCHAR(10) NOT NULL,
    address             VARCHAR(500) NOT NULL,
    detail_address      VARCHAR(200),

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_deliveries_user (user_id),

    CONSTRAINT fk_deliveries_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_deliveries_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.5 VR Mall Domain

#### 4.5.1 vr_malls (VR 몰)

```sql
CREATE TABLE vr_malls (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36),                -- 창작자
    category_id         VARCHAR(36),

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    description         TEXT,

    -- 이미지/미디어
    cover_image         VARCHAR(500),
    intro_image         VARCHAR(500),
    video_url           VARCHAR(500),

    -- 3D 설정
    background_path     VARCHAR(500),
    ground_path         VARCHAR(500),
    camera_position     JSON,                       -- {"x": 0, "y": 5, "z": 10}
    camera_target       JSON,                       -- {"x": 0, "y": 0, "z": 0}
    vr_models           JSON,                       -- 배치된 모델 정보

    -- 연결 데이터
    set_names           JSON,                       -- ["세트1", "세트2"]
    manual_data         JSON,
    program_data        JSON,

    -- 통계
    view_count          INT DEFAULT 0,
    like_count          INT DEFAULT 0,
    comment_count       INT DEFAULT 0,

    -- 상태
    status              ENUM('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'DELETED') DEFAULT 'DRAFT',
    is_visible          BOOLEAN DEFAULT TRUE,
    is_featured         BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at        TIMESTAMP NULL,

    -- 제약조건
    INDEX idx_vr_malls_shop (shop_id),
    INDEX idx_vr_malls_user (user_id),
    INDEX idx_vr_malls_status (status),
    INDEX idx_vr_malls_visible (is_visible),
    INDEX idx_vr_malls_featured (is_featured),

    CONSTRAINT fk_vr_malls_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id),
    CONSTRAINT fk_vr_malls_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.5.2 vr_models (VR 모델)

```sql
CREATE TABLE vr_models (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,

    -- 모델 정보
    name                VARCHAR(255) NOT NULL,
    model_type          ENUM('PRODUCT', 'DECORATION', 'ENVIRONMENT', 'CHARACTER') DEFAULT 'PRODUCT',
    set_name            VARCHAR(255),

    -- 파일 경로
    model_path          VARCHAR(500) NOT NULL,      -- GLTF/GLB 경로
    image_path          VARCHAR(500),               -- 썸네일

    -- 메타데이터
    description         TEXT,
    material            VARCHAR(500),
    normal_map          VARCHAR(500),
    texture             VARCHAR(500),

    -- 속성
    is_clickable        BOOLEAN DEFAULT TRUE,
    sort_order          INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_vr_models_shop (shop_id),
    INDEX idx_vr_models_type (model_type),

    CONSTRAINT fk_vr_models_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.5.3 vr_mall_likes (VR 몰 좋아요)

```sql
CREATE TABLE vr_mall_likes (
    id                  VARCHAR(36) PRIMARY KEY,
    vr_mall_id          VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_vr_mall_likes (vr_mall_id, user_id),
    INDEX idx_vr_mall_likes_mall (vr_mall_id),
    INDEX idx_vr_mall_likes_user (user_id),

    CONSTRAINT fk_vr_mall_likes_mall
        FOREIGN KEY (vr_mall_id) REFERENCES vr_malls(id) ON DELETE CASCADE,
    CONSTRAINT fk_vr_mall_likes_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.5.4 vr_mall_user_roles (VR 몰 사용자 권한)

```sql
CREATE TABLE vr_mall_user_roles (
    id                  VARCHAR(36) PRIMARY KEY,
    vr_mall_id          VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,
    product_id          VARCHAR(36),

    -- 권한
    role                ENUM('VIEWER', 'EDITOR', 'OWNER') DEFAULT 'VIEWER',

    -- 기간 제한
    starts_at           TIMESTAMP NULL,
    ends_at             TIMESTAMP NULL,

    -- 상태
    status              ENUM('ACTIVE', 'EXPIRED', 'REVOKED') DEFAULT 'ACTIVE',

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by          VARCHAR(36),

    -- 제약조건
    INDEX idx_vr_mall_user_roles_mall (vr_mall_id),
    INDEX idx_vr_mall_user_roles_user (user_id),

    CONSTRAINT fk_vr_mall_user_roles_mall
        FOREIGN KEY (vr_mall_id) REFERENCES vr_malls(id) ON DELETE CASCADE,
    CONSTRAINT fk_vr_mall_user_roles_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.6 DotArt Domain

#### 4.6.1 dotarts (도트아트)

```sql
CREATE TABLE dotarts (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,
    shop_id             VARCHAR(36),

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    description         TEXT,

    -- 픽셀 데이터
    pixel_data          LONGTEXT NOT NULL,          -- JSON 형태의 픽셀 데이터
    width               INT NOT NULL,
    height              INT NOT NULL,

    -- 이미지
    cover_image         VARCHAR(500),
    thumbnail           VARCHAR(500),

    -- 버전 관리
    root_id             VARCHAR(36),                -- 원본 ID
    parent_id           VARCHAR(36),                -- 리믹스 원본
    version             INT DEFAULT 1,

    -- 분류
    category_id         VARCHAR(36),
    subject_id          INT,
    size_name           VARCHAR(50),

    -- 통계
    view_count          INT DEFAULT 0,
    like_count          INT DEFAULT 0,
    share_count         INT DEFAULT 0,
    remix_count         INT DEFAULT 0,
    comment_count       INT DEFAULT 0,

    -- 상태
    status              ENUM('DRAFT', 'PUBLIC', 'PRIVATE', 'DELETED') DEFAULT 'DRAFT',
    is_visible          BOOLEAN DEFAULT TRUE,
    blacklist_mode      INT DEFAULT 0,

    -- 공개 설정 (Save Wizard)
    visibility          ENUM('PUBLIC', 'LINK_SHARE', 'PRIVATE') DEFAULT 'PRIVATE',
    share_link_token    VARCHAR(64),                -- 링크 공유용 토큰 (UUID)

    -- 라이선스 설정 (Save Wizard)
    allow_view          BOOLEAN DEFAULT TRUE,       -- 보기 허용
    allow_download      BOOLEAN DEFAULT FALSE,      -- 다운로드 허용
    allow_remix         BOOLEAN DEFAULT FALSE,      -- 수정/리믹스 허용
    allow_commercial    BOOLEAN DEFAULT FALSE,      -- 상업적 이용 허용

    -- 태그 (Save Wizard)
    tags                JSON,                       -- ["태그1", "태그2", ...]

    -- 음악 모드
    music_enabled       BOOLEAN DEFAULT FALSE,
    music_data          JSON,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at        TIMESTAMP NULL,

    -- 제약조건
    INDEX idx_dotarts_user (user_id),
    INDEX idx_dotarts_status (status),
    INDEX idx_dotarts_visible (is_visible),
    INDEX idx_dotarts_visibility (visibility),
    INDEX idx_dotarts_root (root_id),
    INDEX idx_dotarts_parent (parent_id),
    UNIQUE KEY uk_dotarts_share_link (share_link_token),

    CONSTRAINT fk_dotarts_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_dotarts_root
        FOREIGN KEY (root_id) REFERENCES dotarts(id) ON DELETE SET NULL,
    CONSTRAINT fk_dotarts_parent
        FOREIGN KEY (parent_id) REFERENCES dotarts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.6.2 dotart_comments (도트아트 댓글)

```sql
CREATE TABLE dotart_comments (
    id                  VARCHAR(36) PRIMARY KEY,
    dotart_id           VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,
    parent_id           VARCHAR(36),                -- 대댓글

    -- 내용
    content             TEXT NOT NULL,

    -- 작성자 스냅샷
    user_name           VARCHAR(100),
    user_avatar         VARCHAR(500),

    -- 상태
    is_deleted          BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_dotart_comments_dotart (dotart_id),
    INDEX idx_dotart_comments_user (user_id),
    INDEX idx_dotart_comments_parent (parent_id),

    CONSTRAINT fk_dotart_comments_dotart
        FOREIGN KEY (dotart_id) REFERENCES dotarts(id) ON DELETE CASCADE,
    CONSTRAINT fk_dotart_comments_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_dotart_comments_parent
        FOREIGN KEY (parent_id) REFERENCES dotart_comments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.6.3 dotart_likes (도트아트 좋아요)

```sql
CREATE TABLE dotart_likes (
    id                  VARCHAR(36) PRIMARY KEY,
    dotart_id           VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_dotart_likes (dotart_id, user_id),
    INDEX idx_dotart_likes_dotart (dotart_id),
    INDEX idx_dotart_likes_user (user_id),

    CONSTRAINT fk_dotart_likes_dotart
        FOREIGN KEY (dotart_id) REFERENCES dotarts(id) ON DELETE CASCADE,
    CONSTRAINT fk_dotart_likes_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.6.4 dotart_blacklists (도트아트 신고)

```sql
CREATE TABLE dotart_blacklists (
    id                  VARCHAR(36) PRIMARY KEY,
    dotart_id           VARCHAR(36) NOT NULL,

    -- 신고 정보
    reporter_id         VARCHAR(36) NOT NULL,
    reporter_name       VARCHAR(100),

    -- 대상 정보
    target_user_id      VARCHAR(36) NOT NULL,
    dotart_name         VARCHAR(255),

    -- 신고 내용
    blacklist_type      ENUM('SPAM', 'INAPPROPRIATE', 'COPYRIGHT', 'HARASSMENT', 'OTHER') NOT NULL,
    description         TEXT,

    -- 처리 상태
    status              ENUM('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    admin_memo          TEXT,
    processed_by        VARCHAR(36),
    processed_at        TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_dotart_blacklists_dotart (dotart_id),
    INDEX idx_dotart_blacklists_reporter (reporter_id),
    INDEX idx_dotart_blacklists_status (status),

    CONSTRAINT fk_dotart_blacklists_dotart
        FOREIGN KEY (dotart_id) REFERENCES dotarts(id) ON DELETE CASCADE,
    CONSTRAINT fk_dotart_blacklists_reporter
        FOREIGN KEY (reporter_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.7 Creation Domain

#### 4.7.1 creations (창작물)

```sql
CREATE TABLE creations (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,
    shop_id             VARCHAR(36),
    category_id         VARCHAR(36),

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    description         TEXT,

    -- 미디어
    cover_image         VARCHAR(500),
    thumbnail           VARCHAR(500),               -- 썸네일 이미지 (Save Wizard)
    video_url           VARCHAR(500),

    -- 3D 데이터
    vr_models           JSON,                       -- 모델 배치 정보
    set_names           JSON,

    -- 버전 관리
    root_id             VARCHAR(36),
    parent_id           VARCHAR(36),

    -- 분류
    subject_id          INT,
    size_id             INT,
    size_name           VARCHAR(50),

    -- 통계
    view_count          INT DEFAULT 0,
    like_count          INT DEFAULT 0,
    share_count         INT DEFAULT 0,
    clone_count         INT DEFAULT 0,
    comment_count       INT DEFAULT 0,

    -- 상태
    status              ENUM('DRAFT', 'PUBLIC', 'PRIVATE', 'DELETED') DEFAULT 'DRAFT',
    is_visible          BOOLEAN DEFAULT TRUE,
    blacklist_mode      INT DEFAULT 0,

    -- 공개 설정 (Save Wizard)
    visibility          ENUM('PUBLIC', 'LINK_SHARE', 'PRIVATE') DEFAULT 'PRIVATE',
    share_link_token    VARCHAR(64),                -- 링크 공유용 토큰 (UUID)

    -- 라이선스 설정 (Save Wizard)
    allow_view          BOOLEAN DEFAULT TRUE,       -- 보기 허용
    allow_download      BOOLEAN DEFAULT FALSE,      -- 다운로드 허용
    allow_remix         BOOLEAN DEFAULT FALSE,      -- 수정/리믹스 허용
    allow_commercial    BOOLEAN DEFAULT FALSE,      -- 상업적 이용 허용

    -- 태그 (Save Wizard)
    tags                JSON,                       -- ["태그1", "태그2", ...]

    -- 작성자 스냅샷
    user_name           VARCHAR(100),

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at        TIMESTAMP NULL,

    -- 제약조건
    INDEX idx_creations_user (user_id),
    INDEX idx_creations_shop (shop_id),
    INDEX idx_creations_status (status),
    INDEX idx_creations_visibility (visibility),
    INDEX idx_creations_root (root_id),
    UNIQUE KEY uk_creations_share_link (share_link_token),

    CONSTRAINT fk_creations_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_creations_root
        FOREIGN KEY (root_id) REFERENCES creations(id) ON DELETE SET NULL,
    CONSTRAINT fk_creations_parent
        FOREIGN KEY (parent_id) REFERENCES creations(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.7.2 creation_comments (창작물 댓글)

```sql
CREATE TABLE creation_comments (
    id                  VARCHAR(36) PRIMARY KEY,
    creation_id         VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,
    parent_id           VARCHAR(36),

    -- 내용
    content             TEXT NOT NULL,

    -- 작성자 스냅샷
    user_name           VARCHAR(100),
    user_avatar         VARCHAR(500),

    -- 상태
    is_deleted          BOOLEAN DEFAULT FALSE,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_creation_comments_creation (creation_id),
    INDEX idx_creation_comments_user (user_id),

    CONSTRAINT fk_creation_comments_creation
        FOREIGN KEY (creation_id) REFERENCES creations(id) ON DELETE CASCADE,
    CONSTRAINT fk_creation_comments_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_creation_comments_parent
        FOREIGN KEY (parent_id) REFERENCES creation_comments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.7.3 creation_likes (창작물 좋아요)

```sql
CREATE TABLE creation_likes (
    id                  VARCHAR(36) PRIMARY KEY,
    creation_id         VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_creation_likes (creation_id, user_id),
    INDEX idx_creation_likes_creation (creation_id),

    CONSTRAINT fk_creation_likes_creation
        FOREIGN KEY (creation_id) REFERENCES creations(id) ON DELETE CASCADE,
    CONSTRAINT fk_creation_likes_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.7.4 creation_blacklists (창작물 신고)

```sql
CREATE TABLE creation_blacklists (
    id                  VARCHAR(36) PRIMARY KEY,
    creation_id         VARCHAR(36) NOT NULL,

    -- 신고 정보
    reporter_id         VARCHAR(36) NOT NULL,
    reporter_name       VARCHAR(100),
    target_user_id      VARCHAR(36) NOT NULL,
    creation_name       VARCHAR(255),

    -- 신고 내용
    blacklist_type      ENUM('SPAM', 'INAPPROPRIATE', 'COPYRIGHT', 'HARASSMENT', 'OTHER') NOT NULL,
    description         TEXT,

    -- 처리 상태
    status              ENUM('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    admin_memo          TEXT,
    processed_by        VARCHAR(36),
    processed_at        TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_creation_blacklists_creation (creation_id),
    INDEX idx_creation_blacklists_status (status),

    CONSTRAINT fk_creation_blacklists_creation
        FOREIGN KEY (creation_id) REFERENCES creations(id) ON DELETE CASCADE,
    CONSTRAINT fk_creation_blacklists_reporter
        FOREIGN KEY (reporter_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.8 Manual Domain

#### 4.8.1 manuals (매뉴얼)

```sql
CREATE TABLE manuals (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    product_id          VARCHAR(36),

    -- 기본 정보
    title               VARCHAR(255) NOT NULL,
    description         TEXT,

    -- 파일
    file_url            VARCHAR(500) NOT NULL,
    file_type           ENUM('PDF', 'IMAGE', 'VIDEO') DEFAULT 'PDF',
    file_size           BIGINT,
    page_count          INT,

    -- 썸네일
    cover_image         VARCHAR(500),

    -- 분류
    category            VARCHAR(100),

    -- 상태
    is_active           BOOLEAN DEFAULT TRUE,
    sort_order          INT DEFAULT 0,

    -- 통계
    view_count          INT DEFAULT 0,
    download_count      INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_manuals_shop (shop_id),
    INDEX idx_manuals_product (product_id),
    INDEX idx_manuals_active (is_active),

    CONSTRAINT fk_manuals_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    CONSTRAINT fk_manuals_product
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.8.2 program_books (프로그램북)

```sql
CREATE TABLE program_books (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    vr_mall_id          VARCHAR(36),

    -- 기본 정보
    title               VARCHAR(255) NOT NULL,
    description         TEXT,

    -- 파일
    file_url            VARCHAR(500) NOT NULL,
    cover_image         VARCHAR(500),

    -- 상태
    is_active           BOOLEAN DEFAULT TRUE,
    sort_order          INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_program_books_shop (shop_id),
    INDEX idx_program_books_vr_mall (vr_mall_id),

    CONSTRAINT fk_program_books_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    CONSTRAINT fk_program_books_vr_mall
        FOREIGN KEY (vr_mall_id) REFERENCES vr_malls(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.9 Support Domain

#### 4.9.1 notices (공지사항)

```sql
CREATE TABLE notices (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,       -- 작성자

    -- 내용
    title               VARCHAR(255) NOT NULL,
    content             LONGTEXT NOT NULL,          -- MDX 지원

    -- 분류
    notice_type         ENUM('GENERAL', 'EVENT', 'UPDATE', 'MAINTENANCE', 'IMPORTANT') DEFAULT 'GENERAL',

    -- 설정
    is_pinned           BOOLEAN DEFAULT FALSE,
    is_active           BOOLEAN DEFAULT TRUE,

    -- 통계
    view_count          INT DEFAULT 0,

    -- 기간
    starts_at           TIMESTAMP NULL,
    ends_at             TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_notices_shop (shop_id),
    INDEX idx_notices_type (notice_type),
    INDEX idx_notices_pinned (is_pinned),
    INDEX idx_notices_active (is_active),
    INDEX idx_notices_created (created_at),

    CONSTRAINT fk_notices_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    CONSTRAINT fk_notices_user
        FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.9.2 faqs (FAQ)

```sql
CREATE TABLE faqs (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,

    -- 내용
    question            VARCHAR(500) NOT NULL,
    answer              TEXT NOT NULL,

    -- 분류
    faq_type            ENUM('GENERAL', 'ORDER', 'SHIPPING', 'PAYMENT', 'RETURN', 'PRODUCT', 'ACCOUNT', 'OTHER') DEFAULT 'GENERAL',

    -- 설정
    is_active           BOOLEAN DEFAULT TRUE,
    sort_order          INT DEFAULT 0,

    -- 통계
    view_count          INT DEFAULT 0,
    helpful_count       INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_faqs_shop (shop_id),
    INDEX idx_faqs_type (faq_type),
    INDEX idx_faqs_active (is_active),

    CONSTRAINT fk_faqs_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    CONSTRAINT fk_faqs_user
        FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.9.3 qnas (Q&A)

```sql
CREATE TABLE qnas (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,

    -- 질문
    title               VARCHAR(255) NOT NULL,
    question            TEXT NOT NULL,

    -- 답변
    answer              TEXT,
    answered_by         VARCHAR(36),
    answered_at         TIMESTAMP NULL,

    -- 분류
    qna_type            ENUM('GENERAL', 'ORDER', 'SHIPPING', 'PAYMENT', 'RETURN', 'PRODUCT', 'OTHER') DEFAULT 'GENERAL',

    -- 상태
    status              ENUM('PENDING', 'ANSWERED', 'CLOSED', 'DELETED') DEFAULT 'PENDING',
    is_private          BOOLEAN DEFAULT FALSE,

    -- 첨부파일
    attachments         JSON,                       -- [{url, name, size}]

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_qnas_shop (shop_id),
    INDEX idx_qnas_user (user_id),
    INDEX idx_qnas_status (status),
    INDEX idx_qnas_type (qna_type),
    INDEX idx_qnas_created (created_at),

    CONSTRAINT fk_qnas_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
    CONSTRAINT fk_qnas_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_qnas_answerer
        FOREIGN KEY (answered_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.10 Marketing Domain

#### 4.10.1 coupons (쿠폰)

```sql
CREATE TABLE coupons (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    code                VARCHAR(50) NOT NULL,
    description         TEXT,

    -- 할인 정보
    discount_type       ENUM('FIXED', 'PERCENTAGE') NOT NULL,
    discount_value      DECIMAL(12, 2) NOT NULL,
    max_discount        DECIMAL(12, 2),             -- 최대 할인 금액 (정률일 경우)

    -- 사용 조건
    min_order_amount    DECIMAL(12, 2) DEFAULT 0,
    max_use_count       INT,                        -- 총 사용 가능 횟수
    max_use_per_user    INT DEFAULT 1,

    -- 적용 범위
    applicable_products JSON,                       -- 적용 가능 상품 ID 목록
    excluded_products   JSON,                       -- 제외 상품 ID 목록
    applicable_categories JSON,

    -- 기간
    starts_at           TIMESTAMP NOT NULL,
    ends_at             TIMESTAMP NOT NULL,

    -- 상태
    is_active           BOOLEAN DEFAULT TRUE,

    -- 통계
    issued_count        INT DEFAULT 0,
    used_count          INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_coupons_code (code),
    INDEX idx_coupons_shop (shop_id),
    INDEX idx_coupons_active (is_active),
    INDEX idx_coupons_period (starts_at, ends_at),

    CONSTRAINT fk_coupons_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.10.2 user_coupons (사용자 쿠폰)

```sql
CREATE TABLE user_coupons (
    id                  VARCHAR(36) PRIMARY KEY,
    user_id             VARCHAR(36) NOT NULL,
    coupon_id           VARCHAR(36) NOT NULL,

    -- 사용 정보
    is_used             BOOLEAN DEFAULT FALSE,
    used_at             TIMESTAMP NULL,
    order_id            VARCHAR(36),

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_user_coupons_user (user_id),
    INDEX idx_user_coupons_coupon (coupon_id),
    INDEX idx_user_coupons_used (is_used),

    CONSTRAINT fk_user_coupons_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_coupons_coupon
        FOREIGN KEY (coupon_id) REFERENCES coupons(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.10.3 banners (배너)

```sql
CREATE TABLE banners (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,

    -- 기본 정보
    title               VARCHAR(255) NOT NULL,
    subtitle            VARCHAR(500),

    -- 이미지
    image_url           VARCHAR(500) NOT NULL,
    mobile_image_url    VARCHAR(500),

    -- 링크
    link_url            VARCHAR(500),
    link_target         ENUM('_SELF', '_BLANK') DEFAULT '_SELF',

    -- 위치
    position            ENUM('MAIN_TOP', 'MAIN_MIDDLE', 'MAIN_BOTTOM', 'SIDEBAR', 'POPUP') DEFAULT 'MAIN_TOP',

    -- 설정
    sort_order          INT DEFAULT 0,
    is_active           BOOLEAN DEFAULT TRUE,

    -- 기간
    starts_at           TIMESTAMP NULL,
    ends_at             TIMESTAMP NULL,

    -- 통계
    view_count          INT DEFAULT 0,
    click_count         INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_banners_shop (shop_id),
    INDEX idx_banners_position (position),
    INDEX idx_banners_active (is_active),
    INDEX idx_banners_period (starts_at, ends_at),

    CONSTRAINT fk_banners_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.10.4 popups (팝업)

```sql
CREATE TABLE popups (
    id                  VARCHAR(36) PRIMARY KEY,
    shop_id             VARCHAR(36) NOT NULL,

    -- 기본 정보
    title               VARCHAR(255) NOT NULL,
    content             TEXT,

    -- 이미지/링크
    image_url           VARCHAR(500),
    link_url            VARCHAR(500),

    -- 크기
    width               INT DEFAULT 400,
    height              INT DEFAULT 500,
    position_x          INT DEFAULT 100,
    position_y          INT DEFAULT 100,

    -- 설정
    is_active           BOOLEAN DEFAULT TRUE,
    show_today_close    BOOLEAN DEFAULT TRUE,       -- 오늘 하루 보지 않기

    -- 기간
    starts_at           TIMESTAMP NULL,
    ends_at             TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_popups_shop (shop_id),
    INDEX idx_popups_active (is_active),
    INDEX idx_popups_period (starts_at, ends_at),

    CONSTRAINT fk_popups_shop
        FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4.11 System Domain

#### 4.11.1 system_settings (시스템 설정)

```sql
CREATE TABLE system_settings (
    id                  VARCHAR(36) PRIMARY KEY,

    -- 설정 키-값
    setting_key         VARCHAR(100) NOT NULL,
    setting_value       TEXT,
    setting_type        ENUM('STRING', 'NUMBER', 'BOOLEAN', 'JSON') DEFAULT 'STRING',

    -- 그룹
    setting_group       VARCHAR(50),

    -- 설명
    description         TEXT,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_system_settings_key (setting_key),
    INDEX idx_system_settings_group (setting_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.11.2 activity_logs (활동 로그)

```sql
CREATE TABLE activity_logs (
    id                  VARCHAR(36) PRIMARY KEY,

    -- 주체
    user_id             VARCHAR(36),
    user_email          VARCHAR(255),
    user_role           VARCHAR(50),

    -- 활동 정보
    action              VARCHAR(100) NOT NULL,
    resource_type       VARCHAR(100),
    resource_id         VARCHAR(36),

    -- 상세
    description         TEXT,
    old_values          JSON,
    new_values          JSON,

    -- 요청 정보
    ip_address          VARCHAR(45),
    user_agent          TEXT,
    request_url         VARCHAR(500),
    request_method      VARCHAR(10),

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_activity_logs_user (user_id),
    INDEX idx_activity_logs_action (action),
    INDEX idx_activity_logs_resource (resource_type, resource_id),
    INDEX idx_activity_logs_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.11.3 app_sequences (시퀀스)

```sql
CREATE TABLE app_sequences (
    sequence_name       VARCHAR(100) PRIMARY KEY,
    next_val            BIGINT NOT NULL DEFAULT 1,

    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 초기 시퀀스 데이터
INSERT INTO app_sequences (sequence_name, next_val) VALUES
    ('ORDER_NUMBER', 1),
    ('INVOICE_NUMBER', 1);
```

---

### 4.12 Class Domain

#### 4.12.1 classes (클래스)

```sql
CREATE TABLE classes (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 기본 정보
    category_id         VARCHAR(36) NOT NULL,
    instructor_id       VARCHAR(36) NOT NULL,
    venue_id            VARCHAR(36),
    title               VARCHAR(255) NOT NULL,
    subtitle            VARCHAR(255),
    description         TEXT,

    -- 이미지
    cover_image         VARCHAR(500),
    gallery_images      JSON,                    -- ["url1", "url2", ...]

    -- 대상 및 정원
    target_age          VARCHAR(100),            -- ex: "7-12세"
    min_participants    INT DEFAULT 1,
    max_participants    INT NOT NULL,
    difficulty_level    ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',

    -- 시간 및 가격
    duration            INT NOT NULL,            -- 분 단위
    price               DECIMAL(10, 2) NOT NULL,
    price_unit          ENUM('PER_SESSION', 'PER_MONTH', 'PER_COURSE') DEFAULT 'PER_SESSION',

    -- 커리큘럼
    curriculum          JSON,                    -- [{title, description, duration}, ...]
    materials_included  JSON,                    -- ["재료1", "재료2", ...]
    what_to_bring       JSON,                    -- ["준비물1", "준비물2", ...]

    -- 상태
    status              ENUM('DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED') DEFAULT 'DRAFT',
    class_type          ENUM('ONE_DAY', 'REGULAR', 'AFTER_SCHOOL', 'EXPERIENCE') DEFAULT 'ONE_DAY',

    -- 통계
    total_enrollments   INT DEFAULT 0,
    average_rating      DECIMAL(2, 1) DEFAULT 0,
    review_count        INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by          VARCHAR(36),
    updated_by          VARCHAR(36),

    -- 제약조건
    INDEX idx_classes_category (category_id),
    INDEX idx_classes_instructor (instructor_id),
    INDEX idx_classes_venue (venue_id),
    INDEX idx_classes_status (status),
    INDEX idx_classes_type (class_type),
    INDEX idx_classes_created (created_at),
    FULLTEXT idx_classes_search (title, subtitle, description),

    CONSTRAINT fk_classes_instructor
        FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE RESTRICT,
    CONSTRAINT fk_classes_venue
        FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.12.2 class_schedules (클래스 일정)

```sql
CREATE TABLE class_schedules (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 관계
    class_id            VARCHAR(36) NOT NULL,
    instructor_id       VARCHAR(36),             -- 해당 일정 담당 강사 (NULL이면 클래스 기본 강사)
    venue_id            VARCHAR(36),             -- 해당 일정 장소 (NULL이면 클래스 기본 장소)

    -- 일정 정보
    schedule_date       DATE NOT NULL,
    start_time          TIME NOT NULL,
    end_time            TIME NOT NULL,

    -- 인원
    max_participants    INT,                     -- NULL이면 클래스 기본값 사용
    current_participants INT DEFAULT 0,
    waitlist_count      INT DEFAULT 0,

    -- 상태
    status              ENUM('SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'SCHEDULED',
    cancel_reason       VARCHAR(500),
    cancelled_at        TIMESTAMP NULL,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by          VARCHAR(36),

    -- 제약조건
    INDEX idx_class_schedules_class (class_id),
    INDEX idx_class_schedules_date (schedule_date),
    INDEX idx_class_schedules_status (status),
    INDEX idx_class_schedules_datetime (schedule_date, start_time),

    CONSTRAINT fk_class_schedules_class
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_class_schedules_instructor
        FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    CONSTRAINT fk_class_schedules_venue
        FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.12.3 class_enrollments (클래스 수강 신청)

```sql
CREATE TABLE class_enrollments (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 관계
    user_id             VARCHAR(36) NOT NULL,
    class_id            VARCHAR(36) NOT NULL,
    schedule_id         VARCHAR(36) NOT NULL,

    -- 참가자 정보
    participant_name    VARCHAR(100) NOT NULL,
    participant_phone   VARCHAR(20),
    participant_birth   DATE,
    participant_relation ENUM('SELF', 'CHILD', 'FAMILY', 'OTHER') DEFAULT 'SELF',

    -- 결제 정보
    amount              DECIMAL(10, 2) NOT NULL,
    discount_amount     DECIMAL(10, 2) DEFAULT 0,
    coupon_id           VARCHAR(36),
    final_amount        DECIMAL(10, 2) NOT NULL,
    payment_method      ENUM('CARD', 'BANK_TRANSFER', 'POINT', 'MIXED') DEFAULT 'CARD',
    payment_id          VARCHAR(100),            -- PG 결제 ID

    -- 상태
    status              ENUM('PENDING', 'CONFIRMED', 'ATTENDED', 'ABSENT', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    confirmed_at        TIMESTAMP NULL,
    attended_at         TIMESTAMP NULL,
    cancelled_at        TIMESTAMP NULL,
    cancel_reason       VARCHAR(500),

    -- 환불
    refund_amount       DECIMAL(10, 2),
    refunded_at         TIMESTAMP NULL,
    refund_reason       VARCHAR(500),

    -- 메모
    user_memo           TEXT,
    admin_memo          TEXT,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_class_enrollments_schedule_user (schedule_id, user_id, participant_name),
    INDEX idx_class_enrollments_user (user_id),
    INDEX idx_class_enrollments_class (class_id),
    INDEX idx_class_enrollments_schedule (schedule_id),
    INDEX idx_class_enrollments_status (status),
    INDEX idx_class_enrollments_created (created_at),

    CONSTRAINT fk_class_enrollments_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_class_enrollments_class
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_class_enrollments_schedule
        FOREIGN KEY (schedule_id) REFERENCES class_schedules(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.12.4 instructors (강사)

```sql
CREATE TABLE instructors (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 연결된 사용자 (선택)
    user_id             VARCHAR(36),

    -- 기본 정보
    name                VARCHAR(100) NOT NULL,
    email               VARCHAR(255),
    phone               VARCHAR(20),
    profile_image       VARCHAR(500),
    bio                 TEXT,

    -- 전문 분야
    expertise           JSON,                    -- ["레고", "3D프린팅", "코딩"]
    certifications      JSON,                    -- [{name, issuer, date}, ...]

    -- 경력
    career_years        INT DEFAULT 0,
    career_description  TEXT,

    -- 상태
    status              ENUM('ACTIVE', 'INACTIVE', 'PENDING') DEFAULT 'PENDING',

    -- 통계
    total_classes       INT DEFAULT 0,
    total_students      INT DEFAULT 0,
    average_rating      DECIMAL(2, 1) DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_instructors_user (user_id),
    INDEX idx_instructors_status (status),
    INDEX idx_instructors_name (name),

    CONSTRAINT fk_instructors_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.12.5 venues (수업 장소)

```sql
CREATE TABLE venues (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 기본 정보
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    cover_image         VARCHAR(500),
    gallery_images      JSON,

    -- 주소
    zip_code            VARCHAR(10),
    address             VARCHAR(500) NOT NULL,
    detail_address      VARCHAR(200),
    latitude            DECIMAL(10, 8),
    longitude           DECIMAL(11, 8),

    -- 시설 정보
    capacity            INT NOT NULL,
    facilities          JSON,                    -- ["주차장", "엘리베이터", "화장실"]
    equipment           JSON,                    -- ["빔프로젝터", "화이트보드"]

    -- 운영
    contact_phone       VARCHAR(20),
    contact_email       VARCHAR(255),
    operating_hours     JSON,                    -- {mon: "09:00-18:00", ...}

    -- 상태
    status              ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE') DEFAULT 'ACTIVE',

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    INDEX idx_venues_status (status),
    INDEX idx_venues_capacity (capacity),
    FULLTEXT idx_venues_search (name, description, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 4.12.6 class_reviews (클래스 후기)

```sql
CREATE TABLE class_reviews (
    -- PK
    id                  VARCHAR(36) PRIMARY KEY,

    -- 관계
    class_id            VARCHAR(36) NOT NULL,
    user_id             VARCHAR(36) NOT NULL,
    enrollment_id       VARCHAR(36) NOT NULL,

    -- 평점
    rating              TINYINT NOT NULL,        -- 1-5
    instructor_rating   TINYINT,                 -- 강사 평점 1-5
    facility_rating     TINYINT,                 -- 시설 평점 1-5

    -- 내용
    title               VARCHAR(255),
    content             TEXT NOT NULL,
    images              JSON,                    -- ["url1", "url2", ...]

    -- 상태
    status              ENUM('VISIBLE', 'HIDDEN', 'DELETED') DEFAULT 'VISIBLE',
    is_best             BOOLEAN DEFAULT FALSE,

    -- 관리자 응답
    admin_reply         TEXT,
    admin_replied_at    TIMESTAMP NULL,
    admin_replied_by    VARCHAR(36),

    -- 신고
    report_count        INT DEFAULT 0,

    -- 감사
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 제약조건
    UNIQUE KEY uk_class_reviews_enrollment (enrollment_id),
    INDEX idx_class_reviews_class (class_id),
    INDEX idx_class_reviews_user (user_id),
    INDEX idx_class_reviews_rating (rating),
    INDEX idx_class_reviews_status (status),
    INDEX idx_class_reviews_created (created_at),

    CONSTRAINT fk_class_reviews_class
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_class_reviews_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_class_reviews_enrollment
        FOREIGN KEY (enrollment_id) REFERENCES class_enrollments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 5. 인덱스 설계

### 5.1 인덱스 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                      INDEX STRATEGY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Primary Key                                                  │
│     - 모든 테이블: UUID (VARCHAR(36))                            │
│     - B-Tree Index 자동 생성                                     │
│                                                                  │
│  2. Foreign Key Index                                            │
│     - 모든 FK 컬럼에 자동 인덱스                                  │
│     - 조인 성능 최적화                                           │
│                                                                  │
│  3. Unique Index                                                 │
│     - 비즈니스 유일 키 (email, order_number, coupon_code)        │
│                                                                  │
│  4. Composite Index                                              │
│     - 복합 조건 쿼리 최적화                                       │
│     - 인덱스 컬럼 순서: 선택도 높은 컬럼 우선                     │
│                                                                  │
│  5. Full-Text Index                                              │
│     - products: (name, description)                              │
│     - 검색 기능 최적화                                           │
│                                                                  │
│  6. Covering Index                                               │
│     - 자주 사용되는 조회 쿼리 최적화                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 주요 인덱스 목록

| 테이블 | 인덱스명 | 컬럼 | 타입 |
|--------|----------|------|------|
| users | uk_users_email | email | UNIQUE |
| users | idx_users_status | status | INDEX |
| users | idx_users_role | role | INDEX |
| products | idx_products_shop | shop_id | INDEX |
| products | idx_products_status_visible | (status, is_visible) | COMPOSITE |
| products | ft_products_search | (name, description) | FULLTEXT |
| order_summaries | uk_order_summaries_number | order_number | UNIQUE |
| order_summaries | idx_order_summaries_user_status | (user_id, status) | COMPOSITE |
| order_summaries | idx_order_summaries_created | created_at | INDEX |
| carts | idx_carts_user_status | (user_id, status) | COMPOSITE |
| vr_malls | idx_vr_malls_status_visible | (status, is_visible) | COMPOSITE |
| dotarts | idx_dotarts_user | user_id | INDEX |
| coupons | uk_coupons_code | code | UNIQUE |

---

## 6. 마이그레이션 전략

### 6.1 Legacy → New 매핑

```
┌─────────────────────────────────────────────────────────────────┐
│                    MIGRATION MAPPING                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Legacy Table          │  New Table           │  변경사항        │
│  ─────────────────────────────────────────────────────────────  │
│  USERS                 │  users               │  UUID PK         │
│  SHOPS                 │  shops               │  UUID PK         │
│  PRODUCTS              │  products            │  UUID PK, JSON   │
│  PRODUCTCATEGORY       │  categories          │  계층 구조 변경  │
│  ORDERS                │  order_items         │  분리            │
│  ORDERSUMMARY          │  order_summaries     │  UUID PK         │
│  CARTS                 │  carts               │  UUID PK         │
│  DELIVERYS             │  deliveries          │  UUID PK         │
│  DELIVERYPOLICY        │  delivery_policies   │  UUID PK         │
│  VRMALLS               │  vr_malls            │  JSON 필드 추가  │
│  VRMODELS              │  vr_models           │  UUID PK         │
│  CREATIONS             │  creations           │  UUID PK         │
│  NOTICES               │  notices             │  UUID PK         │
│  FAQS                  │  faqs                │  UUID PK         │
│  QNAS                  │  qnas                │  UUID PK         │
│  (없음)                │  dotarts             │  신규 테이블     │
│  (없음)                │  coupons             │  신규 테이블     │
│  (없음)                │  banners             │  신규 테이블     │
│  (없음)                │  user_socials        │  신규 테이블     │
│  (없음)                │  refresh_tokens      │  신규 테이블     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 마이그레이션 스크립트 구조

```
db/migration/
├── V1__create_user_domain.sql
├── V2__create_shop_domain.sql
├── V3__create_product_domain.sql
├── V4__create_order_domain.sql
├── V5__create_vrmall_domain.sql
├── V6__create_dotart_domain.sql
├── V7__create_creation_domain.sql
├── V8__create_support_domain.sql
├── V9__create_marketing_domain.sql
├── V10__create_system_domain.sql
├── V11__add_indexes.sql
├── V12__add_constraints.sql
└── V13__seed_data.sql
```

### 6.3 데이터 마이그레이션 순서

```
1. users (독립)
2. shops (users 참조)
3. categories (독립)
4. products (shops, categories 참조)
5. delivery_policies (shops 참조)
6. deliveries (users, shops 참조)
7. carts (users, shops, products 참조)
8. order_summaries (users, shops, deliveries 참조)
9. order_items (order_summaries, products 참조)
10. vr_malls (shops, users 참조)
11. vr_models (shops 참조)
12. dotarts (users 참조)
13. creations (users, shops 참조)
14. notices, faqs, qnas (shops, users 참조)
15. coupons, banners, popups (shops 참조)
```

---

## 7. 데이터 무결성

### 7.1 제약조건 요약

| 유형 | 설명 | 예시 |
|------|------|------|
| PRIMARY KEY | 테이블 고유 식별자 | id VARCHAR(36) |
| FOREIGN KEY | 참조 무결성 | user_id → users(id) |
| UNIQUE | 중복 방지 | email, order_number |
| NOT NULL | 필수 값 | name, email |
| CHECK | 값 범위 검증 | price >= 0 |
| DEFAULT | 기본값 | status = 'ACTIVE' |
| ENUM | 허용 값 제한 | status ENUM('ACTIVE', 'INACTIVE') |

### 7.2 Soft Delete 정책

```sql
-- Soft Delete 컬럼 (해당 테이블에 추가)
is_deleted          BOOLEAN DEFAULT FALSE,
deleted_at          TIMESTAMP NULL,
deleted_by          VARCHAR(36),

-- 조회 시 조건
WHERE is_deleted = FALSE
```

**Soft Delete 적용 테이블:**
- users
- products
- vr_malls
- dotarts
- creations
- notices
- qnas

### 7.3 Cascade 정책

| 관계 | ON DELETE | ON UPDATE |
|------|-----------|-----------|
| users → user_socials | CASCADE | CASCADE |
| users → refresh_tokens | CASCADE | CASCADE |
| users → carts | CASCADE | CASCADE |
| shops → products | RESTRICT | CASCADE |
| products → product_images | CASCADE | CASCADE |
| order_summaries → order_items | CASCADE | CASCADE |
| dotarts → dotart_comments | CASCADE | CASCADE |
| dotarts → dotart_likes | CASCADE | CASCADE |

---

## 8. 백업 및 복구

### 8.1 백업 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                      BACKUP STRATEGY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Daily Full Backup                                               │
│  ├── 시간: 매일 03:00 (KST)                                      │
│  ├── 보관: 30일                                                  │
│  └── 저장소: AWS S3 (Glacier)                                    │
│                                                                  │
│  Hourly Incremental Backup                                       │
│  ├── Binary Log 기반                                             │
│  ├── 보관: 7일                                                   │
│  └── Point-in-Time Recovery 지원                                │
│                                                                  │
│  Real-time Replication                                           │
│  ├── Master-Slave 구성                                           │
│  ├── 읽기 부하 분산                                               │
│  └── 장애 시 Failover                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 복구 절차

1. **Point-in-Time Recovery**: Binary Log 기반 특정 시점 복구
2. **Full Restore**: 일일 백업 + Incremental 적용
3. **Table-Level Restore**: 개별 테이블 복구

---

## 부록

### A. 테이블 목록 (전체)

| # | 도메인 | 테이블명 | 설명 |
|---|--------|----------|------|
| 1 | User | users | 사용자 |
| 2 | User | user_socials | 소셜 로그인 |
| 3 | User | refresh_tokens | 리프레시 토큰 |
| 4 | User | user_addresses | 배송지 주소록 |
| 5 | Shop | shops | 상점 |
| 6 | Shop | delivery_policies | 배송 정책 |
| 7 | Product | categories | 카테고리 |
| 8 | Product | products | 상품 |
| 9 | Product | product_images | 상품 이미지 |
| 10 | Order | carts | 장바구니 |
| 11 | Order | order_summaries | 주문 요약 |
| 12 | Order | order_items | 주문 상품 |
| 13 | Order | deliveries | 배송지 |
| 14 | VrMall | vr_malls | VR 몰 |
| 15 | VrMall | vr_models | VR 모델 |
| 16 | VrMall | vr_mall_likes | VR 몰 좋아요 |
| 17 | VrMall | vr_mall_user_roles | VR 몰 사용자 권한 |
| 18 | DotArt | dotarts | 도트아트 |
| 19 | DotArt | dotart_comments | 도트아트 댓글 |
| 20 | DotArt | dotart_likes | 도트아트 좋아요 |
| 21 | DotArt | dotart_blacklists | 도트아트 신고 |
| 22 | Creation | creations | 창작물 |
| 23 | Creation | creation_comments | 창작물 댓글 |
| 24 | Creation | creation_likes | 창작물 좋아요 |
| 25 | Creation | creation_blacklists | 창작물 신고 |
| 26 | Manual | manuals | 매뉴얼 |
| 27 | Manual | program_books | 프로그램북 |
| 28 | Support | notices | 공지사항 |
| 29 | Support | faqs | FAQ |
| 30 | Support | qnas | Q&A |
| 31 | Marketing | coupons | 쿠폰 |
| 32 | Marketing | user_coupons | 사용자 쿠폰 |
| 33 | Marketing | banners | 배너 |
| 34 | Marketing | popups | 팝업 |
| 35 | System | system_settings | 시스템 설정 |
| 36 | System | activity_logs | 활동 로그 |
| 37 | System | app_sequences | 시퀀스 |

### B. Legacy 테이블 호환성

| Legacy (APPSEQUENCES) | New (app_sequences) |
|----------------------|---------------------|
| USER_SEQ | 미사용 (UUID) |
| SHOP_SEQ | 미사용 (UUID) |
| PRODUCT_SEQ | 미사용 (UUID) |
| ORDERS_SEQ | 미사용 (UUID) |
| - | ORDER_NUMBER (주문번호) |
| - | INVOICE_NUMBER (송장번호) |

---

**문서 버전**: 1.0
**작성일**: 2026-01-01
**기반 문서**: 01_PRD.md, 03_ARCHITECTURE.md, legacy/backend 엔티티
**테이블 수**: 37개
