import Link from 'next/link';
import { Blog } from '@/lib/blog';

const categoryColors: Record<string, { bg: string; text: string }> = {
  Technical: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Cloud: { bg: 'bg-sky-100', text: 'text-sky-700' },
  Architecture: { bg: 'bg-purple-100', text: 'text-purple-700' },
  DevOps: { bg: 'bg-green-100', text: 'text-green-700' },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const colors = categoryColors[blog.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };

  return (
    <article className="py-6 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
          {blog.category}
        </span>
        <span className="text-xs text-gray-400">{formatDate(blog.date)}</span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug hover:text-blue-700 transition-colors">
        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{blog.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{blog.author}</span>
        <Link
          href={`/blog/${blog.slug}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          Read More <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
