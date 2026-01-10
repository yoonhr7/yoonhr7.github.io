import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import matter from 'gray-matter';

// .env.local 파일 로드
dotenv.config({ path: '.env.local' });

// 환경 변수 체크
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('   .env.local 파일을 확인해주세요.');
  console.error('   필요한 변수: NOTION_API_KEY, NOTION_DATABASE_ID');
  process.exit(1);
}

// Database ID 포맷팅 (하이픈 추가)
function formatDatabaseId(id: string): string {
  const cleanId = id.replace(/-/g, '');
  if (cleanId.length !== 32) {
    throw new Error(`Invalid database ID length: ${cleanId.length}`);
  }
  return `${cleanId.slice(0, 8)}-${cleanId.slice(8, 12)}-${cleanId.slice(12, 16)}-${cleanId.slice(16, 20)}-${cleanId.slice(20)}`;
}

// Notion 클라이언트 초기화
const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Callout 블록을 aside HTML 태그로 변환
n2m.setCustomTransformer('callout', async (block) => {
  const calloutBlock = block as any;
  if (!calloutBlock.callout) return '';

  const icon = calloutBlock.callout.icon?.emoji || '💡';

  // rich_text를 일반 텍스트로 변환
  const richTextArray = calloutBlock.callout.rich_text || [];
  let textContent = richTextArray.map((rt: any) => rt.plain_text || '').join('');

  // children 블록을 Notion API로 가져오기
  if (calloutBlock.has_children || calloutBlock.callout.children) {
    try {
      // block children을 API로 fetch
      const { results: children } = await notion.blocks.children.list({
        block_id: calloutBlock.id,
      });

      if (children && children.length > 0) {
        // children 블록들을 마크다운으로 변환
        const childrenMd = await n2m.blocksToMarkdown(children);
        const childrenContent = n2m.toMarkdownString(childrenMd).parent || '';

        if (childrenContent.trim()) {
          textContent = textContent ? textContent + '\n\n' + childrenContent : childrenContent;
        }
      }
    } catch (error) {
      console.error(`Callout children fetch error for block ${calloutBlock.id}:`, error);
    }
  }

  // aside HTML 태그로 반환 (ReactMarkdown에서 rehypeRaw로 처리됨)
  return `<aside data-icon="${icon}">\n\n${textContent.trim()}\n\n</aside>`;
});

// Paragraph 블록의 children을 평탄화 (들여쓰기 제거)
n2m.setCustomTransformer('paragraph', async (block) => {
  const paragraphBlock = block as any;
  if (!paragraphBlock.paragraph) return false; // 기본 변환 사용

  const richTextArray = paragraphBlock.paragraph.rich_text || [];
  let textContent = richTextArray.map((rt: any) => rt.plain_text || '').join('');

  // children이 있으면 평탄화
  if (paragraphBlock.has_children) {
    try {
      const { results: children } = await notion.blocks.children.list({
        block_id: paragraphBlock.id,
      });

      if (children && children.length > 0) {
        // children 블록들을 마크다운으로 변환
        const childrenMd = await n2m.blocksToMarkdown(children);
        const childrenContent = n2m.toMarkdownString(childrenMd).parent || '';

        // paragraph 텍스트 + 줄바꿈 2개 + children (같은 레벨로)
        return textContent + '\n\n' + childrenContent;
      }
    } catch (error) {
      console.error(`Paragraph children fetch error for block ${paragraphBlock.id}:`, error);
    }
  }

  // children이 없으면 기본 변환 사용
  return false;
});

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
    case 'created_time':
      return property.created_time?.split('T')[0] || '';
    case 'last_edited_time':
      return property.last_edited_time?.split('T')[0] || '';
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
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '') // 영문, 숫자, 한글, 공백, 하이픈 허용
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속된 하이픈을 하나로
    .replace(/^-|-$/g, '') // 앞뒤 하이픈 제거
    .trim();

  return `${datePrefix}-${slug}`;
}

