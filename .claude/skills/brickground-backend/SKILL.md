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
| OpenAPI | 3.x | API 문서화 (Swagger UI) |
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
    ├── RedisConfig.java
    └── OpenApiConfig.java   # Swagger/OpenAPI 설정
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

## 11. OpenAPI 3.x (Swagger) 설정

### 11.1 의존성 (build.gradle)

```groovy
dependencies {
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
}
```

### 11.2 OpenAPI 설정 클래스

```java
package com.brickground.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        String securitySchemeName = "bearerAuth";

        return new OpenAPI()
            .info(new Info()
                .title("BrickGround API")
                .description("VR Mall & E-commerce Platform API")
                .version("v1.0.0")
                .contact(new Contact()
                    .name("BrickGround Team")
                    .email("support@brickground.com")))
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

### 11.3 Controller 어노테이션

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Product", description = "상품 관리 API")
public class ProductController {

    @Operation(summary = "상품 목록 조회", description = "페이징된 상품 목록을 조회합니다")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "조회 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getProducts(
            @Parameter(description = "페이지 정보") Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProducts(pageable)));
    }

    @Operation(summary = "상품 상세 조회", description = "ID로 상품을 조회합니다")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(
            @Parameter(description = "상품 ID", required = true) @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProduct(id)));
    }

    @Operation(summary = "상품 등록", description = "새 상품을 등록합니다")
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @RequestBody @Valid ProductCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(productService.createProduct(request)));
    }
}
```

### 11.4 DTO 어노테이션

```java
import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "상품 생성 요청")
public class ProductCreateRequest {

    @Schema(description = "상품명", example = "레고 클래식 세트", required = true)
    @NotBlank(message = "상품명은 필수입니다")
    @Size(max = 200)
    private String name;

    @Schema(description = "가격", example = "49900", required = true)
    @NotNull(message = "가격은 필수입니다")
    @Min(0)
    private Integer price;

    @Schema(description = "상품 설명", example = "창의력을 키워주는 레고 세트입니다")
    private String description;
}
```

### 11.5 Swagger UI 접속

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`
- **OpenAPI YAML**: `http://localhost:8080/v3/api-docs.yaml`

### 11.6 application.yml 설정

```yaml
springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  default-consumes-media-type: application/json
  default-produces-media-type: application/json
```

## 12. 참조 문서

- 아키텍처: `docs/03_ARCHITECTURE.md`
- 데이터베이스: `docs/04_DATABASE.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
