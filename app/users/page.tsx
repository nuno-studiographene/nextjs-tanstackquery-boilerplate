"use client";

import { useState } from "react";
import { Button, CircularLoader } from "@/components";
import { useGetUsers, User } from "@/hooks/api/users/useUsers";

interface PaginatedData {
  users: User[];
  pagination: {
    total: number;
    skip: number;
    limit: number;
    hasMore: boolean;
  };
}

const ITEMS_PER_PAGE = 10;

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const skip = currentPage * ITEMS_PER_PAGE;

  const {
    data: users,
    isLoading,
    error,
  } = useGetUsers({
    limit: ITEMS_PER_PAGE,
    skip,
  });

  // Create pagination data structure
  const data: PaginatedData | undefined = users
    ? {
        users: users,
        pagination: {
          total: 194,
          skip: skip,
          limit: ITEMS_PER_PAGE,
          hasMore: skip + ITEMS_PER_PAGE < 194,
        },
      }
    : undefined;

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.pagination.hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = data
    ? Math.ceil(data.pagination.total / ITEMS_PER_PAGE)
    : 0;

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-brand-dodger-blue">
            Users
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse through all users with pagination
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
              Error loading users: {error.message}
            </p>
          </div>
        )}

        {/* Users List */}
        {data && (
          <>
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {skip + 1} to{" "}
                {Math.min(skip + ITEMS_PER_PAGE, data.pagination.total)} of{" "}
                {data.pagination.total} users
              </p>
            </div>

            <div className="grid gap-4 mb-8">
              {data?.users?.map((user) => (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {user.email}
                      </p>
                      {user.phone && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          {user.phone}
                        </p>
                      )}
                      {user.website && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          {user.website}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      ID: {user.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 0 || isLoading}
                variant="outline"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              <Button
                onClick={handleNextPage}
                disabled={!data.pagination.hasMore || isLoading}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {data && data?.users?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
