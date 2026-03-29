"use client";

import { useState } from "react";
import courseService from "@/services/courseService";
import categoryService from "@/services/categoryService";
import CourseCard from "@/components/courses/CourseCard";
import Spinner from "@/components/ui/Spinner";
import { useAsync } from "@/lib/hooks/useAsync";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categories } = useAsync(() => categoryService.list());
  const {
    data: coursesResult,
    loading,
    error,
  } = useAsync(
    () => courseService.list({ search, categoryId: categoryId || undefined }),
    [search, categoryId]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Courses</h1>
      <div className="flex gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {(categories ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(coursesResult?.items ?? []).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
