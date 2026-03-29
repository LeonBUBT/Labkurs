"use client";

import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import courseService from "@/services/courseService";
import { useAsync } from "@/lib/hooks/useAsync";

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
const StudentsIcon = () => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const AvgProgressIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

export default function InstructorDashboard() {
  const { data: courses } = useAsync(() => courseService.listMine());

  const totalCourses = courses?.length ?? 0;
  const totalStudents =
    courses?.reduce((sum, c) => sum + (c.enrollmentCount ?? 0), 0) ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Instructor Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your courses and track student progress
          </p>
        </div>
        <Link
          href="/instructor/courses/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 text-sm font-medium flex items-center gap-2 shadow-sm shadow-blue-200 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="My Courses"
          value={totalCourses || "—"}
          icon={<CoursesIcon />}
          accent="blue"
        />
        <StatCard
          title="Total Students"
          value={totalStudents || "—"}
          icon={<StudentsIcon />}
          accent="green"
        />
        <StatCard
          title="Avg. Students/Course"
          value={totalCourses ? Math.round(totalStudents / totalCourses) : "—"}
          icon={<AvgProgressIcon />}
          accent="orange"
        />
      </div>

      {courses && courses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Your Courses</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {courses.map((course) => (
              <div
                key={course.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {course.categoryName} · {course.level}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {course.enrollmentCount ?? 0} students
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${course.level === "Beginner" ? "bg-green-100 text-green-700" : course.level === "Intermediate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                  >
                    {course.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
