import Link from "next/link";
import type { Course } from "@/types/course";
import Badge from "@/components/ui/Badge";

export default function CourseCard({ course }: { course: Course }) {
  const levelColor = { Beginner: "green", Intermediate: "yellow", Advanced: "red" } as const;
  return (
    <Link href={`/courses/${course.id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="h-36 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <span className="text-4xl">📚</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{course.instructorName}</p>
        <div className="flex items-center justify-between">
          <Badge label={course.level} color={levelColor[course.level]} />
          <span className="font-bold text-blue-600">${course.price}</span>
        </div>
      </div>
    </Link>
  );
}
