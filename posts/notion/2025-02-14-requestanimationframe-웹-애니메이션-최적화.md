---
title: "requestAnimationFrame 웹 애니메이션 최적화"
date: "2025-02-14"
tags: ["etc..","JavaScript"]
notionId: "19aa784e-4dc2-8076-824f-d4e3f7f3d3d8"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
웹 애니메이션을 구현할 때, CSS의 `animation`, `transition`, `transform` 속성으로 간단한 애니메이션을 처리할 수 있지만, 복잡한 사용자 상호작용을 위해 JavaScript와 함께 사용하는 경우가 많습니다. JavaScript로 스타일을 변경할 때 성능이 떨어질 수 있는데, 이를 최적화하려면 `requestAnimationFrame()`을 사용하는 것이 효과적입니다.


### 브라우저 렌더링 단계


브라우저는 화면을 그릴 때 여러 단계를 거칩니다:

1. **JavaScript**: DOM을 생성하고 애니메이션 작업을 수행.
2. **Style**: CSS 규칙을 적용해 스타일 계산 (CSSOM).
3. **Layout**: DOM과 CSSOM을 결합하여 렌더 트리 생성.
4. **Paint**: 렌더 트리를 기반으로 화면에 픽셀 출력.
5. **Composite**: 출력된 객체들을 합성하여 최종 화면을 생성.

### 브라우저 프레임


애니메이션은 초당 60번 화면을 갱신하는 60fps 기준으로 구현됩니다. 이를 맞추기 위해서는 JavaScript가 16.6ms 간격으로 호출되어야 합니다.


### 타이머 함수와 애니메이션


자바스크립트에서 `setInterval()`이나 `setTimeout()`을 이용해 애니메이션을 구현할 수 있지만, 이는 정확한 프레임 단위로 실행되지 않아 성능 문제가 발생할 수 있습니다. 타이머 함수는 콜백이 지연되어 프레임 드랍 현상이 발생할 수 있습니다.


### setInterval의 단점


1. setInterval의 delay 옵션은 callback이 반복적으로 실행될 시간을 정해주는 것이지 애니메이션 프레임을 설정하는 것이 아닙니다.


2. setInterval은 delay후의 실행을 보장하진 않습니다.


### `requestAnimationFrame()`의 장점

- **최적화된 애니메이션**: `requestAnimationFrame()`은 브라우저의 프레임 주기에 맞춰 호출되므로, 지연 없이 부드러운 애니메이션을 구현할 수 있습니다.
- **성능**: 비활성화된 탭에서는 애니메이션이 중지되므로, 시스템 자원을 낭비하지 않습니다.
- **디스플레이 주사율 맞춤**: 모니터의 주사율에 맞춰 애니메이션을 최적화합니다.

### `requestAnimationFrame()` 사용법

- `requestAnimationFrame()`은 콜백 함수로 애니메이션을 처리하며, 각 프레임의 시작 시점에 맞춰 실행됩니다.
- 콜백 내부에서 다시 `requestAnimationFrame()`을 호출하여 반복할 수 있습니다.

```javascript
const animationCallback = (timeStamp) => { // timeStamp는 requestAnimationFrame이 준다
	// . . . DOM 제어 및 스타일 변경 로직
    
    if (재귀 조건) { // 재귀 조건은 주로 timeStamp를 이용
    	// 한번만 실행되기 때문에 재귀를 돌려야한다
        // 대충 10,000번 이상은 안됨
    	requestAnimationFrame(animationCallback);
    }
};

// 등록
requestAnimationFrame(animationCallback);
//window.requestAnimationFrame(animationCallback)
```


[bookmark](https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C)

