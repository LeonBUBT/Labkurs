"use client";

import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import enrollmentService from "@/services/enrollmentService";
import certificateService from "@/services/certificateService";
import { useAsync } from "@/lib/hooks/useAsync";

const EnrolledIcon = () => (
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
const CompletedIcon = () => (
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
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const CertIcon = () => (
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
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

export default function StudentDashboard() {
  const { data: enrollments } = useAsync(() => enrollmentService.listMine());
  const { data: certificates } = useAsync(() => certificateService.listMine());

  const totalEnrolled = enrollments?.length ?? 0;
  const completed =
    enrollments?.filter((e) => e.status === "Completed").length ?? 0;
  const totalCerts = certificates?.length ?? 0;

  const active = enrollments?.filter((e) => e.status === "Active") ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your progress and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Enrolled Courses"
          value={totalEnrolled || "—"}
          icon={<EnrolledIcon />}
          accent="blue"
        />
        <StatCard
          title="Completed"
          value={completed || "—"}
          icon={<CompletedIcon />}
          accent="green"
        />
        <StatCard
          title="Certificates"
          value={totalCerts || "—"}
          icon={<CertIcon />}
          accent="purple"
        />
      </div>

      {active.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Continue Learning</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {active.map((e) => (
              <div key={e.id} className="px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {e.courseTitle}
                  </p>
                  <span className="text-sm font-semibold text-blue-600">
                    {e.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${e.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          href="/courses"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm shadow-blue-200"
        >
          Browse Courses
        </Link>
        <Link
          href="/student/certificates"
          className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          My Certificates
        </Link>
      </div>
    </div>
  );
}
