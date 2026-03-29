"use client";

import { useRequireRole } from "@/lib/hooks/useRequireRole";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const allowed = useRequireRole("Instructor");
  if (!allowed) return null;
  return <>{children}</>;
}
