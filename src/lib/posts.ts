import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const notionDirectory = path.join(postsDirectory, 'notion');
const manualDirectory = path.join(postsDirectory, 'manual');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  content: string;
}

export function getPosts(): Post[] {
  const posts: Post[] = [];

  // Notion 폴더에서 읽기
  if (fs.existsSync(notionDirectory)) {
    const notionFiles = fs.readdirSync(notionDirectory);
    notionFiles
      .filter(fileName => fileName.endsWith('.md'))
      .forEach(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(notionDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        posts.push({
          slug,
          title: data.title || slug,
          date: data.date || '',
          description: data.description,
          tags: data.tags,
          content,
        });
      });
  }

  // Manual 폴더에서 읽기
  if (fs.existsSync(manualDirectory)) {
    const manualFiles = fs.readdirSync(manualDirectory);
    manualFiles
      .filter(fileName => fileName.endsWith('.md'))
      .forEach(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(manualDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        posts.push({
          slug,
          title: data.title || slug,
          date: data.date || '',
          description: data.description,
          tags: data.tags,
          content,
        });
      });
  }

  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): Post | null {
  // Notion 폴더에서 먼저 찾기
  const notionPath = path.join(notionDirectory, `${slug}.md`);
  if (fs.existsSync(notionPath)) {
    try {
      const fileContents = fs.readFileSync(notionPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description,
        tags: data.tags,
        content,
      };
    } catch (error) {
      // 에러 발생 시 manual 폴더도 확인
    }
  }

  // Manual 폴더에서 찾기
  const manualPath = path.join(manualDirectory, `${slug}.md`);
  if (fs.existsSync(manualPath)) {
    try {
      const fileContents = fs.readFileSync(manualPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description,
        tags: data.tags,
        content,
      };
    } catch (error) {
      return null;
    }
  }

  return null;
}
