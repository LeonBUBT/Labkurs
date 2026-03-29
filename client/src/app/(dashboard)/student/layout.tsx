"use client";

import { useRequireRole } from "@/lib/hooks/useRequireRole";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allowed = useRequireRole("Student");
  if (!allowed) return null;
  return <>{children}</>;
}
