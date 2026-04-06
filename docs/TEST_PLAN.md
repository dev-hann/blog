# TEST_PLAN — 테스트 전략 및 계획

---

## 1. 테스트 철학

- **TDD (Test-Driven Development)**: 테스트 먼저 작성 → 기능 구현 → 리팩토링
- **테스트 피라미드**: Unit(많음) → Integration(중간) → E2E(핵심만)
- **사용자 관점**: 구현 세부사항이 아닌 사용자 경험을 테스트
- **독립성**: 각 테스트는 독립적으로 실행 가능, 순서 무관

---

## 2. 테스트 도구

| 도구 | 버전 | 용도 | 설치 명령 |
|---|---|---|---|
| Vitest | latest | Unit + Integration 테스트 러너 | `npm install -D vitest` |
| @vitejs/plugin-react | latest | Vitest에서 JSX 변환 | `npm install -D @vitejs/plugin-react` |
| @testing-library/react | latest | React 컴포넌트 테스트 | `npm install -D @testing-library/react` |
| @testing-library/jest-dom | latest | DOM 매처 (toBeInTheDocument 등) | `npm install -D @testing-library/jest-dom` |
| @testing-library/user-event | latest | 사용자 인터랙션 시뮬레이션 | `npm install -D @testing-library/user-event` |
| happy-dom | latest | Vitest 브라우저 환경 시뮬레이션 (jsdom 대체, ESM 호환) | `npm install -D happy-dom` |
| Playwright | latest | E2E 브라우저 테스트 | `npx playwright install` |

---

## 3. Vitest 설정

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./__tests__/setup.ts"],
    include: ["__tests__/**/*.test.{ts,tsx}"],
    css: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
