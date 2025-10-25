"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { useAuthStore } from "@/hooks/zustand/authStore";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // Clear auth token from cookie
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success("Logged out successfully!");
    router.push("/");
  };

  // Show protected content if authenticated
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight text-brand-dodger-blue">
                Protected Route
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                protected route
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </header>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            User Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600">Authenticated</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
