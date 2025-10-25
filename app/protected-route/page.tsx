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
                Welcome to the protected area! This content is only visible to
                authenticated users.
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

        {/* Protected Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              🔒 Secure Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This is sensitive information that only authenticated users can
              see. In a real application, this would contain user-specific data,
              admin panels, or other protected resources.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              ⚙️ User Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Here you would typically find user preferences, account settings,
              privacy controls, and other personalized configuration options.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              📊 Analytics Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Protected analytics and reporting features that require
              authentication to access user-specific metrics and insights.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              🛡️ Security Features
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Security-related features like two-factor authentication setup,
              login history, device management, and security alerts.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
            🚀 Next Steps
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            This is a dummy authentication system. To implement real
            authentication, you would:
          </p>
          <ul className="mt-2 text-yellow-700 dark:text-yellow-300 list-disc list-inside space-y-1">
            <li>Replace the dummy login with real API calls</li>
            <li>Add JWT token handling</li>
            <li>Implement proper password validation</li>
            <li>Add user registration functionality</li>
            <li>Integrate with your backend authentication system</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
