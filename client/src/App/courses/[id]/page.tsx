"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import enrollmentService from "@/services/enrollmentService";
import { useAuthStore, selectRole } from "@/store/authStore";
import type { CourseDetail } from "@/types/course";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const role = useAuthStore(selectRole);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    courseService.get(id).then(setCourse);
  }, [id]);

  const handleEnroll = async () => {
    if (!accessToken) { router.push("/login"); return; }
    setEnrolling(true);
    try {
      await enrollmentService.enroll(id);
      router.push("/student");
    } finally {
      setEnrolling(false);
    }
  };

  if (!course) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
      <p className="text-gray-500 mb-4">
        {course.categoryName} · {course.level} · by {course.instructorName}
      </p>
      <p className="text-gray-700 mb-6">{course.description}</p>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-2xl font-bold text-blue-600">${course.price}</span>
        {role === "Student" && (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Course Content</h2>
      <div className="space-y-3">
        {course.modules?.map((mod) => (
          <div key={mod.id} className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium text-gray-900">{mod.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{mod.lessons?.length ?? 0} lessons</p>
          </div>
        ))}
      </div>
    </div>
  );
}
