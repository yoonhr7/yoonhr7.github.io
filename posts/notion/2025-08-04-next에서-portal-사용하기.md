---
title: "Next에서 Portal 사용하기"
date: "2025-08-04"
tags: ["React"]
notionId: "245a784e-4dc2-8048-88a7-da9c76d8c68f"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 목표 : Nuxt의 `<Teleport>` 같은 기능 구현하기


### ◾ 전제 조건

- 반드시 `'use client'`에서만 가능 (`createPortal`은 브라우저 환경 전용)
- `react-dom`에서 `createPortal` import
- 두 번째 인자로 **DOM 요소 (****`document.body`****,** **`div#modal-root`** **등)** 필요

```typescript
createPortal(
  ReactNode,            // 렌더링할 JSX 요소
  HTMLElement           // 렌더링될 위치 (예: document.body, 특정 DOM 요소 등)
);
```


### ◾ 구현예시


```typescript
import { useState } from "react";

import { createPortal } from "react-dom";


export default function Page() {
    const [isModal, setIsModal] = useState(false);

    return (
		    {isModal &&
           
 createPortal(

                <div className="popup">
                    <div className="popup-contents w80rem pa2-4rem md-w90p">
                        
                    </div>
                </div>
,
                document.body
            )
}
    )
}
```

