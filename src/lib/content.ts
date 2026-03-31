
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

export interface GrowthLog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface Essay {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface AiNews {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  source?: string;
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  location?: string;
  excerpt: string;
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'src/content');

// Helper function to get all content of a specific type
function getAllContent<T>(
  directoryName: string,
  mapFn: (fileName: string, metadata: any, content: string, slug: string) => T
): T[] {
  const dir = path.join(contentDirectory, directoryName);
  
  if (!fs.existsSync(dir)) {
    return [];
  }

  const fileNames = fs.readdirSync(dir);
  const items = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { metadata, content } = parseContent(fileContents);
      return mapFn(fileName, metadata, content, slug);
    });

  return items.sort((a, b) => {
    // @ts-ignore
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Helper function to get a single content item by slug
function getContentBySlug<T>(
  directoryName: string,
  mapFn: (fileName: string, metadata: any, content: string, slug: string) => T
): (slug: string) => T | null {
  return (slug: string) => {
    const dir = path.join(contentDirectory, directoryName);
    // Check both .md and .mdx
    for (const ext of ['.md', '.mdx']) {
      const fullPath = path.join(dir, slug + ext);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { metadata, content } = parseContent(fileContents);
        return mapFn(slug + ext, metadata, content, slug);
      }
    }
    return null;
  };
}

export function getAllPosts(): Post[] {
  return getAllContent<Post>('posts', (_, metadata, content, slug) => ({
    slug,
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    excerpt: metadata.excerpt || content.slice(0, 200) + '...',
    content,
    category: metadata.category,
    readTime: metadata.readTime,
  }));
}

export function getAllDiaryEntries(): DiaryEntry[] {
  return getAllContent<DiaryEntry>('diary', (_, metadata, content, slug) => ({
    slug,
    date: metadata.date || slug,
    title: metadata.title || '日记',
    content,
    emoji: metadata.emoji,
  }));
}

export function getAllGrowthLogs(): GrowthLog[] {
  return getAllContent<GrowthLog>('growth', (_, metadata, content, slug) => ({
    slug,
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    excerpt: metadata.excerpt || content.slice(0, 200) + '...',
    content,
  }));
}

export function getAllEssays(): Essay[] {
  return getAllContent<Essay>('essays', (_, metadata, content, slug) => ({
    slug,
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    excerpt: metadata.excerpt || content.slice(0, 200) + '...',
    content,
  }));
}

export function getAllAiNews(): AiNews[] {
  return getAllContent<AiNews>('ai-news', (_, metadata, content, slug) => ({
    slug,
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    excerpt: metadata.excerpt || content.slice(0, 200) + '...',
    content,
    source: metadata.source,
  }));
}

export function getAllEvents(): Event[] {
  return getAllContent<Event>('events', (_, metadata, content, slug) => ({
    slug,
    title: metadata.title || slug,
    date: metadata.date || new Date().toISOString().split('T')[0],
    location: metadata.location,
    excerpt: metadata.excerpt || content.slice(0, 200) + '...',
    content,
  }));
}

export const getGrowthLogBySlug = getContentBySlug<GrowthLog>('growth', (_, metadata, content, slug) => ({
  slug,
  title: metadata.title || slug,
  date: metadata.date || new Date().toISOString().split('T')[0],
  excerpt: metadata.excerpt || content.slice(0, 200) + '...',
  content,
}));

export const getEssayBySlug = getContentBySlug<Essay>('essays', (_, metadata, content, slug) => ({
  slug,
  title: metadata.title || slug,
  date: metadata.date || new Date().toISOString().split('T')[0],
  excerpt: metadata.excerpt || content.slice(0, 200) + '...',
  content,
}));

function parseContent(content: string): { metadata: any; content: string } {
  const metadata: any = {};
  let contentStart = 0;
  
  // Trim leading whitespace first and find where the actual content starts
  const leadingWhitespaceLength = content.length - content.trimStart().length;
  const trimmedContent = content.slice(leadingWhitespaceLength);

  // 简单的 YAML front matter 解析
  if (trimmedContent.startsWith('---')) {
    const endIndexInTrimmed = trimmedContent.indexOf('---', 3);
    if (endIndexInTrimmed !== -1) {
      const frontMatter = trimmedContent.slice(3, endIndexInTrimmed);
      contentStart = leadingWhitespaceLength + endIndexInTrimmed + 3;
      
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
