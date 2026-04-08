# Blog

Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그 (미니멀 다크 테마)

## 기술 스택

- Framework: Next.js 16.2.2 (App Router)
- Language: TypeScript 6
- Styling: Tailwind CSS v4 (CSS custom properties 기반 다크 테마)
- Content: 로컬 MDX (gray-matter + next-mdx-remote)
- Test: Vitest (happy-dom) + React Testing Library
- E2E: Playwright

## 시작하기

개발 서버 실행:

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

## 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm run start

# Lint
npm run lint

# Unit + Integration 테스트
npm run test

# 테스트 워치 모드
npm run test:watch

# E2E 테스트
npm run test:e2e
```

## 폴더 구조

```
blog/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
├── content/         # MDX 포스트 파일
├── lib/             # 유틸리티 함수
├── types/           # TypeScript 타입 정의
├── __tests__/       # Vitest 테스트
├── e2e/             # Playwright E2E 테스트
└── docs/            # 프로젝트 문서
```

## 기능

- **터미널 인터페이스**: CLI 스타일 블로그 네비게이션
- **포스트 시스템**: MDX 기반 블로그 포스트
- **태그 시스템**: 태그별 포스트 필터링
- **검색 기능**: 클라이언트 사이드 포스트 검색
- **댓글**: Giscus (GitHub Discussions) 통합
- **SEO**: RSS 피드, Sitemap, Open Graph 메타 태그
- **반응형**: 모바일/태블릿/데스크탑 지원
- **다크 테마**: 기본 다크 테마

## 배포

### Vercel

Vercel에 배포하는 가장 쉬운 방법입니다:

[Create Next App](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=readme)

### GitHub Actions

`.github/workflows/deploy.yml`를 참조하세요.

## 문서

- [SPEC.md](./docs/SPEC.md) — 기능 명세
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — 폴더 구조, 데이터 흐름, 의존관계
- [DESIGN.md](./docs/DESIGN.md) — 다크 테마 디자인 시스템
- [TEST_PLAN.md](./docs/TEST_PLAN.md) — 테스트 전략

## 라이선스

MIT
