---
title: "Obsidian & Notion 활용하기 (Google Drive 연동, 암호화, Notion API, …)"
date: "2025-06-17"
tags: ["etc.."]
notionId: "215a784e-4dc2-80f0-8bf9-fe09c1d5ac14"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
<aside data-icon="💡">

왜 함께 쓰나요?

- Notion: 학습 내용 정리, 공유용
- Obsidian: 민감한 정보 백업용 (암호화 가능)

</aside>


<aside data-icon="💡">

어떻게 연결하나요?


특정 Notion DB를 마크다운으로 변환


→ 변환된 파일을 Obsidian Vault에 자동 저장


→ Vault는 여러 대의 PC에서 동일하게 접근 가능 (Google Drive 연동)

</aside>


<aside data-icon="💡">

워크플로우 개요


학습 정리는 **Notion**, 
보안성 높은 메모는 **Obsidian**


Notion → Obsidian로 선택된 정보만 자동 백업


---

- 학습 내용은 공유하면서도,
- 민감한 메모는 안전하게, 별도로 관리할 수 있는 구조

</aside>


## 🔄 Google Drive 연동하기


### 1. Google Drive 데스크탑 앱 설치

- Google Drive for Desktop 다운로드
- 설치 후 로그인
- **동기화 폴더 위치 설정** (기본은 `내 컴퓨터 > 내 드라이브` 또는 `G:\My Drive` 등)

### 2. Vault를 Google Drive 폴더 안에 만들기

1. Google Drive 폴더 안에 `ObsidianVault` 폴더 생성

    예:

    - `C:\Users\내이름\Google Drive\ObsidianVault`
    - 또는 `G:\My Drive\ObsidianVault`
2. Obsidian에서 "Open folder as vault" 클릭

    → 위 경로 선택 → 새 Vault로 등록

3. 이제 Vault 안에 작성하는 모든 노트는 Google Drive에 자동 백업됨

### 3. 다른 PC에서도 동일 폴더 열기

1. 두 번째 PC에도 Google Drive 데스크탑 앱 설치 + 로그인
2. 동기화된 `ObsidianVault` 폴더가 자동으로 생김
3. Obsidian 실행 → `Open folder as vault` → 동일한 폴더 열기

연결 완료.


---


## 🔐 암호화하기


### 1. 플러그인 설치

