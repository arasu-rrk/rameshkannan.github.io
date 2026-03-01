import { getAllBlogs } from '@/lib/blog';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog | Ramesh Kannan',
  description: 'Articles on .NET, cloud platforms, software architecture, and engineering best practices.',
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-500 text-lg">
            Thoughts on .NET, cloud platforms, software architecture, and engineering.
          </p>
          <div className="mt-4 h-1 w-16 bg-blue-600 rounded" />
        </div>

        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}
