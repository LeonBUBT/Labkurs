"use client";

import Link from "next/link";
import enrollmentService from "@/services/enrollmentService";
import { useAsync } from "@/lib/hooks/useAsync";
import Spinner from "@/components/ui/Spinner";

const statusStyles: Record<string, string> = {
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Dropped: "bg-gray-100 text-gray-500",
};

export default function StudentCoursesPage() {
  const {
    data: enrollments,
    loading,
    error,
  } = useAsync(() => enrollmentService.listMine());

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  const active = enrollments?.filter((e) => e.status === "Active") ?? [];
  const completed = enrollments?.filter((e) => e.status === "Completed") ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
        <p className="text-sm text-gray-500 mt-1">
          {enrollments?.length ?? 0} courses enrolled
        </p>
      </div>

      {!enrollments?.length ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <span className="text-5xl block mb-4">📖</span>
          <p className="text-gray-600 font-medium mb-1">No courses yet</p>
          <p className="text-gray-400 text-sm mb-6">
            Browse the catalog and enroll in your first course
          </p>
          <Link
            href="/courses"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {active.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-700 mb-4">
                In Progress
              </h2>
              <div className="space-y-3">
                {active.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {e.courseTitle}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Enrolled{" "}
                          {new Date(e.enrolledAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[e.status]}`}
                        >
                          {e.status}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {e.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${e.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-end mt-3">
                      <Link
                        href={`/courses/${e.courseId}`}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Continue learning →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-700 mb-4">
                Completed
              </h2>
              <div className="space-y-3">
                {completed.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 opacity-80"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {e.courseTitle}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Completed{" "}
                          {e.completedAt
                            ? new Date(e.completedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                          ✓ Completed
                        </span>
                        <Link
                          href="/student/certificates"
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View cert →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
