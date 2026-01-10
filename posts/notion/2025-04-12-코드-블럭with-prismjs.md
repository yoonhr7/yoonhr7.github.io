---
title: "코드 블럭(with Prism.js)"
date: "2025-04-12"
tags: ["Vue","Library","css","JavaScript"]
notionId: "1d3a784e-4dc2-80dd-958e-f20f8125c206"
lastEditedTime: "2026-01-10T04:21:00.000Z"
---
### 1. npm 설치


```bash
npm install prismjs
```


### 2. Prism.js 적용

- block이 ‘code’일 때 아래의 코드 적용

    ```javascript
    const code = text.map((t) => t.plain_text).join("");
    const language = block.code.language || "plaintext";
    const grammar = Prism.languages[language] || Prism.languages.plaintext;
    const highlightedCode = Prism.highlight(code, grammar, language);
    ```

- 전체 코드

    ```javascript
    <script setup>
    import { h, onMounted } from "vue";
    import { computed } from "vue";
    
    import Prism from "prismjs";
    
    // Prism 스타일 import
    import "prismjs/themes/prism-tomorrow.css";
    
    // 필요한 언어만 선택 import (원하는 언어만 추가하면 돼)
    import "prismjs/components/prism-javascript";
    import "prismjs/components/prism-typescript";
    import "prismjs/components/prism-python";
    import "prismjs/components/prism-markup";
    import "prismjs/components/prism-css";
    import "prismjs/components/prism-json";
    import "prismjs/components/prism-markdown";
    import "prismjs/components/prism-bash";
    
    
    const props = defineProps({
      blocks: {
        type: Array,
        required: true,
      },
    });
    
    const renderRichText = (texts) =>
      texts.map((t) =>
        h(
          "span",
          {
            class: {
              "font-bold": t.annotations?.bold,
              italic: t.annotations?.italic,
              underline: t.annotations?.underline,
              "line-through": t.annotations?.strikethrough,
            },
            style: { color: t.annotations?.color !== "default" ? t.annotations?.color : "" },
          },
          t.plain_text
        )
      );
    
    const groupListBlocks = (blocks) => {
      const result = [];
      let i = 0;
    
      while (i < blocks.length) {
        const block = blocks[i];
    
        if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
          const listType = block.type === "bulleted_list_item" ? "ul" : "ol";
          const items = [];
    
          while (i < blocks.length && blocks[i].type === block.type) {
            items.push(blocks[i]);
            i++;
          }
    
          result.push({
            type: listType,
            items,
          });
        } else {
          result.push(block);
          i++;
        }
      }
    
      return result;
    };
    
    const renderBlock = (block) => {
      if (block.type === "ul" || block.type === "ol") {
        return h(
          block.type,
          { class: "ml-6 list-disc marker:text-gray-500 space-y-1" },
          block.items.map((item) =>
            h("li", { key: item.id }, renderRichText(item[item.type]?.rich_text || []))
          )
        );
      }
    
      const { type } = block;
      const text = block[type]?.rich_text || [];
    
      switch (type) {
        case "paragraph":
          return h("p", { class: "text-base leading-7" }, renderRichText(text));
    
        case "heading_1":
          return h("h1", { class: "text-3xl font-bold mt-6" }, renderRichText(text));
        case "heading_2":
          return h("h2", { class: "text-2xl font-semibold mt-5" }, renderRichText(text));
        case "heading_3":
          return h("h3", { class: "text-xl font-medium mt-4" }, renderRichText(text));
    
        case "quote":
          return h(
            "blockquote",
            { class: "border-l-4 pl-4 italic text-gray-600 my-4" },
            renderRichText(text)
          );
    
        case "callout":
          return h(
            "div",
            {
              class: "bg-yellow-100 p-4 rounded-md border border-yellow-300 flex items-start space-x-2",
            },
            [
              block.callout.icon?.emoji && h("span", null, block.callout.icon.emoji),
              h("div", null, renderRichText(text)),
            ]
          );
    
        case "image":
          const url = block.image?.external?.url || block.image?.file?.url;
          return h("img", {
            class: "rounded-lg shadow-md my-4",
            src: url,
            alt: "Notion Image",
          });
    
        case "to_do":
          return h("div", { class: "flex items-start space-x-2" }, [
            h("input", {
              type: "checkbox",
              checked: block.to_do.checked,
              disabled: true,
            }),
            h("span", null, renderRichText(text)),
          ]);
    
    
        case "code":
          const code = text.map((t) => t.plain_text).join("");
          const language = block.code.language || "plaintext";
          const grammar = Prism.languages[language] || Prism.languages.plaintext;
          const highlightedCode = Prism.highlight(code, grammar, language);
    
          return h(
            "pre",
            { class: `language-${language} rounded-md my-4 overflow-x-auto` },
            h("code", {
              class: `language-${language}`,
              innerHTML: highlightedCode,
            })
          );
    
    
        case "toggle":
          return h("details", { class: "my-3" }, [
            h("summary", { class: "cursor-pointer font-semibold" }, renderRichText(text)),
            ...(block.children?.map(renderBlock) || []),
          ]);
    
        case "divider":
          return h("hr", { class: "my-6 border-gray-300" });
    
        case "table":
          return h("table", { class: "table-auto border border-gray-300 w-full my-4" }, [
            h(
              "tbody",
              {},
              block.children?.map((row) =>
                h(
                  "tr",
                  { class: "border-b border-gray-200" },
                  row.table_row.cells.map((cell) =>
                    h("td", { class: "px-4 py-2 border-r border-gray-200" }, renderRichText(cell))
                  )
                )
              )
            ),
          ]);
        case "bookmark":
          return h(
            "a",
            {
              href: block.bookmark.url,
              target: "_blank",
              class: "block p-4 border rounded-lg hover:bg-gray-50 transition my-4",
            },
            [h("div", { class: "text-blue-600 underline" }, block.bookmark.url)]
          );
    
        default:
          return h("div", { class: "text-gray-400 text-sm italic" }, `Unsupported block: ${type}`);
      }
    };
    
    const renderedBlocks = computed(() => groupListBlocks(props.blocks).map(renderBlock));
    </script>
    ```


