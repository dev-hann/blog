# DESIGN — 다크 테마 디자인 시스템

---

## 1. 컬러 시스템

### 1.1 배경

| 토큰 | 용도 | 값 |
|---|---|---|
| `--bg-primary` | 페이지 배경 | `#0a0a0a` |
| `--bg-secondary` | 카드, 섹션 배경 | `#111111` |
| `--bg-tertiary` | 코드 블록, 인라인 코드 | `#1a1a1a` |
| `--bg-hover` | 호버 상태 | `#222222` |

### 1.2 텍스트

| 토큰 | 용도 | 값 |
|---|---|---|
| `--text-primary` | 본문 텍스트 | `#e4e4e7` |
| `--text-secondary` | 보조 텍스트 (날짜, 요약) | `#a1a1aa` |
| `--text-muted` | 흐린 텍스트 | `#71717a` |
| `--text-accent` | 강조 텍스트, 링크 | `#60a5fa` |

### 1.3 브랜드 / 액센트

| 토큰 | 용도 | 값 |
|---|---|---|
| `--accent` | 메인 액센트 | `#3b82f6` (blue-500) |
| `--accent-hover` | 액센트 호버 | `#2563eb` (blue-600) |
| `--accent-muted` | 태그 배경 등 | `rgba(59, 130, 246, 0.1)` |

### 1.4 보더

| 토큰 | 용도 | 값 |
|---|---|---|
| `--border` | 기본 보더 | `#27272a` |
| `--border-subtle` | 미세한 구분선 | `#1e1e1e` |

---

## 2. 타이포그래피

| 요소 | 폰트 | 크기 | 굵기 | 줄간격 |
|---|---|---|---|---|
| 제목 (h1) | Geist Sans | 2.25rem (36px) | 700 | 1.2 |
| 소제목 (h2) | Geist Sans | 1.5rem (24px) | 600 | 1.3 |
| 섹션 (h3) | Geist Sans | 1.25rem (20px) | 600 | 1.4 |
| 본문 | Geist Sans | 1rem (16px) | 400 | 1.75 |
| 코드 | Geist Mono | 0.875rem (14px) | 400 | 1.6 |
| 캡션/보조 | Geist Sans | 0.875rem (14px) | 400 | 1.5 |
| 태그 | Geist Sans | 0.75rem (12px) | 500 | 1 |

---

## 3. 레이아웃

### 3.1 컨테이너 너비

| 구분 | 최대 너비 | 좌우 패딩 |
|---|---|---|
| 홈 / 목록 페이지 | 48rem (768px) | 1.5rem |
| 포스트 상세 | 42rem (672px) | 1.5rem |
| 프로젝트 그리드 | 64rem (1024px) | 1.5rem |

### 3.2 간격 (Spacing)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--space-xs` | 0.25rem (4px) | 태그 간격 |
| `--space-sm` | 0.5rem (8px) | 인라인 요소 |
| `--space-md` | 1rem (16px) | 섹션 내 간격 |
| `--space-lg` | 1.5rem (24px) | 섹션 간 간격 |
| `--space-xl` | 2rem (32px) | 주요 섹션 분리 |
| `--space-2xl` | 3rem (48px) | 페이지 섹션 |

### 3.3 반응형 브레이크포인트

| 이름 | 너비 | 대상 |
|---|---|---|
| sm | 640px | 모바일 가로 |
| md | 768px | 태블릿 |
| lg | 1024px | 데스크탑 |
| xl | 1280px | 와이드 |

---

## 4. 컴포넌트 스타일

### 4.1 Header

```
┌──────────────────────────────────────────────────────┐
│  ◆ Blog          Home  Posts  Tags  Projects  About  │
│                                                        │  height: 64px
│                                          🔍 Search    │  bg: --bg-primary
└──────────────────────────────────────────────────────┘  border-bottom: --border
```

### 4.2 PostCard

```
┌──────────────────────────────────────────────┐
│  2026년 4월 6일                               │  ← --text-muted
│  포스트 제목입니다                              │  ← --text-primary, font-semibold
│  포스트 요약 내용이 여기에 표시됩니다...          │  ← --text-secondary
│  ┌──────┐ ┌──────┐                            │
│  │ react │ │ next │                            │  ← TagBadge
│  └──────┘ └──────┘                            │
└──────────────────────────────────────────────┘  bg: --bg-secondary
                                                  border: --border
                                                  hover: border → --accent
```

### 4.3 TagBadge

```
┌──────────┐
│  nextjs   │   bg: --accent-muted
│    (5)    │   text: --accent
└──────────┘   px: 0.5rem, py: 0.25rem
                rounded: full
                hover: bg → --accent, text → white
```

### 4.4 코드 블록

```
┌──────────────────────────────────────────────┐
│  typescript                         📋 Copy  │  ← --bg-tertiary
│─────────────────────────────────────────────│
│  const greeting = "hello";                   │  ← --text-primary
│  console.log(greeting);                      │
│                                              │
└──────────────────────────────────────────────┘  rounded: 0.5rem
```

### 4.5 Callout

```
┌──────────────────────────────────────────────┐
│  ℹ️  정보                                     │  border-left: 3px --accent
│  이것은 정보 콜아웃입니다.                     │  bg: --accent-muted
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  ⚠️  경고                                     │  border-left: 3px #eab308
│  이것은 경고 콜아웃입니다.                     │  bg: rgba(234, 179, 8, 0.1)
└──────────────────────────────────────────────┘
```

### 4.6 SearchBar

```
┌──────────────────────────────────────────────┐
│  🔍  검색어를 입력하세요...                    │  bg: --bg-secondary
└──────────────────────────────────────────────┘  border: --border
                                                  focus: border → --accent

┌──────────────────────────────────────────────┐
│  "react" 검색 결과 (3건)                      │
│  ┌────────────────────────────────────────┐  │
│  │  PostCard ...                           │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │  PostCard ...                           │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 5. 애니메이션

| 요소 | 애니메이션 | 시간 |
|---|---|---|
| 링크 호버 | underline slide-in | 150ms ease |
| PostCard 호버 | border-color 전환 | 200ms ease |
| 모바일 메뉴 | slide-down | 300ms ease |
| TOC 활성 항목 | opacity 전환 | 150ms ease |
| 페이지 전환 | fade-in | 200ms ease |

---

## 6. Tailwind 설정

globals.css에서 CSS 커스텀 프로퍼티로 정의:

```css
@theme {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-bg-tertiary: #1a1a1a;
  --color-bg-hover: #222222;
  --color-text-primary: #e4e4e7;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-text-accent: #60a5fa;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
  --color-border: #27272a;
  --color-border-subtle: #1e1e1e;
}
```
