import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';

// 환경 변수 체크
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('   .env.local 파일을 확인해주세요.');
  console.error('   필요한 변수: NOTION_API_KEY, NOTION_DATABASE_ID');
  process.exit(1);
}

// Notion 클라이언트 초기화
const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const notionDirectory = path.join(process.cwd(), 'posts', 'notion');

interface NotionPage {
  id: string;
  properties: {
    [key: string]: any;
  };
  created_time: string;
  last_edited_time: string;
}

// 속성 값 추출 헬퍼 함수
function getPropertyValue(property: any): any {
  if (!property) return null;

  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text?.[0]?.plain_text || '';
    case 'date':
      return property.date?.start || '';
    case 'multi_select':
      return property.multi_select?.map((item: any) => item.name) || [];
    case 'select':
      return property.select?.name || '';
    case 'checkbox':
      return property.checkbox;
    default:
      return null;
  }
}

// 파일명으로 사용 가능한 slug 생성
function generateSlug(title: string, date: string): string {
  const datePrefix = date ? date : new Date().toISOString().split('T')[0];
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return `${datePrefix}-${slug}`;
}

async function syncFromNotion() {
  try {
    console.log('🔄 Notion에서 데이터를 가져오는 중...');

    // posts/notion 디렉토리 초기화 (Clean Sync)
    if (fs.existsSync(notionDirectory)) {
      console.log('🗑️  기존 Notion 파일 삭제 중...');
      const files = fs.readdirSync(notionDirectory);
      files.forEach(file => {
        if (file.endsWith('.md')) {
          fs.unlinkSync(path.join(notionDirectory, file));
        }
      });
    } else {
      fs.mkdirSync(notionDirectory, { recursive: true });
    }

    // 데이터베이스 쿼리
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Published', // Published 체크박스가 true인 것만
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    console.log(`📄 ${response.results.length}개의 게시물을 찾았습니다.`);

    if (response.results.length === 0) {
      console.log('⚠️  Published된 게시물이 없습니다.');
      console.log('   Notion 데이터베이스에서 Published 체크박스를 확인해주세요.');
      return;
    }

    // 각 페이지 처리
    for (const page of response.results as NotionPage[]) {
      try {
        const { properties } = page;

        // 속성 추출
        const title = getPropertyValue(properties.Title || properties.Name);
        const date = getPropertyValue(properties.Date);
        const description = getPropertyValue(properties.Description);
        const tags = getPropertyValue(properties.Tags);

        if (!title) {
          console.log(`⚠️  제목이 없는 페이지를 건너뜁니다: ${page.id}`);
          continue;
        }

        // Markdown 변환
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);
        const content = mdString.parent || '';

        // Frontmatter 생성
        const frontmatter = [
          '---',
          `title: "${title}"`,
          date ? `date: "${date}"` : `date: "${page.created_time.split('T')[0]}"`,
          description ? `description: "${description}"` : '',
          tags && tags.length > 0 ? `tags: ${JSON.stringify(tags)}` : '',
          '---',
          '',
        ]
          .filter(Boolean)
          .join('\n');

        // 파일 저장
        const slug = generateSlug(title, date);
        const filePath = path.join(notionDirectory, `${slug}.md`);
        const fileContent = frontmatter + content;

        fs.writeFileSync(filePath, fileContent, 'utf-8');
        console.log(`✅ notion/${slug}.md 저장 완료`);
      } catch (error) {
        console.error(`❌ 페이지 처리 중 오류 (ID: ${page.id}):`, error);
        // 개별 페이지 오류는 건너뛰고 계속 진행
        continue;
      }
    }

    console.log('\n✨ 동기화 완료!');
  } catch (error: any) {
    console.error('\n❌ Notion API 오류 발생:');

    if (error.code === 'unauthorized') {
      console.error('   → API 키가 올바르지 않거나 권한이 없습니다.');
      console.error('   → Integration이 데이터베이스에 연결되어 있는지 확인해주세요.');
    } else if (error.code === 'object_not_found') {
      console.error('   → 데이터베이스 ID가 올바르지 않습니다.');
      console.error('   → NOTION_DATABASE_ID를 확인해주세요.');
    } else {
      console.error('   →', error.message);
    }

    console.error('\n💡 posts/manual/*.md 파일은 영향받지 않습니다.');
    process.exit(1);
  }
}

// 스크립트 실행
syncFromNotion();
