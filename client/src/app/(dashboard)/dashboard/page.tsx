"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, selectRole } from "@/store/authStore";

export default function DashboardRedirect() {
  const router = useRouter();
  const role = useAuthStore(selectRole);

  useEffect(() => {
    if (role === "Admin") router.replace("/admin");
    else if (role === "Instructor") router.replace("/instructor");
    else router.replace("/student");
  }, [role, router]);

  return null;
}
