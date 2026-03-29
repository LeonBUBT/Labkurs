"use client";

import { useState } from "react";
import courseService from "@/services/courseService";
import enrollmentService from "@/services/enrollmentService";
import { useAsync } from "@/lib/hooks/useAsync";
import Spinner from "@/components/ui/Spinner";
import type { Enrollment } from "@/types/enrollment";

const statusStyles: Record<string, string> = {
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Dropped: "bg-gray-100 text-gray-500",
};

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function InstructorStudentsPage() {
  const { data: courses, loading: loadingCourses } = useAsync(() =>
    courseService.listMine(),
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const { data: enrollments, loading: loadingEnrollments } = useAsync(
    () =>
      selectedCourseId
        ? enrollmentService.listByCourse(selectedCourseId)
        : Promise.resolve([] as Enrollment[]),
    [selectedCourseId],
  );

  const published = courses?.filter((c) => c.status === "Published") ?? [];
  const totalStudents = enrollments?.length ?? 0;
  const avgProgress = totalStudents
    ? Math.round(
        (enrollments ?? []).reduce((s, e) => s + e.progress, 0) / totalStudents,
      )
    : 0;
  const completed =
    enrollments?.filter((e) => e.status === "Completed").length ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a course to see enrolled students
        </p>
      </div>

      {loadingCourses ? (
        <Spinner />
      ) : published.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <span className="text-5xl block mb-4">📚</span>
          <p className="text-gray-600 font-medium">No published courses yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Publish a course first to see your students
          </p>
        </div>
      ) : (
        <>
          {/* Course picker */}
          <div className="mb-6">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">— Select a course —</option>
              {published.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.enrollmentCount ?? 0} students)
                </option>
              ))}
            </select>
          </div>

          {selectedCourseId && (
            <>
              {/* Summary stats */}
              {!loadingEnrollments && totalStudents > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label: "Enrolled",
                      value: totalStudents,
                      color: "text-blue-600",
                    },
                    {
                      label: "Completed",
                      value: completed,
                      color: "text-green-600",
                    },
                    {
                      label: "Avg. Progress",
                      value: `${avgProgress}%`,
                      color: "text-purple-600",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center"
                    >
                      <p className={`text-2xl font-extrabold ${s.color}`}>
                        {s.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {loadingEnrollments ? (
                <Spinner />
              ) : !totalStudents ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <span className="text-4xl block mb-3">👥</span>
                  <p className="text-gray-500 text-sm">
                    No students enrolled yet
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Enrolled
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {(enrollments ?? []).map((e, i) => (
                        <tr
                          key={e.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}
                              >
                                {initials(e.studentName || "?")}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {e.studentName || "Unknown"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[e.status]}`}
                            >
                              {e.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
                                <div
                                  className={`h-full rounded-full ${e.progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
                                  style={{ width: `${e.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700 w-8">
                                {e.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(e.enrolledAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
