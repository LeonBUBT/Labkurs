export interface Quiz {
  id: string;
  title: string;
  description?: string;
  passingScore: number;
  lessonId: string;
}

export interface QuizDetail extends Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: "SingleChoice" | "MultipleChoice" | "TrueFalse";
  points: number;
  answers: QuizAnswer[];
}

/** Student-facing answer — backend does not expose isCorrect. */
export interface QuizAnswer {
  id: string;
  text: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  isPassed: boolean;
  attemptedAt: string;
}

export interface SubmitAttemptData {
  answers: { questionId: string; selectedAnswerIds: string[] }[];
}
