"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import courseService from "@/services/courseService";
import enrollmentService from "@/services/enrollmentService";
import { useAuthStore, selectRole } from "@/store/authStore";
import type { CourseDetail } from "@/types/course";
import Badge from "@/components/ui/Badge";

const levelColor = {
  Beginner: "green",
  Intermediate: "yellow",
  Advanced: "red",
} as const;

const categoryGradients: Record<string, string> = {
  Programming: "from-blue-500 to-blue-600",
  Design: "from-pink-500 to-rose-500",
  Business: "from-green-500 to-emerald-600",
  Marketing: "from-orange-400 to-orange-500",
  Science: "from-purple-500 to-violet-600",
};

const categoryIcons: Record<string, string> = {
  Programming: "💻",
  Design: "🎨",
  Business: "📈",
  Marketing: "📣",
  Science: "🔬",
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const role = useAuthStore(selectRole);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedMod, setExpandedMod] = useState<string | null>(null);

  useEffect(() => {
    courseService.get(id).then(setCourse);
  }, [id]);

  const handleEnroll = async () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }
    setEnrolling(true);
    try {
      await enrollmentService.enroll(id);
      router.push("/student");
    } finally {
      setEnrolling(false);
    }
  };

  if (!course)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading course...</p>
        </div>
      </div>
    );

  const gradient =
    categoryGradients[course.categoryName] ?? "from-blue-500 to-blue-600";
  const icon = categoryIcons[course.categoryName] ?? "📚";
  const totalLessons =
    course.modules?.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0) ?? 0;
  const totalMinutes =
    course.modules?.reduce(
      (sum, m) =>
        sum +
        (m.lessons?.reduce((s, l) => s + (l.durationMinutes ?? 0), 0) ?? 0),
      0,
    ) ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/courses"
            className="hover:text-blue-600 transition-colors"
          >
            Courses
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">
            {course.title}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${gradient}`}>
        <div className="max-w-6xl mx-auto px-6 py-12 flex gap-8 items-center">
          <div className="text-6xl">{icon}</div>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Badge label={course.categoryName} color="blue" />
              <Badge label={course.level} color={levelColor[course.level]} />
            </div>
            <h1 className="text-3xl font-extrabold mb-2 leading-tight">
              {course.title}
            </h1>
            <p className="text-white/80 text-sm">by {course.instructorName}</p>
            <div className="flex gap-6 mt-4 text-white/70 text-sm">
              <span>📚 {course.modules?.length ?? 0} modules</span>
              <span>🎥 {totalLessons} lessons</span>
              <span>
                ⏱️ {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m
              </span>
              {course.enrollmentCount > 0 && (
                <span>👥 {course.enrollmentCount} students</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              About this course
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {course.description}
            </p>
          </div>

          {/* Course content */}
          {course.modules && course.modules.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Course Content
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  {course.modules.length} modules · {totalLessons} lessons
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {course.modules.map((mod) => (
                  <div key={mod.id}>
                    <button
                      onClick={() =>
                        setExpandedMod(expandedMod === mod.id ? null : mod.id)
                      }
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {mod.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {mod.lessons?.length ?? 0} lessons
                        </p>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedMod === mod.id ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {expandedMod === mod.id && mod.lessons && (
                      <div className="bg-gray-50 divide-y divide-gray-100">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 px-8 py-3"
                          >
                            <svg
                              className="w-4 h-4 text-gray-400 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.8}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm text-gray-700 flex-1">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-gray-400">
                              {lesson.durationMinutes} min
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar sticky card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-6">
            <p className="text-lg font-bold text-gray-900 mb-1">Free Course</p>
            <p className="text-xs text-gray-400 mb-6">
              Enroll now · Lifetime access
            </p>
            {role === "Student" ? (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm shadow-lg shadow-blue-200"
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
            ) : !accessToken ? (
              <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Sign in to Enroll
              </Link>
            ) : null}
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {totalLessons} video
                lessons
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>{" "}
                {Math.round(totalMinutes / 60)}h {totalMinutes % 60}m of content
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Certificate of
                completion
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Lifetime access
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
