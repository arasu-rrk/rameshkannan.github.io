import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

function addHeadingAnchors(html: string): string {
  return html.replace(/<h([2-6])>(.*?)<\/h\1>/gi, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    const anchor = `<a class="heading-anchor" href="#${id}" aria-label="Link to this section"></a>`;
    return `<h${level} id="${id}">${inner}${anchor}</h${level}>`;
  });
}

export type Blog = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  tags: string[];
  content?: string;
};

function fileNameToSlug(fileName: string): string {
  return fileName.replace(/\.md$/, '').replace(/^\d+-/, '');
}

export async function getAllBlogs(): Promise<Blog[]> {
  const fileNames = fs.readdirSync(blogsDirectory);
  const blogs = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileNameToSlug(fileName);
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        category: data.category as string,
        author: data.author as string,
        coverImage: data.coverImage as string,
        tags: (data.tags as string[]) ?? [],
      };
    });

  return blogs.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const fileNames = fs.readdirSync(blogsDirectory);
  const match = fileNames.find((name) => name.endsWith('.md') && fileNameToSlug(name) === slug);
  if (!match) throw new Error(`Blog not found: ${slug}`);
  const fullPath = path.join(blogsDirectory, match);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);
  const htmlContent = addHeadingAnchors(processedContent.toString());

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    category: data.category as string,
    author: data.author as string,
    coverImage: data.coverImage as string,
    tags: (data.tags as string[]) ?? [],
    content: htmlContent,
  };
}
