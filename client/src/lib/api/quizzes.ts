import apiClient from "./client";
import type { Quiz, QuizDetail, QuizAttempt, SubmitAttemptData } from "@/types/quiz";
import type { ApiResponse } from "@/types/api";

export const getQuizzesByLesson = (lessonId: string) =>
  apiClient.get<ApiResponse<Quiz[]>>(`/lessons/${lessonId}/quizzes`);

export const getQuiz = (lessonId: string, quizId: string) =>
  apiClient.get<ApiResponse<QuizDetail>>(`/lessons/${lessonId}/quizzes/${quizId}`);

export const submitAttempt = (lessonId: string, quizId: string, data: SubmitAttemptData) =>
  apiClient.post<ApiResponse<QuizAttempt>>(`/lessons/${lessonId}/quizzes/${quizId}/attempt`, data);
