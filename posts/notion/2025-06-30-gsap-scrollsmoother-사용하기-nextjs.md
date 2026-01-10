---
title: "GSAP ScrollSmoother 사용하기 (Next.js)"
date: "2025-06-30"
notionId: "222a784e-4dc2-80e7-99e8-ce4d51671ee2"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
<aside data-icon="💡">

Next 기준으로 작성되었습니다.

</aside>


<aside data-icon="💡">

GSAP 3.13.x 버전 이후 모든 기능을 무료로 사용할 수 있게 되었습니다.

</aside>


## 1. 설치


```javascript
npm install gsap
```


## 2. 플러그인 활성화

- `lib/gsap.ts`: **플러그인 등록만** 하고,
- `useGsapSmoother.ts`: 초기화 로직을 `useEffect()`로 분리

```typescript
// lib/gsap.ts
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollSmoother from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, ScrollSmoother }
```


```typescript
// hooks/useGsapSmoother.ts
'use client'

import { useEffect } from "react"
import { ScrollSmoother } from "@/lib/gsap"

export const useGsapSmoother = () => {
  useEffect(() => {
    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2.5,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
      })
    }
  }, [])
}
```


## 3. hook 실행


hooks에서 정의한 hook은 컴포넌트 내부에서 호출해서 사용해야합니다.


```typescript
// layout.tsx 또는 DefaultLayout.tsx
'use client'

import { useGsapSmoother } from '@/hooks/useGsapSmoother'

export default function DefaultLayout({ children }) {
  useGsapSmoother() 

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
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

## **5. 성능 최적화 주의**

- `smooth`값을 너무 높이거나, `data-lag`를 과도하게 사용하면 성능 저하가 발생할 수 있습니다. 특히 모바일 환경에서 테스트하며 적절한 값을 찾으세요.
- `normalizeScroll: true`는 브라우저 간 스크롤 차이를 줄여주지만, 일부 디바이스에서 추가적인 부드러움을 위해 `smoothTouch`와 함께 조정하세요.
