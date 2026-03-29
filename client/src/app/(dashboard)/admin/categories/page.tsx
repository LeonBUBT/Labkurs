"use client";

import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import Spinner from "@/components/ui/Spinner";
import { useAsync } from "@/lib/hooks/useAsync";
import type { Category } from "@/types/course";

export default function CategoriesPage() {
  const {
    data: loaded,
    loading,
    error,
  } = useAsync(() => categoryService.list());
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (loaded) setCategories(loaded);
  }, [loaded]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    const created = await categoryService.create(name);
    setCategories((prev) => [...prev, created]);
    setName("");
  };

  const handleDelete = async (id: string) => {
    await categoryService.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-4 py-3 text-gray-900">{cat.name}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
