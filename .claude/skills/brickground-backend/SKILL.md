---
name: brickground-backend
description: BrickGround 백엔드 개발 표준. Spring Boot API, 도메인 로직, JPA 엔티티 개발 시 자동 적용. "API 만들어", "엔드포인트 개발", "서비스 구현", "백엔드" 요청 시 활성화.
---

# BrickGround Backend 개발 표준

## 1. 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Spring Boot | 3.0.x | Java 프레임워크 |
| Java | 17 (LTS) | 프로그래밍 언어 |
| Spring Security | 6.x | 인증/인가 |
| Spring Data JPA | 3.x | ORM |
| MySQL | 8.x | 데이터베이스 |
| Redis | 7.x | 캐시/세션 |

## 2. 도메인 기반 구조 (DDD)

```
backend/src/main/java/com/brickground/
├── domain/                  # 도메인별 구조
│   └── {domain}/
│       ├── controller/      # REST API 컨트롤러
│       ├── service/         # 비즈니스 로직
│       ├── repository/      # 데이터 접근
│       ├── entity/          # JPA 엔티티
│       └── dto/             # 요청/응답 DTO
├── common/                  # 공통 유틸리티
│   ├── exception/           # 예외 처리
│   ├── response/            # API 응답 래퍼
│   └── util/                # 유틸리티
└── config/                  # 설정 클래스
    ├── SecurityConfig.java
    ├── JpaConfig.java
    └── RedisConfig.java
```

## 3. 도메인 목록

| 도메인 | 설명 | 주요 기능 |
|--------|------|-----------|
| user | 사용자 | 회원 관리, 프로필 |
| product | 상품 | 상품 CRUD, 카테고리 |
| order | 주문 | 주문 처리, 결제 |
| vrmall | VR Mall | 3D 쇼핑몰 |
| dotart | DotArt | 픽셀 아트 |
| creation | Creation | 3D 창작물 |
| manual | 매뉴얼 | 사용 가이드 |
| help | 고객센터 | FAQ, 문의 |
| coupon | 쿠폰 | 할인 쿠폰 |
| banner | 배너 | 광고 배너 |
| auth | 인증 | 로그인, JWT |
| admin | 관리자 | 관리 기능 |

## 4. 파일 명명 규칙

| 타입 | 규칙 | 예시 |
|------|------|------|
| Controller | *Controller.java | `ProductController.java` |
| Service | *Service.java | `ProductService.java` |
| Repository | *Repository.java | `ProductRepository.java` |
| Entity | *.java (도메인명) | `Product.java` |
| Request DTO | *Request.java | `ProductCreateRequest.java` |
| Response DTO | *Response.java | `ProductResponse.java` |

## 5. Controller 작성 규칙

```java
package com.brickground.domain.product.controller;

import com.brickground.common.response.ApiResponse;
import com.brickground.domain.product.dto.*;
import com.brickground.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getProducts(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProducts(pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProduct(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @RequestBody @Valid ProductCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productService.createProduct(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productService.updateProduct(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
```

## 6. Service 작성 규칙

```java
package com.brickground.domain.product.service;

import com.brickground.common.exception.BusinessException;
import com.brickground.common.exception.ErrorCode;
import com.brickground.domain.product.dto.*;
import com.brickground.domain.product.entity.Product;
import com.brickground.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductResponse> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(ProductResponse::from);
    }

    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.PRODUCT_NOT_FOUND));
        return ProductResponse.from(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
        return ProductResponse.from(productRepository.save(product));
    }
}
```

## 7. Entity 작성 규칙

```java
package com.brickground.domain.product.entity;

import com.brickground.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status = ProductStatus.ACTIVE;

    // 비즈니스 메서드
    public void updateInfo(String name, Integer price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
```

## 8. DTO 작성 규칙

```java
// Request DTO
package com.brickground.domain.product.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateRequest {

    @NotBlank(message = "상품명은 필수입니다")
    @Size(max = 200)
    private String name;

    @NotNull(message = "가격은 필수입니다")
    @Min(0)
    private Integer price;

    private String description;
}

// Response DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
```

## 9. API 응답 형식

```java
package com.brickground.common.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private ErrorInfo error;

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .error(new ErrorInfo(code, message))
                .build();
    }

    @Getter
    @AllArgsConstructor
    public static class ErrorInfo {
        private String code;
        private String message;
    }
}
```

## 10. API 경로 규칙

| HTTP Method | 경로 | 용도 |
|-------------|------|------|
| GET | /api/v1/{domain} | 목록 조회 |
| GET | /api/v1/{domain}/{id} | 단건 조회 |
| POST | /api/v1/{domain} | 생성 |
| PUT | /api/v1/{domain}/{id} | 수정 |
| DELETE | /api/v1/{domain}/{id} | 삭제 |

## 11. 참조 문서

- 아키텍처: `docs/03_ARCHITECTURE.md`
- 데이터베이스: `docs/04_DATABASE.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