- 왼쪽 바 하단 설정 → 커뮤니티 플러그인 → 보호모드 비활성화 → 탐색

    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/875022dc-d356-4d90-8f71-d10e446a585a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SS2DUPV4%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD36RUzog9kWLKkmzXKezEa9FtUVDQ9wyVYa86SelNlUAIhAIkgwJ%2Bx4Cf%2BnSgmn4%2Fcih8fb8R7e4FCCzp8BvOnnvQCKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzMlivbzlcHlDNdDgkq3AP1Xr%2Bv8Zp9ny56NzRFRzE88fiHzDe%2FgckiCg3z5y5agY68yquv%2BCk9E6Upyo2Cy33oh7tiLCu4hEhW%2FRYkym9ISE5wPa4CkRE8c2o59NrgX60D4Altp5JJlqg2QfRsugj9bgDhTKPcyTPewwPDW4BX6I1tl1cMlMHlifGubZ5pG35ii5R22nR1z24UUBF3VBfbKwWGwqAum8jGqDetnLaJV7PxjkypEkV2VY1fMVoK19HTY3heFMXp%2BVykmzz7mwviaMsipcOIImle3pOl55qdFr%2FgTJsKsweSSL%2FjFExS8rpnGjVq4FSKBtqPhfcY90uFiQVzklovwz8YX3iDN8AbfHzo2wVg3ApBVuwDgdQPguY%2BtA07%2F6uZ%2F1WRsrC4uN4XDXSwaNPf0VIxyWsjQMkh%2F4ofMBUcwrVCzPmiqyNb3sV%2F4m%2Bg08wXVEsnSBuuUhbVVypoptcpZT7LMJFBsk3h2DoTKj3XNnABK5lBIQMCqrUOo%2FKudJ%2FEIpOz3YTMbQugkQ1VM73OAdlZvsqOeQaTE5gGrcKP69gdoonvg5A6LahRkwItj5r0Zq%2BPcvC4%2BPglY1KA0qSkmx5SfyQk6wdRRRaN6cVS7XdGUOBE9KfK4N0xpWqdPGdbnI%2BmAzD%2BjYjLBjqkAYgQC4bN9AC7TjwbT790VKHnt1Lr3xSvqgKuuux6NTTZcDh4B7v2RIhY5DtYjjemt0SbNSzs759nUPiFUvfENs3mLxnj35je1tWzVLTGZNZo8amZGsoQOTBxqaxtOh0Ayd1Nr7NwTK5x%2B%2F1CreO1ccSupf2%2B966Dm6%2FR8bZoKJ%2F4WalR8F4vnnkRizIwlfuONFPpw8Mg6QcGahAgwro3jklKYDGV&X-Amz-Signature=52b864a2d4d82c8dc705ceaf366aa7fa67fa1521d60fb055a4b7272fd614f69e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- “Meld Encrypt” 설치

    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/4ea04b22-66c8-4479-a1ee-3b26bcdd93c7/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SSLUMRD%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDg%2BS9oQ7S2YU5myJsZCNaUnio%2B9qBe4O64kcTM2p5yVAiEAmkAT%2FpWblpPIEyyWPZtP3bYsouwy%2B7GyLlCUTeNecSEqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOFg02VPBY9Y0hXB6SrcA9iB7rcp1eXftHgbmPg8ce4ADfhdDIUjH0Y%2ByMjVHap6yIsOwJsFHGKRjToLev%2Bi8MtyVl8Iw4F6YTH4WLtfxdO%2BSDYRrCUFJCGRFa86BrvdL3EcKJ2BDXEJtQw3UKXQN1JAD3oPVAIhcsxs%2BBSrTrF%2B%2BUo8XH42dTyntlmyciXZvKd2uiJFj6yQAe1pMRhwzuGfSnAkpqCsl%2F%2FtbFSTqfyxghCCmarPwPY8Tj5cbjGAnTVH7nf0ebLiVGYJ7Ha%2F5rzezeGr1wqsJTERYzWp19i%2F9KVjLz7hcTf5f9rL%2Bts96DkF69k%2BIcKWZDtzG%2FPIwEMWPy49LuAPqP%2Fjaym2WDdDnL9MMKJjK%2BMc20P4Czuf3N6LVnFYaBrkSRAYzYEjmrzJSKZZY0QHn%2Fe4FsEDfhxzlFNpFUhONCrfTEJN%2F%2Bt%2FxJ4wlD1aUQ47%2Buex2k60iT%2BabxTAHSsUbEMGzBzM0Ha8M0mgNG0Al2JNVixJqUcHi4Y0ib3kkbxfPkfW%2FDjJ5WG4vefUO1VgCok0XEVb6cKFoW4P6znvBTsd6iGon2tDMQu6JMiC%2FLqcxakQkxOQLuLquxU1ZzToMFiOr0UIG6Gn%2Fb%2F6ngLfCec6q2jT%2FXitQf%2Fh22%2BHFvbUIDF4MPOMiMsGOqUBy5YSeuADrt%2BTCcgnFMDtZDC2PoPVvKP%2FdjMYHSRDoKa2nDRTui7HoZP9nxM0lXcyD5thVUzCx34YucnhJXgzR%2F8sK5wPwoBsZ6%2F608JszGEUOk9MIvpxg0aq1zEyccWfm4udu0s52cNo3BVVrRGP9ITvJvI5WexFu44TP1d6eIXybMVWs0U2ZiOLCLr6YjzKvVVARU9wVfgu%2FthaTyh1QzM1S9DP&X-Amz-Signature=7a5d564889f5809c98278f7a7e97d2b4d2533f18bdb7e003ddc8f67d10562d0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- 플러그인 활성화

    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/1f2d43d3-d806-4217-b2a1-0f41dcf45d9f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOTFT44O%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJvTh2Gx4uEGRBgUJhibPOifm6tev280sMkboWyLc9KAIhAI95n0uv6m2eFN0cbRIJr%2FBs8ta%2B6%2F79qohTBcITcSCeKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwY6cxYBGmvnLCc524q3APufNTqQtokOMhEtSDbboWOU36IlTwzo99wqBxPGX61GFhfmah36HbWgWIAfZujd%2FpTua4cCKy5EFcITYp8aPyVrRKUOy2udGk%2FdwRbOKMBcJ6%2FgNYzinrFfQ%2F21tGCSyiNCNK9A%2FlOuz4U8Y78Be0bWyFfNxCLHmVC2mJlWoa8J7ojva2q%2FJ4xx2LyOLShRPLIRjfU8ot33NdNlD0vMFHFaOaJj8tyZMCIViQHflw74lLiW49kRfidQMQHbazhk71iWB0ButF%2Bi7m5%2BLeoUetHUB%2BbsdUuzJrK%2FdlK7HPssL8sNZzECAZQYX%2FwXw2L9h1H4oxq5AW%2BFWKjbbPFhsjvG3oneySmfSrrs1NAVk%2FmKahUD3mWGV%2BqB5Ft3suA75lCYbXa6z8kWv7tEoxna9oHPz6LFhOxHAkn5sZxy7t%2BSX8yCcHqZVuTCj0b9b3wgA2vCEWzeSHXnaiMiKsM5GqsKYDVCi%2Fwoul%2Bv4AepYr8%2B%2BSeP0lPpPlM4t5CV2EubOxSzi0zdKFicOTtbxP7KpmuAl3wJ3pHO4Zc2oxcl97vEK43lO7ncBsDiHRFxNR%2Fv7oTgHeUcYmya3dTR35q2lIpnuqeKx8EVbWkKRXljRVt2C6lQ12AcgMOutmjJTDzjIjLBjqkARYgUXadsXImrvoTI8%2FaLR7fIQ%2BwoGSVtuxxQMAqWnEvdfLXx9HTQStZ%2BKnxfrWAvoL7300Dtyj4XhlmfmYXFO9Dh0dT%2BRyGXGRA%2F1BRtvYJYlJ3Bi8gKcIjBw8ypk9yJHArMm3nV%2FB8UZxA7lRhzPPxPWTdmhB0QAijJWu%2FkomXJhZ48SRNXgSElZe5QCZKj6ytoUmYsm2iOhyxU%2FQ4tj198ii4&X-Amz-Signature=c953db5d4fc7b7331390239228e9204a55a364bc48107162a4e4a4f5702d21b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 2. 암호화하기

