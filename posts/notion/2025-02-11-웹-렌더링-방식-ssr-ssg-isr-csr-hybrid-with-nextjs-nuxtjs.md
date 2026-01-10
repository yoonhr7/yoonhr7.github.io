---
title: "웹 렌더링 방식 (SSR, SSG, ISR, CSR, Hybrid with Next.js, Nuxt.js)"
date: "2025-02-11"
tags: ["etc.."]
notionId: "197a784e-4dc2-80d3-a1bc-e2aff7dc52cd"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
## 1. SSR (Server-Side Rendering, 서버 사이드 렌더링)

- **설명**: 클라이언트 요청이 들어올 때마다 서버에서 HTML을 생성하여 응답하는 방식
- **장점**: 최신 데이터 제공 가능, SEO 최적화
- **단점**: 서버 부하 증가, 응답 속도 느릴 수 있음

### **Next.js에서 SSR 사용 예시 (****`getServerSideProps`****)**


```javascript
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
```

- 클라이언트 요청이 올 때마다 실행되므로 항상 최신 데이터를 제공함

### **Nuxt.js에서 SSR 사용 예시**


```javascript
<script setup>
	const { data } = await useFetch('https://api.example.com/data');
</script>
```

- `useFetch` 또는 `useAsyncData` 사용하면 SSR이 활성화됨

---


## 2. SSG (Static Site Generation, 정적 사이트 생성)

- **설명**: 빌드 시 HTML을 미리 생성하여 정적 파일로 제공
- **장점**: 매우 빠른 로딩 속도, 서버 부담 없음
- **단점**: 데이터 변경이 있을 경우 다시 빌드 필요

### **Next.js에서 SSG 사용 예시 (****`getStaticProps`****)**


```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
```

- Next.js는 이 데이터를 빌드 시 미리 생성하여 정적 HTML을 만들고, 이후 요청 시 빠르게 제공함

### **Nuxt.js에서 SSG 사용 예시**


```javascript
<script setup>
	const { data } = useFetch('https://api.example.com/data');
	definePageMeta({ prerender: true }); // 정적 사이트 생성 활성화
</script>
```

- `prerender: true`를 설정하면 해당 페이지는 정적으로 생성됨

---


## 3. ISR (Incremental Static Regeneration, 증분 정적 재생성) **(Next.js 전용)**

- **설명**: SSG처럼 미리 정적 페이지를 생성하되, 일정 시간마다 새로운 데이터를 받아 다시 정적 페이지를 갱신하는 방식
- **장점**: SSG의 속도를 유지하면서도 최신 데이터 반영 가능
- **단점**: 지원하는 프레임워크가 한정적 (Nuxt.js는 기본 지원 안 함)

### **Next.js에서 ISR 사용 예시 (****`revalidate`****)**


```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data }, revalidate: 10 }; // 10초마다 새로운 데이터로 갱신
}
```

- `revalidate: 10`을 설정하면, 10초마다 새로운 데이터를 가져와 정적 페이지를 갱신함

---


## 4. CSR (Client-Side Rendering, 클라이언트 사이드 렌더링)

- **설명**: 최초 HTML은 최소한의 정보만 제공하고, JavaScript가 실행되면서 데이터를 가져와 렌더링하는 방식
- **장점**: 사용자 인터랙션이 많거나, 빈번한 데이터 변경이 필요한 경우 유리
- **단점**: 초기 로딩 속도 느림, SEO 불리함 (SSR이나 SSG보다 낮음)

### **Next.js에서 CSR 사용 예시 (****`useEffect`****)**


```javascript
import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data ? data.content : 'Loading...'}</div>;
}
```

- `useEffect`를 사용하여 컴포넌트가 마운트된 후 데이터를 가져와 클라이언트에서 렌더링

### **Nuxt.js에서 CSR 사용 예시**


```javascript
<script setup>
	const { data, pending } = useFetch('https://api.example.com/data', { server: false });
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else>{{ data.content }}</div>
</template>
```

- `server: false`를 설정하면 CSR로 동작하여 클라이언트에서 데이터를 불러옴

---


## 5. Hybrid (SSR + SSG + CSR 혼합)

- **설명**: Next.js와 Nuxt.js 모두 SSR, SSG, CSR을 혼합하여 사용할 수 있음
- **장점**: 성능과 유연성을 동시에 고려 가능
- **단점**: 구현 방식이 복잡할 수 있음

### **예제: Next.js에서 Hybrid 사용**


```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data }, revalidate: 60 }; // 기본적으로 정적 사이트지만, 60초마다 갱신됨
}
```

- 기본적으로 SSG를 사용하되, 일정 주기로 데이터를 갱신 (ISR)

### **예제: Nuxt.js에서 Hybrid 사용**


```javascript
<script setup>
	const { data, refresh } = await useFetch('https://api.example.com/data', {
	  server: true, // SSR 사용
	  lazy: true,   // 데이터 필요할 때만 불러옴
	});
</script>
```

- SSR을 기본으로 하되, 특정 조건에서 클라이언트에서 새로 불러올 수도 있음

---


## 어떤 방식이 가장 적합할까?


| 렌더링 방식               | 언제 사용하면 좋은가?                                         |
| -------------------- | ---------------------------------------------------- |
| **SSR**              | 최신 데이터가 중요하고 SEO가 필요할 때 (예: 뉴스, 실시간 데이터)             |
| **SSG**              | 데이터가 자주 변하지 않는 정적 페이지 (예: 블로그, 문서 사이트)               |
| **ISR (Next.js 전용)** | 빠른 성능이 필요하지만, 정적 페이지를 일정 주기로 업데이트해야 할 때              |
| **CSR**              | 데이터가 매우 자주 변경되고 사용자 상호작용이 중요한 경우 (예: 대시보드, 챗 애플리케이션) |
| **Hybrid**           | 일부는 정적으로, 일부는 서버에서 최신 데이터로 제공해야 하는 경우                |


---


##  결론

- **Next.js**는 **ISR**까지 지원하여 더 다양한 렌더링 전략을 적용할 수 있음
- **Nuxt.js**는 SSR과 SSG를 강력하게 지원하지만, ISR 기능은 공식적으로 없음 (대신 Nitro를 활용하면 유사한 기능 가능)
- 프로젝트 특성에 따라 **SSR, SSG, CSR, Hybrid**를 적절히 조합하여 사용하면 최적의 성능을 얻을 수 있음
