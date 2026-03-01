'use client';

import { useState } from 'react';
import { Blog } from '@/lib/blog';
import BlogCard from './BlogCard';

const POSTS_PER_PAGE = 10;

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  function getPages(): (number | '...')[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  const pages = getPages();

  function handlePageChange(page: number) {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav className="flex justify-center items-center gap-1 mt-12" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        aria-label="Previous page"
      >
        &larr;
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400 text-sm">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        aria-label="Next page"
      >
        &rarr;
      </button>
    </nav>
  );
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginated = blogs.slice(start, start + POSTS_PER_PAGE);

  return (
    <div>
      <div className="flex flex-col">
        {paginated.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
