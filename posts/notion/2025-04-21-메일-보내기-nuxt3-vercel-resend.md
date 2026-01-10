---
title: "메일 보내기 (Nuxt3 + Vercel + Resend)"
date: "2025-04-21"
tags: ["Vue","API","Library"]
notionId: "1dca784e-4dc2-80ce-81b0-c2b5d88c9563"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 1. contact API 


```typescript
// api/contact.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()

  const res = await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: {
      from: 'YHR <your_verified_domain@yourdomain.com>', // 여기 주의 (아래 설명)
      to: ['your_kakao_email@kakao.com'],
      subject: `[contact] ${body.name}님의 메시지`,
      html: `
        <h2>새 문의가 도착했습니다!</h2>
        <p><strong>보낸 사람:</strong> ${body.name} (${body.email})</p>
        <p><strong>메시지 내용:</strong><br>${body.message}</p>
      `,
    },
  })

  return { success: true }
})
```


### 2. Resend API 키 발급 및 적용

- 키 발급

    [bookmark](https://resend.com/)

- 키 적용

    ```typescript
    // .env
    RESEND_API_KEY=your_resend_api_key
    ```


    ```typescript
    // nuxt.config.ts
    export default defineNuxtConfig({
      runtimeConfig: {
        resendApiKey: process.env.RESEND_API_KEY, // 기본값
        public: {},
      },
    })
    ```


### 3. form 작성


```typescript
<template>
  <form @submit.prevent="submitForm">
    <input v-model="form.name" placeholder="이름" required />
    <input v-model="form.email" type="email" placeholder="이메일" required />
    <textarea v-model="form.message" placeholder="문의 내용" required />
    <button type="submit">문의하기</button>
  </form>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitForm = async () => {
  const { data, error } = await useFetch('/api/contact', {
    method: 'POST',
    body: form,
  })

  if (data.value?.success) {
    alert('문의가 성공적으로 전송되었어요!')
    form.name = ''
    form.email = ''
    form.message = ''
  } else {
    alert('문의 전송 실패 ㅠㅠ')
  }
}
</script>
```


### ✅ `from` 주소는 도메인 인증 필요

- Resend에서는 이메일 보낼 때 `from` 주소를 **내 도메인**에서 보내야 함.
- 예를 들어 `no-reply@myportfolio.com` 같은 걸 만들어야 함.
- 도메인 인증 방법: Resend → Domains → Add Domain → DNS 레코드 추가

### 4. Vercel에서 DNS 설정하고 Resend에서 인증하기

- DNS Records 에서 Resend에서 요구한 레코드 추가하기
    - Name, Type, Value 등
- Resend에서 verify 클릭하고 기다리면 `Pending` → `Verified`로 상태가 변경 됨. 완료!

---


### 🛡️ reCAPTCHA


[reCAPTCHA](https://www.notion.so/1dca784e4dc2803286e5d4dc9423e00f) 

