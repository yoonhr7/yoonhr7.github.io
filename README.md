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

### UI & Icons

- **lucide-react 0.562.0** - 아이콘 라이브러리

### Code Quality

- **ESLint 9** - 코드 린팅
- **Prettier 3.7.4** - 코드 포맷팅
- **eslint-config-prettier 10.1.8** - ESLint와 Prettier 통합

## 블로그 글 작성

### 마크다운 파일 형식

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

posts/               # 블로그 마크다운 파일
```

## 주요 기능

- 마크다운 기반 블로그 시스템
- 태그 기반 필터링 (OR 조건)
- 반응형 레이아웃
- 페이지별 헤더 너비 조정 (Home: 120rem, 기타: 800px)
- GitHub Flavored Markdown 지원
