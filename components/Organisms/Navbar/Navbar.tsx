"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/shadcn-ui";
import { Button } from "@/components";
import { useAppContext } from "@/hooks/contexts/appContext";

export function Navbar() {
  const pathname = usePathname();

  const { theme, setTheme, toggleTheme, language, setLanguage } =
    useAppContext();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">⚡</span>
            <span className="hidden sm:inline">Next.js Boilerplate</span>
            <span className="sm:hidden">NB</span>
          </Link>

          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme
          </Button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-black/[.05] dark:bg-white/[.06] text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 hover:bg-black/[.03] dark:hover:bg-white/[.03] hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
