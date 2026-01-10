---
title: "Notion API 활용하기"
date: "2025-06-17"
tags: ["API","etc.."]
notionId: "215a784e-4dc2-8011-a455-cfaf1d2a0504"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
[bookmark](https://www.notion.so/profile/integrations)


### 1. Notion API 토큰 발급 받기

1. [🔗 Notion 개발자 포털 접속](https://www.notion.so/profile/integrations)

    → 로그인한 상태여야 합니다.

2. **"New Integration"** 버튼 클릭
3. 아래 항목 입력:
    - **Name**: 예를 들어 `Obsidian Sync`
    - **Associated Workspace**: 사용할 워크스페이스 선택
    - **Capabilities (권한)**:
        - ✅ 읽기(read)
        - (나중에 쓸 일이 있다면 쓰기(write)도 가능)
4. 완료되면 페이지 하단에서 **"Internal Integration Token"** 복사

    → 이게 바로 `.env`에서 쓰게 되는 `NOTION_TOKEN` 값입니다.


### 2. Notion DB(또는 페이지)에 Integration 공유하기


토큰만 있다고 접근되는 건 아닙니다. 반드시 해당 DB에도 **Integration을 초대**해야 합니다:

1. Notion에서 백업하려는 DB 페이지 열기
2. 우측 상단 **[공유] → [연결 추가]**
3. 아까 만든 Integration 이름 선택 → **초대**

→ 공유가 완료되면, Integration이 해당 페이지/DB에 접근할 수 있게 됩니다.


### 3. DB ID 복사


Notion DB 페이지 주소 예시:


```plain text
https://www.notion.so/yourworkspace/Page-title-abc1234567890abcdef1234567890abcd
```


→ 이 중에서 `abc1234567890abcdef1234567890abcd` 부분이 **DB ID**입니다.

> URL에 하이픈이 있다면 그대로 포함해도 됩니다.

---


###  `.env` 파일 예시


```plain text
NOTION_TOKEN=secret_abc123def456... ← 복사한 Integration 토큰
NOTION_DB_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx ← 대상 DB ID
```