- 암호화할 파일 혹은 글을 선택한 후 `ctrl + P` (명령 팔레트) 에서 원하는 기능을 실행

    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/cf506488-6a2e-4632-a586-7b7e0817bb6b/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DJJIJ2K%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICoNse6hCmjt0ooshUg1Tl9od%2BKF5NgnM%2B0dmClZ%2FI6FAiEAzvQmCzk3Ey6yDh3CS2dO0GXe9Gc0c41fWPyS%2BbDinZkqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMaIu5b0oYwuxVlRLCrcA8WOfQbdrcwPznzWqSUsgicce1B%2BEX04o9sNvWYNN6ccWtF4JzIql9Lj%2FzgITD%2BEOQht7w1FgJb77cjp7zCc5MF1YiVFUF0QkKA%2FvHTa%2FjhJGT2mmRrNKv81JI5uJQ0HwtvKmzX%2BPhE1w3g1AfnZaQ5u0ExOAZ1JLFd6eA6b48U7D6U1Cm2zhISLy%2FdEX0pLTtOZhTZQ1qVXvjhjEESA8gUhOEjn2e84tvRsfU1DCbozFP%2FNdxRpO4BtE9IMNLa%2BdMuKZBNVBqadc22D4B1hv6X5Kr%2B8ESVFIjpPIXfsxsyS8orjK406yKpbelwtqZSSFB1mzbwHna%2FXtuNpNt34iO5%2FmbTHfTyvPb46f5aCUN4hbERAcGSbGrWQjb7P76PNDJiiGrQIN%2Bo80t2aDAqd6Isj9UmhskIEqMSBMRhc3Xoy1nhlyvYMe0s2HN87OhcXpjBL2Dgg%2BNUDA1fIjjTgBEkyEhA%2F96MPINlnut5SURj3PecqfvbTADBqy0tmUoXD2IZKy0D8rr13b7fktI7DCA5Ns3u4ZJTP4mhjYg2JPYC8t9UVfvQ4RwCpdxputC8jUryPLNwcHEQh11DTV8BU9p%2FVxgs7A3bgiVnqHnwvgOfhlNwY%2ByaPGh9WSJHeMPGNiMsGOqUB1YQ4JZyN0NtlQdWPjidvgRlLvpQPcPYFJxirijY8sYGxqaH3uzGToaJ3wWZ8llVQHZ2Wwct2avK%2FK9dG4THIcOJc56HKGI86iLm%2FNaZh7Wr6lKnWUoGMcT8boyEjKrewsvnuNPZeIAYiTTyWm4aC1rc1nqdVtlY3343a4%2B7vH6xN9nPLvTWqeanbW%2FOzYYq9AsYOG7drqz2q4zWQIw%2BcKSSQl2JS&X-Amz-Signature=a33af3ed68ce74639b6f417b097e609ed1bb15de2e148f017f16e932b6927590&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


