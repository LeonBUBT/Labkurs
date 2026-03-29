"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore, selectRole } from "@/store/authStore";

interface NavItem {
  href: string;
  label: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", roles: ["Admin", "Instructor", "Student"] },
  { href: "/admin/users", label: "Users", roles: ["Admin"] },
  { href: "/admin/categories", label: "Categories", roles: ["Admin"] },
  { href: "/instructor/courses", label: "My Courses", roles: ["Instructor"] },
  { href: "/instructor/quizzes", label: "Quizzes", roles: ["Instructor"] },
  { href: "/student/courses", label: "My Courses", roles: ["Student"] },
  { href: "/student/certificates", label: "Certificates", roles: ["Student"] },
  { href: "/courses", label: "Browse Courses", roles: ["Admin", "Instructor", "Student"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const role = useAuthStore(selectRole);

  const visible = navItems.filter((item) => item.roles.includes(role ?? ""));

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="text-xl font-bold text-blue-600">LMS</span>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visible.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
