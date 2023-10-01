import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Quiz {
  id: string;
  question: string;
  answerIndex: number;
  answers: [answerA: string, answerB: string, answerC: string, answerD: string];
}

export interface QuizState {
  quizes: Quiz[];
}

const initialState: QuizState = {
  quizes: [
    { id: v4(), question: "Who is Luke's father?", answerIndex: 1, answers: ["Obi-Wan", "Anakin", "Han Solo", "Windu"] },
    { id: v4(), question: "What is the color of Yoda's saber?", answerIndex: 0, answers: ["Green", "Blue", "Red", "Purple"] },
    { id: v4(), question: "Where was Darth Maul born?", answerIndex: 3, answers: ["Tatooine", "Mustafar", "Korriban", "Dathomir"] },
  ],
};

export const QuizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    quizAdd: (state, action: PayloadAction<{ id?: string; question: string; answerA: string; answerB: string; answerC: string; answerD: string; answerIndex: number }>) => {
      if (action.payload.id) {
        const existingQuiz = state.quizes.filter((pl) => pl.id === action.payload.id)[0];
        existingQuiz.question = action.payload.question;
        existingQuiz.answers[0] = action.payload.answerA;
        existingQuiz.answers[1] = action.payload.answerB;
        existingQuiz.answers[2] = action.payload.answerC;
        existingQuiz.answers[3] = action.payload.answerD;
        existingQuiz.answerIndex = action.payload.answerIndex;
      } else {
        state.quizes.push({
          id: v4(),
          question: action.payload.question,
          answerIndex: action.payload.answerIndex,
          answers: [action.payload.answerA, action.payload.answerB, action.payload.answerC, action.payload.answerD],
        });
      }
    },
    quizDelete: (state, action: PayloadAction<{ id: string }>) => {
      state.quizes = state.quizes.filter((qu) => qu.id !== action.payload.id);
    },
  },
});

export default QuizSlice.reducer;
export const { quizAdd, quizDelete } = QuizSlice.actions;
