import apiClient from "./client";
import type { Category } from "@/types/course";
import type { ApiResponse } from "@/types/api";

export const getCategories = () =>
  apiClient.get<ApiResponse<Category[]>>("/categories");

export const createCategory = (data: { name: string; description?: string }) =>
  apiClient.post<ApiResponse<Category>>("/categories", data);

export const deleteCategory = (id: string) =>
  apiClient.delete<ApiResponse<null>>(`/categories/${id}`);
