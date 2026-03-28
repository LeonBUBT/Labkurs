export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  courseTitle: string;
  status: "Active" | "Completed" | "Dropped";
  progress: number;
  enrolledAt: string;
  completedAt?: string;
}
