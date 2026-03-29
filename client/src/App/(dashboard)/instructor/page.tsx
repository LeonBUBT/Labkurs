"use client";

import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";

export default function InstructorDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
        <Link href="/instructor/courses/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New Course
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="My Courses" value="—" />
        <StatCard title="Total Students" value="—" />
        <StatCard title="Avg. Progress" value="—" />
      </div>
    </div>
  );
}
