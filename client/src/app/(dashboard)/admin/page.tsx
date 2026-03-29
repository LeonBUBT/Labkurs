"use client";

import StatCard from "@/components/dashboard/StatCard";
import userService from "@/services/userService";
import courseService from "@/services/courseService";
import { useAsync } from "@/lib/hooks/useAsync";
import Link from "next/link";

const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const CoursesIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);
const EnrollIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

export default function AdminDashboard() {
  const { data: users } = useAsync(() => userService.list());
  const { data: courses } = useAsync(() =>
    courseService.list({ pageSize: 100 }),
  );

  const totalUsers = users?.length ?? 0;
  const totalCourses = courses?.total ?? 0;
  const totalEnrollments =
    courses?.items.reduce((sum, c) => sum + (c.enrollmentCount ?? 0), 0) ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of platform activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={totalUsers || "—"}
          icon={<UsersIcon />}
          accent="blue"
          subtitle="Admins, instructors & students"
        />
        <StatCard
          title="Total Courses"
          value={totalCourses || "—"}
          icon={<CoursesIcon />}
          accent="purple"
          subtitle="Published on the platform"
        />
        <StatCard
          title="Total Enrollments"
          value={totalEnrollments || "—"}
          icon={<EnrollIcon />}
          accent="green"
          subtitle="Across all courses"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <span className="text-sm text-gray-700">Manage Users</span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <span className="text-sm text-gray-700">Manage Categories</span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/courses"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <span className="text-sm text-gray-700">Browse All Courses</span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              {
                label: "Users registered",
                value: totalUsers,
                max: 100,
                color: "bg-blue-500",
              },
              {
                label: "Courses published",
                value: totalCourses,
                max: 20,
                color: "bg-purple-500",
              },
              {
                label: "Active enrollments",
                value: totalEnrollments,
                max: 50,
                color: "bg-green-500",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{
                      width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