```css
/* Prism 스타일 추가로 덮어쓰기 */
pre[class*="language-"] {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #2d2d2d;
  color: white;
}
```


### 3. 테마


```javascript
// Prism 스타일 import


import "prismjs/themes/prism-tomorrow.css";
```


| 테마 이름           | CDN URL                    |
| --------------- | -------------------------- |
| Prism Default   | `prism.css`                |
| Dark            | `prism-dark.css`           |
| Coy             | `prism-coy.css`            |
| Solarized Light | `prism-solarizedlight.css` |
| Tomorrow Night  | `prism-tomorrow.css`       |
| Okaidia         | `prism-okaidia.css`        |
| Twilight        | `prism-twilight.css`       |
| Funky           | `prism-funky.css`          |


### 4. 결과

- 코드블럭이 예쁘게 잘 출력됨

    ![%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-04-13_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.24.49.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/65a7a4f3-5212-474e-9cb7-2dc73b477f61/2956ba4f-d7ba-4bb0-8d26-5af967508cbf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2025-04-13_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.24.49.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X4IRITC%2F20260110%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260110T082010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcfCFibpHW43lYZdF9EghWY%2BUSY4btQaxd6v7rzF7FiAIgSZF8iR%2B32zyBjqLMdzyaoOoYPvEsvRKLZyIaLPVWBTIqiAQIuf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDABVQ%2BxIZxbcbRRHcCrcA3P2IvY7j30AWNY1wj04jDhNLXTfXseclhetKMaP5Yyd2nPS8UzBvqZljdDqCHAIgA3Tp9KU6g34TNKnejvNxlnchowFQQyYy556HzvvJMHR%2B69vt%2FU8YycBhoOCDDyYY9WqsoVg%2F%2FguKdRwsgxyWl4r0SXuUUFT250W0etXqlQbjFxO78kflaSTulOxJOMFCCHrYamFADIsi11ULZQy3RSxOZDw%2B2O8HvQ9jKbpPasTMKw%2FqHaqNUb8BJawIPGNhOzQNgSNUh0F2iuC9OcnYGEESe9mzQSKIvpONYuDmzxS%2BQ1uc6%2BfXLOyLcYMpbNS%2FL8C307%2FmTtAMMVsVdOyiwuERe%2F1hTKwyjbvjeiGxm6IUi21wvXLg%2F66Fxc5bMx9pIY3cwra6PxRrgOiZHP3iLzUELGQx%2B4pTn7mvZU4FVTTB9RNWNVT8VcREH763VNjQLtOmGtzJI95qDKJt5JKVo5VBnfI2A11LDY9tcbH7D7Yj1z9oM0YSxj6Jiy4dzks8RvQBC68wGU7e8kULnhNRfugG9yDs%2FgOkwqbA0AC1chVuVB3nalvTBjH2vyDwMEAvLW%2BglkeOYTrV2QBR8VigD9vLB9HEnx3hAgtne%2FQBKOULi3KbCF0tP0gdP9kMJuNiMsGOqUBtj0%2FV6%2Bte9JfgPBRrdzVZjfLpFDRNUdHcPm7LACaCvp2qaSpiaRigUSmyjJWB6I%2BvaFTYPobCM%2B4%2FmxDONoc59UfHhS2uPn%2BO7WF%2Bpk8Eigkcw3Huj70exAyxkqgouVv5%2FsVjB9dzaQyUti0ONfmIPmgdwZeGbb3Hlym8Df5rwDCazQJ8gEF3to%2FJAoF7WXn7014kyYfAVjlFxgfIEc7jsiCh2k4&X-Amz-Signature=98099a4982ce16700e1e703937c1857846c30e4f99c30f33d0584ccafbd051b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


---


## 주요 테마 목록


### 🌙 **다크 테마**

- `vscDarkPlus` - VS Code Dark+ (원래 사용하던 것)
- `oneDark` - Atom One Dark
- `dracula` - Dracula
- `atomDark` - Atom Dark
- `materialDark` - Material Dark
- `nightOwl` - Night Owl
- `nord` - Nord
- `okaidia` - Okaidia
- `synthwave84` - Synthwave '84
- `tomorrow` - Tomorrow Night

### ☀️ **라이트 테마**

- `oneLight` - Atom One Light (현재 사용 중)
- `materialLight` - Material Light
- `gruvboxLight` - Gruvbox Light
- `vs` - Visual Studio
- `coy` - Coy
- `prism` - Prism Default

### 🎨 **기타 특별 테마**

- `shadesOfPurple` - Shades of Purple
- `holiTheme` - Holi Theme
- `duotoneDark/Light` - Duotone 시리즈

## 사용 방법


CodeBlock.tsx에서 import만 바꾸면 됨:


```javascript
// 예시
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// 그리고 style prop에 적용
<SyntaxHighlighter style={dracula} ... />
```

