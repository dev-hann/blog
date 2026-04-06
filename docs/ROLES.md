# ROLES — 태스크별 역할 분담 정의

---

## 워크플로우 규칙

1. **각 Role이 담당하는 파일이 겹치지 않는다** → 병렬 실행 시 충돌 방지
2. **타입 계약(types/post.ts)은 모든 Role이 공유** — Task 1에서 확정
3. **테스트 먼저 작성(Red) → 구현(Green) → 리팩토링(Refactor)**
4. **각 Task 완료 후 반드시 `npm run build` + `npm run test` 통과 확인**
5. **Task 완료 후 커밋 → 메인에 완료 시간 보고**

---

## Task 0: 프로젝트 문서 + 테스트 인프라 세팅

| 항목 | 내용 |
|---|---|
| **목표** | 개발 기준 문서와 테스트 환경 구축 |
| **Role** | 단일 |
| **담당 파일** | `docs/*`, `vitest.config.ts`, `playwright.config.ts`, `__tests__/setup.ts` |
| **설치** | `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `playwright` |
| **완료 조건** | `npm run test` 실행 확인 (빈 테스트 통과), `npm run build` 통과 |
| **커밋** | `chore: project documentation and test infrastructure setup` |

---

## Task 1: 기반 인프라

| 항목 | 내용 |
|---|---|
| **목표** | 모든 기능이 의존하는 데이터 레이어 구축 |
| **Role** | 단일 (다른 Role이 의존) |
| **담당 파일** | `lib/posts.ts`, `lib/constants.ts`, `lib/mdx.ts`, `types/post.ts`, `content/posts/*.mdx` |
| **설치** | `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `rehype-slug` |
| **인터페이스** | `getAllPosts(): Post[]`, `getPostBySlug(slug): PostDetail`, `getAllTags(): Record<string, number>`, `getAdjacentPosts(slug): { prev, next }` |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/unit/lib/posts.test.ts` | getAllPosts 반환 타입 검증 / 날짜 내림차순 정렬 / draft=true 제외 |
| `__tests__/unit/lib/posts.test.ts` | getPostBySlug 성공 시 PostDetail 반환 / 존재하지 않는 slug → 에러 |
| `__tests__/unit/lib/posts.test.ts` | getAllTags 태그별 포스트 수 정확 / 빈 태그 제외 |
| `__tests__/unit/lib/constants.test.ts` | SITE_CONFIG 필수 필드 존재 |

### 구현 순서

1. `types/post.ts` — Post, PostDetail 타입 정의
2. `lib/constants.ts` — 사이트 메타 상수
3. `content/posts/` — 샘플 MDX 파일 3개 작성
4. `lib/posts.ts` — getAllPosts, getPostBySlug, getAllTags, getAdjacentPosts
5. `lib/mdx.ts` — MDX 렌더링 유틸

| **커밋** | `feat: content infrastructure — MDX pipeline, post utils, types` |

---

## Task 2: 레이아웃 & UI 파운데이션

| | Role A: 레이아웃 컴포넌트 | Role B: 스타일 시스템 |
|---|---|---|
| **담당 파일** | `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `app/layout.tsx` 수정 | `app/globals.css` |
| **작업** | Header (네비, 모바일 메뉴, sticky), Footer (링크, 저작권) | 다크 테마 CSS 토큰, 전역 스타일, 타이포그래피 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/unit/components/Header.test.tsx` | 네비 링크 전부 렌더링 / 현재 경로 활성 표시 / 모바일 메뉴 토글 |
| `__tests__/unit/components/Footer.test.tsx` | GitHub 링크 존재 / RSS 링크 존재 / 저작권 텍스트 |

| **커밋** | `feat: layout foundation — Header, Footer, dark theme tokens` |

---

## Task 3: 포스트 핵심 기능

| | Role A: 페이지 라우트 | Role B: 포스트 컴포넌트 + MDX 커스텀 |
|---|---|---|
| **담당 파일** | `app/posts/page.tsx`, `app/posts/[slug]/page.tsx` | `components/post/PostCard.tsx`, `components/post/PostBody.tsx`, `components/mdx/CustomLink.tsx`, `components/mdx/Pre.tsx` |
| **작업** | 목록 페이지 (정렬), 상세 페이지 (generateStaticParams, MDX 렌더링) | PostCard, PostBody, 커스텀 MDX 컴포넌트 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/integration/pages/post-list.test.tsx` | 전체 포스트 렌더링 / 날짜 내림차순 / 포스트 카드 클릭 링크 |
| `__tests__/integration/pages/post-detail.test.tsx` | 포스트 제목/날짜/태그 표시 / MDX 본문 렌더링 / 없는 slug → 404 |
| `__tests__/unit/components/PostCard.test.tsx` | 제목/날짜/요약/태그 렌더링 / 클릭 시 올바른 링크 |
| `__tests__/integration/mdx/mdx-rendering.test.tsx` | CustomLink 외부/내부 구분 / 코드 블록 렌더링 |

| **커밋** | `feat: post system — list, detail, MDX rendering with custom components` |

---

## Task 4: 태그 & 카테고리

| | Role A: 태그 페이지 | Role B: 태그 컴포넌트 |
|---|---|---|
| **담당 파일** | `app/tags/page.tsx`, `app/tags/[tag]/page.tsx` | `components/tag/TagBadge.tsx` |
| **작업** | 태그 목록 (카운트), 태그 상세 (필터링된 목록) | TagBadge 컴포넌트 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/integration/pages/tags.test.tsx` | 전체 태그 + 카운트 표시 / 태그 클릭 → 상세 이동 |
| `__tests__/integration/pages/tags.test.tsx` | 태그 상세: 해당 태그 포스트만 표시 / 존재하지 않는 태그 → 404 |
| `__tests__/unit/components/TagBadge.test.tsx` | 태그명 렌더링 / 카운트 표시 / 클릭 라우팅 |

| **커밋** | `feat: tag system — tag list, tag detail, TagBadge component` |

---

## Task 5: 홈 페이지

| 항목 | 내용 |
|---|---|
| **Role** | 단일 |
| **담당 파일** | `app/page.tsx` |
| **작업** | 히어로 섹션 (제목, 소개) + 최신 포스트 5개 카드 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/integration/pages/home.test.tsx` | 히어로 섹션 렌더링 / 최신 포스트 5개 표시 / 포스트 링크 동작 |

| **커밋** | `feat: home page — hero section with latest posts` |

---

## Task 6: 정적 페이지 (About, Projects)

| | Role A: About | Role B: Projects |
|---|---|---|
| **담당 파일** | `app/about/page.tsx` | `app/projects/page.tsx` |
| **작업** | 자기소개, 소셜 링크 | 프로젝트 카드 그리드 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/integration/pages/about.test.tsx` | 페이지 렌더링 / 내용 표시 |
| `__tests__/integration/pages/projects.test.tsx` | 프로젝트 목록 렌더링 / 카드 클릭 링크 |

| **커밋** | `feat: static pages — about and projects` |

---

## Task 7: 검색 기능

| | Role A: 검색 페이지 | Role B: 검색 컴포넌트 |
|---|---|---|
| **담당 파일** | `app/search/page.tsx` | `components/search/SearchBar.tsx`, `lib/search.ts` |
| **작업** | 검색 페이지 레이아웃 | SearchBar (디바운스, 필터링), 인덱스 생성 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/unit/lib/search.test.ts` | 인덱스 생성 / 전체 포스트 포함 |
| `__tests__/unit/components/SearchBar.test.tsx` | 검색어 입력 → 결과 필터링 / 빈 검색어 → 전체 / 없는 검색어 → 빈 결과 / 디바운스 동작 |

| **커밋** | `feat: search — client-side post search with debounced input` |

---

## Task 8: 댓글 (Giscus)

| 항목 | 내용 |
|---|---|
| **Role** | 단일 |
| **담당 파일** | `components/comment/Giscus.tsx`, `app/posts/[slug]/page.tsx` 수정 |
| **작업** | Giscus 컴포넌트, 포스트 상세에 삽입, lazy loading |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/unit/components/Giscus.test.tsx` | Giscus 컴포넌트 렌더링 / data-* 속성 확인 |
| `__tests__/integration/pages/post-detail.test.tsx` (수정) | 댓글 섹션 존재 확인 |

| **커밋** | `feat: comments — Giscus integration on post detail` |

---

## Task 9: SEO & RSS & Sitemap

| | Role A: RSS + Sitemap | Role B: SEO 메타 |
|---|---|---|
| **담당 파일** | `app/feed.xml/route.ts`, `app/sitemap.ts`, `app/robots.ts` | `components/seo/Meta.tsx`, 각 페이지 메타 적용 |
| **작업** | RSS 2.0 피드, 사이트맵, robots.txt | Meta 컴포넌트, OG 태그 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/unit/lib/rss.test.ts` | RSS XML 형식 검증 / 전체 포스트 포함 |
| `__tests__/unit/lib/sitemap.test.ts` | 모든 URL 포함 / 올바른 형식 |
| `__tests__/unit/components/Meta.test.tsx` | OG 태그 렌더링 / canonical URL |

| **커밋** | `feat: SEO — RSS feed, sitemap, robots, Open Graph meta tags` |

---

## Task 10: E2E 테스트

| 항목 | 내용 |
|---|---|
| **Role** | 단일 (E2E 전담) |
| **담당 파일** | `e2e/*.spec.ts` |

### 테스트 스펙

| 파일 | 시나리오 |
|---|---|
| `e2e/navigation.spec.ts` | 홈 → 포스트 → 태그 → 프로젝트 → 소개 전체 네비게이션 / 헤더 링크 동작 / 모바일 메뉴 |
| `e2e/post-reading.spec.ts` | 포스트 목록 → 포스트 상세 이동 / MDX 본문 렌더링 / 이전/다음 네비게이션 / 댓글 섹션 로드 |
| `e2e/tag-filtering.spec.ts` | 태그 목록 → 태그 상세 / 포스트 필터링 확인 |
| `e2e/search.spec.ts` | 검색어 입력 → 결과 표시 / 빈 검색어 / 없는 검색어 |
| `e2e/responsive.spec.ts` | 모바일 뷰포트에서 레이아웃 / 모바일 메뉴 동작 |
| `e2e/seo.spec.ts` | RSS 피드 접근 / Sitemap 접근 / meta tag 확인 |

| **커밋** | `test: E2E tests — full user flow validation with Playwright` |

---

## Task 11: 통합 & 최적화 & 마무리

| 항목 | 내용 |
|---|---|
| **Role** | 단일 (통합) |
| **담당 파일** | `app/not-found.tsx`, `components/post/TableOfContents.tsx`, 전체 |
| **작업** | 404 커스텀, TOC, 이미지 최적화, Lighthouse 점검, 최종 빌드 |

### 테스트

| 파일 | 테스트 케이스 |
|---|---|
| `__tests__/integration/pages/not-found.test.tsx` | 404 페이지 렌더링 / 홈 링크 |
| `__tests__/unit/components/TableOfContents.test.tsx` | 헤딩 기반 목차 생성 / 링크 동작 |

| **커밋** | `feat: polish — TOC, 404, optimization, final production build` |
