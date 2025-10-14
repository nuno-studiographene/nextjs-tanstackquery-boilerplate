"use client";

import { use } from "react";
import Link from "next/link";
import { CircularLoader } from "@/components";
import { useGetPost } from "@/hooks";

interface Props {
  params: Promise<{ blogId: string }>;
}

export default function BlogPost({ params }: Props) {
  const { blogId } = use(params);
  const { data: post, isLoading, error } = useGetPost(blogId);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          ← Back to Blogs
        </Link>

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
              Error loading post: {error.message}
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>
        )}

        {/* Article Content */}
        {post && (
          <>
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight leading-tight capitalize">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>By User {post.userId}</span>
                </div>
                <span>•</span>
                <span>Post #{post.id}</span>
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {post.body.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-black/[.08] dark:border-white/[.145]">
              <div className="flex items-center justify-between">
                <Link
                  href="/blogs"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← Back to all posts
                </Link>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Share this article
                </div>
              </div>
            </footer>
          </>
        )}
      </article>
    </div>
  );
}
