import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { Root, RootContent } from 'hast';
import type { Options as SanitizeOptions } from 'rehype-sanitize';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

const blogSanitizeSchema: SanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []).filter(
        (attribute) => typeof attribute === 'string' || attribute[0] !== 'className',
      ),
      ['className', 'data-footnote-backref', 'heading-anchor'],
    ],
    span: [['className', /^hljs-/]],
  },
};

function textContent(node: RootContent): string {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return '';
  return node.children.map(textContent).join('');
}

function addHeadingAnchors() {
  return (tree: Root) => {
    function visit(nodes: RootContent[]) {
      for (const node of nodes) {
        if (node.type !== 'element') continue;

        if (/^h[2-6]$/.test(node.tagName)) {
          const id = textContent(node)
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          node.properties.id = id;
          node.children.push({
            type: 'element',
            tagName: 'a',
            properties: {
              className: ['heading-anchor'],
              href: `#user-content-${id}`,
              ariaLabel: 'Link to this section',
            },
            children: [],
          });
        }

        visit(node.children);
      }
    }

    visit(tree.children);
  };
}

export type Blog = {
  slug: string;
  title: string;
  date: string;
  displayModifiedDate?: string;
  modifiedDate: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  tags: string[];
  content?: string;
};

export function toIsoDateTime(date: string): string {
  return date.includes('T') ? date : `${date.slice(0, 10)}T00:00:00Z`;
}

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
        displayModifiedDate: typeof data.displayModifiedDate === 'string' && data.displayModifiedDate.trim()
          ? data.displayModifiedDate
          : undefined,
        modifiedDate: (data.modifiedDate as string) ?? (data.date as string),
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
    .use(remarkGfm)
    .use(remarkRehype)
    .use(addHeadingAnchors)
    .use(rehypeHighlight)
    .use(rehypeSanitize, blogSanitizeSchema)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    displayModifiedDate: typeof data.displayModifiedDate === 'string' && data.displayModifiedDate.trim()
      ? data.displayModifiedDate
      : undefined,
    modifiedDate: (data.modifiedDate as string) ?? (data.date as string),
    excerpt: data.excerpt as string,
    category: data.category as string,
    author: data.author as string,
    coverImage: data.coverImage as string,
    tags: (data.tags as string[]) ?? [],
    content: processedContent.toString(),
  };
}
