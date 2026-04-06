# ARCHITECTURE — 폴더 구조, 데이터 흐름, 의존관계

---

## 1. 폴더 구조

```
blog/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃 (Header, Footer, 메타)
│   ├── page.tsx                    # 홈
│   ├── not-found.tsx               # 커스텀 404
│   ├── globals.css                 # 전역 스타일 + 다크 테마 토큰
│   ├── posts/
│   │   ├── page.tsx                # 포스트 목록
│   │   └── [slug]/
│   │       └── page.tsx            # 포스트 상세
│   ├── tags/
│   │   ├── page.tsx                # 태그 목록
│   │   └── [tag]/
│   │       └── page.tsx            # 태그 상세
│   ├── about/
│   │   └── page.tsx                # 소개
│   ├── projects/
│   │   └── page.tsx                # 프로젝트
│   ├── search/
│   │   └── page.tsx                # 검색
│   ├── feed.xml/
│   │   └── route.ts                # RSS (Route Handler)
│   ├── sitemap.ts                  # 사이트맵
│   └── robots.ts                   # robots.txt
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── post/
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   ├── PostBody.tsx
│   │   └── TableOfContents.tsx
│   ├── tag/
│   │   └── TagBadge.tsx
│   ├── search/
│   │   └── SearchBar.tsx
│   ├── comment/
│   │   └── Giscus.tsx
│   ├── seo/
│   │   └── Meta.tsx
│   └── mdx/
│       ├── CustomLink.tsx
│       ├── Pre.tsx
│       ├── Callout.tsx
│       └── Image.tsx
│
├── content/
│   └── posts/
│       ├── sample-post-01.mdx
│       ├── sample-post-02.mdx
│       └── sample-post-03.mdx
│
├── lib/
│   ├── posts.ts                    # 포스트 CRUD 유틸
│   ├── mdx.ts                      # MDX 렌더링 유틸
│   ├── constants.ts                # 사이트 메타 상수
│   └── search.ts                   # 검색 인덱스 생성
│
├── types/
│   └── post.ts                     # Post 타입 정의
│
├── __tests__/
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── posts.test.ts
│   │   │   └── constants.test.ts
│   │   └── components/
│   │       ├── PostCard.test.tsx
│   │       ├── TagBadge.test.tsx
│   │       ├── SearchBar.test.tsx
│   │       ├── Header.test.tsx
│   │       └── Footer.test.tsx
│   ├── integration/
│   │   ├── pages/
│   │   │   ├── home.test.tsx
│   │   │   ├── post-list.test.tsx
│   │   │   ├── post-detail.test.tsx
│   │   │   ├── tags.test.tsx
│   │   │   ├── about.test.tsx
│   │   │   └── projects.test.tsx
│   │   └── mdx/
│   │       └── mdx-rendering.test.tsx
│   └── e2e/
│       └── (Playwright)
│
├── e2e/
│   ├── navigation.spec.ts
│   ├── post-reading.spec.ts
│   ├── tag-filtering.spec.ts
│   ├── search.spec.ts
│   ├── responsive.spec.ts
│   └── seo.spec.ts
│
├── docs/
│   ├── SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── ROLES.md
│   └── TEST_PLAN.md
│
├── vitest.config.ts
├── playwright.config.ts
├── next.config.ts
├── tailwind.config.ts              # (Tailwind v4는 CSS-based이지만 필요시)
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## 2. 데이터 흐름

### 2.1 포스트 데이터 흐름

```
content/posts/*.mdx
       │
       ▼
  lib/posts.ts
  ├─ gray-matter로 frontmatter 파싱
  ├─ 파일명에서 slug 추출
  ├─ 날짜순 정렬
  └─ 태그 집계
       │
       ├──────────────────┬──────────────────┐
       ▼                  ▼                  ▼
  app/page.tsx      app/posts/page.tsx   app/tags/page.tsx
  (최신 5개)         (전체 목록)          (태그 집계)
                          │
                          ▼
                  app/posts/[slug]/page.tsx
                  ├─ lib/posts.ts → getPostBySlug()
                  ├─ lib/mdx.ts → MDX 렌더링
                  └─ 커스텀 컴포넌트 매핑
```

### 2.2 검색 데이터 흐름

```
content/posts/*.mdx
       │
       ▼
  lib/search.ts
  ├─ 빌드 타임에 전체 포스트 인덱스 생성
  └─ JSON으로 직렬화
       │
       ▼
  app/search/page.tsx
  └─ 클라이언트에서 인덱스 로드 → 필터링
```

### 2.3 RSS 데이터 흐름

```
content/posts/*.mdx
       │
       ▼
  lib/posts.ts → getAllPosts()
       │
       ▼
  app/feed.xml/route.ts
  └─ RSS 2.0 XML 생성 → 응답
```

---

## 3. 의존관계

```
types/post.ts
    │
    ▼
lib/posts.ts ← lib/constants.ts
    │
    ├─→ app/page.tsx
    ├─→ app/posts/page.tsx
    ├─→ app/posts/[slug]/page.tsx ← lib/mdx.ts ← components/mdx/*
    ├─→ app/tags/page.tsx
    ├─→ app/tags/[tag]/page.tsx
    ├─→ lib/search.ts
    └─→ app/feed.xml/route.ts

components/layout/Header.tsx ← lib/constants.ts
components/layout/Footer.tsx ← lib/constants.ts
    │
    ▼
app/layout.tsx ← Header + Footer

components/post/PostCard.tsx ← types/post.ts
    │
    ├─→ app/page.tsx
    ├─→ app/posts/page.tsx
    ├─→ app/tags/[tag]/page.tsx
    └─→ components/search/SearchBar.tsx

components/tag/TagBadge.tsx
    ├─→ components/post/PostCard.tsx
    ├─→ app/tags/page.tsx
    └─→ app/posts/[slug]/page.tsx

components/seo/Meta.tsx
    └─→ 모든 페이지

components/comment/Giscus.tsx
    └─→ app/posts/[slug]/page.tsx

components/post/TableOfContents.tsx
    └─→ app/posts/[slug]/page.tsx
```

---

## 4. 타입 계약 (인터페이스)

```typescript
// types/post.ts
export interface Post {
  slug: string;
  title: string;
  date: string;       // YYYY-MM-DD
  tags: string[];
  summary: string;
  draft?: boolean;
}

export interface PostDetail extends Post {
  content: string;    // raw MDX content
}

// lib/posts.ts
export function getAllPosts(): Post[];
export function getPostBySlug(slug: string): PostDetail;
export function getAllTags(): Record<string, number>;  // { "react": 3, "nextjs": 5 }
export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null };

// lib/mdx.ts
export function renderMDX(source: string): Promise<RenderedMDX>;

// lib/search.ts
export function getSearchIndex(): Promise<SearchIndexEntry[]>;

// lib/constants.ts
export const SITE_CONFIG: {
  name: string;
  description: string;
  url: string;
  author: string;
  github: string;
  postsPerPage: number;
};
```

---

## 5. 렌더링 전략

| 페이지 | 렌더링 방식 | 이유 |
|---|---|---|
| 홈 | SSG (static) | 콘텐츠 변경 시에만 갱신 |
| 포스트 목록 | SSG | 빌드 시 정적 생성 |
| 포스트 상세 | SSG + generateStaticParams | 모든 slug를 빌드 시 생성 |
| 태그 목록 | SSG | 빌드 시 정적 생성 |
| 태그 상세 | SSG + generateStaticParams | 모든 태그를 빌드 시 생성 |
| About | SSG | 정적 페이지 |
| Projects | SSG | 정적 페이지 |
| 검색 | SSG + Client | 페이지는 정적, 검색은 클라이언트 |
| RSS | ISR (Route Handler) | 요청 시 생성 |

---

## 6. 실행 워크플로우

```
메인 대화
│
├── [태스크 보드 업데이트: Task N → in_progress]
│
├── [Task 에이전트 실행 — 서브테스크]
│   │
│   ├── 1. docs/ 읽기 → 요구사항 파악
│   ├── 2. Role 분담 (A/B 병렬 가능 시 병렬)
│   ├── 3. 테스트 작성 (Red) — 테스트 파일만 생성, 실행 시 실패 확인
│   ├── 4. 기능 구현 (Green) — 소스 코드 작성
│   ├── 5. npm run test → 전부 통과 확인 (실패 시 수정 후 재실행)
│   ├── 6. npm run build → 빌드 성공 확인 (실패 시 수정 후 재실행)
│   ├── 7. 리팩토링 (필요시, 리팩 후 다시 test + build 확인)
│   ├── 8. git add -A && git commit -m "<커밋 메시지>" && git push
│   └── 9. 결과 보고: "Task N 완료 — <commit-hash> — HH:MM"
│
├── [태스크 보드 업데이트: Task N → completed, 시간 기록]
│
└── [다음 Task N+1 → in_progress → 서브테스크 실행]
```

### 엄격한 분리 규칙

| | 메인 (현재 대화) | 서브테스크 (Task 에이전트) |
|---|---|---|
| 파일 생성/수정/삭제 | ❌ 절대 금지 | ✅ 수행 |
| 테스트 실행 | ❌ 절대 금지 | ✅ 수행 |
| 빌드 실행 | ❌ 절대 금지 | ✅ 수행 |
| git commit + push | ❌ 절대 금지 | ✅ 수행 |
| 태스크 보드 관리 | ✅ 수행 | ❌ 불필요 |
| 서브테스크 위임 | ✅ 수행 | ❌ 불필요 |
