---
description: Frontend-Backend API 타입 동기화 검증
argument-hint: [domain] (선택, 미입력시 전체 검증)
allowed-tools: Read, Grep, Glob
---

# API 동기화 검증: $ARGUMENTS

## 검증 순서

### 1. Backend DTO 수집

#### 1.1 Request DTO 검색
```
backend/src/main/java/com/brickground/domain/{domain}/dto/*Request.java
```

#### 1.2 Response DTO 검색
```
backend/src/main/java/com/brickground/domain/{domain}/dto/*Response.java
```

#### 1.3 필드 추출
- 필드명
- 타입
- 어노테이션 (@NotNull, @Size 등)

### 2. Frontend Type 수집

#### 2.1 타입 파일 검색
```
frontend/types/{domain}.ts
```

#### 2.2 인터페이스 추출
- 인터페이스명
- 필드명
- 타입

### 3. 동기화 검증

#### 3.1 타입 매핑 규칙

| Java Type | TypeScript Type |
|-----------|-----------------|
| Long | number |
| Integer | number |
| Double | number |
| String | string |
| Boolean | boolean |
| LocalDateTime | string |
| LocalDate | string |
| List<T> | T[] |
| Set<T> | T[] |
| Map<K,V> | Record<K,V> |
| Enum | string literal |

#### 3.2 필드 비교
- Backend에만 있는 필드
- Frontend에만 있는 필드
- 타입 불일치 필드
- 명명 불일치 (camelCase 확인)

### 4. API 경로 검증

#### 4.1 Backend Controller 검색
```
backend/src/main/java/com/brickground/domain/{domain}/controller/*Controller.java
```

#### 4.2 Frontend API 클라이언트 검색
```
frontend/lib/api/{domain}.ts
```

#### 4.3 경로 비교
- 엔드포인트 일치 확인
- HTTP 메서드 일치 확인
- 파라미터 일치 확인

### 5. 검증 결과 리포트

#### 5.1 정상 항목
```
✅ ProductResponse ↔ Product: 동기화됨
✅ GET /api/v1/products: 경로 일치
```

#### 5.2 불일치 항목
```
❌ OrderResponse.orderDate (LocalDateTime) ↔ Order.orderDate (Date)
   → Frontend 타입을 string으로 변경 필요

❌ POST /api/v1/orders/create ↔ POST /api/v1/orders
   → Frontend API 경로 수정 필요
```

#### 5.3 누락 항목
```
⚠️ Backend: UserUpdateRequest 존재
   Frontend: 해당 타입 없음
   → frontend/types/user.ts에 추가 필요
```

### 6. 자동 수정 제안

#### 6.1 타입 추가
```typescript
// 누락된 타입 추가 제안
export interface UserUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
}
```

#### 6.2 경로 수정
```typescript
// 경로 수정 제안
create: (data: OrderCreateRequest) =>
  apiClient<Order>('/api/v1/orders', {  // /create 제거
    method: 'POST',
    body: JSON.stringify(data),
  }),
```

### 7. 전체 도메인 검증 (인자 없을 경우)

검증 대상 도메인:
- user
- product
- order
- vrmall
- dotart
- creation
- manual
- help
- coupon
- banner

## 참조 문서
- API 표준: `.claude/skills/brickground-api/SKILL.md`
- 아키텍처: `docs/03_ARCHITECTURE.md`
- 데이터베이스: `docs/04_DATABASE.md`
