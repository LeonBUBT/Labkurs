import apiClient from "./client";
import type { Enrollment } from "@/types/enrollment";
import type { ApiResponse } from "@/types/api";

export type { Enrollment };

export const enroll = (data: { courseId: string }) =>
  apiClient.post<ApiResponse<Enrollment>>("/enrollments", data);

export const getMyEnrollments = () =>
  apiClient.get<ApiResponse<Enrollment[]>>("/enrollments/my");

export const updateProgress = (id: string, progress: number) =>
  apiClient.patch<ApiResponse<null>>(`/enrollments/${id}/progress`, { progress });

export const dropEnrollment = (id: string) =>
  apiClient.post<ApiResponse<null>>(`/enrollments/${id}/drop`);

export const getEnrollmentsByCourse = (courseId: string) =>
  apiClient.get<ApiResponse<Enrollment[]>>(`/enrollments/course/${courseId}`);
