"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import authService from "@/services/authService";

const roleColors: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700",
  Instructor: "bg-blue-100 text-blue-700",
  Student: "bg-green-100 text-green-700",
};

export default function Topbar() {
  const { user, refreshToken, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    if (refreshToken) await authService.logout(refreshToken);
    clearAuth();
    router.push("/login");
  };

  const initials =
    user?.fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";

  const role = user?.roles?.[0] ?? "";

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        {role && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[role] ?? "bg-gray-100 text-gray-600"}`}
          >
            {role}
          </span>
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.fullName}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </div>
    </header>
  );
}
