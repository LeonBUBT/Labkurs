"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore, selectRole } from "@/store/authStore";

interface NavItem {
  href: string;
  label: string;
  roles: string[];
  icon: React.ReactNode;
}

const Icon = ({ d }: { d: string }) => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    roles: ["Admin", "Instructor", "Student"],
    icon: (
      <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    roles: ["Admin"],
    icon: (
      <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
  {
    href: "/admin/categories",
    label: "Categories",
    roles: ["Admin"],
    icon: (
      <Icon d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    ),
  },
  {
    href: "/instructor/courses",
    label: "My Courses",
    roles: ["Instructor"],
    icon: (
      <Icon d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
  },
  {
    href: "/student/courses",
    label: "My Learning",
    roles: ["Student"],
    icon: (
      <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    ),
  },
  {
    href: "/student/certificates",
    label: "Certificates",
    roles: ["Student"],
    icon: (
      <Icon d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    ),
  },
  {
    href: "/courses",
    label: "Browse Courses",
    roles: ["Admin", "Instructor", "Student"],
    icon: <Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const role = useAuthStore(selectRole);
  const visible = navItems.filter((item) => item.roles.includes(role ?? ""));

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="text-xl font-extrabold text-blue-600 tracking-tight">
          LearnHub
        </span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {visible.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={active ? "text-blue-600" : "text-gray-400"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
        LearnHub © 2026
      </div>
    </aside>
  );
}
