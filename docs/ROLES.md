# ROLES — 태스크별 역할 분담 정의

---

## 절대적 워크플로우 원칙

### 메인 (현재 대화)

1. 태스크 보드(todo list) 관리만 수행
2. **절대 금지**: 파일 생성/수정/삭제, 테스트 실행, 빌드, 커밋 직접 수행
3. Task 도구로 서브테스크 에이전트 위임
4. 서브테스크 완료 결과 수령 후 보드 업데이트
5. 다음 태스크 서브테스크 위임

### 서브테스크 (Task 에이전트)

서브테스크는 다음 순서를 **반드시 엄격하게** 준수한다:

1. `docs/` 관련 문서 읽기 → 요구사항 파악
2. Role 분담 (단일 또는 A/B 병렬)
3. **테스트 먼저 작성 (Red)** — 테스트 파일만 생성
4. **기능 구현 (Green)** — 소스 코드 작성
5. `npm run test` → 전부 통과 확인 (실패 시 수정 후 재실행)
6. `npm run build` → 빌드 성공 확인 (실패 시 수정 후 재실행)
7. 리팩토링 (필요시, 리팩 후 다시 test + build 확인)
8. `git add -A && git commit -m "<커밋 메시지>"`
9. 메인에 결과 보고: "Task N 완료 — `<commit-hash>` — HH:MM"

### 서브테스크 prompt 필수 항목

서브테스크를 위임할 때 prompt에 반드시 포함:

- 참조 docs/ 문서 경로 (해당 Task와 관련된 문서)
- Task 번호와 목표
- 담당 파일 목록
- 테스트 케이스 목록 (docs/ROLES.md 또는 docs/TEST_PLAN.md에서)
- 커밋 메시지
- "반드시 npm run test && npm run build 통과 후 git commit"

### 실행 원칙

1. **각 Role이 담당하는 파일이 겹치지 않는다** → 병렬 실행 시 충돌 방지
2. **타입 계약(types/post.ts)은 모든 Role이 공유** — Task 1에서 확정
3. **TDD**: 테스트 먼저 작성(Red) → 구현(Green) → 리팩토링(Refactor)
4. **각 Task 완료 후 반드시 `npm run build` + `npm run test` 통과 확인**

---

## 완료된 태스크

| Task | 커밋 | 상태 |
|---|---|---|
| Task 0: 문서 + 테스트 인프라 | `e33bda5` | ✅ |
| Task 1: 기반 인프라 | `30adf7a` | ✅ |
| Task 2: 레이아웃 & UI 파운데이션 | `5cc99ce` | ✅ |

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

### 서브테스크 프롬프트

```
Task 3: 포스트 핵심 기능 (목록 + 상세 + MDX 렌더링)

참조 문서:
- docs/SPEC.md (2.2, 2.3, 4.3, 4.4, 4.10)
- docs/ARCHITECTURE.md (2.1, 3, 4)
- docs/DESIGN.md (4.2, 4.4)
- docs/TEST_PLAN.md (6.1, 6.2)

담당 파일:
- app/posts/page.tsx
- app/posts/[slug]/page.tsx
- components/post/PostCard.tsx
- components/post/PostBody.tsx
- components/mdx/CustomLink.tsx
- components/mdx/Pre.tsx

테스트:
- __tests__/integration/pages/post-list.test.tsx
- __tests__/integration/pages/post-detail.test.tsx
- __tests__/unit/components/PostCard.test.tsx
- __tests__/integration/mdx/mdx-rendering.test.tsx

커밋: feat: post system — list, detail, MDX rendering with custom components
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 4: 태그 & 카테고리

참조 문서:
- docs/SPEC.md (2.4, 2.5, 4.6)
- docs/ARCHITECTURE.md (2.1, 3)
- docs/DESIGN.md (4.5)
- docs/TEST_PLAN.md (6.1, 6.2)

담당 파일:
- app/tags/page.tsx
- app/tags/[tag]/page.tsx
- components/tag/TagBadge.tsx

테스트:
- __tests__/integration/pages/tags.test.tsx
- __tests__/unit/components/TagBadge.test.tsx

커밋: feat: tag system — tag list, tag detail, TagBadge component
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 5: 홈 페이지

참조 문서:
- docs/SPEC.md (2.1)
- docs/DESIGN.md (4.2)

담당 파일:
- app/page.tsx

테스트:
- __tests__/integration/pages/home.test.tsx

커밋: feat: home page — hero section with latest posts
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 6: 정적 페이지 (About, Projects)

참조 문서:
- docs/SPEC.md (2.6, 2.7)
- docs/DESIGN.md (3.1)

담당 파일:
- app/about/page.tsx
- app/projects/page.tsx

테스트:
- __tests__/integration/pages/about.test.tsx
- __tests__/integration/pages/projects.test.tsx

커밋: feat: static pages — about and projects
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 7: 검색 기능

참조 문서:
- docs/SPEC.md (2.8, 4.7)
- docs/ARCHITECTURE.md (2.2)
- docs/DESIGN.md (4.6)
- docs/TEST_PLAN.md (6.1)

담당 파일:
- app/search/page.tsx
- components/search/SearchBar.tsx
- lib/search.ts

테스트:
- __tests__/unit/lib/search.test.ts
- __tests__/unit/components/SearchBar.test.tsx

커밋: feat: search — client-side post search with debounced input
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 8: 댓글 (Giscus)

참조 문서:
- docs/SPEC.md (4.8)
- docs/ROLES.md (Task 8)

담당 파일:
- components/comment/Giscus.tsx
- app/posts/[slug]/page.tsx (수정)

테스트:
- __tests__/unit/components/Giscus.test.tsx

커밋: feat: comments — Giscus integration on post detail
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 9: SEO & RSS & Sitemap

참조 문서:
- docs/SPEC.md (2.9, 2.10, 4.9)
- docs/ARCHITECTURE.md (2.3)
- docs/TEST_PLAN.md (6.1, 6.2)

담당 파일:
- app/feed.xml/route.ts
- app/sitemap.ts
- app/robots.ts
- components/seo/Meta.tsx

테스트:
- __tests__/unit/lib/rss.test.ts
- __tests__/unit/lib/sitemap.test.ts
- __tests__/unit/components/Meta.test.tsx

커밋: feat: SEO — RSS feed, sitemap, robots, Open Graph meta tags
반드시 npm run test && npm run build 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 10: E2E 테스트

참조 문서:
- docs/TEST_PLAN.md (6.3)
- docs/ROLES.md (Task 10)

담당 파일:
- e2e/navigation.spec.ts
- e2e/post-reading.spec.ts
- e2e/tag-filtering.spec.ts
- e2e/search.spec.ts
- e2e/responsive.spec.ts
- e2e/seo.spec.ts
- playwright.config.ts

커밋: test: E2E tests — full user flow validation with Playwright
반드시 npm run build 후 Playwright 테스트 통과 후 git commit
```

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

### 서브테스크 프롬프트

```
Task 11: 통합 & 최적화 & 마무리

참조 문서:
- docs/SPEC.md (2.11, 4.5)
- docs/TEST_PLAN.md (6.1, 6.2)

담당 파일:
- app/not-found.tsx
- components/post/TableOfContents.tsx

테스트:
- __tests__/integration/pages/not-found.test.tsx
- __tests__/unit/components/TableOfContents.test.tsx

커밋: feat: polish — TOC, 404, optimization, final production build
반드시 npm run test && npm run build 통과 후 git commit
```
