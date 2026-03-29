"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import authService from "@/services/authService";

export default function Topbar() {
  const { user, refreshToken, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    if (refreshToken) await authService.logout(refreshToken);
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.fullName}
          <span className="ml-2 text-xs text-gray-400 capitalize">
            ({user?.roles?.[0]})
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
