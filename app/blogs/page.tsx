"use client";

import { useCallback, useState, useMemo } from "react";
import { CircularLoader, Input, Card } from "@/components";
import { useGetPosts, useAppContext } from "@/hooks";

export default function BlogsPage() {
  const { data: posts, isLoading, error } = useGetPosts();
  const [filterTitle, setFilterTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { theme } = useAppContext();

  const filteredPosts = useMemo(() => {
    return posts?.filter((post) =>
      post.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  }, [filterTitle, posts]);

  const sortedFilteredPosts = useMemo(() => {
    return filteredPosts?.sort((a, b) =>
      sortOrder === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title)
    );
  }, [filteredPosts, sortOrder]);

  const handleSortOrderChange = useCallback((selectedValue: string) => {
    setSortOrder(selectedValue);
  }, []);

  return (
    <div
      className={`min-h-screen p-8 pb-20 sm:p-20 ${
        theme === "dark" ? "bg-neutral-300" : "bg-white/80"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-brand-dodger-blue">
            Blog
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Posts from JSONPlaceholder API
          </p>
        </header>

        <Input
          type="text"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          placeholder="Filter by title"
        />
        <select
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

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
        {sortedFilteredPosts && (
          <div className="grid gap-8">
            {sortedFilteredPosts.slice(0, 10).map((post) => (
              <Card post={post} key={post.id} />
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
