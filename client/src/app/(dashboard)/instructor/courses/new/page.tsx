"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import courseService from "@/services/courseService";
import categoryService from "@/services/categoryService";
import { useAsync } from "@/lib/hooks/useAsync";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  categoryId: z.string().uuid("Please select a category"),
});

type FormData = z.infer<typeof schema>;

export default function NewCoursePage() {
  const router = useRouter();
  const { data: categories } = useAsync(() => categoryService.list());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { level: "Beginner" },
  });

  const onSubmit = async (data: FormData) => {
    await courseService.create({ ...data, price: 0 });
    router.push("/instructor/courses");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details to publish your course
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Course Title
          </label>
          <input
            {...register("title")}
            placeholder="e.g. Introduction to Web Development"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="What will students learn in this course?"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Difficulty Level
            </label>
            <select
              {...register("level")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              {...register("categoryId")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a category</option>
              {(categories ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm"
        >
          {isSubmitting ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
