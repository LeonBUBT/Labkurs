"use client";

import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Enrolled Courses" value="—" />
        <StatCard title="Completed" value="—" />
        <StatCard title="Certificates" value="—" />
      </div>
      <div className="flex gap-4">
        <Link href="/courses" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Browse Courses
        </Link>
        <Link href="/student/certificates" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
          My Certificates
        </Link>
      </div>
    </div>
  );
}
