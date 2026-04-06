# SPEC — 블로그 기능 명세서

> Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 블로그

---

## 1. 사이트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | blog |
| 프레임워크 | Next.js 16.2.2 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 (미니멀 다크 테마) |
| 콘텐츠 | 로컬 MDX 파일 |
| 댓글 | Giscus (GitHub Discussions) |
| 배포 | Vercel (예정) |

---

## 2. 페이지 명세

### 2.1 홈 (`/`)

- **히어로 섹션**: 블로그 제목, 한줄 소개
- **최신 포스트**: 최신 글 5개 카드 형태로 노출
- **빠른 네비게이션**: 포스트, 태그, 프로젝트 링크

### 2.2 포스트 목록 (`/posts`)

- 전체 포스트를 날짜 내림차순으로 정렬하여 표시
- 각 포스트 카드에 제목, 날짜, 요약, 태그 표시
- 페이지네이션 (포스트 10개 단위)

### 2.3 포스트 상세 (`/posts/[slug]`)

- MDX 콘텐츠 렌더링
- 상단에 제목, 날짜, 태그 표시
- 목차 (Table of Contents) — 헤딩 기반 자동 생성, 사이드바 고정
- 코드 블록: 구문 강조 + 복사 버튼
- 커스텀 MDX 컴포넌트: CustomLink, Pre, Callout, Image
- 하단에 Giscus 댓글 섹션
- 이전/다음 포스트 네비게이션

### 2.4 태그 목록 (`/tags`)

- 전체 태그 목록 표시
- 각 태그에 해당하는 포스트 개수 표시
- 태그 클릭 시 `/tags/[tag]` 로 이동

### 2.5 태그 상세 (`/tags/[tag]`)

- 해당 태그를 가진 포스트 목록 표시
- 포스트 카드 형태 (제목, 날짜, 요약)
- 태그명이 상단에 표시

### 2.6 소개 (`/about`)

- 자기소개 페이지
- Markdown 또는 직접 JSX로 작성
- 연락처, 소셜 링크

### 2.7 프로젝트 (`/projects`)

- 진행/완료한 프로젝트 소개
- 프로젝트명, 설명, 기술스택, 링크 (GitHub, Demo)
- 카드 그리드 레이아웃

### 2.8 검색 (`/search`)

- 검색어 입력 인풋
- 실시간 포스트 필터링 (제목, 요약, 태그 대상)
- 디바운스 적용 (300ms)
- 검색 결과를 포스트 카드 형태로 표시
- 결과 없을 시 안내 메시지

### 2.9 RSS (`/feed.xml`)

- RSS 2.0 형식 피드
- 전체 포스트 포함
- 최신 20개 포스트

### 2.10 Sitemap (`/sitemap.xml`)

- 모든 페이지 URL 포함
- 포스트 페이지, 태그 페이지, 정적 페이지

### 2.11 404 페이지

- 커스텀 404 페이지
- 홈으로 돌아가는 링크

---

## 3. 콘텐츠 포맷 (MDX Frontmatter)

```yaml
---
title: "포스트 제목"
date: "2026-04-06"
tags: ["nextjs", "react"]
summary: "포스트 요약 (최대 160자)"
draft: false          # true면 빌드에서 제외
---

본문 내용 (MDX)
```

- `title` (필수): 포스트 제목
- `date` (필수): 작성일 (YYYY-MM-DD)
- `tags` (필수): 태그 배열
- `summary` (필수): 요약
- `draft` (선택): 초안 여부, 기본값 false

---

## 4. 컴포넌트 명세

### 4.1 Header (`components/layout/Header.tsx`)

- 로고/사이트명 (좌측)
- 네비게이션 링크: 홈, 포스트, 태그, 프로젝트, 소개, 검색
- 모바일: 햄버거 메뉴 → 슬라이드 메뉴
- 현재 경로에 활성 링크 표시
- 스크롤 시 상단 고정 (sticky)

### 4.2 Footer (`components/layout/Footer.tsx`)

- 저작권 정보
- GitHub 링크
- RSS 링크

### 4.3 PostCard (`components/post/PostCard.tsx`)

- Props: `{ slug, title, date, summary, tags }`
- 제목 클릭 시 `/posts/[slug]` 이동
- 날짜 포맷: YYYY년 MM월 DD일
- 태그 뱃지 표시

### 4.4 PostBody (`components/post/PostBody.tsx`)

- MDX 콘텐츠 렌더링 래퍼
- 커스텀 컴포넌트 매핑 (CustomLink, Pre, Callout, Image)

### 4.5 TableOfContents (`components/post/TableOfContents.tsx`)

- 헤딩(h2, h3) 기반 목차 자동 생성
- 현재 위치 하이라이트 (Intersection Observer)
- 클릭 시 해당 섹션으로 스크롤
- 데스크탑: 사이드바 고정 / 모바일: 접히는 형태

### 4.6 TagBadge (`components/tag/TagBadge.tsx`)

- Props: `{ tag, count? }`
- 클릭 시 `/tags/[tag]` 이동
- 다크 테마에 맞는 스타일

### 4.7 SearchBar (`components/search/SearchBar.tsx`)

- 검색어 입력 인풋
- 디바운스 300ms
- 결과를 PostCard 형태로 렌더링
- 로딩 상태 표시
- 빈 결과 안내

### 4.8 Giscus (`components/comment/Giscus.tsx`)

- GitHub Discussions 기반 댓글
- lazy loading (화면 진입 시 로드)
- 다크 테마 설정

### 4.9 Meta (`components/seo/Meta.tsx`)

- Props: `{ title, description, path, image? }`
- Open Graph 태그
- Twitter Card 태그
- canonical URL

### 4.10 MDX 커스텀 컴포넌트

- **CustomLink**: 외부 링크 → new tab + rel="noopener noreferrer", 내부 링크 → next/link
- **Pre**: 코드 블록 + 복사 버튼, 언어 표시, 라인 하이라이팅
- **Callout**: info/warning/danger 타입 콜아웃 박스
- **Image**: next/image 최적화, 캡션 지원

---

## 5. 라이브러리 명세

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| next-mdx-remote | latest | MDX 렌더링 |
| gray-matter | latest | Frontmatter 파싱 |
| rehype-pretty-code | latest | 코드 하이라이팅 (Shiki) |
| rehype-slug | latest | 헤딩 자동 id |
| rss | latest | RSS 피드 생성 |
| vitest | latest | Unit + Integration 테스트 |
| @testing-library/react | latest | 컴포넌트 테스트 |
| @testing-library/jest-dom | latest | DOM 매처 |
| @vitejs/plugin-react | latest | Vitest JSX 변환 |
| playwright | latest | E2E 테스트 |
