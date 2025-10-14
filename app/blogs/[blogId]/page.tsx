"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CircularLoader, Button } from "@/components";
import { useGetPost, useCreatePost } from "@/hooks";

export default function BlogPost() {
  const params = useParams();
  const blogId = params.blogId as string;
  const { data: post, isLoading, error } = useGetPost(blogId);
  const { mutate: createPost, isPending } = useCreatePost();

  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createPost(
      {
        title: title.trim(),
        body: "This is a new post created from the form",
        userId: 1,
      },
      {
        onSuccess: (data) => {
          console.log("Post created successfully:", data);
          alert(`Post created successfully! ID: ${data.id}`);
          setTitle(""); // Clear the input
        },
        onError: (error) => {
          console.error("Error creating post:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <article className="max-w-3xl mx-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <CircularLoader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-state-error dark:text-red-400">
              Error loading post: {error.message}
            </p>
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

              <div className="flex flex-wrap items-center gap-4 text-sm">
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
                <p key={index} className="text-brand-dodger-blue">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-black/[.08] dark:border-white/[.145]">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Share this article
              </div>
            </footer>

            {/* Create Post Form */}
            <section className="mt-12 pt-8 border-t border-black/[.08] dark:border-white/[.145]">
              <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    required
                    className="w-full px-4 py-2 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending || !title.trim()}
                  loading={isPending}
                >
                  {isPending ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
