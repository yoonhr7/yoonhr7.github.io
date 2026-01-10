---
title: "React&NEXT.js 시작하기"
date: "2025-02-11"
tags: ["React"]
notionId: "197a784e-4dc2-80e1-bd07-ff0fbefcb2d6"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 설치 및 환경 셋팅

- node.js 설치

[bookmark](https://nodejs.org/ko)

- NEXT.js 설치

```shell
npx create-next-app@latest 프로젝트제목
```


```shell
# 패키지 설치
npm i

# 실행
npm run dev
```


```powershell
my-next-app/  # 프로젝트 루트 디렉토리
│-- .next/    # Next.js의 빌드 및 캐시 파일이 저장되는 디렉토리 (자동 생성)
│-- app/      # Next.js App Router(13+) 기반의 주요 폴더
│   │-- favicon.ico         # 사이트의 파비콘 파일
│   │-- globals.css         # 전역 CSS 스타일 파일
│   │-- layout.js           # 앱의 공통 레이아웃 설정
│   │-- page.js             # 홈 페이지 ("/" 경로)
│   │-- page.module.css     # page.js에 대한 모듈 CSS 파일
│   │
│   ├── about/              # "/about" 페이지
│   │   │-- page.js         # About 페이지 파일
│   │   │-- about.module.css # About 페이지 전용 스타일
│   │
│   ├── contact/            # "/contact" 페이지
│   │   │-- page.js         # Contact 페이지 파일
│   │   │-- contact.module.css # Contact 페이지 전용 스타일
│
│-- node_modules/  # 설치된 npm 패키지들이 저장되는 폴더 (자동 생성)
│
│-- public/        # 정적 파일(이미지, 아이콘 등)을 저장하는 폴더
│
│-- .gitignore     # Git에서 제외할 파일 및 폴더 목록
│-- jsconfig.json  # JavaScript 경로 별칭 및 설정 파일
│-- next.config.mjs # Next.js 설정 파일
│-- package-lock.json # npm 패키지 종속성 버전 잠금 파일
│-- package.json   # 프로젝트 종속성 및 스크립트 설정 파일
│-- README.md      # 프로젝트 설명 및 사용법을 담은 문서
```


---


### 기본 규칙


```javascript
export default function Home() {
	
// javascript 영역

  let name = 'park'

  return (
	  
// HTML 영역

    <div>
	    
// class지정은 className으로 지정

      <h4 className="title" >애플후레시</h4>
      
// 데이터 바인딩은 {}를 이용

      <p className="title-sub">by dev { name }</p>
    </div>
  );
}
```


---


### 페이지 전환


```javascript
import Link from "next/link"; 
// NEXT의 link import


export default function Home() {
  let name = 'park'

  return (
    <div>
      <div className="navbar">
		    
// Link 태그를 이용하면 클릭 시 바로 페이지 전환 가능
        
		    <Link href="/">홈</Link>
        <Link href="/list">List</Link>
      </div>
      <h4 className="title">제목</h4>
      <p className="title-sub">by dev { name }</p>
    </div>
  );
}
```


---


### 반복문

- Vue와 달리 `for` 나 `if` 를 사용할 수 없음 → `map` 함수를 사용

```javascript
export default function List() {
    const items = [
	    {name:'고추', pay:500}, 
	    {name:'사과', pay:300}, 
	    {name:'바나나', pay:200}
	  ]

    return (
      <div>
        <h4 className="title" >상품목록</h4>
        {
            items.map((item)=>{
                return (
                    <div className="food" key={item.name}>
                        <h4>{item.name} {item.pay}</h4>
                    </div>
                )
            })
        }
      </div>
    );
  }
```


---


### 이미지 삽입


<aside data-icon="💡">

큰 이미지를 불러올 때 로딩이 오래 걸리면 이미지가 로딩되면서 레이아웃이 변하는 현상이 발생할 수 있으므로 아래의 방법들이 필요합니다.

</aside>

- **lazy loading** : 이미지를 처음에 화면에 보이지 않으면, 사용자가 해당 영역으로 스크롤을 내릴 때만 이미지를 로딩하게 하여 초기 로딩 시간을 줄이고, 레이아웃 변경을 방지합니다.
- **사이즈 최적화** : 이미지의 크기나 포맷을 최적화하여, 불필요한 용량을 줄이고, 로딩 시간을 단축시켜 레이아웃이 불필요하게 변경되는 문제를 방지합니다.
- **layout shift** : 이미지의 실제 크기를 미리 지정하여, 이미지가 로딩되는 동안 레이아웃이 갑자기 변하지 않도록 합니다. 예를 들어, `width`와 `height`를 지정하거나, `aspect-ratio`를 설정하는 방법이 있습니다.

```javascript
import Image from "next/image";
import foodImg from '/public/food.jpg'

export default function List() {
    return (
      <div>
	      
// for문이나 바인딩으로 이미지를 가져올 땐 reauire('이미지경로')을 사용함

        <Image src={foodImg} />
      </div>
    );
  }
```


---


### 컴포넌트


1. server component

- 자바스크립트 기능 넣기 불가능
- useState, useEffect 등 사용 불가
- 로딩 속도 빠름
- 검색엔진 노출 유리

```javascript
export default function Cart() {
    return (
        <div>
            <h4 className="title">Cart</h4>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </div>
    )
}

function CartItem() {
    return (
        <div className="cart-item">
            <p>상품명</p>
            <p>$50</p>
            <p>1개</p>
        </div>
    )
}
```




2. client component

- useState, useEffect 등 사용 가능
- 로딩 속도 느림 (자바스크립트 많이 필요)
- 로딩 속도 느림 (hydration 필요)

```javascript
'use client' 
// client component로 선언


export default function Cart() {
    return (
        <div>
            <h4 className="title">Cart</h4>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </div>
    )
}

function CartItem() {
    return (
        <div className="cart-item">
            <p>상품명</p>
            <p>$50</p>
            <p>1개</p>
        </div>
    )
}
```




<aside data-icon="💡">

큰 페이지는 server component


JS 기능 필요한 곳만 client component

</aside>


---


### Pages  Directory VS App Directory


**1. App Directory와 Pages Directory의 차이점**


**1.1** **`pages/`** **디렉토리 (기존 방식)**

- **기존 방식**에서 Next.js는 **파일 기반 라우팅**을 `pages/` 디렉토리 내의 파일들을 통해 관리합니다.
- 각 파일은 **URL 경로**에 직접 대응되며, 페이지 컴포넌트를 `pages/` 폴더 내에서 작성합니다.
- 예를 들어, `pages/index.tsx`는 `/` 경로에 해당하고, `pages/about.tsx`는 `/about` 경로에 해당합니다.

**1.2** **`app/`** **디렉토리 (Next.js 13+ 새 방식)**

- **Next.js 13**에서 도입된 **App Directory** 방식은 **React Server Components**와 **파일 기반 라우팅**을 한층 더 발전시킨 방식입니다.
- `app/` 디렉토리에서는 **파일 기반 라우팅**을 사용하면서, 더 강력한 기능들을 제공합니다.
- **디폴트로 서버 사이드 렌더링**(SSR)을 지원하고, **서버 컴포넌트**와 **클라이언트 컴포넌트**를 쉽게 분리할 수 있습니다.

**2. App Directory의 특징**

- **서버 컴포넌트 (React Server Components)**
    - `app/` 디렉토리에서 컴포넌트를 작성할 때, 서버 컴포넌트와 클라이언트 컴포넌트를 **명시적으로 분리**할 수 있습니다. 서버 컴포넌트는 **서버에서 렌더링**되며, 클라이언트 컴포넌트는 **클라이언트에서 실행**됩니다.
- **동적 라우팅**
    - `app/` 디렉토리에서는 파일 이름에 **동적 라우팅**을 쉽게 설정할 수 있습니다. 예를 들어, `[id].tsx`와 같은 파일 이름을 사용하여 URL 경로에 따라 동적으로 변하는 라우트를 만들 수 있습니다.
- **`layout.tsx`****와** **`page.tsx`**
    - **`layout.tsx`**: 여러 페이지에 공통적인 레이아웃을 정의합니다.
    - **`page.tsx`**: 각 URL에 해당하는 페이지를 정의합니다. `page.tsx`는 기본적으로 **서버 사이드 렌더링**(SSR)을 기본으로 합니다.
- **`loading.tsx`****,** **`error.tsx`**
    - 페이지나 레이아웃의 로딩 상태나 에러 처리를 **간편하게 설정**할 수 있는 특별한 파일들이 추가되었습니다.

**3. App Directory의 기본 구조**


App Directory를 사용하면 기본적으로 **`app/`** 디렉토리가 프로젝트의 주요 디렉토리로 사용됩니다. 예를 들어, 다음과 같은 구조를 가질 수 있습니다:


```shell
my-next-project/
├── app/                        # App Directory (Next.js 13+)
│   ├── layout.tsx              # 전역 레이아웃 설정
│   ├── page.tsx                # 홈 페이지
│   ├── about/
│   │   ├── page.tsx            # /about 페이지
│   │   └── layout.tsx          # /about 전용 레이아웃
│   ├── [id]/                   # 동적 라우팅 예시
│   │   └── page.tsx            # /[id] 동적 페이지
│   └── loading.tsx             # 로딩 컴포넌트
├── public/                     # 정적 파일
│   └── favicon.ico
├── styles/                     # CSS/SCSS 파일
│   └── global.css
├── next.config.js              # Next.js 설정
├── package.json
└── README.md
```


**4. Pages Directory와 App Directory의 주요 차이점**


| 기능           | `pages/` 디렉토리 (기존 방식)                            | `app/` 디렉토리 (Next.js 13+)                     |
| ------------ | ------------------------------------------------ | --------------------------------------------- |
| **라우팅**      | 파일 기반 라우팅 (파일 이름이 URL 경로로 사용)                    | 파일 기반 라우팅, 동적 라우팅 가능                          |
| **서버 컴포넌트**  | 없음                                               | 서버 컴포넌트와 클라이언트 컴포넌트 분리                        |
| **레이아웃**     | 레이아웃은 `pages/_app.js`에서 설정                       | 각 경로에 대한 레이아웃을 `layout.tsx`에서 설정              |
| **데이터 로딩**   | 클라이언트 사이드에서 데이터 로딩                               | 서버 컴포넌트에서 데이터 로딩 (더 빠르고 효율적)                  |
| **로딩/에러 처리** | 기본적인 에러 페이지 처리 (에러가 발생하면 `ErrorBoundary`를 직접 사용) | `loading.tsx`, `error.tsx` 파일을 통해 로딩/에러 처리 가능 |
| **기타**       | 간단하고 직관적                                         | 더 많은 기능 제공, 서버 컴포넌트와 클라이언트 컴포넌트를 구분           |


**5. 언제** **`app/`** **디렉토리를 사용해야 할까?**

- **서버 사이드 렌더링**을 더 효율적으로 활용하고 싶거나, **React Server Components**의 장점을 활용하려면 `app/` 디렉토리 방식을 사용하는 것이 좋습니다.
- **성능 최적화**가 중요한 경우, `app/` 디렉토리를 통해 필요한 부분만 서버에서 렌더링하고 클라이언트에서 렌더링할 수 있어 성능을 크게 향상시킬 수 있습니다.
- **동적 라우팅**, **에러 처리**, **로딩 상태**를 좀 더 깔끔하게 관리하고 싶다면 `app/` 방식이 유리합니다.
- 

---


### 동적 메뉴 생성


```javascript
import fs from "fs";
import path from "path";
import Link from "next/link";

/* 메뉴명 포메팅 */
function formatMenuName(name) {
  return name
    .replace(/_/g, ".") // 언더스코어를 '.'으로 변환
    .replace(/-/g, " ") // 하이픈을 공백으로 변환
    .replace(/\betc\b/gi, "ETC") // 'etc'를 'ETC'로 변환
    .replace(/\b\w/g, (char) => char.toUpperCase()); // 첫 글자를 대문자로 변환
}

export default function Menubar() {
  const appDir = path.join(process.cwd(), "app");

  let pages = [];

  try {
    pages = fs
      .readdirSync(appDir, { withFileTypes: true }) // 디렉토리 목록 가져오기
      .filter((dirent) => dirent.isDirectory()) // 폴더만 필터링
      .map((dirent) => dirent.name); // 문자열 변환
  } catch (error) {
    console.error("❌ 디렉토리 읽기 오류:", error);
  }

  return (
    <nav className={styles.menubar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/${page}`}>{formatMenuName(page)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```


---


### gsap 사용

- 설치

```powershell
npm install gsap
```


<aside data-icon="💡">

Next.js에서 GSAP 사용 시 주의할 점


Next.js는 **서버 사이드 렌더링(SSR)**을 지원하는 프레임워크이므로, `gsap`을 사용할 때 **브라우저 환경에서만 실행되도록 처리**해야 합니다.

</aside>


 **1.** **`useEffect`****를 사용하여 클라이언트에서 실행**


```javascript
"use client"; // App Router 사용 시 추가

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapComponent() {
  const boxRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.to(boxRef.current, { x: 200, duration: 2, ease: "power2.out" });
    }
  }, []);

  return <div ref={boxRef} style={{ width: 100, height: 100, background: "red" }} />;
}
```


✔️ `useEffect` 내부에서 `typeof window !== "undefined"`를 사용하여 클라이언트에서만 실행되도록 합니다.


**2.** **`next/dynamic`****을 사용하여 클라이언트에서만 실행**


Next.js의 `dynamic()`을 사용하여 `gsap`이 서버에서 실행되지 않도록 할 수도 있습니다.


```javascript
"use client";

import dynamic from "next/dynamic";

const GsapAnimation = dynamic(() => import("@/components/GsapComponent"), { ssr: false });

export default function Page() {
  return <GsapAnimation />;
}
```


✔️ `ssr: false` 옵션을 추가하면 **서버에서 GSAP가 실행되지 않도록 방지**할 수 있습니다.

