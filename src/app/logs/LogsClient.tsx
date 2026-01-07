"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Asterisk, Dot } from "lucide-react";
import type { Post } from "@/lib/posts";

interface LogsClientProps {
  posts: Post[];
}

export default function LogsClient({ posts }: LogsClientProps) {
  // 모든 포스트에서 고유한 태그들을 추출
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  const [selectedTags, setSelectedTags] = useState<string[]>(allTags);

  // 선택된 태그로 필터링된 포스트 목록 (OR 조건)
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return []; // 선택된 태그가 없으면 빈 배열 반환
    }
    return posts.filter((post) =>
      selectedTags.some((selectedTag) => post.tags?.includes(selectedTag))
    );
  }, [posts, selectedTags]);

  // 태그 토글 핸들러
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 모든 태그 선택
  const selectAllTags = () => {
    setSelectedTags(allTags);
  };

  // 모든 태그 선택 해제
  const clearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="inner">
      <div className="page-copyright">
        <h3>
          The thinking behind better experiences.
          <br />
          Tracing questions, decisions, and the reasoning that shaped each
          experience.
        </h3>
        <h4>더 나은 경험을 만들기 위한 사고의 기록</h4>
        <p>
          문제를 분석하고, 질문과 판단을 거쳐 경험을 다듬어 온 과정을
          담았습니다.
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="filters">
          <div className="filter-btn">
            <div className="filter-tags">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${
                    selectedTags.includes(tag) ? "active" : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) ? (
                    <Asterisk className="filter-tag-icon" size={14} />
                  ) : (
                    <Dot className="filter-tag-icon" size={14} />
                  )}
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <button
                className="action-button"
                onClick={selectAllTags}
                disabled={selectedTags.length === allTags.length}
              >
                Select All
                <Asterisk className="filter-tag-icon" size={14} />
              </button>
              <button
                className="action-button"
                onClick={clearAllTags}
                disabled={selectedTags.length === 0}
              >
                Clear
                <Dot className="filter-tag-icon" size={14} />
              </button>
            </div>
          </div>
          <div className="filter-info">
            <p>
              전체 <strong>{posts.length}</strong>&nbsp;개 중&nbsp;
              <strong>
                {selectedTags.length > 0 ? filteredPosts.length : "0"}
              </strong>
              &nbsp;개의 글
            </p>
            <p>
              {posts.length > 0 &&
                filteredPosts.length === 0 &&
                "필터를 선택해주세요."}
            </p>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <p>아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="posts-list">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/logs/${post.slug}`}>
                <h4>{post.title}</h4>
                {post.description && (
                  <p className="post-description">{post.description}</p>
                )}
                <div className="post-list-bottom">
                  {post.tags && (
                    <div className="post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="post-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="post-date">{post.date}</p>
                </div>
              </Link>
              <div className="post-icon">
                <Asterisk size={20} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