// 기존 파일의 메타데이터 읽기
function getExistingFileMeta(filePath: string): { notionId?: string; lastEditedTime?: string } | null {
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      notionId: data.notionId,
      lastEditedTime: data.lastEditedTime,
    };
  } catch (error) {
    return null;
  }
}

async function syncFromNotion() {
  try {
    console.log('🔄 Notion에서 데이터를 가져오는 중...');

    // posts/notion 디렉토리 확인 및 생성
    if (!fs.existsSync(notionDirectory)) {
      fs.mkdirSync(notionDirectory, { recursive: true });
    }

    // 데이터베이스 쿼리
    const formattedDbId = formatDatabaseId(NOTION_DATABASE_ID!);
    const response = await notion.dataSources.query({
      data_source_id: formattedDbId,
      filter: {
        property: 'published', // published 체크박스가 true인 것만
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'created_time',
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

    // Notion에 있는 페이지 ID 목록
    const notionPageIds = new Set<string>();
    let newCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // 각 페이지 처리
    for (const page of response.results as NotionPage[]) {
      try {
        const { properties } = page;
        notionPageIds.add(page.id);

        // 속성 추출
        const title = getPropertyValue(properties.title);
        const date = getPropertyValue(properties.created_time);
        const description = getPropertyValue(properties.description);
        const tags = getPropertyValue(properties.type);

        if (!title) {
          console.log(`⚠️  제목이 없는 페이지를 건너뜁니다: ${page.id}`);
          continue;
        }

        // 파일명 생성
        const slug = generateSlug(title, date);
        const filePath = path.join(notionDirectory, `${slug}.md`);

        // 기존 파일 확인
        const existingMeta = getExistingFileMeta(filePath);

        // last_edited_time 비교하여 업데이트 여부 결정
        if (existingMeta?.notionId === page.id && existingMeta?.lastEditedTime === page.last_edited_time) {
          skippedCount++;
          continue; // 변경사항 없음, 스킵
        }

        // Markdown 변환 (신규 또는 수정된 것만)
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdBlocks);
        const content = mdString.parent || '';

        // Frontmatter 생성 (notionId, lastEditedTime 포함)
        const frontmatter = [
          '---',
          `title: "${title}"`,
          date ? `date: "${date}"` : `date: "${page.created_time.split('T')[0]}"`,
          description ? `description: "${description}"` : '',
          tags && tags.length > 0 ? `tags: ${JSON.stringify(tags)}` : '',
          `notionId: "${page.id}"`,
          `lastEditedTime: "${page.last_edited_time}"`,
          '---',
          '',
        ]
          .filter(Boolean)
          .join('\n');

        // 파일 저장
        const fileContent = frontmatter + content;
        fs.writeFileSync(filePath, fileContent, 'utf-8');

        if (existingMeta) {
          updatedCount++;
          console.log(`🔄 notion/${slug}.md 업데이트 완료`);
        } else {
          newCount++;
          console.log(`✅ notion/${slug}.md 새로 생성`);
        }
      } catch (error) {
        console.error(`❌ 페이지 처리 중 오류 (ID: ${page.id}):`, error);
        // 개별 페이지 오류는 건너뛰고 계속 진행
        continue;
      }
    }

    // 삭제된 파일 처리 (Notion에 없지만 로컬에 있는 파일)
    let deletedCount = 0;
    if (fs.existsSync(notionDirectory)) {
      const files = fs.readdirSync(notionDirectory);
      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const filePath = path.join(notionDirectory, file);
        const meta = getExistingFileMeta(filePath);

        // notionId가 있고, Notion에 없으면 삭제
        if (meta?.notionId && !notionPageIds.has(meta.notionId)) {
          fs.unlinkSync(filePath);
          deletedCount++;
          console.log(`🗑️  notion/${file} 삭제 완료 (Notion에서 삭제됨)`);
        }
      }
    }

    console.log('\n✨ 동기화 완료!');
    console.log(`   신규: ${newCount}개 | 업데이트: ${updatedCount}개 | 스킵: ${skippedCount}개 | 삭제: ${deletedCount}개`);
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
