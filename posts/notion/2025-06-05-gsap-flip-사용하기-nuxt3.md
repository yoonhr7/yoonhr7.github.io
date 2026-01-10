---
title: "GSAP FLIP 사용하기 (Nuxt3)"
date: "2025-06-05"
tags: ["GSAP","Library"]
notionId: "209a784e-4dc2-8045-9669-ceb0dbaa95f0"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
GSAP의 **FLIP**은 "First, Last, Invert, Play"의 약자로, **요소의 상태 변화 전후를 비교해서 자연스럽고 부드러운 애니메이션을 자동으로 만들어주는 기법**이다. 


FLIP은 **DOM 요소의 상태 변화(위치, 크기 등)를 추적해서 그 차이를 계산하고, 그 차이를 GSAP 애니메이션으로 보간**하는 방식으로 복잡한 레이아웃 변화도 마치 마법처럼 부드럽게 전환되는 효과를 줄 수 있다.


### ◾FLIP의 핵심 개념

1. **First** – 애니메이션 전의 위치와 상태를 저장
2. **Last** – 애니메이션 후의 새로운 위치와 상태를 저장
3. **Invert** – 두 상태의 차이를 계산해서 "차이만큼 역으로 이동"
4. **Play** – 그 차이를 애니메이션으로 자연스럽게 보이게 함

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


![flipExample.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/7db01e80-9205-4d90-9b81-ae95e58bf6ce/flipExample.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWYDCVT2%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG%2B5dBzcOsT6cYls1hdS5sHTUnLX5uIVBn5RPr14mBdyAiAh5uT0SQRce20hy7410qhJvRYJtpehZfaFNokA6fpjUSqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVpuENpabSXF1akrMKtwDEMY%2FlBZC%2FmYfJszUvomMOqjZ%2BSt5whpT9zWmJsclZKVKRmfPJVK8tMg4ZpD2pByPd0sANnKzZGCBcOZ8qt6bFx9izji%2FmkGPMDwfMUqE4wy4ne3gk%2FiFJiEHJKo4SO7MnCCUTdX2RKIjvLgbBUu1WvweQG%2BNCazH7O%2FM6JDcttIjZIHOqUF%2FTFJ%2FT7c5RjQs8NtSXFxZNCeWOyJcgqrG7s5V6DQixfcx7A%2FCOwmVlzUo2z5lAJIwrXxMKBS7WqBQgMwu%2FOUiVKe2Mb2kMo%2BMoKpWQX96O6FySERqjOZ1I6mKDFip90i0BiAj16b4opIkrI%2FoY9N7uxHocNR%2BYL6Sb5aigRNNA%2BUSRmlpzqWZhUEB0ulno122s78N6LHHywVkFx1qcBxq3EFL4poZkrO91ZDytVRVjtl5R1c4WfC3NJGyIFnTtyie%2BeMaGxLnUjKLF5OU3Hfhe7qKhZS4VxkH2s0o2iTn8aIW2juzAYEYoml6Rw0pnou4FnqNL2FposXEVg9aCfmkLi2BXNLgVhgfXRh5ELh%2B81gV%2BQnG6xcNOUHdOlKRFqTjx1TKsMlK2O8a9R1dp0yd3bOBdnauhuwNHzV89G1xmQewKgGuaIPzRjOqJsMDK2ATZK5950cwqI2IywY6pgGseM7xyaR%2FTEgTKbKX0szAf1FCeDy4aMqYgwlq8EHGrzqLM6CVz21SM6DuKKlhGYPp6dg9miqFFQqK4Wj1uRgYDDbvUnSpJAoFbEidvobSlb%2BcjfJ81uLu6HdMYI52g%2Fm7XHW5RjBaiJmQQD6xiwKEheg%2BkfQcWCKQLpKcaHypRSQyNAgU77AJSsmm118EG9kCK7ip2XHqqqf%2BrpqEfaB1lY%2F5YymY&X-Amz-Signature=f0e99757b5eabee30822e43fd2a95bfa9873beaf8f657f84a3ac6aec223293aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


```html
<template>
    <div class="flip-example">
        <div class="flip-letter final" ref="containerRef">
            <div class="letter F">F</div>
            <div class="letter l">L</div>
            <div class="letter i">I</div>
            <div class="letter p">P</div>
            <div class="for">for</div>
            <div class="gsap">GSAP</div>
        </div>

        <button class="next-btn" @click="flipToNextLayout">Next Layout</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import Flip from "gsap/Flip";

const containerRef = ref();
const layouts = ["final", "plain", "columns", "grid"];
let currentLayout = 0;

function flipToNextLayout() {
    const state = Flip.getState(".letter, .for, .gsap", {
        props: "color,backgroundColor",
        simple: true,
    });

    const container = containerRef.value;
    container.classList.remove(layouts[currentLayout]);
    currentLayout = (currentLayout + 1) % layouts.length;
    container.classList.add(layouts[currentLayout]);

    Flip.from(state, {
        absolute: true,
        duration: 0.7,
        stagger: 0.05,
        ease: "power2.inOut",
        spin: currentLayout === 0,
        simple: true,
        onEnter: (els, anim) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, delay: anim.duration() - 0.1 }),
        onLeave: (els) => gsap.to(els, { opacity: 0 }),
    });
}
</script>

<style scoped lang="scss">
.flip-example {
    min-height: 100vh;
    width: 100%;
    position: relative;
    .flip-letter {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        &.final .for,
        &.final .gsap {
            display: block;
        }
        .F {
            background: #0078ff;
        }
        .l {
            background: #ff6f91;
        }
        .i {
            background: #6ec1e4;
        }
        .p {
            background: #3366ff;
        }
        &.grid .letter {
            flex-basis: 50%;
            height: 50%;
        }
        &.columns .letter {
            flex-basis: 25%;
        }
        &.plain .letter {
            background: transparent;
            color: white;
        }

        .letter {
            font-size: 10vmax;
            font-weight: 600;
            padding: 1rem;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .for,
        .gsap {
            font-size: 5vmax;
            color: white;
            display: none;
        }
    }

    .next-btn {
        margin: 2rem auto;
        position: absolute;
        bottom: 4rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        background: #333;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
    }
}
</style>
```


## ◾참고


[bookmark](https://codepen.io/GreenSock/full/dyBwbeR)


[bookmark](https://codepen.io/GreenSock/pen/eYdyVVe)


[bookmark](https://codepen.io/hexagoncircle/pen/RwLQLop?editors=1010)

