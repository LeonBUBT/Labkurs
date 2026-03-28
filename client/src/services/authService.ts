import { login, register, revokeToken } from "@/lib/api/auth";
import { handleApiError } from "@/lib/api/handleError";
import type { LoginRequest, RegisterRequest, LoginResponse } from "@/types/auth";

const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const res = await login(data);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      const res = await register(data);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await revokeToken(refreshToken);
    } catch {
      // best-effort — clear local state regardless
    }
  },
};

export default authService;
