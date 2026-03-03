import { getAllBlogs, getBlogBySlug } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const categoryColors: Record<string, { bg: string; text: string }> = {
  Technical: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Cloud: { bg: 'bg-sky-100', text: 'text-sky-700' },
  Architecture: { bg: 'bg-purple-100', text: 'text-purple-700' },
  DevOps: { bg: 'bg-green-100', text: 'text-green-700' },
};

const categoryGradients: Record<string, string> = {
  Technical: 'from-blue-400 to-blue-600',
  Cloud: 'from-sky-400 to-cyan-600',
  Architecture: 'from-purple-400 to-purple-600',
  DevOps: 'from-green-400 to-emerald-600',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) return {};
  return {
    title: `${blog.title} | Ramesh Kannan`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);
  if (!blog) notFound();

  const colors = categoryColors[blog.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' };
  const gradient = categoryGradients[blog.category] ?? 'from-gray-400 to-gray-600';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{blog.title}</span>
        </nav>

        {/* Cover Image */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-md">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
          )}
        </div>

        {/* Category + Date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {blog.category}
          </span>
          <span className="text-sm text-gray-500">{formatDate(blog.date)}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          {blog.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-200">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            RK
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{blog.author}</p>
            <p className="text-xs text-gray-500">Senior .NET Full Stack Developer</p>
          </div>
        </div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="blog-content leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content ?? '' }}
        />

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span>&larr;</span> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
