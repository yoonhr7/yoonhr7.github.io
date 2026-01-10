---
title: "Vercel에 Domain 등록하기"
date: "2025-06-04"
tags: ["호스팅"]
notionId: "208a784e-4dc2-801c-90df-c4268f596668"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
**Vercel**에서 급하게 도메인을 새로 구매해 호스팅을 했었는데 **Vercel**에서 한번에 편하게 관리하기 위해
다른 사이트에서 산 도메인을 **Vercel**에 등록해보았습니다.


(저는 [닷홈](https://www.dothome.co.kr/)이라는 서비스에서 도메인을 구매했습니다.)


### 1. [Vercel](https://vercel.com/)에서 도메인 등록하기

- Settings > Domains > Add Domain 에서 내가 가지고 있는 도메인을 입력해 추가합니다.
- 인증되지않은 도메인은 Fixed 버튼을 클릭합니다.
- 해당 도메인 설정에서 Nameserver를 클릭하면 Vercel에서 안내되는 아래와 같은 Nameserver(NS)가 나옵니다.

```plain text
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```


### 2. 네임서버 변경

- 도메인을 구매한 사이트에서  네임서버 관리에서 위에서 제시한 네임서버를 등록해줍니다.

⇒ Vercel이 전체 DNS를 관리하게 됩니다. 관리가 편하지만 다른 서비스와 연동 시 유의해야합니다.


### 3. Vercel에서 연결 완료 확인


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/8b84c6e6-2cf0-4977-81fd-2c10a8a0857b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4PO2QJK%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIADnwYnYpWOiDYB4VSXNQvEAMbT%2BrvyQr3SK348dbYagAiBl6Jpzg6qKBlLVnrcfvVYqxgAYTKBm2oavqW2vC6J19SqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQG0CjPvv6UDReZBbKtwDUSko7XoPyktxcOD%2FO0k3IOMEzULVgkvsCVXnVMZX%2Fqf73eqlRy1wYvKO8CMFpl3t0D7b9%2BA9ORVf8Xs29Tkr%2FzDBz8v0kXa0JJAdOr3IkdzaWJukY%2Fzri%2BTqgXOhAJ3Ylgqu0lTikXpcPEN6VFO5wiK2w3HU3o06oK9VENtJMFygW6GpqklhizAZ1soh9TWd8JYdwVTmcE9xuzfohSjVQOBKz9EePW33dm1J%2FHNkeWKRUl38tTbFXwBx1cW1w6bm2BoVxlIm9JD7V5CiZc0SSXGXlYjM41JaOxB9vJoMW62Rk%2B%2B%2F8umSD93VVeNDa6rpGpZ3iWqg7RLa9z7ekGbTI%2BewoxCjSD%2Fl4WIYU1xMGpUQeJ%2F6QOdfuFaIEOQ%2BLIL2Rc3cOwfJMRhIbmLJQkNz%2FxXDepr38NPBQJVePk%2Fzfd8U6vC5cWgHYiHObjdIS2zY7Yhiey4iGKOBjP5to3dSxXuKY7mB5eElR8nb5yHLL5lvjY2sco8XndevC8ql%2FgLxTlFQkRxtLYwDGCUlStYfUanuJtOBckCprr6KipekAXCKbEycJdB02av0g6DnbodlOltl1Bay8uLcGRTHsw4gxGqmvaZM3iozbCBxi7YvSTAUWq%2Fbv2pkOJCc7Lcw942IywY6pgE4b6ZUVW3UsbiAsZxfrvQic%2BuUSCPAuFBh%2BlTnYsahy1XzZi5f6hMz8bQLiHfN5pm%2BeNDIgiglJ%2FyVEVeuzLve8FmiWBkjwrk07Gy%2FDY5Gs%2FrzOrzCGwug%2FtrLc%2Br7tqo3scTmWfWHa5%2BXrguv%2BsCjq38%2FNMV5jYy0cpa3LrQg2OJKEcLrfiEb%2BKYThFXfBf9MvWJzQ6ZAyeWRTkamMIt2IoTsQJiY&X-Amz-Signature=05dd7bcd9f6db4f52ac0f2b2b932307ad1cc9a59d2048f96eebe67216b98e758&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- 도메인 옆에 이런식으로 뜨면 완료입니다.
