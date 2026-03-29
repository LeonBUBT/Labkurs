"use client";

import { useState } from "react";
import Link from "next/link";
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
    [search, categoryId],
  );

  const courses = coursesResult?.items ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-extrabold text-blue-600 tracking-tight"
          >
            LearnHub
          </Link>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="text-gray-500 mt-1">
            {coursesResult
              ? `${coursesResult.total} courses available`
              : "Loading courses..."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option value="">All Categories</option>
            {(categories ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category pills */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <button
              onClick={() => setCategoryId("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!categoryId ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${categoryId === c.id ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {loading && <Spinner />}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && courses.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-gray-500 text-lg">No courses found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
