import { enroll, getMyEnrollments, updateProgress, dropEnrollment } from "@/lib/api/enrollments";
import { handleApiError } from "@/lib/api/handleError";
import type { Enrollment } from "@/lib/api/enrollments";

const enrollmentService = {
  async enroll(courseId: string): Promise<Enrollment> {
    try {
      const res = await enroll({ courseId });
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async listMine(): Promise<Enrollment[]> {
    try {
      const res = await getMyEnrollments();
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateProgress(id: string, progress: number): Promise<void> {
    try {
      await updateProgress(id, progress);
    } catch (error) {
      handleApiError(error);
    }
  },

  async drop(id: string): Promise<void> {
    try {
      await dropEnrollment(id);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default enrollmentService;