---


## ➡️ Notion DB를 Obsidian에 연동하기


<aside data-icon="💡">

전체 흐름

- **Node.js 스크립트를 작성할 폴더 생성**
- **스크립트 파일 생성 및 작성**
- **의존성 설치 (****`npm install`****)**
- **환경변수 저장**
- **테스트 실행**
- **자동화 및 Obsidian Vault 연동**

</aside>


### 1. 폴더 구조 만들기


```plain text
📁 ObsidianVault/
├─ 📁 notion-sync/      ← 여기에 코드를 작성
│  ├─ sync-notion.js
│  ├─ .env
│  └─ package.json
└─ (기타 .md 파일들)
```


### 2. 코드 파일 작성


해당 폴더(`notion-sync/`)에서 다음 작업을 한다:


`sync-notion.js` 생성 후 아래 코드 작성 (노션 → md 변환용)


```javascript
import 'dotenv/config';
import { NotionToMarkdown } from 'notion-to-md';
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const databaseId = process.env.NOTION_LOG_DB_ID;
const outputDir = './notion-sync';

function sanitizeFileName(name) {
  return name.replace(/[\\\/:*?"<>|]/g, '');
}

function extractTags(property) {
  if (property?.multi_select) {
    return property.multi_select.map((tag) => `#${tag.name}`);
  } else if (property?.select) {
    return [`#${property.select.name}`];
  }
  return [];
}

async function sync() {
  const pages = await notion.databases.query({ database_id: databaseId });

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  for (const page of pages.results) {
    const titleProp = page.properties["title"];
    const title = titleProp?.title?.[0]?.plain_text || 'Untitled';
    const safeTitle = sanitizeFileName(title);

    // ✅ category와 type 속성에서 태그 추출
    const categoryTags = extractTags(page.properties["category"]);
    const typeTags = extractTags(page.properties["type"]);

    const allTags = [...categoryTags, ...typeTags].join(' ');

    // Markdown 변환
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const { parent } = n2m.toMarkdownString(mdBlocks);

    const markdownContent = parent || '';
    if (!markdownContent.trim()) {
      console.log(`⚠️ 내용이 비어 있어 건너뜀: ${safeTitle}`);
      continue;
    }

    const finalContent = allTags ? `${allTags}\n\n${markdownContent}` : markdownContent;
    fs.writeFileSync(path.join(outputDir, `${safeTitle}.md`), finalContent);
  }
}

