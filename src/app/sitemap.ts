import type { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/blog';

const siteUrl = 'https://rameshkannan.com';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs();

  return [
    {
      url: `${siteUrl}/`,
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      priority: 0.9,
    },
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.modifiedDate),
      priority: 0.7,
    })),
  ];
}
