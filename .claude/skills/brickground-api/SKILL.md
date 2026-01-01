---
name: brickground-api
description: BrickGround Frontend-Backend API 연동 표준. API 설계, 타입 동기화, 엔드포인트 정의, API 연동 시 자동 적용.
---

# BrickGround API 연동 표준

## 1. API 응답 형식

### 1.1 공통 응답 구조

```typescript
// Frontend TypeScript 타입
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

```java
// Backend Java 클래스
@Getter
@Builder
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private ErrorInfo error;
    private PageMeta meta;
}
```

### 1.2 성공 응답 예시

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "레고 클래식 벽돌 세트",
    "price": 49900
  }
}
```

### 1.3 에러 응답 예시

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "상품을 찾을 수 없습니다"
  }
}
```

### 1.4 페이징 응답 예시

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

## 2. API 엔드포인트 규칙

### 2.1 기본 경로 구조

```
/api/v1/{domain}/{action}
```

### 2.2 도메인별 엔드포인트

| 도메인 | Base URL | 설명 |
|--------|----------|------|
| auth | /api/v1/auth | 인증 |
| users | /api/v1/users | 사용자 |
| products | /api/v1/products | 상품 |
| orders | /api/v1/orders | 주문 |
| vrmalls | /api/v1/vrmalls | VR Mall |
| dotarts | /api/v1/dotarts | DotArt |
| creations | /api/v1/creations | Creation |
| coupons | /api/v1/coupons | 쿠폰 |
| banners | /api/v1/banners | 배너 |
| manuals | /api/v1/manuals | 매뉴얼 |
| help | /api/v1/help | 고객센터 |

### 2.3 CRUD 엔드포인트

| 작업 | Method | 경로 | 예시 |
|------|--------|------|------|
| 목록 | GET | /{domain} | GET /api/v1/products |
| 상세 | GET | /{domain}/{id} | GET /api/v1/products/1 |
| 생성 | POST | /{domain} | POST /api/v1/products |
| 수정 | PUT | /{domain}/{id} | PUT /api/v1/products/1 |
| 삭제 | DELETE | /{domain}/{id} | DELETE /api/v1/products/1 |

## 3. Frontend API 클라이언트

### 3.1 디렉토리 구조

```
frontend/
├── lib/
│   └── api/
│       ├── client.ts      # API 클라이언트 설정
│       ├── products.ts    # 상품 API
│       ├── orders.ts      # 주문 API
│       └── ...
├── hooks/
│   ├── useProducts.ts     # 상품 훅
│   ├── useOrders.ts       # 주문 훅
│   └── ...
└── types/
    ├── api.ts             # API 공통 타입
    ├── product.ts         # 상품 타입
    ├── order.ts           # 주문 타입
    └── ...
```

### 3.2 API 클라이언트 기본 설정

```typescript
// lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

### 3.3 도메인별 API 함수

```typescript
// lib/api/products.ts
import { apiClient } from './client';
import type { Product, ProductCreateRequest, ProductListResponse } from '@/types/product';

export const productApi = {
  getList: (page: number = 1, size: number = 10) =>
    apiClient<ProductListResponse>('/api/v1/products', {
      params: { page, size },
    }),

  getById: (id: number) =>
    apiClient<Product>(`/api/v1/products/${id}`),

  create: (data: ProductCreateRequest) =>
    apiClient<Product>('/api/v1/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<ProductCreateRequest>) =>
    apiClient<Product>(`/api/v1/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiClient<void>(`/api/v1/products/${id}`, {
      method: 'DELETE',
    }),
};
```

### 3.4 React Query 훅

```typescript
// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/lib/api/products';

export function useProducts(page: number = 1) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => productApi.getList(page),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

## 4. 타입 동기화

### 4.1 Backend DTO → Frontend Type 매핑

| Backend (Java) | Frontend (TypeScript) |
|----------------|----------------------|
| Long | number |
| Integer | number |
| String | string |
| Boolean | boolean |
| LocalDateTime | string (ISO 8601) |
| List<T> | T[] |
| Page<T> | PaginatedResponse<T> |
| Enum | string literal union |

### 4.2 타입 정의 예시

```typescript
// types/product.ts

// Entity 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

// Enum 타입
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'SOLD_OUT';

// Request 타입
export interface ProductCreateRequest {
  name: string;
  price: number;
  description?: string;
}

export interface ProductUpdateRequest {
  name?: string;
  price?: number;
  description?: string;
}

// Response 타입
export interface ProductListResponse {
  content: Product[];
  page: number;
  totalPages: number;
  totalElements: number;
}
```

## 5. 인증 헤더

```typescript
// 인증이 필요한 요청
const authHeaders = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};
```

## 6. 에러 코드

| 코드 | HTTP Status | 설명 |
|------|-------------|------|
| VALIDATION_ERROR | 400 | 유효성 검증 실패 |
| UNAUTHORIZED | 401 | 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| INTERNAL_ERROR | 500 | 서버 오류 |

## 7. 참조 문서

- PRD: `docs/01_PRD.md`
- 아키텍처: `docs/03_ARCHITECTURE.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
