import apiClient from "./client";
import type { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export const login = (data: LoginRequest) =>
  apiClient.post<ApiResponse<LoginResponse>>("/auth/login", data);

export const register = (data: RegisterRequest) =>
  apiClient.post<ApiResponse<LoginResponse>>("/auth/register", data);

export const revokeToken = (refreshToken: string) =>
  apiClient.post<ApiResponse<null>>("/auth/revoke", refreshToken);
