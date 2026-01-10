import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function debugBlocks() {
  const pageId = '197a784e-4dc2-80e1-bd07-ff0fbefcb2d6'; // reactnextjs-시작하기

  const { results } = await notion.blocks.children.list({
    block_id: pageId,
  });

  console.log('\n=== 블록 구조 ===\n');

  for (const block of results) {
    const blockData = block as any;
    console.log(`Type: ${blockData.type}`);
    console.log(`ID: ${blockData.id}`);
    console.log(`Has children: ${blockData.has_children}`);

    if (blockData[blockData.type]?.rich_text) {
      const text = blockData[blockData.type].rich_text
        .map((rt: any) => rt.plain_text)
        .join('');
      console.log(`Text: ${text.substring(0, 50)}...`);
    }

    // "컴포넌트" 섹션 찾기
    if (blockData.type === 'heading_3' && blockData[blockData.type]?.rich_text) {
      const heading = blockData[blockData.type].rich_text[0]?.plain_text;
      if (heading === '컴포넌트') {
        console.log('\n=== 컴포넌트 섹션의 children ===\n');

        // 다음 블록들 확인
        const idx = results.indexOf(block);
        for (let i = idx + 1; i < Math.min(idx + 10, results.length); i++) {
          const nextBlock = results[i] as any;
          console.log(`\nType: ${nextBlock.type}`);
          console.log(`Has children: ${nextBlock.has_children}`);

          if (nextBlock[nextBlock.type]?.rich_text) {
            const text = nextBlock[nextBlock.type].rich_text
              .map((rt: any) => rt.plain_text)
              .join('');
            console.log(`Text: ${text}`);
          }

          // children이 있으면 가져오기
          if (nextBlock.has_children) {
            const { results: children } = await notion.blocks.children.list({
              block_id: nextBlock.id,
            });
            console.log('Children:');
            for (const child of children) {
              const childData = child as any;
              console.log(`  - Type: ${childData.type}`);
              if (childData[childData.type]?.rich_text) {
                const text = childData[childData.type].rich_text
                  .map((rt: any) => rt.plain_text)
                  .join('');
                console.log(`    Text: ${text.substring(0, 80)}...`);
              }
            }
          }
        }
        break;
      }
    }

    console.log('---\n');
  }
}

debugBlocks();
