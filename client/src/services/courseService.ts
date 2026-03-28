import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  getInstructorCourses,
  type GetCoursesParams,
} from "@/lib/api/courses";
import { handleApiError } from "@/lib/api/handleError";
import type { Course, CourseDetail, CreateCourseData } from "@/types/course";
import type { PagedResult } from "@/types/api";

export type { GetCoursesParams, CreateCourseData };

const courseService = {
  async list(params?: GetCoursesParams): Promise<PagedResult<Course>> {
    try {
      const res = await getCourses(params);
      return res.data.data ?? { items: [], total: 0, page: 1, pageSize: 10, totalPages: 0 };
    } catch (error) {
      handleApiError(error);
    }
  },

  async get(id: string): Promise<CourseDetail> {
    try {
      const res = await getCourse(id);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async create(data: CreateCourseData): Promise<Course> {
    try {
      const res = await createCourse(data);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async update(id: string, data: Partial<CreateCourseData>): Promise<Course> {
    try {
      const res = await updateCourse(id, data);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteCourse(id);
    } catch (error) {
      handleApiError(error);
    }
  },

  async publish(id: string): Promise<Course> {
    try {
      const res = await publishCourse(id);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async listMine(): Promise<Course[]> {
    try {
      const res = await getInstructorCourses();
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default courseService;
