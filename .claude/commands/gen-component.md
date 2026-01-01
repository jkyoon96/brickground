---
description: Pixar 스타일 React 컴포넌트 생성
argument-hint: [ComponentName] [user|admin]
allowed-tools: Read, Write, Glob, Grep
---

# 컴포넌트 생성: $1

**타입**: $2 (user = Pixar 스타일, admin = shadcn/ui 스타일)

## 작업 순서

### 1. 와이어프레임 확인
- `wireframes/pc/` 디렉토리에서 관련 HTML 파일 검색
- 해당 컴포넌트의 디자인 패턴 분석

### 2. 기존 컴포넌트 확인
- `frontend/components/$2/` 에서 유사 컴포넌트 참조
- 프로젝트 스타일 패턴 파악

### 3. 컴포넌트 생성

**파일 위치**: `frontend/components/$2/$1.tsx`

**User 컴포넌트 (Pixar Style) 템플릿**:
```typescript
'use client';

import { motion } from 'framer-motion';

interface $1Props {
  // props 정의
}

export function $1({ ...props }: $1Props) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 컴포넌트 내용 */}
    </motion.div>
  );
}
```

**Admin 컴포넌트 (shadcn/ui) 템플릿**:
```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface $1Props {
  // props 정의
}

export function $1({ ...props }: $1Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 컴포넌트 내용 */}
      </CardContent>
    </Card>
  );
}
```

### 4. 스타일 적용

**User (Pixar Style)**:
- Border Radius: 16-24px (`rounded-2xl`, `rounded-3xl`)
- 그림자: `shadow-lg`, `shadow-xl`
- 애니메이션: Framer Motion (bounce, spring)
- 컬러: Pixar Blue (#0066FF), Toy Yellow (#FFD93D)

**Admin (shadcn/ui)**:
- shadcn/ui 컴포넌트 활용
- 다크모드 지원 (`dark:` 접두사)
- 미니멀한 스타일

### 5. 반응형 처리
- `wireframes/pc/common/responsive.css` 참조
- 브레이크포인트: `md:` (768px), `lg:` (1024px)

## 참조 문서
- 디자인 가이드: `docs/05_UI_UX.md`
- 개발 워크플로우: `docs/06_WORKFLOW.md`
- 와이어프레임: `wireframes/pc/`
