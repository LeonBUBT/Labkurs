import { getUsers, deleteUser, changeUserRole } from "@/lib/api/users";
import { handleApiError } from "@/lib/api/handleError";
import type { UserInfo } from "@/types/auth";

const userService = {
  async list(): Promise<UserInfo[]> {
    try {
      const res = await getUsers();
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteUser(id);
    } catch (error) {
      handleApiError(error);
    }
  },

  async changeRole(id: string, role: string): Promise<void> {
    try {
      await changeUserRole(id, role);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default userService;
