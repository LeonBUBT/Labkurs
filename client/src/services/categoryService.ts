import { getCategories, createCategory, deleteCategory } from "@/lib/api/categories";
import { handleApiError } from "@/lib/api/handleError";
import type { Category } from "@/types/course";

const categoryService = {
  async list(): Promise<Category[]> {
    try {
      const res = await getCategories();
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async create(name: string, description?: string): Promise<Category> {
    try {
      const res = await createCategory({ name, description });
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteCategory(id);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default categoryService;
