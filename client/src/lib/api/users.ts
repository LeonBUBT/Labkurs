import apiClient from "./client";
import type { UserInfo } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export const getUsers = () =>
  apiClient.get<ApiResponse<UserInfo[]>>("/users");

export const deleteUser = (id: string) =>
  apiClient.delete<ApiResponse<null>>(`/users/${id}`);

export const changeUserRole = (id: string, role: string) =>
  apiClient.put<ApiResponse<null>>(`/users/${id}/role`, { role });
