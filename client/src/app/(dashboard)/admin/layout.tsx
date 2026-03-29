"use client";

import { useRequireRole } from "@/lib/hooks/useRequireRole";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const allowed = useRequireRole("Admin");
  if (!allowed) return null;
  return <>{children}</>;
}
