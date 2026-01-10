---
title: "GSAP SpliltText 사용하기(Nuxt3)"
date: "2025-06-17"
tags: ["Vue","JavaScript","GSAP","Library"]
notionId: "215a784e-4dc2-80d5-bb19-d20e06bd892a"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
<aside data-icon="💡">

Nuxt3 기준으로 작성되었습니다.

</aside>


<aside data-icon="💡">

GSAP 3.13.x 버전 이후 모든 기능을 무료로 사용할 수 있게 되었습니다. (2025.05.29.작성)

</aside>


## 1. 설치


```javascript
npm install gsap
```


## 2. 플러그인 활성화

- Nuxt 3에서는 클라이언트 전용으로 GSAP을 로드해야 하므로, `plugins/gsap.client.ts` 또는 `.js` 파일을 생성합니다.

```javascript
// plugins/gsap.client.ts
import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import { SplitText } from "gsap/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(SplitText)
})
```


<aside data-icon="💡">

registerPlugin  은 plugins 에서 한번만 실행하면 되지만,


`gsap`와 `ScrollTrigger`, `ScrollSmoother` 등은 사용하는 컴포넌트마다 **import** 해야합니다.

</aside>


## 3. 예제


![staggerText.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/d5e0abe6-33a8-40b3-b7bd-947419958972/staggerText.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLHUUZZR%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICt0xZMwcw%2B9Lu8L4y%2FgANU7Hl1K5ioVl%2BREe31%2FyLnRAiAXKlnp7xonNY8ZDQ3m0WFZIbtkrzdKrAZdufjumnfM5SqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjyId9ZvEjLGcLjEnKtwD4C8PMEhvinkejzVAYNnFjv%2Bcp5QnoSieygxyCydMpLdHzFyR%2BU3oCGsBXTePZF%2BGuCZd7Ldca5RuJL1YHFC3eB00BZvrS4KpFZR0sdIiufDuiZFB3abJ7QZKkAiicR1vHy7%2BnRllLBbsQ3FDktQ6GXrc2TYms808R%2Bs%2BXN2VBqfl5DZbovbqnxtK6GxUMSlpiXLglQyXKTva8RcgsX3awzym9ZEDCRG7eE3Nlq3YoLlSTnZJb0mjXfZk0337xufthhysqj2vDgOFNNUosQ%2FMta%2FQviBxJgpKROxo5%2FiUXZaYobYyk%2FsDpkOIscfyo9dE9fM%2BZ5K%2FKxipTWLtzzLPJ%2BnOjWq3LZZL%2BLflpcsqfSLrc0kRavwd5H7ohnmCNS9ua1fvNp9GmYAkZsMlRU59O%2FWkQ%2FyGpfyEdNJMCHR51PMwuyjboP1lgnrojN%2FASWakQxjpiRaV9fFsCVw0lfq1pwH3fmnmDDf5bCwWIiqmyO4q%2B2db4YkaDbZ7ccTWrgtolQ8x88E7Igargy86medVb2wTJ5lcxEwlTB%2BpdD3WxmZY%2BPBDvdw22LSskQfYQoOZNujC4SNiEMSHTjMA7IFFKQD6eHUal0vlYdplKWrsMGI5s3sW7uSB8pppUYAw7Y2IywY6pgFmUx5HvFkSEaK7RvoZrRMAUj7iVeC2BLkdDWSDltzPz6ZxToZ%2FOYGSQbiyXQ8gSOTgCKBbz21Lh4mkR%2BbqL7rGvJ03JoNMrPGn34ao7gCjpq%2Bfx9ZmWsw6FdyuZJ1TYaZ7JiamBSClSUcBenTw2GxtI3Bcb%2FgO88HQTgdw5o%2BdQYd5%2BDBpZJrdyYSLSisMu1y5M%2BNLjOwqImTDE8y8qNV9Gl8XkzBo&X-Amz-Signature=7e6fdb07435bff5414d1f8f58bad128fb0234b52fdd4377ecd5c3b7da610f52c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


<aside data-icon="💡">

text를 character로 분할해서 각각 character에 애니메이션을 적용하는 예제입니다.

</aside>


```javascript
<template>
    <div class="stagger-text">
        <p ref="text">Stagger Text</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { gsap } from "gsap";

import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const text = ref(null);
onMounted(() => {
		// text 분리하
    const split = new SplitText(text.value, { type: "chars" });
    split.chars.forEach((charSpan) => {
        // charSpan 내부 글자(text node) 가져오기
        const letter = charSpan.textContent;

        // charSpan 내부 비우기
        charSpan.textContent = "";

        // 새 inner span 두 개 생성
        for (let i = 0; i < 2; i++) {
            const innerSpan = document.createElement("span");
            innerSpan.textContent = letter;
            charSpan.appendChild(innerSpan);
        }

        // 클래스 이름 변경 (optional)
        charSpan.classList.add("letter");
    });

    /* 
		* gsap가 transform 속성이나 애니메이션 속성을 줄 때 해당 요소의 
		* display 속성이 없으면 inline-block으로 설정하는 경우가 있으므로 
		* flex를 선언하기 위해 set 설정함.
		*/
    gsap.set(".letter", { display: "flex" }); 
    gsap.to(".letter", {
        duration: 1,
        yPercent: 100,
        ease: "expo.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        stagger: {
            each: 0.04,
            from: "random",
        },
    });
});
</script>

<style lang="scss">
.stagger-text {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        display: flex;
        overflow: hidden;
        line-height: 2ch;
        font-size: 3rem;
        .letter {
            position: relative;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            align-items: center;
            height: 1.9ch;
        }
    }
}
</style>
```

