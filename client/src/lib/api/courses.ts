import apiClient from "./client";
import type { Course, CourseDetail, CreateCourseData } from "@/types/course";
import type { ApiResponse, PagedResult } from "@/types/api";

export interface GetCoursesParams {
  search?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}

export const getCourses = (params?: GetCoursesParams) =>
  apiClient.get<ApiResponse<PagedResult<Course>>>("/courses", { params });

export const getCourse = (id: string) =>
  apiClient.get<ApiResponse<CourseDetail>>(`/courses/${id}`);

export const createCourse = (data: CreateCourseData) =>
  apiClient.post<ApiResponse<Course>>("/courses", data);

export const updateCourse = (id: string, data: Partial<CreateCourseData>) =>
  apiClient.put<ApiResponse<Course>>(`/courses/${id}`, data);

export const deleteCourse = (id: string) =>
  apiClient.delete<ApiResponse<null>>(`/courses/${id}`);

export const publishCourse = (id: string) =>
  apiClient.post<ApiResponse<Course>>(`/courses/${id}/publish`);

export const getInstructorCourses = () =>
  apiClient.get<ApiResponse<Course[]>>("/courses/instructor");
