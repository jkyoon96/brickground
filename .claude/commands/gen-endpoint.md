---
description: Backend API 엔드포인트 + Frontend 연동 코드 생성
argument-hint: [domain] [action] (예: product list)
allowed-tools: Read, Write, Glob, Grep
---

# API 엔드포인트 생성: $ARGUMENTS

## 작업 순서

### 1. 기존 코드 확인
- Backend: `backend/src/main/java/com/brickground/domain/` 구조 확인
- Frontend: `frontend/lib/api/`, `frontend/types/` 확인
- 관련 문서: `docs/03_ARCHITECTURE.md`, `docs/04_DATABASE.md`

### 2. Backend 코드 생성

#### 2.1 DTO 생성
**위치**: `backend/src/main/java/com/brickground/domain/{domain}/dto/`

```java
// {Action}Request.java
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class {Action}Request {
    // 요청 필드
}

// {Action}Response.java
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class {Action}Response {
    // 응답 필드

    public static {Action}Response from({Entity} entity) {
        return {Action}Response.builder()
            // 매핑
            .build();
    }
}
```

#### 2.2 Service 메서드 추가
**위치**: `backend/src/main/java/com/brickground/domain/{domain}/service/{Domain}Service.java`

```java
@Transactional(readOnly = true)  // 조회는 readOnly
public {Response} {action}({Request} request) {
    // 비즈니스 로직
}
```

#### 2.3 Controller 메서드 추가
**위치**: `backend/src/main/java/com/brickground/domain/{domain}/controller/{Domain}Controller.java`

```java
@GetMapping  // 또는 @PostMapping, @PutMapping, @DeleteMapping
public ResponseEntity<ApiResponse<{Response}>> {action}(@RequestBody @Valid {Request} request) {
    return ResponseEntity.ok(ApiResponse.success(service.{action}(request)));
}
```

### 3. Frontend 코드 생성

#### 3.1 TypeScript 타입
**위치**: `frontend/types/{domain}.ts`

```typescript
export interface {Action}Request {
  // 요청 필드
}

export interface {Action}Response {
  // 응답 필드
}
```

#### 3.2 API 함수
**위치**: `frontend/lib/api/{domain}.ts`

```typescript
import { apiClient } from './client';
import type { {Action}Request, {Action}Response } from '@/types/{domain}';

export const {domain}Api = {
  {action}: (data: {Action}Request) =>
    apiClient<{Action}Response>('/api/v1/{domain}/{action}', {
      method: 'POST',  // 또는 GET, PUT, DELETE
      body: JSON.stringify(data),
    }),
};
```

#### 3.3 React Query 훅
**위치**: `frontend/hooks/use{Domain}.ts`

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { {domain}Api } from '@/lib/api/{domain}';

export function use{Action}() {
  return useQuery({
    queryKey: ['{domain}', '{action}'],
    queryFn: () => {domain}Api.{action}(),
  });
}
```

### 4. API 경로 규칙

| Action | HTTP Method | 경로 |
|--------|-------------|------|
| list | GET | /api/v1/{domain} |
| get | GET | /api/v1/{domain}/{id} |
| create | POST | /api/v1/{domain} |
| update | PUT | /api/v1/{domain}/{id} |
| delete | DELETE | /api/v1/{domain}/{id} |

## 참조 문서
- 아키텍처: `docs/03_ARCHITECTURE.md`
- 데이터베이스: `docs/04_DATABASE.md`
- API 표준: `.claude/skills/brickground-api/SKILL.md`
