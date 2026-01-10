---
title: "Nuxt3 + Notion API"
date: "2025-04-10"
tags: ["Vue","API"]
notionId: "1d1a784e-4dc2-80b1-87fc-de87bed8db7a"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
## 1. Notion API 연결하기


[Notion API 활용하기](https://www.notion.so/215a784e4dc28011a455cfaf1d2a0504) 에서 Notion API 토큰과 DB ID 발급 받는 법을 확인할 수 있습니다.


### 1) Notion 데이터 가져오기


```typescript
// server/api/notion/notion.ts
import { Client } from "@notionhq/client";

export default defineEventHandler(async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response;
});
```


```javascript
<script setup>
import { onMounted, ref, computed } from "vue";

const { data: notionData } = await useFetch("/api/notion/notion");

const dataList = computed(
  () =>
    notionData.value?.results?.filter(
      (item) => item.properties.category?.select?.name === "study"
    ) || []
);
</script>
```


```html
<ul>
  <li v-for="(item, index) in dataList" :key="index">
    <NuxtLink :to="`/study/${item.id}`">
      {{ item.properties.title.title[0]?.plain_text || "제목 없음" }}
    </NuxtLink>
  </li>
</ul>
```


### 2) 토큰 등록

- `.env` 파일에 적어두고 git에 올리면 안됨. `.gitignore`에 등록하기!

    ```javascript
    // .env
    NOTION_TOKEN=secret_abc1234567890...
    NOTION_DATABASE_ID=your_database_id_if_needed
    ```


---


## 2. Notion 상세페이지 보기


### 1) 상세페이지 만들기

- `NuxtLink` 에 to로 `‘/폴더명/${id}’` 로 링크 연결

    ```html
    <NuxtLink :to="`/study/${item.id}`">
      {{ item.properties.title.title[0]?.plain_text || "제목 없음" }}
    </NuxtLink>
    ```


### 2) MarkDown

- **서버에서 데이터만 받고 클라이언트에서 마크다운 커스텀**
    - `NotionToMarkdown is not a constructor` → 대표적인 호환성 문제가 있음
    - CommonJS 방식 → Nuxt 3 (ESM 기반)에서 충돌이 잦음 
    → 서버에서 노션 블럭 데이터만 가져오고 클라이언트에서 렌더링

[코드 블럭(with Prism.js)](https://www.notion.so/1d3a784e4dc280dd958ef20f8125c206) 


---


## 3. cover 이미지 불러오기


```html
<img 
	 v-if="getThumbnailImage(item)" 
	 :src="getThumbnailImage(item)" 
	 alt="썸네일" 
	 class="w-16 h-16 object-cover rounded" 
	 @error="(e) => (e.target.src = '/placeholder-thumbnail.png')" 
/>
```


```javascript
const getThumbnailImage = (page) => {
    // 1. 커버가 있는 경우
    if (page.cover) {
        return page.cover.external?.url || page.cover.file?.url;
    }

    // 2. 특정 속성에 있는 파일 속성 (예: thumbnail)
    const files = page.properties?.thumbnail?.files;
    if (files?.length) {
        return files[0].external?.url || files[0].file?.url;
    }

    // // 3. 기본 이미지 fallback
    // return "/placeholder-thumbnail.png";
};
```


---


## 4. form을 Notion DB에 저장하기 (post)

