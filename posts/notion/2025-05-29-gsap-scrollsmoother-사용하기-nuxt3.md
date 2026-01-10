---
title: "GSAP ScrollSmoother 사용하기 (Nuxt3)"
date: "2025-05-29"
tags: ["Vue","JavaScript","Library","GSAP"]
notionId: "202a784e-4dc2-8065-bd37-d10868c9c6ba"
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
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  
  ScrollTrigger.config({
      ignoreMobileResize: true,
  });

  if (process.client) {
      if (!ScrollSmoother.get()) {
          ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1.2,
              effects: true,
              normalizeScroll: true,
          });
      }
  }
})
```

- 위와 같이 설정하면 배포 시 모바일 브라우저에서 발생할 수 있는 스크롤 관련 오류를 줄일 수 있습니다.
- 해당 플러그인은 전역으로 등록되므로, 이후 컴포넌트에서도 `ScrollSmoother.get()` 등을 통해 스크롤을 제어할 수 있습니다.

<aside data-icon="💡">

registerPlugin  은 plugins 에서 한번만 실행하면 되지만,


`gsap`와 `ScrollTrigger`, `ScrollSmoother` 등은 사용하는 컴포넌트마다 **import** 해야합니다.

</aside>


## 3. ScrollSmoother 영역 설정

- ScrollSmoother 적용을 원하는 페이지에 아래와 같이 적용합니다.
- `layout.vue` 에 적용하면 레이아웃 전체에 적용할 수 있습니다.

```javascript
<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- 여기에 스크롤할 콘텐츠 -->
    </div>
  </div>
</template>
```


## ✅ 확인해야할 사항


### 1) ScrollTrigger 사용 시 추가해야하는 옵션

- ScrollSmoother는 **transform**을 적용하여 `ScrollTrigger` 위치 계산에 영향을 줍니다. 따라서 `pinType: 'transform'`을 명시하거나, `ScrollTrigger`에서 `scroller`를 명확히 지정해주는 것이 중요합니다.

    ```javascript
    ScrollTrigger.create({
      trigger: '.some-element',
      start: 'top top',
      end: 'bottom bottom',
    
      scroller: '#smooth-content', // 필수!
    
      pin: true,
      scrub: true
    })
    ```


    ```javascript
    gsap.from('.hero', {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.hero',
    
        scroller: '#smooth-content', // 필수!
    
        start: 'top 80%',
        toggleActions: 'play none none reset',
      }
    })
    ```


### 2) position: fixed; 깨짐 현상


CSS의`position: fixed` 는 원래 **뷰포트 기준으로 고정**됩니다. 하지만 부모 요소에 `transform`이 적용되면, 그 fixed 요소는 **뷰포트가 아닌, 가장 가까운 transform 부모를 기준으로 고정** 돼버립니다.


- **방법 1:** **`#smooth-wrapper`** **바깥에 fixed 요소를 위치시키기**

    ```javascript
    <template>
      <div>
        <!-- fixed 요소는 wrapper 밖에 위치 -->
        <div class="my-fixed">💡</div>
    
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <!-- 스크롤 콘텐츠 -->
          </div>
        </div>
      </div>
    </template>
    ```

- **방법 2:** **`fixed`** **대신** **`absolute + ScrollTrigger`****로 직접 위치 조정하기**

    ```javascript
    gsap.to(".fake-fixed", {
      scrollTrigger: {
        trigger: ".fake-fixed",
        start: "top top",
        end: "+=500",
        pin: true,
        scroller: "#smooth-content"
      }
    })
    ```


<aside data-icon="💡">

### 요소를 fixed 처리 하고 싶을 때 사용할 수 있는 컴포넌트 개발 (참고용)

