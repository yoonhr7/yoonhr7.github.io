# YOONHR's Devlog

개발자의 기록과 실험을 담은 개인 블로그입니다.


## 메뉴 구성

- **Home** (`/`) - 메인 페이지
- **About** (`/about`) - 소개 페이지
- **Logs** (`/logs`) - 블로그 글 목록 (태그 필터링 기능)
- **Labs** (`/labs`) - 실험 및 프로젝트

## 기술 스택

### Core

- **Next.js 16.1.1** - React 기반 풀스택 프레임워크
- **React 19.2.3** - UI 라이브러리
- **TypeScript 5** - 타입 안전성

### Styling

- **SCSS/Sass 1.97.2** - CSS 전처리기

### Markdown & Content

- **gray-matter 4.0.3** - 마크다운 frontmatter 파싱
- **react-markdown 10.1.0** - 마크다운을 React 컴포넌트로 렌더링
- **remark-gfm 4.0.1** - GitHub Flavored Markdown 지원 (테이블, 체크박스 등)
- **rehype-raw 7.0.0** - 마크다운 내 HTML 태그 지원

### Notion Integration

- **@notionhq/client 5.6.0** - Notion API 클라이언트
- **notion-to-md 3.1.9** - Notion 페이지를 마크다운으로 변환

### UI & Icons

- **lucide-react 0.562.0** - 아이콘 라이브러리

### Code Quality

- **ESLint 9** - 코드 린팅
- **Prettier 3.7.4** - 코드 포맷팅
- **eslint-config-prettier 10.1.8** - ESLint와 Prettier 통합

## 블로그 글 작성

### 방법 1: Notion에서 작성 (추천)

#### 1단계: Notion Integration 생성

1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 접속
2. **+ New integration** 클릭
3. Integration 이름 입력 (예: "My Blog Sync")
4. **Submit** 클릭 후 **Secret Key** 복사

#### 2단계: Notion 데이터베이스 준비

Notion에서 다음 구조의 데이터베이스 생성:

| 속성 이름 | 타입 | 필수 |
|----------|------|------|
| **Title** | Title | ✅ |
| **Date** | Date | ✅ |
| **Description** | Text | ❌ |
| **Tags** | Multi-select | ❌ |
| **Published** | Checkbox | ✅ |

데이터베이스 우측 상단 `•••` → **Connections** → Integration 연결

#### 3단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.example 파일을 복사하여 사용
cp .env.example .env.local
```

`.env.local` 파일 내용:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**데이터베이스 ID 찾기**:
- 데이터베이스 URL: `https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...`
- 여기서 `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 부분을 복사

#### 4단계: Notion에서 글 동기화

```bash
npm run sync-notion
```

성공 시:
```
🔄 Notion에서 데이터를 가져오는 중...
🗑️  기존 Notion 파일 삭제 중...
📄 3개의 게시물을 찾았습니다.
✅ notion/2024-01-07-my-first-post.md 저장 완료
✅ notion/2024-01-08-second-post.md 저장 완료
✅ notion/2024-01-09-third-post.md 저장 완료

✨ 동기화 완료!
```

#### 5단계: Git에 올리고 배포

```bash
git add .
git commit -m "Add new posts from Notion"
git push
```

**주요 특징**:
- ✅ **Clean Sync**: 매번 `posts/notion/` 폴더를 초기화하고 Notion과 100% 동기화
- ✅ **폴더 분리**: Notion 글(`posts/notion/`)과 수동 작성 글(`posts/manual/`) 분리 관리
- ✅ **자동 삭제/수정**: Notion에서 글을 삭제하거나 제목 변경 시 자동 반영
- ✅ **안정성**: `posts/manual/` 파일은 절대 건드리지 않음
- ✅ **검증 가능**: 생성된 마크다운 파일을 Git으로 관리

---

### 방법 2: 직접 마크다운 파일 작성

`posts/manual/` 폴더에 `.md` 파일 생성:

```markdown
---
title: "글 제목"
date: "2024-01-07"
description: "글 설명"
tags: ["태그1", "태그2"]
---

# 본문 내용

마크다운 문법을 사용하여 작성...
```

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
│   ├── about/       # About 페이지
│   ├── labs/        # Labs 페이지
│   └── logs/        # Logs 목록 및 상세 페이지
├── components/      # 재사용 컴포넌트
│   ├── Header.tsx   # 헤더 (메뉴)
│   └── MainLayout.tsx
├── data/            # 정적 데이터
│   └── menu.ts      # 메뉴 구성
├── lib/             # 유틸리티 함수
│   └── posts.ts     # 마크다운 파일 처리
├── styles/          # 전역 스타일
└── types/           # TypeScript 타입 정의

posts/
├── notion/          # Notion에서 자동 동기화된 글 (자동 관리)
└── manual/          # 직접 작성한 마크다운 글 (수동 관리)
```

## 주요 기능

- **Notion 연동**: Notion 데이터베이스에서 글 자동 동기화 (Clean Sync)
- **이중 소스**: Notion 글 + 수동 작성 마크다운 글 통합 관리
- **마크다운 기반**: 모든 글은 `.md` 파일로 저장되어 Git 관리 가능
- **태그 필터링**: OR 조건 기반 태그 필터링
- **반응형 레이아웃**: 모바일/태블릿/데스크탑 대응
- **GitHub Flavored Markdown**: 테이블, 체크박스, 코드 블록 등 지원
