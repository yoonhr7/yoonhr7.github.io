---
title: "reCAPTCHA"
date: "2025-04-21"
tags: ["etc.."]
notionId: "1dca784e-4dc2-8032-86e5-d4dc9423e00f"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
<aside data-icon="💡">

웹사이트의 폼(예: 문의하기)이나 버튼을 자동으로 누르는 악성 봇(bot)을 막기 위한 시스템

</aside>


| 타입                         | 설명                            |
| -------------------------- | ----------------------------- |
| **v2 “나는 로봇이 아닙니다” 체크박스**  | 사용자가 직접 클릭함                   |
| **v2 Invisible reCAPTCHA** | 클릭 없이 자동으로 백그라운드에서 체크         |
| **v3**                     | 사용자 행동 기반으로 스코어만 판단해서 서버에서 처리 |


### Invisible reCAPTCHA 적용 흐름 (v2)

1. **Google reCAPTCHA 콘솔**에서 v2 키 발급
2. 프론트에서 문의 폼 전송 전에 `token` 받아옴
3. 서버(`api/contact.ts`)에서 이 token을 검증
4. 검증 성공하면 메일 전송

### 1. 키 발급


[bookmark](https://www.google.com/recaptcha/admin/create)

- **Label**: 자유롭게 (`my-portfolio`)
- **reCAPTCHA 유형**: ✅ v2 → checkbox reCAPTCHA
- **도메인**: `포트폴리오 도메인` (예: `myportfolio.vercel.app` 또는 `mydomain.com`)
- 제출 후:
    - **Site Key** (`RECAPTCHA_SITE_KEY`)
    - **Secret Key** (`RECAPTCHA_SECRET_KEY`) 받음

### 2. 