```

### __tests__/setup.ts

```typescript
import "@testing-library/jest-dom";
```

### package.json scripts 추가

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

---

## 4. Playwright 설정

### playwright.config.ts

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 5. 테스트 파일 구조

```
__tests__/
├── setup.ts                          # 글로벌 설정
│
├── unit/                             # 순수 함수, 단일 컴포넌트
│   ├── lib/
│   │   ├── posts.test.ts             # getAllPosts, getPostBySlug, getAllTags, getAdjacentPosts
│   │   ├── constants.test.ts         # SITE_CONFIG 필드 검증
│   │   └── search.test.ts            # 검색 인덱스 생성
│   └── components/
│       ├── PostCard.test.tsx          # props 렌더링, 링크
│       ├── TagBadge.test.tsx          # 태그명, 카운트, 링크
│       ├── SearchBar.test.tsx         # 입력, 디바운스, 결과
│       ├── Header.test.tsx            # 네비 링크, 활성 상태, 모바일 토글
│       ├── Footer.test.tsx            # 링크 존재, 텍스트
│       ├── Giscus.test.tsx            # 렌더링, 속성
│       ├── Meta.test.tsx              # OG 태그, canonical
│       └── TableOfContents.test.tsx   # 목차 생성, 링크
│
├── integration/                      # 페이지 렌더링, 데이터 흐름
│   ├── pages/
│   │   ├── home.test.tsx             # 히어로, 최신 포스트
│   │   ├── post-list.test.tsx        # 전체 목록, 정렬
│   │   ├── post-detail.test.tsx      # MDX 렌더링, 메타, 댓글
│   │   ├── tags.test.tsx             # 태그 목록, 태그 상세
│   │   ├── about.test.tsx            # 소개 페이지
│   │   ├── projects.test.tsx         # 프로젝트 페이지
│   │   └── not-found.test.tsx        # 404 페이지
│   └── mdx/
│       └── mdx-rendering.test.tsx    # MDX 커스텀 컴포넌트 렌더링
│
e2e/                                  # 브라우저 전체 플로우
├── navigation.spec.ts
├── post-reading.spec.ts
├── tag-filtering.spec.ts
├── search.spec.ts
├── responsive.spec.ts
└── seo.spec.ts
```

---

## 6. 테스트 케이스 전체 목록

### 6.1 Unit Tests

#### lib/posts.test.ts
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | getAllPosts returns array of Post | 반환 타입이 Post[]인지 확인 |
| 2 | getAllPosts sorts by date descending | 최신 날짜가 먼저 오는지 확인 |
| 3 | getAllPosts excludes draft posts | draft: true인 포스트 제외 |
| 4 | getPostBySlug returns PostDetail | slug로 포스트 조회 성공 |
| 5 | getPostBySlug throws for non-existent slug | 없는 slug → 에러 throw |
| 6 | getAllTags returns tag counts | 태그별 포스트 수 정확 |
| 7 | getAllTags excludes tags from drafts | draft 포스트의 태그 제외 |
| 8 | getAdjacentPosts returns prev and next | 이전/다음 포스트 반환 |
| 9 | getAdjacentPosts returns null for first/last | 첫/마지막 포스트의 prev/next null |

#### lib/constants.test.ts
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | SITE_CONFIG has required fields | name, description, url, author 존재 |

#### lib/search.test.ts
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | getSearchIndex returns array | SearchIndexEntry[] 반환 |
| 2 | getSearchIndex includes all non-draft posts | draft 제외 전체 포스트 포함 |

#### components/PostCard.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders title, date, summary, tags | 모든 props 렌더링 |
| 2 | links to correct slug | 클릭 시 /posts/[slug] 이동 |
| 3 | formats date in Korean | YYYY년 MM월 DD일 형식 |

#### components/TagBadge.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders tag name | 태그명 표시 |
| 2 | renders count when provided | 카운트 표시 |
| 3 | links to tag page | /tags/[tag] 링크 |

#### components/SearchBar.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders search input | 검색 인풋 표시 |
| 2 | filters results by title | 제목으로 필터링 |
| 3 | filters results by tag | 태그로 필터링 |
| 4 | shows empty message for no results | 결과 없음 안내 |
| 5 | debounces input | 300ms 디바운스 동작 |

#### components/Header.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders all nav links | 모든 네비 링크 표시 |
| 2 | highlights active link | 현재 경로 활성 표시 |
| 3 | toggles mobile menu | 햄버거 클릭 → 메뉴 열림/닫힘 |

#### components/Footer.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders GitHub link | GitHub 링크 존재 |
| 2 | renders RSS link | RSS 링크 존재 |
| 3 | renders copyright | 저작권 텍스트 |

#### components/Giscus.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders Giscus container | 컴포넌트 렌더링 |
| 2 | has correct data attributes | repo, theme 등 속성 확인 |

#### components/Meta.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders OG title | og:title 메타 |
| 2 | renders OG description | og:description 메타 |
| 3 | renders canonical URL | canonical 링크 |

#### components/TableOfContents.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | generates TOC from headings | 헤딩 목록 생성 |
| 2 | links to correct heading ids | 각 링크의 href 확인 |

---

### 6.2 Integration Tests

#### pages/home.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders hero section | 블로그 제목, 소개 표시 |
| 2 | renders latest 5 posts | 최신 포스트 5개 카드 |
| 3 | post cards link to detail | 카드 클릭 → 상세 이동 |

#### pages/post-list.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders all posts | 전체 포스트 카드 |
| 2 | posts sorted by date descending | 최신순 정렬 |
| 3 | each post links to detail | 각 카드 링크 동작 |

#### pages/post-detail.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders post title, date, tags | 상단 메타 정보 |
| 2 | renders MDX content | 본문 렌더링 |
| 3 | renders comment section | Giscus 영역 |
| 4 | renders prev/next navigation | 이전/다음 링크 |
| 5 | returns 404 for non-existent slug | 없는 포스트 → 404 |

#### pages/tags.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders all tags with counts | 전체 태그 + 포스트 수 |
| 2 | tag links to tag detail | 태그 클릭 → /tags/[tag] |
| 3 | tag detail shows filtered posts | 해당 태그 포스트만 |
| 4 | returns 404 for non-existent tag | 없는 태그 → 404 |

#### pages/about.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders about content | 소개 내용 표시 |

#### pages/projects.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders project cards | 프로젝트 목록 |
| 2 | project cards have links | 외부 링크 존재 |

#### pages/not-found.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders 404 message | 404 안내 텍스트 |
| 2 | has link to home | 홈 돌아가기 링크 |

#### mdx/mdx-rendering.test.tsx
| # | 테스트 케이스 | 설명 |
|---|---|---|
| 1 | renders custom links | CustomLink 렌더링 |
| 2 | external links open in new tab | 외부 링크 target="_blank" |
| 3 | internal links use next/link | 내부 링크 Next 라우팅 |
| 4 | renders code blocks with syntax highlighting | 코드 블록 스타일링 |

---

### 6.3 E2E Tests (Playwright)

#### navigation.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | Full navigation flow | 홈 → 포스트 목록 → 포스트 상세 → 태그 → 프로젝트 → 소개 |
| 2 | Header links work | 각 네비 링크 클릭 → 올바른 페이지 |
| 3 | Mobile menu | 햄버거 클릭 → 메뉴 열림 → 링크 클릭 → 페이지 이동 |

#### post-reading.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | Read a post | 홈 → 포스트 카드 클릭 → 상세 페이지 로드 → 본문 표시 |
| 2 | Navigate between posts | 이전/다음 버튼 클릭 → 다른 포스트 로드 |
| 3 | Comment section | 포스트 하단 스크롤 → Giscus 로드 |

#### tag-filtering.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | Filter by tag | 태그 목록 → 태그 클릭 → 해당 태그 포스트만 표시 |
| 2 | Tag from post | 포스트 상세 → 태그 클릭 → 태그 상세 페이지 |

#### search.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | Search and find | 검색어 입력 → 결과 표시 → 포스트 클릭 |
| 2 | Search no results | 없는 검색어 → 빈 결과 안내 |

#### responsive.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | Mobile layout | 375px → 레이아웃 정상 / 카드 세로 정렬 |
| 2 | Tablet layout | 768px → 레이아웃 정상 |
| 3 | Desktop layout | 1280px → 레이아웃 정상 |

#### seo.spec.ts
| # | 시나리오 | 단계 |
|---|---|---|
| 1 | RSS accessible | /feed.xml → XML 응답 |
| 2 | Sitemap accessible | /sitemap.xml → XML 응답 |
| 3 | Meta tags | 포스트 페이지 → OG 태그 존재 |

---

## 7. 커버리지 목표

| 레이어 | 목표 | 대상 |
|---|---|---|
| Unit | 90%+ | `lib/`, `components/` |
| Integration | 100% 페이지 | 모든 라우트 |
| E2E | 핵심 플로우 100% | 네비게이션, 포스트, 태그, 검색, 반응형, SEO |

---

## 8. CI/CD (향후)

```yaml
# .github/workflows/test.yml
- npm run test          # Unit + Integration
- npm run build         # 빌드 확인
- npm run test:e2e      # E2E (Playwright)
```

---

## 9. Task별 테스트 체크리스트

각 Task 완료 전 반드시 확인:

- [ ] 해당 Task의 Unit 테스트 전부 통과
- [ ] 해당 Task의 Integration 테스트 전부 통과
- [ ] `npm run build` 성공
- [ ] 기존 테스트 회귀 없음 (이전 Task 테스트도 여전히 통과)

---

## 10. 서브테스크 실행 체크리스트

서브테스크(Task 에이전트) 내부에서 **반드시 순서대로** 실행:

1. [ ] `docs/` 관련 문서 읽기 → 요구사항 파악
2. [ ] Role 분담 (단일 또는 A/B 병렬)
3. [ ] **테스트 파일만 먼저 작성 (Red)**
4. [ ] **소스 코드 구현 (Green)**
5. [ ] `npm run test` — 전부 통과 (실패 시 수정 후 재실행)
6. [ ] `npm run build` — 성공 (실패 시 수정 후 재실행)
7. [ ] 리팩토링 (필요시, 리팩 후 다시 test + build)
8. [ ] `git add -A && git commit -m "<커밋 메시지>"`
9. [ ] 메인에 결과 보고: "Task N 완료 — `<commit-hash>` — HH:MM"
