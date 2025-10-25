"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components";
import { useAuthStore } from "@/hooks/zustand/authStore";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginForm.email, loginForm.password);

      if (success) {
        // Set auth token in cookie for middleware
        document.cookie = `auth-token=true; path=/; max-age=${60 * 60 * 24}`; // 24 hours
        toast.success("Login successful!");
        router.push("/protected-route");
      } else {
        toast.error(
          "Invalid credentials. Try email: admin@example.com, password: password"
        );
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Login
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Please log in to access protected routes.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Demo Credentials:</strong>
              <br />
              Email: admin@example.com
              <br />
              Password: password
              <br />
              <br />
              <em>Or use any email/password combination for demo purposes.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
