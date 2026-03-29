"use client";

import { useState } from "react";
import Link from "next/link";
import courseService from "@/services/courseService";
import { useAsync } from "@/lib/hooks/useAsync";
import Spinner from "@/components/ui/Spinner";
import Badge from "@/components/ui/Badge";
import type { Course } from "@/types/course";

const levelColor = {
  Beginner: "green",
  Intermediate: "yellow",
  Advanced: "red",
} as const;

const categoryIcons: Record<string, string> = {
  Programming: "💻",
  Design: "🎨",
  Business: "📈",
  Marketing: "📣",
  Science: "🔬",
};

export default function InstructorCoursesPage() {
  const {
    data: courses,
    loading,
    error,
  } = useAsync(() => courseService.listMine());
  const [publishing, setPublishing] = useState<string | null>(null);
  const [localCourses, setLocalCourses] = useState<Course[] | null>(null);

  const displayed = localCourses ?? courses;

  const handlePublish = async (id: string) => {
    setPublishing(id);
    try {
      const updated = await courseService.publish(id);
      setLocalCourses((prev) =>
        (prev ?? courses ?? []).map((c) =>
          c.id === id ? { ...c, status: updated.status } : c,
        ),
      );
    } finally {
      setPublishing(null);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">
            {courses?.length ?? 0} courses published
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

      {!displayed?.length ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <span className="text-5xl block mb-4">📚</span>
          <p className="text-gray-600 font-medium mb-1">No courses yet</p>
          <p className="text-gray-400 text-sm mb-6">
            Create your first course to start teaching
          </p>
          <Link
            href="/instructor/courses/new"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Create a Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayed.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl">
                {categoryIcons[course.categoryName] ?? "📚"}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <Badge
                    label={course.level}
                    color={levelColor[course.level]}
                  />
                </div>
                <p className="text-xs text-gray-400 mb-1">
                  {course.categoryName}
                </p>
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-4 ${course.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {course.status}
                </span>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
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
                    {course.enrollmentCount ?? 0} students
                  </div>
                  <div className="flex items-center gap-2">
                    {course.status !== "Published" && (
                      <button
                        onClick={() => handlePublish(course.id)}
                        disabled={publishing === course.id}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {publishing === course.id ? "..." : "Publish"}
                      </button>
                    )}
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
