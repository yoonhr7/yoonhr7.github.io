---
title: "axios vs fetch"
date: "2025-02-14"
tags: ["API"]
notionId: "19aa784e-4dc2-809c-b0ed-c2807d38b526"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
## **1. axios**

> axios는 HTTP 요청을 쉽게 보낼 수 있도록 도와주는 JavaScript 라이브러리입니다.

### **특징**

- 자동으로 JSON 변환 (`response.data` 사용 가능)
- 요청과 응답을 인터셉트할 수 있어 (예: 인증 토큰 추가)
- 브라우저뿐만 아니라 Node.js 환경에서도 동일하게 사용 가능
- `baseURL`을 설정하여 API 주소를 전역적으로 관리 가능

### **사용 예시 (Nuxt 3 + FastAPI)**


```javascript
import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api', // FastAPI 서버 주소
    timeout: 5000,
  });

  return {
    provide: {
      api,
    },
  };
});
```


```javascript
<script setup>
const { $api } = useNuxtApp();

const fetchData = async () => {
  try {
    const response = await $api.get('/items');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
</script
```


## **2. fetch**

> fetch는 브라우저 내장 API로, 추가 라이브러리 설치 없이 HTTP 요청을 보낼 수 있습니다.

### **특징**

- 기본적으로 브라우저 내장 API이므로 추가 설치 필요 없음
- JSON 변환을 직접 해야 함 (`response.json()`)
- `axios`보다 코드가 깔끔하지만, 요청 인터셉터 등의 기능은 부족함

### **사용 예시 (Nuxt 3 + FastAPI)**


```javascript
<script setup>
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/items');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
</script>
```


## **axios vs fetch 차이점 정리**


|              | axios                    | fetch                      |
| ------------ | ------------------------ | -------------------------- |
| **설치 필요 여부** | 필요 (`npm install axios`) | 불필요 (브라우저 내장 API)          |
| **JSON 변환**  | 자동 (`response.data`)     | 직접 변환 (`response.json()`)  |
| **타임아웃 설정**  | 가능                       | 직접 구현해야 함                  |
| **인터셉터 지원**  | O                        | X                          |
| **에러 처리**    | 상태 코드 기반 예외 처리 가능        | 400~500대 응답도 `catch`로 안 잡힘 |

