# AGENTS.md — Blog 프로젝트 에이전트 실행 규칙

## 프로젝트 개요

Next.js 16 + Tailwind CSS v4 + MDX 기반 개인 기술 블로그 (미니멀 다크 테마)

## 기술 스택

- Framework: Next.js 16.2.2 (App Router)
- Language: TypeScript 6
- Styling: Tailwind CSS v4 (CSS custom properties 기반 다크 테마)
- Content: 로컬 MDX (gray-matter + next-mdx-remote)
- Test: Vitest (happy-dom) + React Testing Library
- E2E: Playwright

## 코딩 규칙

- 주석 작성 금지 (사용자가 요청한 경우만 예외)
- 컴포넌트는 'use client' 명시 여부에 따라 서버/클라이언트 구분
- CSS 커스텀 프로퍼티(--color-*) 사용, 하드코딩 컬러 금지
- 타입은 types/ 디렉토리에 정의
- 라이브러리 추가 전 반드시 기존 package.json 확인
- import 순서: react/next → 외부 → 내부(@/)

## 필수 실행 명령어

- `npm run test` — Vitest (Unit + Integration)
- `npm run build` — Next.js 프로덕션 빌드
- `npm run lint` — ESLint

## 테스트 설정

- Environment: happy-dom (jsdom 사용 금지, ESM 호환성 문제)
- Setup: `__tests__/setup.ts`
- Alias: `@` → 프로젝트 루트
- Next.js 모킹:
  - `vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }))`
  - `vi.mock("next/link", () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }))`

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
8. `git add -A && git commit -m "<커밋 메시지>" && git push`
9. 메인에 결과 보고: "Task N 완료 — `<commit-hash>` — HH:MM"

### 서브테스크 prompt 필수 항목

서브테스크를 위임할 때 prompt에 반드시 포함:

```
- 참조 docs/ 문서 경로 (해당 Task와 관련된 문서)
- Task 번호와 목표
- 담당 파일 목록
- 테스트 케이스 목록 (docs/ROLES.md 또는 docs/TEST_PLAN.md에서)
- 커밋 메시지
- "반드시 npm run test && npm run build 통과 후 git commit && git push"
```

## 완료된 태스크

| Task | 커밋 | 상태 |
|---|---|---|
| Task 0: 문서 + 테스트 인프라 | `e33bda5` | ✅ |
| Task 1: 기반 인프라 | `30adf7a` | ✅ |
| Task 2: 레이아웃 & UI 파운데이션 | `5cc99ce` | ✅ |

## 상세 문서 참조

- `docs/SPEC.md` — 전체 기능 명세
- `docs/ARCHITECTURE.md` — 폴더 구조, 데이터 흐름, 의존관계
- `docs/DESIGN.md` — 다크 테마 디자인 시스템 (컬러, 타이포, 레이아웃)
- `docs/ROLES.md` — Task별 역할 분담 + 서브테스크 프롬프트 템플릿
- `docs/TEST_PLAN.md` — 테스트 전략 및 전체 케이스 목록
