---
title: "Nuxt.js & GSAP 세팅 및 배포 총정리"
date: "2025-06-19"
notionId: "217a784e-4dc2-80d3-8161-f5ac0b0f9000"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 1. 설치


```shell
npm install gsap
```


### 2. 클라이언트 전용 플러그인 설정 (`plugins/gsap.client.ts`)


GSAP는 클라이언트에서 실행되어야하기 때문에  `gsap.client.ts` 로 세팅한다.


```typescript
// plugins/gsap.client.ts

import { defineNuxtPlugin } from "#app";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import Flip from "gsap/Flip";

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, TextPlugin, DrawSVGPlugin, Flip);
		  
		ScrollTrigger.config({
        ignoreMobileResize: true,
    });
    
		if (process.client) {
        // 이미 생성되어 있지 않으면 ScrollSmoother 생성
        if (!ScrollSmoother.get()) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.2,
                effects: true,
                normalizeScroll: true, // 모바일에서 약간 개선
            });
        }
    }
});
```


➕ 이외에도 필요한 GSAP 플러그인이 있으면 추가하도록 한다.


<aside data-icon="💡">

주의


GSAP의 서브 플러그인들은 대부분 **ESM(ES Module)** 기반의 `default export` 로 제공되기 때문에, 반드시 **중괄호없이** **`import X from '...'`** 형식으로 불러와야 한다. 
`import { SplitText } from 'gsap/SplitText'`처럼 중괄호를 쓰면 로컬에서는 정상 작동해도 배포 시 500 에러가 날 수 있다.

</aside>


---


### 3. 컴포넌트에서 사용 (`<script setup>`)


Vue 컴포넌트 안에서는 **플러그인을 직접 사용하는 경우에만 import** 한다.

- 일반적인 사용 (gsap 내부에서 플러그인을 사용하는 경우)

    ```typescript
    import gsap from "gsap";
    
    gsap.to(".box", {
      scrollTrigger: {
        trigger: ".box",
        start: "top center",
      },
      x: 100,
    });
    ```

    - `ScrollTrigger`는 `gsap.registerPlugin(...)`에서 이미 등록되었기 때문에 다시 import 하지 않아도 된다
    - 내부 옵션으로 쓰는 경우, 자동으로 인식되어 작동한다.
- 직접 사용하는 경우 (예: `.create()` 호출)

    ```typescript
    import gsap from "gsap";
    import ScrollTrigger from "gsap/ScrollTrigger";
    
    ScrollTrigger.create({
      trigger: "#yes",
      start: "top top",
      end: "+=9000",
      pin: true,
      anticipatePin: 1,
    });
    ```

    - 이처럼 **ScrollTrigger를 직접 객체처럼 사용할 경우에는 반드시 import 해야 한다.**
    - `ScrollSmoother.create(...)`, `SplitText.split(...)` 등도 동일한 원칙이 적용된다.
