import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const notionDirectory = path.join(postsDirectory, 'notion');

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
  try {
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
  } catch (error) {
    console.error('Error reading posts:', error);
  }

  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string): Post | null {
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
      return null;
    }
  }

  return null;
}
