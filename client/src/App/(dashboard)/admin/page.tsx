"use client";

import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value="—" />
        <StatCard title="Total Courses" value="—" />
        <StatCard title="Total Enrollments" value="—" />
      </div>
    </div>
  );
}
