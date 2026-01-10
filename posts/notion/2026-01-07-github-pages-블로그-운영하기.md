---
title: "GitHub Pages 블로그 운영하기"
date: "2026-01-07"
tags: ["etc.."]
notionId: "2e1a784e-4dc2-805b-81f0-f9c072b4bd35"
lastEditedTime: "2026-01-10T05:16:00.000Z"
---
# 블로그 개설


### GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** > **Pages** 메뉴 접속
3. **Source**를 **GitHub Actions**로 선택

### 자동 배포

- `main` 브랜치에 푸시할 때마다 자동으로 빌드 및 배포
- Actions 탭에서 배포 진행 상황 확인 가능
- 배포 후 `https://user-name.github.io` 또는  `https://user-name.github.io/repository-name` 에서 블로그 확인 가능

<aside data-icon="✏️">

주요 설정 내용

- **next.config.ts**
    - `output: 'export'`: 정적 HTML로 export
    - `images: { unoptimized: true }`: GitHub Pages는 Next.js Image Optimization 미지원
    - `trailingSlash: true`: URL 끝에 슬래시 추가 (GitHub Pages 호환성)
- **GitHub Actions**
    - `main` 브랜치 푸시 시 자동 빌드 및 배포
    - `npm ci`로 의존성 설치
    - `npm run build`로 빌드 (out 폴더 생성)
    - `out` 폴더를 GitHub Pages에 배포
- **.nojekyll**
    - Jekyll 처리 비활성화 (Next.js의 `_next` 폴더 보호)

</aside>


---


## Notion API를 활용하여 포스트 자동으로 가져오기


```plain text
┌─────────────┐
│ Notion API  │ ──(성공)──> posts/*.md 생성 ──> 빌드
└─────────────┘
       │
    (실패)
       │
       └────────────────────> 기존 posts/*.md 사용 ──> 빌드
```


### Notion API 실행 코드


```bash
npm run sync-notion
```


---


## 동작 방식

- **자동 실행**: 매일 4회 (00:00, 12:00, 15:00, 18:00 KST)
- **수동 실행**: GitHub Actions 페이지에서 "Run workflow" 버튼
- **푸시 시 실행**: main 브랜치에 푸시할 때
