"use client";

import Link from "next/link";
import { CircularLoader } from "@/components";
import { useGetPosts } from "@/hooks";

export default function BlogsPage() {
  const { data: posts, isLoading, error } = useGetPosts();
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Posts from JSONPlaceholder API
          </p>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <CircularLoader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 dark:text-red-400">
              Error loading posts: {error.message}
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts && (
          <div className="grid gap-8">
            {posts.slice(0, 10).map((post) => (
              <article
                key={post.id}
                className="group border border-black/[.08] dark:border-white/[.145] rounded-lg p-6 hover:bg-[#f9f9f9] dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <Link href={`/blogs/${post.id}`}>
                  <div className="flex flex-col gap-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>Post #{post.id}</span>
                      <span>•</span>
                      <span>User {post.userId}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors capitalize">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {post.body.substring(0, 150)}...
                    </p>

                    {/* Read more link */}
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline mt-1">
                      Read more →
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Empty state - if no blogs */}
        {posts && posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