- 컴포넌트 코드 `components/FixedLayer.vue`

    ```javascript
    <template>
        <div ref="layerRef" :style="layerStyle">
            <slot />
        </div>
    </template>
    
    <script setup>
    import { ref, computed, onMounted, onBeforeUnmount } from "vue";
    import { ScrollSmoother } from "gsap/ScrollSmoother";
    
    // props로 받을 수 있는 옵션
    const props = defineProps({
        top: [String, Number],
        bottom: [String, Number],
        left: [String, Number],
        right: [String, Number],
        zIndex: {
            type: [String, Number],
            default: 1,
        },
        pointerEvents: {
            type: String,
            default: "auto",
        },
    });
    
    const layerRef = ref(null);
    
    const addUnit = (val) => (typeof val === "number" ? `${val}px` : val);
    const px = (val) => (val != null ? (typeof val === "number" ? val : parseFloat(val)) : null);
    
    const layerStyle = computed(() => ({
        position: "absolute",
        top: 0,
        left: props.left != null ? addUnit(props.left) : undefined,
        right: props.right != null ? addUnit(props.right) : undefined,
        zIndex: props.zIndex,
        pointerEvents: props.pointerEvents,
        willChange: "transform",
    }));
    
    let animationFrame;
    let smoother;
    
    function syncPosition() {
        const el = layerRef.value;
        if (!el) return;
    
        if (!smoother || !smoother.scrollTop) {
    	    smoother = ScrollSmoother.get();
    	    animationFrame = requestAnimationFrame(syncPosition);
    	    return;
    		}
    
        const scrollY = smoother.scrollTop();
        const top = px(props.top);
        const bottom = px(props.bottom);
        const winHeight = window.innerHeight;
        const elHeight = el.offsetHeight;
    
        let y = 0;
        if (top != null) {
            y = scrollY + top;
        } else if (bottom != null) {
            y = scrollY + winHeight - elHeight - bottom;
        } else {
            y = scrollY;
        }
    
        // X는 CSS로 처리, Y만 transform으로 보정
        if (y != null) {
    		    el.style.transform = `translateY(${y}px)`;
    		}
    
        animationFrame = requestAnimationFrame(syncPosition);
    }
    
    onMounted(() => {
        animationFrame = requestAnimationFrame(syncPosition);
    });
    
    onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrame);
    });
    </script>
    ```

- 컴포넌트 사용하기

    ```html
    <FixedLayer :right="40" :bottom="40" :zIndex="3" :pointerEvents="'none'">
       <!-- fixed 적용할 요소 -->
    </FixedLayer>
    ```


<aside data-icon="💡">

Nuxt 3에서는 components/ 디렉토리에 있는 Vue 컴포넌트는 자동으로 import 없이 사용할 수 있습니다.

</aside>

</aside>


### 3) `a href="#id"` 같은 **기본 앵커 링크 이동이 예상과 다르게 동작**


`<a href="#move">`를 클릭하면 브라우저는 기본 동작으로 `#move` 위치로 이동하려고 하지만, 실제 화면은 `ScrollSmoother`가 관리하므로 스크롤 위치가 **전혀 이동되지 않거나 잘못 이동**될 수 있습니다.

- **방법: 수동 스크롤 이동으로 대체**

    `href="#move"` 대신 클릭 이벤트를 가로채고 `ScrollSmoother.scrollTo()`로 이동하도록 처리합니다.


    ```html
    <a href="#move" @click.prevent="scrollTo('move')">Go to Section</a>
    ```


    ```javascript
    const scrollTo = (id) => {
      const target = document.getElementById(id);
      if (target) {
        ScrollSmoother.get().scrollTo(target, true, "power2.out");
      }
    };
    ```

    - `@click.prevent`: 기본 앵커 이동 막기
    - `ScrollSmoother.get().scrollTo(...)`: 부드럽게 이동 시켜 줍니다
- **Nuxt에서 추천하는 방식**

    Nuxt에서는 `<a>` 대신 `<NuxtLink>`도 많이 쓰는데, 이 경우도 `@click.prevent`로 동작을 가로채고 `scrollTo`로 직접 이동하는 게 안정적입니다.

- **추가 팁** 🍯

    만약 주소창에 `https://your.site/#section`처럼 해시를 포함한 URL로 직접 진입하는 경우도 부드럽게 스크롤되도록 하려면, 페이지 mounted 시 `location.hash`를 처리하면됩니다.


    ```javascript
    onMounted(() => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          ScrollSmoother.get().scrollTo(target, true, "power2.out");
        }
      }
    });
    ```


## 4. 옵션 활용하기


### 4-1. smoothTouch옵션 (터치 디바이스용)


모바일/터치 디바이스에서 부드러운 스크롤을 적용하려면 smoothTouch 옵션을 추가할 수 있습니다. 
기본값은 false이며, 값을 `0.1`~`1` 정도로 설정하면 터치 스크롤도 부드럽게 처리됩니다.


```javascript
ScrollSmoother.create({
    wrapper: "#smooth-wrapper", // 스크롤 전체 래퍼
    content: "#smooth-content", // 실제 스크롤 대상
    smooth: 2.5, // 부드러움 정도 (1~2 추천)
    effects: true, // ScrollTrigger 효과들 허용
    normalizeScroll: true, // 브라우저 기본 스크롤 오차 보정
    smoothTouch: 0.1 // 터치 디바이스에서 부드러운 스크롤 적용
});
```


### 4-2. effect 활용


