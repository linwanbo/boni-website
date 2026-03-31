import fs from 'fs';
import path from 'path';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
}

export interface DiaryEntry {
  slug: string;
  date: string;
  title: string;
  content: string;
  emoji?: string;
}

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 简单的解析，实际项目中可以使用 gray-matter
      const { metadata, content } = parseContent(fileContents);
      
      return {
        slug,
        title: metadata.title || slug,
        date: metadata.date || new Date().toISOString().split('T')[0],
        excerpt: metadata.excerpt || content.slice(0, 200) + '...',
        content,
        category: metadata.category,
        readTime: metadata.readTime,
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllDiaryEntries(): DiaryEntry[] {
  const diaryDirectory = path.join(contentDirectory, 'diary');
  
  if (!fs.existsSync(diaryDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(diaryDirectory);
  const entries = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(diaryDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { metadata, content } = parseContent(fileContents);
      
      return {
        slug,
        date: metadata.date || slug,
        title: metadata.title || '日记',
        content,
        emoji: metadata.emoji,
      };
    });

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function parseContent(content: string): { metadata: any; content: string } {
  const metadata: any = {};
  let contentStart = 0;

  // 简单的 YAML front matter 解析
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      const frontMatter = content.slice(3, endIndex);
      contentStart = endIndex + 3;
      
      frontMatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });
    }
  }

  return {
    metadata,
    content: content.slice(contentStart).trim(),
  };
}
