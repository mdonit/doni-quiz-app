export type Player = {
  id: string;
  name: string;
  score: number;
  rounds: number;
};

export type Quiz = {
  id: string;
  question: string;
  answers: [answerA: string, answerB: string, answerC: string, answerD: string];
  answerIndex: number;
};
