import { getQuizzesByLesson, getQuiz, submitAttempt } from "@/lib/api/quizzes";
import { handleApiError } from "@/lib/api/handleError";
import type { Quiz, QuizDetail, QuizAttempt, SubmitAttemptData } from "@/types/quiz";

export type { SubmitAttemptData };

const quizService = {
  async listByLesson(lessonId: string): Promise<Quiz[]> {
    try {
      const res = await getQuizzesByLesson(lessonId);
      return res.data.data ?? [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async get(lessonId: string, quizId: string): Promise<QuizDetail> {
    try {
      const res = await getQuiz(lessonId, quizId);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },

  async submit(lessonId: string, quizId: string, data: SubmitAttemptData): Promise<QuizAttempt> {
    try {
      const res = await submitAttempt(lessonId, quizId, data);
      return res.data.data!;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default quizService;
