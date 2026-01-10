---
title: "Claude code 사용하기"
date: "2025-07-22"
tags: ["AI"]
notionId: "238a784e-4dc2-8013-ba47-d7a807a90281"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
<aside data-icon="💡">

2025.07.22 에 작성한 내용입니다.

</aside>


**Claude Code**는 **Anthropic**에서 개발한 **Claude** 계열 AI 모델이 **코딩 작업에 특화된 기능**을 수행하는 모드 혹은 사용 형태를 지칭하는 개념입니다.



### **1.** [**NodeJS 18+ 설치**](https://nodejs.org/en/download) **및 클로드 코드 설치**


[bookmark](https://docs.anthropic.com/en/docs/claude-code/overview#install-and-authenticate)


```shell
npm install -g @anthropic-ai/claude-code
```


### 2. Claude code 실행


claude code를 실행 합니다.


```shell
claude
```


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/6f24c980-dbcd-4ed2-a6fd-12c2c3751b1b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666664HIM2%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDJZcFtSq%2BP1l5cExzshnS7CV%2F7YICXJNUO6kKTZdx3HAiBzschsdDQV2n7XLnozt%2FSBUwc3OYBtZHPNSL7hGUoGMyqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNZt1oeHb4nq1okRXKtwDrHk%2FljSKb%2F7zxmQKMVBoZTsL1cr1td15ybgD%2Fjio%2FprIlXGrl4Zo6L%2BfMBDyflxHpR3jNyXkJGCN73SPzbZIkdo1MhsvIO7AvBQBJZfuEq9jakgApFT2UY8SLQolNk0rGe26xaaKLZIXLP1Ye75hPAPQtvzK4HRHXhMlnHp4Ql0f3UUl9pf4T1%2FwX86n0v76YBpVOnMAPMwVEreGxfdG4FrZiT5WbL1hymlrd%2FXa%2FwK6Cdbf89GSnHhviCcqRnm%2FHMFkwzXa1%2FPU%2BXo69b0MmSK7mIuFZ0veFxE2RkI%2BD8ZgnoLEemiX3lBmzVn%2Beg6HtaFhT0qNntQzMPlHltlL5ljID%2FOyAJUyRih4wSTf8sInmFVR6qJxYuNGAOZ4bWhRK3UOVXaIdquqXjtNMDZWFD6NY9eDkLUjIAyzK%2FmGTEH7Vb5mgTTawUZgQxnipzPfTiM%2Fx6qAHxHPpVxZicUEoXhjHvqRKTRwz3Iia9WK8K8sDTLtPpjGSKsijXCP2XLUssAcRyOJcbjeisctqbR%2FmnWwtZOjERorUL5W%2FZAqAtdCWLU9yeG9dhZAJRrAe9HDDNn%2B2taAYlbG0jsrTze8tv9kINHVm1%2Bo0RPPFiLGlCQYyHuFLSKgEN2yOY4w8o2IywY6pgHLZEMMgCj%2Fb9%2FM3EK3cAsWT9AmfR8FSCo8qAyy9MulglobTwfOcbwiDpbC3W3ykSClPel3xzDdv5OG%2FJfPhsYy2D9IG3iT1OzW0ykqbOVqWTCwS9wrwcaDJg%2FtoiAHfBSJWhKr5DNQp%2BxkFwKlWkIixI%2BD1vf6RB4A3a0hVIovuK3ROfzUpbRTJS6elwJGkFgaGwFkkNbmjkLK%2BCl4pkQXwPcqHw0L&X-Amz-Signature=22712e89960099edae7c29e04123e7b40314cc3cb67bbde4f28aab80146af81c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


**클로드 첫 실행 화면**


테마를 선택하고 브라우저를 통해 claude 계정으로 로그인 합니다. 


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/e863b2d9-1ebf-4bcf-ab1a-d36a66c928db/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666664HIM2%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDJZcFtSq%2BP1l5cExzshnS7CV%2F7YICXJNUO6kKTZdx3HAiBzschsdDQV2n7XLnozt%2FSBUwc3OYBtZHPNSL7hGUoGMyqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNZt1oeHb4nq1okRXKtwDrHk%2FljSKb%2F7zxmQKMVBoZTsL1cr1td15ybgD%2Fjio%2FprIlXGrl4Zo6L%2BfMBDyflxHpR3jNyXkJGCN73SPzbZIkdo1MhsvIO7AvBQBJZfuEq9jakgApFT2UY8SLQolNk0rGe26xaaKLZIXLP1Ye75hPAPQtvzK4HRHXhMlnHp4Ql0f3UUl9pf4T1%2FwX86n0v76YBpVOnMAPMwVEreGxfdG4FrZiT5WbL1hymlrd%2FXa%2FwK6Cdbf89GSnHhviCcqRnm%2FHMFkwzXa1%2FPU%2BXo69b0MmSK7mIuFZ0veFxE2RkI%2BD8ZgnoLEemiX3lBmzVn%2Beg6HtaFhT0qNntQzMPlHltlL5ljID%2FOyAJUyRih4wSTf8sInmFVR6qJxYuNGAOZ4bWhRK3UOVXaIdquqXjtNMDZWFD6NY9eDkLUjIAyzK%2FmGTEH7Vb5mgTTawUZgQxnipzPfTiM%2Fx6qAHxHPpVxZicUEoXhjHvqRKTRwz3Iia9WK8K8sDTLtPpjGSKsijXCP2XLUssAcRyOJcbjeisctqbR%2FmnWwtZOjERorUL5W%2FZAqAtdCWLU9yeG9dhZAJRrAe9HDDNn%2B2taAYlbG0jsrTze8tv9kINHVm1%2Bo0RPPFiLGlCQYyHuFLSKgEN2yOY4w8o2IywY6pgHLZEMMgCj%2Fb9%2FM3EK3cAsWT9AmfR8FSCo8qAyy9MulglobTwfOcbwiDpbC3W3ykSClPel3xzDdv5OG%2FJfPhsYy2D9IG3iT1OzW0ykqbOVqWTCwS9wrwcaDJg%2FtoiAHfBSJWhKr5DNQp%2BxkFwKlWkIixI%2BD1vf6RB4A3a0hVIovuK3ROfzUpbRTJS6elwJGkFgaGwFkkNbmjkLK%2BCl4pkQXwPcqHw0L&X-Amz-Signature=a34ed365d8c4868620a06a36177e2cea55ef60e9bf2ede51b6f534fb2f37daed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cursor 처럼 로컬 경로에 있는 파일에 접근해 원하는 기능을 수정하기 위해 코드를 직접 수정할 수 있습니다.


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/9e98710e-f4f1-4296-b9d3-11aa690b10dc/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666664HIM2%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDJZcFtSq%2BP1l5cExzshnS7CV%2F7YICXJNUO6kKTZdx3HAiBzschsdDQV2n7XLnozt%2FSBUwc3OYBtZHPNSL7hGUoGMyqIBAi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNZt1oeHb4nq1okRXKtwDrHk%2FljSKb%2F7zxmQKMVBoZTsL1cr1td15ybgD%2Fjio%2FprIlXGrl4Zo6L%2BfMBDyflxHpR3jNyXkJGCN73SPzbZIkdo1MhsvIO7AvBQBJZfuEq9jakgApFT2UY8SLQolNk0rGe26xaaKLZIXLP1Ye75hPAPQtvzK4HRHXhMlnHp4Ql0f3UUl9pf4T1%2FwX86n0v76YBpVOnMAPMwVEreGxfdG4FrZiT5WbL1hymlrd%2FXa%2FwK6Cdbf89GSnHhviCcqRnm%2FHMFkwzXa1%2FPU%2BXo69b0MmSK7mIuFZ0veFxE2RkI%2BD8ZgnoLEemiX3lBmzVn%2Beg6HtaFhT0qNntQzMPlHltlL5ljID%2FOyAJUyRih4wSTf8sInmFVR6qJxYuNGAOZ4bWhRK3UOVXaIdquqXjtNMDZWFD6NY9eDkLUjIAyzK%2FmGTEH7Vb5mgTTawUZgQxnipzPfTiM%2Fx6qAHxHPpVxZicUEoXhjHvqRKTRwz3Iia9WK8K8sDTLtPpjGSKsijXCP2XLUssAcRyOJcbjeisctqbR%2FmnWwtZOjERorUL5W%2FZAqAtdCWLU9yeG9dhZAJRrAe9HDDNn%2B2taAYlbG0jsrTze8tv9kINHVm1%2Bo0RPPFiLGlCQYyHuFLSKgEN2yOY4w8o2IywY6pgHLZEMMgCj%2Fb9%2FM3EK3cAsWT9AmfR8FSCo8qAyy9MulglobTwfOcbwiDpbC3W3ykSClPel3xzDdv5OG%2FJfPhsYy2D9IG3iT1OzW0ykqbOVqWTCwS9wrwcaDJg%2FtoiAHfBSJWhKr5DNQp%2BxkFwKlWkIixI%2BD1vf6RB4A3a0hVIovuK3ROfzUpbRTJS6elwJGkFgaGwFkkNbmjkLK%2BCl4pkQXwPcqHw0L&X-Amz-Signature=96bbf413ff1bae1e42bcbaff31ec0b8bc1c8a264b8c2bb39e902d1bdbfdc1d77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


Cursor와 거의 동일한 구조로 진행됩니다.


### 3. 사용량 및 정책


**3-1) Pro 플랜**