sync();
```


### 3. npm 의존성 설치

- `npm`설치 전에 [node.js ](https://nodejs.org/ko)가 설치되어야한다.
- `notion-sync`  폴더에서 마우스 우클릭 → 터미널에서 열기 → 아래의 코드 실행

    ```bash
    npm init -y
    npm install @notionhq/client notion-to-md dotenv
    ```


    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/569dac0d-0504-41a1-b6cd-422033d172a3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LSVFVUP%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH%2B8q0D05GNtRWU43ffW%2FWGnn3TicG7ShY7M1tAX1bL8AiEAynhZrgAcZ%2BalMQzEUvGgyajq1a9hNiT%2BjU1Nuapu1ikqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKCVp6%2FS3avdtG2%2FSCrcA6tbki%2FczV8OA%2By3zf%2FTQ5GMCMyetTQlBRouQ58slpszhneEptV4etdUz6w2DCXyfmRUo01iPBey6%2Fp35gAQapuASw0LGTb223f%2FKcU6LSUFKXOrE9Mz%2Fk6uoTJRqv%2FD3EPiGK8LZQI4oCmj%2Ftlo1rMoTsfUnU2k905GeobdAbyRYIA1Qn%2B%2B3djIsiJDgD6%2B6awS1gsTJfOqsVQlGB%2FBQyrMJVsxjgsjnKRKP2snMMWDwJLwwufI1hX3nwPPWmzXhxVD%2Bo3yKzqak0lf%2BGc5VQX7L406YRD%2FPpd7zMb%2FUD%2Faw%2B3JIymozNl9%2FXiDg9rHtCSpN5PrzIKaPj4wrkloboy3aMDII36FqsRWVT1K2zOLOLmkT4sIWLkKv5PN5oQJAUrpjPd7k7GC9KOOIa0c9O0u6uD5CmoGmIHC8qvtCi34nAH9%2B19rOCM%2BFxpZVTIYuj%2FvJxtIaadmlpJm1zwy4TVfXIzhG5GdBGWVtmQnMDumx9NXb5NOaiStRQw1Ibx1tfUNC9WARhbgx0y62rpFwCatWstNXdYu%2FKjtwRex1dZ18WuiSngb71yc%2FJxj2C5S6jvbvQXMQUYOUKBIEVGa5ID9wISgdjhHB9%2BQmF4iIJWY1SBaoagD9MGCHUduMKqNiMsGOqUBeXxwGK8EIfhuGUZ2DKHDcgXrDQIHoEMZtgOzuhH5jGN4UVxG2KCKGy1zLyorgAzSy7XFrNwWNLJDgpz4FvMHNemsC5MHYm5HUDIzxuq0vqPxJ54E3uB2J4OuT3kK28Z4ldt%2BMiVyLt6BGIuFBymEhPGUbbTG04sqW1AQLS58GOXZlcF8zR2iskUJ3yDUQcfG3Bz4uuJUoqPGZcq5D0%2FVSenunBSv&X-Amz-Signature=ef147401335e08486ff1e5db62faf460194f196936c8e55b2446b82cd4dac347&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `notion-sync` 폴더에 `package.json` 과 `node_modules/`폴더가 생기면 성공.

**⚠️ Node.js가 ES Module에서 작동할 수 있도록** **`package.json`** **수정하기**


```json
{
  "name": "notion-sync",
  "version": "1.0.0",

  
"type": "module",      ← 이 줄 추가하기!


  "description": "",
  "main": "sync-notion.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@notionhq/client": "^3.1.3",
    "dotenv": "^16.5.0",
    "notion-to-md": "^3.1.9"
  }
}
```


### 4. .env 파일 만들기


VS Code에서 `notion-sync` 폴더 내에 `.env` 파일을 만든다:


```bash
NOTION_TOKEN=your_secret_token
NOTION_DB_ID=your_database_id
```

> 노션 DB 공유 설정에서 Integration을 초대해줘야 DB 접근이 가능합니다.

[Notion API 활용하기](https://www.notion.so/215a784e4dc28011a455cfaf1d2a0504) 에서 Notion API 토큰과 DB ID 발급 받는 법을 확인할 수 있습니다.


### 5. 실행


 `notion-sync` 폴더의 터미널에서 아래처럼 입력:


```bash
node sync-notion.js
```

- 성공 하면 아래 `notion-sync` 폴더에 노션 내용이 불러와진다.

    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/5a2165be-18cf-4fc6-95c9-98740e31c6c2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YXH2LPJ%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNU2HeaWx5khvUmqouWAckgvTAdJ1%2FIUE2OQFi5YBeoAIhAJSAdMQkVouBrjqYVXPbi4DaC%2F013hc%2BO31U1PnD5BztKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyGclssGOQ6n6cO%2Bxcq3AMYuQe0bejeKT5vaSLFFK8Lbb0RlrjTxbWzi3JoiNN1sCvrBT0iKaNW9kCNs9jnxB9C4A546Pn3hidyZQZvw4idiYUvCfaGMvCHM3SSkwymsvsD%2BtKoU2JzTOa0HPIWkk5sgvk1IiVsnwZVJkecz9W4hmX9X5D50nNzckHLu%2BMV3Nyc2rgOi0FHbTclJMNOIJIMWNoCzGqoGRxY2vLJQ4lCdVxU4j1gNxnxs34vlw9IgK8%2BeMVC0T63O%2B6QDyTftAeOJLIuCqF8SyYiMYZTAvKUng4%2FEgXcihaFUB4yIfcH54nxeBt5Z9zYOLFME7zrQpMjJtqHpNOiOlfqS3wL48pQYl59ZLc5np%2BYrxGo90O1fnccC9LzPiYxqeT63%2Ft3q2ZRUpa1kXStT3X70Jv0dRWhUJNZ15JDLzDjiMn5pa5AtS1fdH0%2BzT5f0dTKFIg8ntYfbYHOkWAq6h3dzptRgvOZBjmZsH%2FIIcOQYV7go7AmPtXhOPILBvVVkyTTAYjOptyrZUIy%2BfkClvQSfoybJVIk1IlwFQr9dDOVu727suus6IVJ%2F8h6JIiaVlhJk88kmd6nOH66VCQJhNHxpOb798H%2BMM%2BlnaFMGfD6sKSSiR23fQ9pOHh6yN5mEJxnLzD3jIjLBjqkAR%2B12FMW0j8klUrxVp5tAc7TZPp7tC06YDDXGidUZ0Hc44s0dEF46EGDB4YJtFk3GYTj3%2F47M%2BsCsQeBzLYQ1HaSZ6Ikiw%2FVr6VxFAEt69LPZId9ya5Te0cn9si5xh7%2F2soVe0t8fj6sOKhjT%2F3PxtOWm9DvSGByI8%2FoCvj72tF8uZCet7fQaJRqV%2F%2BW2BzRUvkg5Ih55EFBX5WpLxNkqmtJ7rYx&X-Amz-Signature=6081155b6184cf9e876830cb4d1a70c7459b920a3158ba6eaaf4fb8ae0c36ff6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/47fd6131-f3b4-40b1-9d4c-97c4239c5a3c/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YXH2LPJ%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T081930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNU2HeaWx5khvUmqouWAckgvTAdJ1%2FIUE2OQFi5YBeoAIhAJSAdMQkVouBrjqYVXPbi4DaC%2F013hc%2BO31U1PnD5BztKogECLn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyGclssGOQ6n6cO%2Bxcq3AMYuQe0bejeKT5vaSLFFK8Lbb0RlrjTxbWzi3JoiNN1sCvrBT0iKaNW9kCNs9jnxB9C4A546Pn3hidyZQZvw4idiYUvCfaGMvCHM3SSkwymsvsD%2BtKoU2JzTOa0HPIWkk5sgvk1IiVsnwZVJkecz9W4hmX9X5D50nNzckHLu%2BMV3Nyc2rgOi0FHbTclJMNOIJIMWNoCzGqoGRxY2vLJQ4lCdVxU4j1gNxnxs34vlw9IgK8%2BeMVC0T63O%2B6QDyTftAeOJLIuCqF8SyYiMYZTAvKUng4%2FEgXcihaFUB4yIfcH54nxeBt5Z9zYOLFME7zrQpMjJtqHpNOiOlfqS3wL48pQYl59ZLc5np%2BYrxGo90O1fnccC9LzPiYxqeT63%2Ft3q2ZRUpa1kXStT3X70Jv0dRWhUJNZ15JDLzDjiMn5pa5AtS1fdH0%2BzT5f0dTKFIg8ntYfbYHOkWAq6h3dzptRgvOZBjmZsH%2FIIcOQYV7go7AmPtXhOPILBvVVkyTTAYjOptyrZUIy%2BfkClvQSfoybJVIk1IlwFQr9dDOVu727suus6IVJ%2F8h6JIiaVlhJk88kmd6nOH66VCQJhNHxpOb798H%2BMM%2BlnaFMGfD6sKSSiR23fQ9pOHh6yN5mEJxnLzD3jIjLBjqkAR%2B12FMW0j8klUrxVp5tAc7TZPp7tC06YDDXGidUZ0Hc44s0dEF46EGDB4YJtFk3GYTj3%2F47M%2BsCsQeBzLYQ1HaSZ6Ikiw%2FVr6VxFAEt69LPZId9ya5Te0cn9si5xh7%2F2soVe0t8fj6sOKhjT%2F3PxtOWm9DvSGByI8%2FoCvj72tF8uZCet7fQaJRqV%2F%2BW2BzRUvkg5Ih55EFBX5WpLxNkqmtJ7rYx&X-Amz-Signature=d94b9aed4e81a22e8a468fae12d27c9d3d89471fb4785af31fba137b47f52f8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


---


## 🔁 Notion DB → Obsidian 자동화 


### **🪟 Windows 자동화**

1. **시작 메뉴 → "작업 스케줄러" 실행**
2. 오른쪽 메뉴에서 "**작업 만들기**" 클릭
3. 이름: `Notion Sync`
4. **트리거 탭 → 새로 만들기**
    - 매일 / 매 30분 등 설정
5. **동작 탭 → 새로 만들기**
    - **프로그램/스크립트**:

        ```plain text
        C:\Program Files\nodejs\node.exe
        ```

    - **인수 추가**:

        ```plain text
        sync-notion.js
        ```

    - **시작 위치**:

        ```plain text
        D:\ObsidianVault\notion-sync
        ```

6. 확인 후 저장 → 완료

**💡 실행 테스트**

- "작업 스케줄러"에서 해당 작업 → 마우스 우클릭 → "**실행**" 눌러서 잘 되는지 확인

---


### **🍎 Mac 자동화:** **`crontab`** **사용**

1. 터미널에서 아래 명령으로 Node.js 경로 확인:

```shell
which node
```


→ 결과 예: `/usr/local/bin/node`

1. crontab에 등록
    - 터미널에서 crontab 열기:

        ```shell
        crontab -e
        ```

    - 맨 아래에 아래 내용 추가 (예: 30분마다 실행):

        ```shell
        */30 * * * * cd ~/Google\ Drive/ObsidianVault/notion-sync && /usr/local/bin/node sync-notion.js >> sync.log 2>&1
        ```

        > >> sync.log 2>&1는 로그를 sync.log에 저장함
    - 저장 후 `:wq` (vi 에디터 기준) → 적용 완료
