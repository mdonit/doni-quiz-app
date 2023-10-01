export type Quiz = {
  id: string;
  question: string;
  answers: [answerA: string, answerB: string, answerC: string, answerD: string];
  answerIndex: number;
};

export type QuizList = Quiz[];

export type UpdateQuizList = {
  quizList: QuizList;
  updateQuizList: () => void;
  highestScore: number;
};
