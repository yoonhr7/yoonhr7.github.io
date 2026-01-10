---
title: "로렘 픽숨 (Lorem Picsum) 더미 이미지 사용하기"
date: "2025-07-14"
tags: ["etc.."]
notionId: "230a784e-4dc2-80a5-8860-ca6aeb1f6fe4"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### ◾ 로렘픽숨(Lorem Picsum)이란?


**Lorem Picsum**은 개발자나 디자이너가 목업(Mockup)이나 테스트를 위해 사용할 수 있는 **무료 임시 이미지(Placeholder Image) 제공 서비스**입니다.


Unsplash 기반의 이미지를 랜덤 또는 고정 방식으로 원하는 크기만큼 손쉽게 가져올 수 있어, 실제 콘텐츠 없이도 빠르게 디자인을 구현할 수 있습니다.


로렘픽숨은 이미지 리소스를 준비하지 않아도 되므로 빠른 UI 개발, 퍼블리싱 테스트, 디자인 프로토타이핑에 매우 유용합니다.


---


### ◾ 기본 사용법


다음과 같은 URL 형태로 이미지를 요청합니다:


```plain text
https://picsum.photos/너비/높이
```


예시:


```plain text
https://picsum.photos/300/200
```

> 300px × 200px 크기의 랜덤 이미지 반환

---


### ◾ 주요 옵션

- **고정 이미지 (랜덤 아님)**

    이미지 ID를 지정하여 항상 같은 이미지 반환


    ```plain text
    https://picsum.photos/id/237/300/200
    ```

- **Grayscale (흑백)**

    ```plain text
    https://picsum.photos/300/200?grayscale
    ```

- **Blur (블러 처리)**

    ```plain text
    https://picsum.photos/300/200?blur
    ```

- **Grayscale + Blur**

    ```plain text
    https://picsum.photos/300/200?grayscale&blur
    ```

- **Seed 기반 고정 이미지 (랜덤 이미지지만 동일 시드 유지)**

    ```plain text
    https://picsum.photos/seed/hello/300/200
    ```


---


### ◾ 코드에서의 활용 예시


**HTML**


```html
<img src="https://picsum.photos/400/300" alt="placeholder image" />
```


---


### ◾ 참고 사항

- 모든 이미지는 Unsplash 기반으로 자유롭게 사용할 수 있지만, 실제 서비스 이미지로는 권장되지 않음
- `seed` 또는 `id` 옵션을 사용하면 랜덤성이 제거되어 일관된 테스트 가능
- 응답은 JPG 이미지로, 경로에 따라 자동 리다이렉트가 일어남

---


### ◾ 공식 문서


[https://picsum.photos](https://picsum.photos/)


문서와 고급 기능은 해당 사이트에서 직접 확인 가능

