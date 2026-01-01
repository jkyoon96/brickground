# BrickGround

VR mall and e-commerce platform with 3D shopping experiences and pixel art creation.

## Project Structure

```
brickground/
├── frontend/                 # Next.js 16 Frontend
│   ├── app/                  # App Router
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (main)/          # User-facing pages (Pixar Style)
│   │   ├── (mypage)/        # My page section
│   │   ├── (seller)/        # Seller dashboard
│   │   ├── (policy)/        # Policy pages
│   │   └── admin/           # Admin dashboard (shadcn/ui)
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── user/            # User frontend components (Pixar)
│   │   └── admin/           # Admin components
│   ├── lib/                 # Utilities and API clients
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles (user/admin)
├── backend/                  # Spring Boot 3.0 Backend
│   └── src/main/java/com/brickground/
│       ├── domain/          # Domain-driven structure
│       │   └── {domain}/    # user, product, order, etc.
│       │       ├── controller/
│       │       ├── service/
│       │       ├── repository/
│       │       ├── entity/
│       │       └── dto/
│       ├── common/          # Shared utilities
│       └── config/          # Configuration classes
├── docs/                     # Documentation
│   └── PRD.md               # Product Requirements Document
└── legacy/                   # Previous production code
    ├── frontend/            # React 16 frontend
    └── backend/             # Spring Boot 2.7.5 backend
```

## Tech Stack

### Frontend (New)
| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 15.x | React framework (App Router) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | latest | UI components |
| Three.js | 0.170+ | 3D rendering |
| React Three Fiber | 9.x | React renderer for Three.js |
| Zustand | 5.x | State management |
| TanStack Query | 5.x | Server state |
| Framer Motion | 11.x | Animations |

### Backend (New)
| Technology | Version | Description |
|------------|---------|-------------|
| Spring Boot | 3.0.x | Java framework |
| Java | 17 (LTS) | Programming language |
| Spring Security | 6.x | Authentication/Authorization |
| Spring Data JPA | 3.x | ORM |
| MySQL | 8.x | Database |
| Redis | 7.x | Cache/Session |

## Design System

### User Frontend (Pixar Style)
- **Theme**: Playful, friendly, vibrant colors
- **Border Radius**: 16-24px (rounded)
- **Animations**: Bounce, spring, float (Framer Motion)
- **Font**: Nunito / 나눔스퀘어라운드
- **Colors**: Pixar Blue (#0066FF), Toy Yellow (#FFD93D)

### Admin Frontend (shadcn/ui)
- **Theme**: Clean, minimal, neutral
- **Border Radius**: 6-8px (standard)
- **Animations**: Fade, slide (subtle)
- **Font**: Inter / Pretendard
- **Dark Mode**: Supported

## Commands

### Frontend
```bash
cd frontend
npm install
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Backend
```bash
cd backend
./gradlew build
./gradlew bootRun    # Dev server at localhost:8080
./gradlew test       # Run tests
```

### Docker (Planned)
```bash
docker-compose up -d           # Start all services
docker-compose down            # Stop all services
```

## API Structure

### Public APIs
- `GET /api/v1/products` - Product list
- `GET /api/v1/vrmalls` - VR Mall list
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register

### Admin APIs
- `GET /api/v1/admin/dashboard` - Dashboard stats
- `GET /api/v1/admin/users` - User management
- `GET /api/v1/admin/orders` - Order management

## Key Features

- **VR Mall**: 3D virtual shopping experience
- **DotArt**: Pixel art creation with music mode
- **Creation**: 3D creative content platform
- **E-commerce**: Cart, checkout, payment integration
- **Admin**: Full-featured management dashboard

## Code Conventions

### Frontend
- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useCart.ts`)
- **Utils**: camelCase (`formatPrice.ts`)
- **Types**: PascalCase (`Product.ts`)

### Backend (Domain-Driven)
```
domain/{domain}/
├── controller/   # *Controller.java (REST API)
├── service/      # *Service.java (Business logic)
├── repository/   # *Repository.java (Data access)
├── entity/       # *Entity.java (JPA entities)
└── dto/          # *Request.java, *Response.java
```
- 각 도메인: user, product, order, vrmall, dotart, creation, manual, help, coupon, banner, auth, admin

## Environment Variables

Copy `.env.example` to `.env` and configure:

### Frontend
- `BACKEND_URL` - Backend API URL
- `NEXTAUTH_SECRET` - Auth secret
- OAuth credentials (Kakao, Naver, Google)

### Backend
- `DB_USERNAME`, `DB_PASSWORD` - Database
- `JWT_SECRET` - JWT signing key
- `AWS_*` - S3 configuration