![scrolldelay.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/c6e731db-7d8c-4311-b407-a9b0dbfa763f/scrolldelay.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647HFD6LG%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD3n04U8UJ8U%2FjzlmYJ6YYDY%2B7invr4NiBF7TEw6q1cCQIgAL6CB1WX676rbGwV1gbHYGcmgL%2F%2FfKPF3lM4aXSp6MEqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLdJzbos1OR%2FZS5nJyrcA7xQSjS5SCThDxN5rgR%2BWACjKvwyuiuGAi5mHetCpy7UY81ccSajqS1tkegnvi5x1QjJ0ealJZLum9DH8SXsuiI9DD%2BlyBMTXOgheScZ%2F8%2B02XzKcXwTBwTu9HgtA5RiR4ZtLrt%2BKbJol%2BE9A4ZXaVITk6vtdKg2sX97XH0KrBi%2FOjGXwWqvjSRyLLz7j1K9gE0r55WyuzhAWGK8t7let5FKZkAw%2Bha43vKPljPxiVoB6QvvbJqAdqP0O8qq12saBAIz1I%2BgprMwYHiPnUtZDcmTbcq5BywrGbkEwC4vBhUVDI%2Fgub2W0SiPaFSdanKdxe0n0tH7McHZ3cObjof7If6tWUbDnkndgVeR4zBUUQau2Es8y1lbJfSpyvyeHHZMaUIuWpzmCpOhSxAyLNfDks%2Fe7chDkweHjvjm0%2BdocKklaEE5uBJB%2BGTU7BW55cUorh5K4yclMP2lRgzIIcl4NZFvHfV4NL87XlJHAhw%2BD3kdU6QBiEpK%2FFZRUUzPjfCyO9pV%2BsBgeggKZxF8bwJVuzTIZF6HU7QOYEY4Hvu9RmdLQ2enHNMjtjgjXrjL4JMS66EP7gFTKydstWKjg%2B86O9gFu%2BosO1mpx4OQfAle92eahuH2Yh7SGU9emmuiMPeNiMsGOqUB2noKuUrZBtp8Yx7JEOSJePLnknJP8uMdJp3vDg%2FSRKduyr%2BxusnZCvBp1jRpiCIIjr1%2FYZWw57%2BpDAPSDzoorDc9TuAa%2FQV5bE9LcMT4GQIgUPK%2FypDxZqOKT3xDNTi6hrAM9pJ3DdPShQ29KTmL59HDnscdva0x0gJ3WR822WQc7PbxdxQSCyZeHAS82%2FO6jEw39Lqox34kVY6q7vtGCL44yml9&X-Amz-Signature=62e319c69536b896be8abcf1574c702db0ecbed70de58f51acc8b84f3c16dfd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


```javascript
ScrollSmoother.create({ effects: true})
```


 `effects: true`로 설정된 상태에서, HTML 요소에 data-speed나 data-lag 속성을 추가해 스크롤 속도나 지연 효과를 조정할 수 있습니다. 


```html
<div id="smooth-content">
    <div data-speed="0.5">느리게 스크롤</div>
    <div data-speed="1.5">빠르게 스크롤</div>
    <div data-lag="0.2">지연 효과</div>
</div>
```

- data-speed: 요소의 스크롤 속도를 조정 (1보다 작으면 느리게, 1보다 크면 빠르게).
- data-lag: 요소의 움직임에 지연을 추가해 부드러운 easing 같은 효과를 줍니다.

```html
<!-- 예제 코드 -->
<div className="df aic jcc gap4rem">
    <p className="fs3rem fw500 " data-speed="0.875">
        ScrollSmoother Effect
    </p>
    <div data-speed="1.125" className="w40rem h30rem br8px bcbfbfbf"></div>
</div>
<div className="df aic jcc gap4rem">
    <div data-speed="1.125" className="w40rem h30rem br8px bcbfbfbf"></div>
    <p className="fs3rem fw500" data-speed="0.875">
        ScrollSmoother Effect
    </p>
</div>
<div className="df aic jcc gap4rem">
    <p className="fs3rem fw500" data-speed="0.875">
        ScrollSmoother Effect
    </p>
    <div data-speed="1.125" className="w40rem h30rem br8px bcbfbfbf"></div>
</div>
```


## **5. 성능 최적화 주의**

- `smooth`값을 너무 높이거나, `data-lag`를 과도하게 사용하면 성능 저하가 발생할 수 있습니다. 특히 모바일 환경에서 테스트하며 적절한 값을 찾으세요.
- `normalizeScroll: true`는 브라우저 간 스크롤 차이를 줄여주지만, 일부 디바이스에서 추가적인 부드러움을 위해 `smoothTouch`와 함께 조정하세요.
