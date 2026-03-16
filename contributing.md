# 🛒 Mini E-Commerce Team CONTRIBUTING Guide

이 문서는 우리 팀의 Git 협업 규칙을 정의합니다.
모든 팀원은 작업 전 반드시 이 문서를 숙지합니다.

---

## 1. 브랜치 전략 (Branching Strategy)

Git-flow를 기반으로 한 브랜치 격리 전략 채택.

- **main**: 프로덕션 배포용 소스 코드가 관리되는 최상위 브랜치 (직접 Push 금지)
- **dev**: 기능 개발 브랜치들이 병합되는 통합 브랜치 (모든 작업의 Baseline)
- **feat/\*** : 새로운 기능(Feature) 개발을 위한 독립된 작업 브랜치
- **fix/\*** : 발견된 버그(Bug) 수정을 위한 긴급 패치 브랜치
- **refactor/\***: 기능 변경 없이 소스 코드의 내부 구조를 개선하는 브랜치
- **chore/\***: 패키지 매니저 설정, 빌드 스크립트 등 부수적인 작업을 위한 브랜치

---

## 2. 커밋 컨벤션 (Commit Convention)

Git History의 가독성 확보를 위해 표준화된 메시지 포맷 사용.

### 형식: `타입: 요약 설명`

- **feat**: 새로운 기능 추가
- **fix**: 버그 및 오류 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 로직 변경 없는 수정
- **docs**: 문서화 작업 (README, Wiki 등)
- **refactor**: 코드 리팩토링 (가독성 및 성능 개선)
- **chore**: 의존성 라이브러리 추가, 빌드 설정 수정

---

## 3. 프로젝트 아키텍처 및 네이밍 (Architecture)

컴포넌트 기반 설계(Component-Based Design) 지향 및 엄격한 레이어 분리 권장.

### 디렉토리 구조 및 역할

- **src/components/common**: 범용적으로 재사용되는 UI 컴포넌트 관리
- **src/components/layout**: 전체 웹 애플리케이션의 골격을 형성하는 전역 레이아웃 컴포넌트 배치
- **src/pages/[PageName]**: 라우트(Route) 단위의 페이지 진입점 및 해당 페이지 전용 로컬 컴포넌트 포함
- **src/pages/[PageName]/components**: 해당 페이지 전용 UI
- **src/store**: **Zustand** 라이브러리를 활용한 전역 상태 관리(Global State Management) 로직 저장

### 네이밍 규칙 (Naming Convention)

- **컴포넌트(Component)**: PascalCase 형식을 따르며 파일명과 컴포넌트명 일치 (예: `CartItem.jsx`)
- **식별자(Variables/Functions)**: camelCase 형식 사용 (예: `handleDeleteClick`)
- **접두어(Prefix)**:
  - `Base*`: 가장 낮은 수준의 공통 UI 컴포넌트 (예: `BaseButton.jsx`)
  - `App*`: 전역 시스템과 밀접한 공통 UI 컴포넌트 (예: `AppHeader.jsx`)

---

## 4. 작업 워크플로우 (Step-by-Step Workflow)

### ① 개발 환경 최신화 (Upstream Sync)

로컬 환경을 원격 저장소의 최신 상태와 동기화.

1. `git switch dev`
2. `git pull origin dev`
3. `git switch -c feat/기능명` (작업용 로컬 브랜치 생성)

### ② 변경 사항 기록 (Staging & Commit)

논리적 단위로 커밋을 세분화하여 기록.

1. `git add .`
2. `git commit -m "feat: 상품 필터링 필드 추가"`

### ③ 동기화 및 리베이스 (Rebase Strategy)

병합 시 발생할 수 있는 충돌 방지를 위해 Rebase 전략 우선 사용.

1. `git fetch origin`
2. `git rebase origin/dev` (최신 통합 브랜치 위로 내 작업 이력 재정렬)

> **컨플릭트(Conflict) 발생 시**: VS Code 충돌 해결 도구를 사용하여 코드 수정 후, `git add .` 및 `git rebase --continue` 명령어를 실행하여 절차 완료.

### ④ 원격 전송 및 PR (Push & Pull Request)

1. `git push origin feat/기능명 --force-with-lease` (Rebase 후 안전한 강제 Push 실행)
2. GitHub에서 Pull Request를 생성하고 기술적 상세 내용 기술.

---

## 5. 협업 가이드라인 (Team Principle)

- **소통 중심 개발**: 공통 모듈 및 전역 상태(Store) 구조 변경 시 팀 채널을 통한 기술적 의사결정 선행
- **보안 정책 준수**: 민감한 정보(API Key 등)는 `.env` 파일에 기록하며, 버전 관리 시스템(Git) 노출 금지
- **코드 리뷰(Code Review)**: 모든 PR은 최소 1인 이상의 검토 과정을 거쳐야 하며, 기술적 피드백 수용을 통한 품질 고도화

---

### 💡 후속 조치 (Cleanup)

Merge 승인 후 통합이 완료된 브랜치는 로컬 및 원격 저장소에서 즉시 삭제하여 관리 효율성 증대.

1. `git switch dev`
2. `git pull origin dev`
3. `git branch -d feat/기능명`
