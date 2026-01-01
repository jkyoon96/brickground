---
description: 새 도메인 전체 구조 생성 (Backend + Frontend)
argument-hint: [domainName]
allowed-tools: Read, Write, Bash(mkdir:*), Glob
---

# 도메인 생성: $ARGUMENTS

## 작업 순서

### 1. 기존 도메인 참조
- `backend/src/main/java/com/brickground/domain/` 구조 확인
- `frontend/` 구조 확인
- 명명 규칙 파악

### 2. Backend 구조 생성

#### 2.1 디렉토리 생성
```
backend/src/main/java/com/brickground/domain/$ARGUMENTS/
├── controller/
├── service/
├── repository/
├── entity/
└── dto/
```

#### 2.2 Entity 생성
**파일**: `entity/$ARGUMENTS.java`

```java
package com.brickground.domain.$ARGUMENTS.entity;

import com.brickground.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "{table_name}")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class {DomainName} extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 필드 추가
}
```

#### 2.3 Repository 생성
**파일**: `repository/{DomainName}Repository.java`

```java
package com.brickground.domain.$ARGUMENTS.repository;

import com.brickground.domain.$ARGUMENTS.entity.{DomainName};
import org.springframework.data.jpa.repository.JpaRepository;

public interface {DomainName}Repository extends JpaRepository<{DomainName}, Long> {
}
```

#### 2.4 Service 생성
**파일**: `service/{DomainName}Service.java`

```java
package com.brickground.domain.$ARGUMENTS.service;

import com.brickground.domain.$ARGUMENTS.repository.{DomainName}Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class {DomainName}Service {

    private final {DomainName}Repository repository;

    // CRUD 메서드 구현
}
```

#### 2.5 Controller 생성
**파일**: `controller/{DomainName}Controller.java`

```java
package com.brickground.domain.$ARGUMENTS.controller;

import com.brickground.domain.$ARGUMENTS.service.{DomainName}Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/{domain}")
@RequiredArgsConstructor
public class {DomainName}Controller {

    private final {DomainName}Service service;

    // API 엔드포인트 구현
}
```

#### 2.6 DTO 생성
**파일**: `dto/{DomainName}Request.java`, `dto/{DomainName}Response.java`

### 3. Frontend 구조 생성

#### 3.1 페이지 생성
**파일**: `frontend/app/(main)/$ARGUMENTS/page.tsx`

```typescript
import { {DomainName}List } from '@/components/user/$ARGUMENTS/{DomainName}List';

export default function {DomainName}Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{Title}</h1>
      <{DomainName}List />
    </div>
  );
}
```

#### 3.2 컴포넌트 디렉토리
**위치**: `frontend/components/user/$ARGUMENTS/`

#### 3.3 API 클라이언트
**파일**: `frontend/lib/api/$ARGUMENTS.ts`

```typescript
import { apiClient } from './client';
import type { {DomainName}, {DomainName}ListResponse } from '@/types/$ARGUMENTS';

export const $ARGUMENTSApi = {
  getList: (page: number = 1) =>
    apiClient<{DomainName}ListResponse>('/api/v1/$ARGUMENTS', { params: { page } }),

  getById: (id: number) =>
    apiClient<{DomainName}>(`/api/v1/$ARGUMENTS/${id}`),

  create: (data: Partial<{DomainName}>) =>
    apiClient<{DomainName}>('/api/v1/$ARGUMENTS', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: number, data: Partial<{DomainName}>) =>
    apiClient<{DomainName}>(`/api/v1/$ARGUMENTS/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: number) =>
    apiClient<void>(`/api/v1/$ARGUMENTS/${id}`, { method: 'DELETE' }),
};
```

#### 3.4 React Query 훅
**파일**: `frontend/hooks/use{DomainName}.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { $ARGUMENTSApi } from '@/lib/api/$ARGUMENTS';

export function use{DomainName}List(page: number = 1) {
  return useQuery({
    queryKey: ['$ARGUMENTS', page],
    queryFn: () => $ARGUMENTSApi.getList(page),
  });
}

export function use{DomainName}(id: number) {
  return useQuery({
    queryKey: ['$ARGUMENTS', id],
    queryFn: () => $ARGUMENTSApi.getById(id),
    enabled: !!id,
  });
}
```

#### 3.5 TypeScript 타입
**파일**: `frontend/types/$ARGUMENTS.ts`

```typescript
export interface {DomainName} {
  id: number;
  // 필드 정의
  createdAt: string;
  updatedAt: string;
}

export interface {DomainName}ListResponse {
  content: {DomainName}[];
  page: number;
  totalPages: number;
  totalElements: number;
}
```

## 참조 문서
- 아키텍처: `docs/03_ARCHITECTURE.md`
- 데이터베이스: `docs/04_DATABASE.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