Pro 플랜 사용량 제한에 대한 자세한 내용은 [Claude Pro 사용량 정보](https://support.anthropic.com/en/articles/8324991-about-claude-pro-usage)를 참조하세요.

- **Pro (월 $20)**: 평균 사용자는 5시간마다 Claude로 약 45개의 메시지를 보내거나, Claude Code로 약 10-40개의 프롬프트를 보낼 수 있습니다.
- **모델 액세스**: Pro 플랜 구독자는 Sonnet 4에 액세스할 수 있지만, Claude Code에서 Opus 4를 사용할 수는 없습니다.
- **최적 용도**: 소규모 저장소(일반적으로 1,000줄 미만의 코드)에서의 가벼운 작업

**3-2) Max 플랜**


Max 플랜 사용량 제한에 대한 자세한 정보는 [Claude Max 플랜 사용량 정보](https://support.anthropic.com/en/articles/11014257-about-claude-s-max-plan-usage)를 참조하세요.

- **Max 5x Pro (월 $100)**: 평균 사용자는 5시간마다 Claude로 약 225개의 메시지를 보내거나, Claude Code로 약 50-200개의 프롬프트를 보낼 수 있습니다.
- **Max 20x Pro (월 $200)**: 평균 사용자는 5시간마다 Claude로 약 900개의 메시지를 보내거나, Claude Code로 약 200-800개의 프롬프트를 보낼 수 있습니다.
- **모델 액세스**: Max 플랜 구독자는 Claude Code에서 Sonnet 또는 Opus 4를 사용할 수 있습니다(`/model` 명령을 사용하여 전환).
- **최적 용도**: 대규모 코드베이스를 사용한 일상적인 사용 또는 파워 유저
