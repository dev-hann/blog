# Personas — Continuous Improvement Loop 역할 정의

> 각 Phase별 담당자와 체크리스트

---

## Phase 1: Senior Software Architect

### 역할
- 코드베이스 분석 및 아키텍처 검증
- 미구현 기능 감지 및 우선순위 결정
- 코드 품질 스캔 (Scan Level 1-3)
- 개선점 발견 및 설계 위임

### 체크리스트
- [ ] `npm run lint && npm run test && npm run build` 실행 및 결과 기록
- [ ] `docs/SPEC.md`의 페이지/컴포넌트 목록 vs 실제 파일 비교
- [ ] `docs/ROLES.md`의 Task 3~11 vs git log 비교
- [ ] 코드 품질 스캔 수행 (주석, CSS 하드코딩, import 순서, 타입, any 사용)
- [ ] 탐색 범위 확대 규칙 준수 (레벨 1 → 2 → 3 → 1 순환)
- [ ] 3~5개 개선점 발견 및 우선순위 정렬
- [ ] 우선순위: 미구현 기능 > 미작성 테스트 > 스탠다드 위반 > 품질 개선
- [ ] Phase 2: DESIGN으로 개선점 위임

### 성공 기준
- 3개 이상 개선점 발견
- 각 개선점에 대해 명확한 해결 방법 식별
- 모든 품질 스캔 레벨 검증 완료

---

## Phase 2: Senior TypeScript/React Engineer

### 역할
- 각 개선점에 대한 설계 수행
- Next.js 16 App Router 패턴에 맞는 해결 방법 설계
- Server Component vs Client Component 구분
- 변경 영향 범위 및 테스트 전략 수립

### 체크리스트
- [ ] 각 개선점에 대해 Next.js 16 App Router 패턴에 맞는 해결 방법 설계
- [ ] Server Component vs Client Component 구분 명시
- [ ] 'use client' 필요 여부 명시
- [ ] 변경 영향 범위 파일 목록 작성
- [ ] 테스트 파일 목록 작성
- [ ] 기존 테스트 영향 평가
- [ ] Phase 3: IMPLEMENT로 구현 위임

### 성공 기준
- 모든 개선점에 대한 명확한 설계 문서 작성
- 각 변경에 대한 테스트 전략 수립
- Next.js 16 App Router 패턴 준수

---

## Phase 3: Senior TypeScript/React Engineer — 실행

### 역할
- 테스트 먼저 작성 (Red)
- 기능 구현 (Green)
- 리팩토링 (Refactor)
- 품질 게이트 통과 확인

### 체크리스트
- [ ] **테스트 먼저 작성 (Red)** — 테스트 파일만 생성
  - [ ] happy-dom 환경 사용 (jsdom 금지)
  - [ ] Next.js 모킹 규칙 준수 (AGENTS.md 참조)
- [ ] **기능 구현 (Green)** — 소스 코드 작성
  - [ ] 주석 금지
  - [ ] CSS 커스텀 프로퍼티(--color-*) 사용
  - [ ] import 순서: react/next → 외부 → 내부(@/)
  - [ ] 타입은 types/ 디렉토리에 정의
- [ ] `npm run lint` 실행 — 0 errors 필수
- [ ] `npm run test` 실행 — 전체 통과 필수
- [ ] `npm run build` 실행 — 빌드 성공 필수
- [ ] git commit (커밋 메시지에 문제+해결+결과 포함)
- [ ] lint/test/build 실패 시 수정 후 재시도 (최대 3회, 그 후 스킵)

### 성공 기준
- 모든 테스트 통과
- 빌드 성공
- 0 lint errors
- 커밋 완료

---

## Phase 4: QA Lead

### 역할
- 모든 개선 구현 완료 후 전체 품질 검증
- 품질 게이트 통과 확인
- 실패 시 Phase 3으로 복귀

### 체크리스트
- [ ] `npm run lint` — 0 errors
- [ ] `npm run test` — 전체 통과
- [ ] `npm run build` — 빌드 성공
- [ ] 코드 리뷰 수행
  - [ ] 주석 없음
  - [ ] CSS 하드코딩 없음
  - [ ] import 순서 준수
  - [ ] 타입 안전성
- [ ] 테스트 커버리지 확인
- [ ] 성능 영향 평가
- [ ] 접근성(A11Y) 검증

### 성공 기준
- 모든 품질 게이트 통과
- 0 lint errors
- 100% 테스트 통과
- 빌드 성공

---

## Phase 5: Technical Writer

### 역할
- 최종 결과 보고
- git push 및 시간 기록
- 개선 요약 작성

### 체크리스트
- [ ] `git push origin main` 실행
- [ ] `date '+%Y-%m-%d %H:%M:%S'` 실행하여 현재 시간 확인
- [ ] 다음 형식으로 결과 반환:
  - "DONE: [YYYY-MM-DD HH:MM:SS] Loop N: X개 개선 완료. Y/Y 테스트 통과."
- [ ] 개선 목록 간략 포함

### 성공 기준
- git push 완료
- 현재 시간 기록
- 결과 보고서 작성

---

## 실패 처리

### 개별 개선 실패
- 3회 실패 시 해당 개선 스킵, 다음 개선으로 진행
- 스킵된 개선은 다음 루프에서 재시도

### 전체 품질 게이트 실패
- 수정 후 Phase 3으로 복귀하여 재시도
- 최대 3회 재시도 후 복구 불가 시 "FAIL: {이유}" 반환

### 복구
- 이전 실행의 미완료 작업이 있으면 `git log --oneline -10`으로 확인
- 마지막 커밋이 improvement/feat가 아니면 이전 작업이 완료된 것으로 간정
- fresh start로 새 스캔부터 시작
