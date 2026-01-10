const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const notionDirectory = path.join(postsDirectory, 'notion');

function getPosts() {
  const posts = [];

  try {
    if (fs.existsSync(notionDirectory)) {
      console.log('✓ Notion directory exists:', notionDirectory);
      const notionFiles = fs.readdirSync(notionDirectory);
      console.log('✓ Found files:', notionFiles.length);

      notionFiles
        .filter(fileName => fileName.endsWith('.md'))
        .forEach(fileName => {
          const slug = fileName.replace(/\.md$/, '');
          console.log('  - Processing:', fileName, '-> slug:', slug);
          const fullPath = path.join(notionDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          posts.push({
            slug,
            title: data.title || slug,
            date: data.date || '',
            description: data.description,
            tags: data.tags,
          });
        });
    } else {
      console.log('✗ Notion directory does NOT exist:', notionDirectory);
    }
  } catch (error) {
    console.error('✗ Error reading posts:', error);
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

const posts = getPosts();
console.log('\n=== POSTS ===');
console.log('Total posts:', posts.length);
console.log('\nFirst 3 posts:');
posts.slice(0, 3).forEach(post => {
  console.log(`  - ${post.slug} (${post.date})`);
});

console.log('\n=== STATIC PARAMS ===');
const params = posts.map(post => ({ slug: post.slug }));
console.log('Total params:', params.length);
console.log('\nFirst 3 params:');
params.slice(0, 3).forEach(p => {
  console.log(`  - { slug: "${p.slug}" }`);
});
