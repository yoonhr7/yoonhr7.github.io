"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CalloutProps {
  children?: React.ReactNode;
  "data-icon"?: string;
}

export default function Callout({ children, "data-icon": dataIcon }: CalloutProps) {
  const childArray = React.Children.toArray(children);
  let icon: React.ReactNode = <Lightbulb size={20} />;
  let content: React.ReactNode = childArray;

  // data-icon 속성이 있으면 우선 사용 (Notion에서 변환된 경우)
  if (dataIcon) {
    icon = dataIcon;

    // Notion에서 온 경우, children이 문자열이면 마크다운으로 파싱
    if (childArray.length === 1 && typeof childArray[0] === "string") {
      const markdownText = childArray[0];
      content = (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownText}
        </ReactMarkdown>
      );
    }
  } else {
    const firstChild = childArray[0];

    // 첫 번째 자식이 문자열이면 이모지 확인
    if (typeof firstChild === "string") {
      const trimmed = firstChild.trim();
      // 이모지만 있는지 확인 (이모지 1~3개 정도)
      const emojiOnlyMatch = trimmed.match(
        /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]{1,3}$/u
      );

      if (emojiOnlyMatch) {
        // 첫 번째 자식이 이모지만 있으면 아이콘으로 사용하고 제거
        icon = trimmed;
        content = childArray.slice(1);
      }
    }
    // 첫 번째 자식이 img 요소면 추출
    else if (React.isValidElement(firstChild) && firstChild.type === "img") {
      icon = firstChild;
      content = childArray.slice(1);
    }
  }

  return (
    <aside>
      <div>{icon}</div>
      <div>{content}</div>
    </aside>
  );
}
