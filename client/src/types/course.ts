export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "Draft" | "Published";
  instructorName: string;
  categoryName: string;
  instructorId: string;
  categoryId: string;
  enrollmentCount: number;
}

export interface CourseDetail extends Course {
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  title: string;
  order: number;
  durationMinutes: number;
  type: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  categoryId: string;
  thumbnailUrl?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  enrollmentId: string;
  studentName: string;
  courseTitle: string;
  verificationCode: string;
  issuedAt: string;
}
