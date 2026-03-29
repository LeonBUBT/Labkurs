import Link from "next/link";
import type { Course } from "@/types/course";
import Badge from "@/components/ui/Badge";

const categoryGradients: Record<string, string> = {
  Programming: "from-blue-500 to-blue-600",
  Design: "from-pink-500 to-rose-500",
  Business: "from-green-500 to-emerald-600",
  Marketing: "from-orange-400 to-orange-500",
  Science: "from-purple-500 to-violet-600",
};

const categoryIcons: Record<string, string> = {
  Programming: "💻",
  Design: "🎨",
  Business: "📈",
  Marketing: "📣",
  Science: "🔬",
};

const levelColor = {
  Beginner: "green",
  Intermediate: "yellow",
  Advanced: "red",
} as const;

export default function CourseCard({ course }: { course: Course }) {
  const gradient =
    categoryGradients[course.categoryName] ?? "from-blue-500 to-blue-600";
  const icon = categoryIcons[course.categoryName] ?? "📚";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group"
    >
      <div
        className={`h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1">
          {course.categoryName}
        </p>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-snug">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{course.instructorName}</p>
        <div className="flex items-center justify-between">
          <Badge label={course.level} color={levelColor[course.level]} />
          {course.enrollmentCount > 0 && (
            <span className="text-xs text-gray-400">
              {course.enrollmentCount} students
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
