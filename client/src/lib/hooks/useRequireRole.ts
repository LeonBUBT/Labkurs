"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, selectRole } from "@/store/authStore";

/**
 * Redirects to /dashboard if the current user doesn't have the required role.
 * Call this at the top of any role-restricted layout or page.
 */
export function useRequireRole(requiredRole: string) {
  const role = useAuthStore(selectRole);
  const router = useRouter();

  useEffect(() => {
    if (role !== null && role !== requiredRole) {
      router.replace("/dashboard");
    }
  }, [role, requiredRole, router]);

  return role === requiredRole;
}
