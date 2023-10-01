import { configureStore } from "@reduxjs/toolkit";
import { PlayerSlice } from "./features/PlayerSlice";
import { QuizSlice } from "./features/QuizSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    player: PlayerSlice.reducer,
    quiz: QuizSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
